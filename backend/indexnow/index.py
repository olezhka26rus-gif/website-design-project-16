import json
import os
import re
import urllib.request

HOST = 'rlogistik.ru'
KEY = 'aa30d62686700a3f46086a2eb11d5f64'
KEY_LOCATION = f'https://{HOST}/{KEY}.txt'
SITEMAP_URL = f'https://{HOST}/sitemap.xml'
INDEXNOW_ENDPOINT = 'https://yandex.com/indexnow'


def extract_urls_from_sitemap() -> list:
    """Скачивает актуальный sitemap.xml с сайта и извлекает все <loc> адреса"""
    with urllib.request.urlopen(SITEMAP_URL, timeout=15) as resp:
        content = resp.read().decode('utf-8')
    return re.findall(r'<loc>(.*?)</loc>', content)


def submit_urls(urls: list) -> dict:
    """Отправляет список URL в Яндекс через протокол IndexNow"""
    payload = {
        'host': HOST,
        'key': KEY,
        'keyLocation': KEY_LOCATION,
        'urlList': urls,
    }
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(
        INDEXNOW_ENDPOINT,
        data=data,
        headers={'Content-Type': 'application/json; charset=utf-8'},
        method='POST',
    )
    with urllib.request.urlopen(req, timeout=15) as resp:
        status = resp.status
        body = resp.read().decode('utf-8', errors='ignore')
    return {'status': status, 'body': body}


def handler(event: dict, context) -> dict:
    """Отправляет URL сайта в Яндекс через протокол IndexNow для ускоренной индексации.
    Args: event с httpMethod, body (опционально JSON с полем "urls" — список конкретных ссылок)
    Returns: HTTP response dict с результатом отправки
    """
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    if method not in ('GET', 'POST'):
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'}),
        }

    admin_password = None
    headers = event.get('headers', {})
    admin_password = headers.get('X-Admin-Password') or headers.get('x-admin-password')
    if admin_password != os.environ.get('ADMIN_PASSWORD'):
        return {
            'statusCode': 401,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Неверный пароль'}),
        }

    custom_urls = None
    if method == 'POST':
        body = json.loads(event.get('body') or '{}')
        custom_urls = body.get('urls')

    urls = custom_urls if custom_urls else extract_urls_from_sitemap()

    try:
        result = submit_urls(urls)
        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({
                'success': True,
                'submitted_count': len(urls),
                'indexnow_status': result['status'],
                'indexnow_response': result['body'],
            }),
        }
    except Exception as e:
        return {
            'statusCode': 502,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'success': False, 'error': str(e)}),
        }