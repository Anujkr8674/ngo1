import re

colors = [
    "bg-[#FFF6ED]",  # Impact Statistics
    "bg-[#F5FAF5]",  # Mission Quote
    "bg-[#FDF8F5]",  # Focus Areas
    "bg-[#F6F7FA]",  # Video Testimonials
    "bg-[#FFFDF0]",  # Action Gallery
    "bg-[#F9F5FA]",  # Latest Activities
    "bg-[#F2FAFA]"   # Call to Action
]

filepath = "app/page.tsx"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# We want to replace `<section className="...` with `<section className="... bg-[#XXXXXX] `
# But only for the sections inside the main page content, not the Hero (which is the first section)
# Wait, the hero is `<section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden">`
# Let's just find all `<section` tags.
sections = re.finditer(r'<section\s+className="([^"]*)"', content)

new_content = ""
last_end = 0
color_idx = 0

for match in sections:
    new_content += content[last_end:match.start()]
    class_str = match.group(1)
    
    # Check if this is the Hero section (which has min-h-[90vh])
    if 'min-h-[90vh]' in class_str:
        new_content += f'<section className="{class_str}"'
    else:
        # Strip out any existing bg- white or transparent or other bg-[...] colors
        class_str = re.sub(r'\bbg-(?:white|transparent|\[\#[a-fA-F0-9]+\])\b', '', class_str)
        
        # Append the new color if we still have colors left
        if color_idx < len(colors):
            class_str = f"{class_str.strip()} {colors[color_idx]}"
            color_idx += 1
            
        new_content += f'<section className="{class_str}"'
    
    last_end = match.end()

new_content += content[last_end:]

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Updated {color_idx} sections with unique background colors.")
