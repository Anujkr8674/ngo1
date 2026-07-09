import os
import glob
import re

pages = glob.glob('app/**/page.tsx', recursive=True)
count = 0

for page in pages:
    with open(page, 'r', encoding='utf-8') as f:
        content = f.read()

    # We want to match className="text-sm sm:text-base md:text-lg text-white/... max-w-2xl..."
    # We only want to add the glass classes if they are not already there.
    
    # We can split by lines and replace
    lines = content.split('\n')
    changed = False
    
    # Track if we are inside the first 200 lines (hero section)
    for i, line in enumerate(lines):
        if i > 250:
            break
        if 'className="text-sm sm:text-base md:text-lg text-white/' in line and 'bg-black/40' not in line:
            # We want to insert 'bg-black/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 '
            new_line = line.replace(
                'className="', 
                'className="bg-black/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 '
            )
            lines[i] = new_line
            changed = True
            break # Only the first one, which is the hero!
            
    if changed:
        with open(page, 'w', encoding='utf-8') as f:
            f.write('\n'.join(lines))
        count += 1
        print('Updated', page)

print('Total files updated:', count)
