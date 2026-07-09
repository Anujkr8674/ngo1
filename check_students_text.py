import urllib.request
import re

req = urllib.request.Request('https://live4help.org/students/', headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    match = re.search(r'Supporting Over 100 Students', html)
    if match:
        start = max(0, match.start() - 500)
        end = min(len(html), match.end() + 2000)
        print("Found text context:\n")
        print(html[start:end])
    else:
        print('Not found')
except Exception as e:
    print('Error:', e)
