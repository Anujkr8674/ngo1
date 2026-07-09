import urllib.request
import re

req = urllib.request.Request('https://live4help.org/students/', headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    match = re.search(r'class=[\"\'\s].*?entry-content.*?[\"\'].*?>(.*?)</div', html, re.DOTALL | re.IGNORECASE)
    if match:
        content = match.group(1)
        content_stripped = re.sub(r'<.*?>', ' ', content).strip()
        print('Found entry content:', content_stripped)
    else:
        print('No entry-content found.')
except Exception as e:
    print('Error:', e)
