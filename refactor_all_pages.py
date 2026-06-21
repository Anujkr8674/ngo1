import os
import glob
import re

files = [
    'app/about/page.tsx',
    'app/blog/page.tsx',
    'app/blog/[slug]/page.tsx',
    'app/contact/page.tsx',
    'app/donate/page.tsx',
    'app/gallery/page.tsx',
    'app/get-help/page.tsx',
    'app/impact/page.tsx',
    'app/initiatives/page.tsx',
    'app/transparency/page.tsx',
    'app/volunteer/page.tsx'
]

colors = [
    "bg-[#FFF6ED]",  # Light Peach
    "bg-[#F5FAF5]",  # Light Mint
    "bg-[#FDF8F5]",  # Light Blush
    "bg-[#F6F7FA]",  # Light Slate
    "bg-[#FFFDF0]",  # Light Cream
    "bg-[#F9F5FA]",  # Light Lavender
    "bg-[#F2FAFA]"   # Light Cyan
]

for filepath in files:
    if not os.path.exists(filepath):
        continue
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Split by '<section'
    chunks = content.split('<section')
    if len(chunks) <= 2:
        # Only hero section or no section, skip
        continue
        
    new_content = chunks[0]
    new_content += '<section' + chunks[1] # Keep hero section untouched
    
    color_idx = 0
    for chunk in chunks[2:]:
        # Find the end of the section tag
        end_idx = chunk.find('>')
        if end_idx == -1:
            new_content += '<section' + chunk
            continue
            
        section_tag = chunk[:end_idx]
        rest = chunk[end_idx:]
        
        # Replace section className
        # We need to find className="..."
        class_match = re.search(r'className="([^"]*)"', section_tag)
        if class_match:
            new_section_tag = section_tag[:class_match.start()] + 'className="py-8 px-6 md:px-12 bg-white pb-16"' + section_tag[class_match.end():]
        else:
            new_section_tag = section_tag + ' className="py-8 px-6 md:px-12 bg-white pb-16"'
            
        # Now find the first className=" in 'rest' to inject container classes
        first_class_match = re.search(r'className="([^"]*)"', rest)
        if first_class_match:
            container_classes = f"{colors[color_idx % len(colors)]} rounded-[3rem] py-8 px-4 md:py-16 md:px-8 border border-foreground/5 "
            color_idx += 1
            new_rest = rest[:first_class_match.start()] + f'className="{container_classes}' + rest[first_class_match.start() + 11:]
        else:
            new_rest = rest
            
        new_content += '<section' + new_section_tag + new_rest
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Refactored {filepath}")

print("Done refactoring all pages.")
