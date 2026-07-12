import json
import os
import psycopg2


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

