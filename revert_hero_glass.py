import os
import glob

pages = glob.glob('app/**/page.tsx', recursive=True)
count = 0
for page in pages:
    with open(page, 'r', encoding='utf-8') as f:
        content = f.read()
    
    target = '<div className="w-full text-center flex flex-col items-center gap-6 bg-black/40 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] border border-white/20 shadow-premium">'
    replacement = '<div className="w-full text-center flex flex-col items-center gap-6">'
    
    if target in content:
        content = content.replace(target, replacement)
        with open(page, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1
        print('Reverted', page)

print('Total files reverted:', count)
