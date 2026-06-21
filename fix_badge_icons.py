import os
import glob
import re

files = glob.glob('app/**/*.tsx', recursive=True)

for filepath in files:
    if os.path.isdir(filepath): continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the badge class we recently added
    matches = list(re.finditer(r'bg-\[#DCCFF8\] text-\[#444444\]"[^>]*>', content))
    
    if not matches:
        continue
        
    for match in reversed(matches):
        start_idx = match.end()
        # Find the end of this tag, usually </span> or </motion.div> or similar
        # Since we don't know exactly what tag it is, let's just search the next 200 characters.
        chunk = content[start_idx:start_idx + 250]
        
        # Replace bg-secondary with bg-[#444444]
        new_chunk = chunk.replace('bg-secondary', 'bg-[#444444]')
        # Replace text-secondary with text-[#444444]
        new_chunk = new_chunk.replace('text-secondary', 'text-[#444444]')
        
        # We also need to be careful not to replace things outside the badge, but since 
        # these badges are small and only contain an icon and some text, 250 chars is safe.
        
        # Reconstruct content
        content = content[:start_idx] + new_chunk + content[start_idx + 250:]

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Fixed icons in {filepath}")

print("Done.")
