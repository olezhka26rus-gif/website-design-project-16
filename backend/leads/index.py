import json
import os
import smtplib
import urllib.parse
import urllib.request
from email.mime.text import MIMEText
import psycopg2

NOTIFY_EMAIL = 'rgklients@mail.ru'

ALLOWED_STATUSES = ('new', 'called', 'no_answer', 'refused', 'bought')


def send_sms_notification(name: str, phone: str, car: str) -> None:
    """Отправляет SMS о новой заявке на номер SMS_NOTIFY_PHONE через сервис sms.ru"""
    api_id = os.environ.get('SMSRU_API_ID')
    to = os.environ.get('SMS_NOTIFY_PHONE')
    if not api_id or not to:
        print('SMS DEBUG: SMSRU_API_ID or SMS_NOTIFY_PHONE is not set')
        return

    try:
        car_part = f', {car}' if car else ''
        text = f'Новая заявка: {name}, {phone}{car_part}'[:200]
        params = urllib.parse.urlencode({
            'api_id': api_id,
            'to': to,
            'msg': text,
            'json': 1,
        })
        req = urllib.request.Request(f'https://sms.ru/sms/send?{params}')
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
        print(f'SMS DEBUG: response status={data.get("status")} code={data.get("status_code")}')
        if data.get('status') != 'OK':
            print(f'SMS DEBUG: error text={data.get("status_text")}')
    except Exception as e:
        print(f'SMS DEBUG: exception occurred: {type(e).__name__}: {e}')


def send_email_notification(name: str, phone: str, car: str, source: str) -> None:
    """Отправляет уведомление о новой заявке на email NOTIFY_EMAIL через SMTP Mail.ru"""
    login = os.environ.get('SMTP_EMAIL')
    password = os.environ.get('SMTP_APP_PASSWORD')
    if not login or not password:
        print('EMAIL DEBUG: SMTP_EMAIL or SMTP_APP_PASSWORD is not set')
        return

    try:
        text = (
            'Новая заявка с сайта rlogistik.ru!\n\n'
            f'Имя: {name}\n'
            f'Телефон: {phone}\n'
            f'Автомобиль: {car or "не указан"}\n'
            f'Источник: {source}'
        )
        msg = MIMEText(text, 'plain', 'utf-8')
        msg['Subject'] = f'Новая заявка с сайта: {name}'
        msg['From'] = login
        msg['To'] = NOTIFY_EMAIL

        with smtplib.SMTP_SSL('smtp.mail.ru', 465, timeout=15) as server:
            server.login(login, password)
            server.sendmail(login, [NOTIFY_EMAIL], msg.as_string())
        print(f'EMAIL DEBUG: notification sent to {NOTIFY_EMAIL}')
    except Exception as e:
        print(f'EMAIL DEBUG: exception occurred: {type(e).__name__}: {e}')


def cors_headers() -> dict:
    return {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }


def handler(event: dict, context) -> dict:
    """Прием заявок с сайта, выдача списка для админки и обновление статуса/заметки заявки
    Args: event с httpMethod, body, headers, queryStringParameters; context с request_id
    Returns: HTTP response dict
    """
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
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

        send_email_notification(name, phone, car, source)
        send_sms_notification(name, phone, car)

        return {
            'statusCode': 200,
            'headers': cors_headers(),
            'body': json.dumps({'success': True, 'id': new_id})
        }

    headers = event.get('headers', {})
    admin_password = headers.get('X-Admin-Password') or headers.get('x-admin-password')

    if admin_password != os.environ.get('ADMIN_PASSWORD'):
        cur.close()
        conn.close()
        return {
            'statusCode': 401,
            'headers': cors_headers(),
            'body': json.dumps({'error': 'Неверный пароль'})
        }

    if method == 'PATCH':
        body = json.loads(event.get('body', '{}'))
        lead_id = body.get('id')
        status = body.get('status')
        note = body.get('note')

        if not isinstance(lead_id, int):
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': cors_headers(),
                'body': json.dumps({'error': 'Некорректный id заявки'})
            }

        if status is not None:
            if status not in ALLOWED_STATUSES:
                cur.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': cors_headers(),
                    'body': json.dumps({'error': 'Недопустимый статус'})
                }
            cur.execute(
                "UPDATE leads SET status = %s, status_updated_at = NOW() WHERE id = %s",
                (status, lead_id)
            )

        if note is not None:
            cur.execute(
                "UPDATE leads SET note = %s WHERE id = %s",
                (str(note)[:2000], lead_id)
            )

        conn.commit()
        cur.close()
        conn.close()

        return {
            'statusCode': 200,
            'headers': cors_headers(),
            'body': json.dumps({'success': True})
        }

    if method == 'GET':
        cur.execute(
            "SELECT id, name, phone, car, source, created_at, status, note, status_updated_at "
            "FROM leads ORDER BY created_at DESC"
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
                'created_at': r[5].isoformat() if r[5] else None,
                'status': r[6] or 'new',
                'note': r[7] or '',
                'status_updated_at': r[8].isoformat() if r[8] else None
            }
            for r in rows
        ]

        return {
            'statusCode': 200,
            'headers': cors_headers(),
            'body': json.dumps({'leads': leads})
        }

    cur.close()
    conn.close()
    return {
        'statusCode': 405,
        'headers': cors_headers(),
        'body': json.dumps({'error': 'Method not allowed'})
    }
