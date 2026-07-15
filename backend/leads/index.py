import json
import os
import urllib.request
import urllib.parse
import psycopg2

TELEGRAM_USERNAME = 'rabotaRGL'


def send_telegram_notification(name: str, phone: str, car: str) -> None:
    """Отправляет уведомление о новой заявке в Telegram пользователю TELEGRAM_USERNAME"""
    token = os.environ.get('TELEGRAM_BOT_TOKEN')
    if not token:
        print('TELEGRAM DEBUG: TELEGRAM_BOT_TOKEN is not set')
        return

    try:
        updates_url = f'https://api.telegram.org/bot{token}/getUpdates'
        with urllib.request.urlopen(updates_url, timeout=15) as resp:
            updates = json.loads(resp.read())

        print(f'TELEGRAM DEBUG: getUpdates response ok={updates.get("ok")}, result_count={len(updates.get("result", []))}')

        chat_id = None
        for result in updates.get('result', []):
            msg = result.get('message') or result.get('my_chat_member') or {}
            frm = msg.get('from', {})
            username = frm.get('username', '')
            print(f'TELEGRAM DEBUG: found username in updates: "{username}"')
            if username.lower() == TELEGRAM_USERNAME.lower():
                chat_id = frm.get('id')

        if not chat_id:
            print(f'TELEGRAM DEBUG: chat_id not found for username "{TELEGRAM_USERNAME}". Bot needs a fresh message from this user (send /start to the bot).')
            return

        print(f'TELEGRAM DEBUG: sending message to chat_id={chat_id}')
        text = (
            'Новая заявка с сайта!\n\n'
            f'Имя: {name}\n'
            f'Телефон: {phone}\n'
            f'Автомобиль: {car or "не указан"}'
        )
        send_url = f'https://api.telegram.org/bot{token}/sendMessage'
        data = urllib.parse.urlencode({'chat_id': chat_id, 'text': text}).encode()
        with urllib.request.urlopen(urllib.request.Request(send_url, data=data), timeout=15) as send_resp:
            print(f'TELEGRAM DEBUG: sendMessage response status={send_resp.status}')
    except Exception as e:
        print(f'TELEGRAM DEBUG: exception occurred: {type(e).__name__}: {e}')


def handler(event: dict, context) -> dict:
    """Прием заявок с сайта (имя, телефон, авто) и выдача списка заявок для админки
    Args: event с httpMethod, body, headers, queryStringParameters; context с request_id
    Returns: HTTP response dict
    """
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    dsn = os.environ['DATABASE_URL']
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()

    if method == 'POST':
        body = json.loads(event.get('body', '{}'))
        name = body.get('name', '').strip()
        phone = body.get('phone', '').strip()
        car = body.get('car', '').strip()
        source = body.get('source', 'form')

        cur.execute(
            "INSERT INTO leads (name, phone, car, source) VALUES (%s, %s, %s, %s) RETURNING id",
            (name, phone, car, source)
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()

        send_telegram_notification(name, phone, car)

        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'success': True, 'id': new_id})
        }

    if method == 'GET':
        headers = event.get('headers', {})
        admin_password = headers.get('X-Admin-Password') or headers.get('x-admin-password')

        if admin_password != os.environ.get('ADMIN_PASSWORD'):
            cur.close()
            conn.close()
            return {
                'statusCode': 401,
                'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Неверный пароль'})
            }

        cur.execute(
            "SELECT id, name, phone, car, source, created_at FROM leads ORDER BY created_at DESC"
        )
        rows = cur.fetchall()
        cur.close()
        conn.close()

        leads = [
            {
                'id': r[0],
                'name': r[1],
                'phone': r[2],
                'car': r[3],
                'source': r[4],
                'created_at': r[5].isoformat() if r[5] else None
            }
            for r in rows
        ]

        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'leads': leads})
        }

    cur.close()
    conn.close()
    return {
        'statusCode': 405,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': json.dumps({'error': 'Method not allowed'})
    }