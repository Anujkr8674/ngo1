import urllib.request
import re
import sys
import json

urls = [
    'https://live4help.org/terms-conditions/',
    'https://live4help.org/disclaimer/',
    'https://live4help.org/refund-cancellation-policy/'
]

results = {}

for url in urls:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
        # find the main article or entry-content
        match = re.search(r'class=[\"\'\s].*?entry-content.*?[\"\'].*?>(.*?)</(div|article|main)>', html, re.DOTALL | re.IGNORECASE)
        if not match:
            # try finding within wpb_wrapper
            match = re.search(r'class="wpb_wrapper">(.*?)(</div>|</section>)', html, re.DOTALL | re.IGNORECASE)
        
        if match:
            content = match.group(1)
            # Remove scripts and styles
            content = re.sub(r'<script.*?>.*?</script>', '', content, flags=re.DOTALL | re.IGNORECASE)
            content = re.sub(r'<style.*?>.*?</style>', '', content, flags=re.DOTALL | re.IGNORECASE)
            # Extract paragraphs and headers
            tags = re.findall(r'<(p|h[1-6]|ul|li).*?>(.*?)</\1>', content, flags=re.DOTALL | re.IGNORECASE)
            text_lines = []
            for tag in tags:
                text = re.sub(r'<.*?>', ' ', tag[1]).strip()
                if text:
                    text_lines.append(text)
            results[url] = "\n\n".join(text_lines)
        else:
            # fallback: just get all p tags
            tags = re.findall(r'<p.*?>(.*?)</p>', html, flags=re.DOTALL | re.IGNORECASE)
            text_lines = []
            for tag in tags:
                text = re.sub(r'<.*?>', ' ', tag).strip()
                if text and 'live4help.org' in text.lower() or len(text) > 50:
                    text_lines.append(text)
            results[url] = "\n\n".join(text_lines)
            
    except Exception as e:
        results[url] = f"Error: {e}"

with open('legal_content.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, indent=2, ensure_ascii=False)
print("Done")
