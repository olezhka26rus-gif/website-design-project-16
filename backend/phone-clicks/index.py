import json
import os
import psycopg2

ALLOWED_DEVICES = ('mobile', 'desktop')


def cors_headers() -> dict:
    return {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }


def handler(event: dict, context) -> dict:
    """Учёт нажатий на номер телефона: приём события с сайта и выдача списка для админки
    Args: event с httpMethod, body, headers; context с request_id
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
        page = str(body.get('page', ''))[:500]
        place = str(body.get('place', ''))[:50]
        device = str(body.get('device', ''))
        if device not in ALLOWED_DEVICES:
            device = 'desktop'

        cur.execute(
            "INSERT INTO phone_clicks (page, place, device) VALUES (%s, %s, %s)",
            (page, place, device)
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
        headers = event.get('headers', {})
        pwd = headers.get('X-Admin-Password') or headers.get('x-admin-password')
        if pwd != os.environ.get('ADMIN_PASSWORD'):
            cur.close()
            conn.close()
            return {
                'statusCode': 401,
                'headers': cors_headers(),
                'body': json.dumps({'error': 'Неверный пароль'})
            }

        cur.execute(
            "SELECT id, page, place, device, created_at FROM phone_clicks "
            "ORDER BY created_at DESC LIMIT 300"
        )
        rows = cur.fetchall()

        cur.execute("SELECT COUNT(*) FROM phone_clicks WHERE created_at >= CURRENT_DATE")
        today = cur.fetchone()[0]

        cur.execute("SELECT COUNT(*) FROM phone_clicks WHERE created_at >= NOW() - INTERVAL '7 days'")
        week = cur.fetchone()[0]

        cur.execute("SELECT COUNT(*) FROM phone_clicks")
        total = cur.fetchone()[0]

        cur.close()
        conn.close()

        clicks = [
            {
                'id': r[0],
                'page': r[1] or '/',
                'place': r[2] or '',
                'device': r[3] or 'desktop',
                'created_at': r[4].isoformat() if r[4] else None
            }
            for r in rows
        ]

        return {
            'statusCode': 200,
            'headers': cors_headers(),
            'body': json.dumps({
                'clicks': clicks,
                'stats': {'today': today, 'week': week, 'total': total}
            })
        }

    cur.close()
    conn.close()
    return {
        'statusCode': 405,
        'headers': cors_headers(),
        'body': json.dumps({'error': 'Method not allowed'})
    }
