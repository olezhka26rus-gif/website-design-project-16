import json
import os
import smtplib
from email.mime.text import MIMEText
import psycopg2

NOTIFY_EMAIL = 'rgklients@mail.ru'


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

        send_email_notification(name, phone, car, source)

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