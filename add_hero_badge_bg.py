import os
import glob
import re

files = glob.glob('app/**/*.tsx', recursive=True)

for filepath in files:
    if os.path.isdir(filepath): continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # We want to target the Hero badge class.
    # Typically contains: 'px-4 py-1.5 rounded-full text-xs uppercase tracking-widest'
    # We will find this specific string, and then replace the text colors.
    
    # Let's find any class string containing `px-4 py-1.5 rounded-full text-xs uppercase tracking-widest`
    # Or similarly ordered. Let's just find the entire class string for the badge.
    # The badge is usually inside the Hero section. It has `uppercase tracking-widest` and `rounded-full`.
    
    # Regex to find the className string containing `uppercase tracking-widest` and `rounded-full` within the first 3000 chars.
    match = re.search(r'className="([^"]*uppercase tracking-widest[^"]*rounded-full[^"]*)"', content)
    if not match:
        match = re.search(r'className="([^"]*rounded-full[^"]*uppercase tracking-widest[^"]*)"', content)
    
    if match and match.start() < 3000:
        original_class = match.group(1)
        
        # Remove any existing text-white/* or text-white
        new_class = re.sub(r'\btext-white(?:/\d+)?\b', '', original_class)
        # Add the new background and text color
        new_class = new_class.strip() + ' bg-[#DCCFF8] text-[#444444]'
        
        content = content[:match.start(1)] + new_class + content[match.end(1):]
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

print("Done.")
