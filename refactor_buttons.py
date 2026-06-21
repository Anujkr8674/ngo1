import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Find all <button ... > tags
    # and replace the class names
    
    def repl(m):
        full_tag = m.group(0)
        # Check if it has className
        if 'className="' in full_tag:
            def class_repl(cm):
                class_str = cm.group(1)
                # Only apply to buttons that look like CTA buttons (having px- and py- or p-3)
                if 'px-' in class_str or 'py-' in class_str or 'p-3' in class_str or 'p-4' in class_str:
                    # Exclude the hamburger menu button specifically
                    if 'lg:hidden' in class_str and 'p-2' in class_str:
                        return cm.group(0)
                        
                    c = class_str
                    c = re.sub(r'\bbg-white\b', 'bg-primary', c)
                    c = re.sub(r'\bbg-foreground\b', 'bg-primary', c)
                    c = re.sub(r'\btext-white\b', 'text-foreground', c)
                    c = re.sub(r'\btext-slate-900\b', 'text-foreground', c)
                    c = re.sub(r'hover:bg-\[\#2c2c2c\]', 'hover:bg-[#b8daff]', c)
                    c = re.sub(r'hover:\s*border border-foreground/5', '', c)
                    c = re.sub(r'\bborder border-foreground/5\b', '', c)
                    c = re.sub(r'\bborder border-transparent\b', '', c)
                    # If hover:bg-[#b8daff] is missing, we could add it but let's just make sure it has bg-primary and text-foreground
                    return f'className="{c}"'
                return cm.group(0)
            
            new_tag = re.sub(r'className="([^"]*)"', class_repl, full_tag)
            return new_tag
        return full_tag

    # Match <button ... >
    # including multiline tags
    new_content = re.sub(r'<button[^>]*>', repl, content)
    
    # Also we might have motion.button
    new_content = re.sub(r'<motion\.button[^>]*>', repl, new_content)

    if new_content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated: {filepath}")

for root, dirs, files in os.walk('app'):
    for file in files:
        if file.endswith('.tsx'):
            process_file(os.path.join(root, file))
