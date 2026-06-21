import os
import re

app_dir = r"d:\My Project\Shakti project\ngo1\app"

def process_file(path):
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    original_content = content

    def replacer(match):
        cls_str = match.group(1)
        
        is_card = False
        # Card criteria: padding, rounded corners, and some background
        if "rounded-" in cls_str and re.search(r'\bp-\d+\b', cls_str):
            if "glass-panel" in cls_str or "bg-white" in cls_str or "bg-gradient" in cls_str or "bg-primary" in cls_str:
                # Exclusions
                if not ("bg-black/40" in cls_str or "backdrop-blur-md" in cls_str or "aspect-" in cls_str or "w-10" in cls_str or "w-12" in cls_str or "w-16" in cls_str):
                    # Also exclude buttons if they somehow matched
                    if "text-xs font-semibold uppercase" not in cls_str:
                        is_card = True
                    
        if is_card and "hover:-translate-y-" not in cls_str:
            cls_str = cls_str.replace("transition-premium", "").replace("transition-all", "").replace("duration-300", "")
            cls_str = re.sub(r'hover:border-\S+', '', cls_str)
            cls_str = re.sub(r'hover:shadow-\S+', '', cls_str)
            
            cls_str = " ".join(cls_str.split())
            cls_str += " hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
            
        return f'className="{cls_str}"'

    new_content = re.sub(r'className="([^"]+)"', replacer, content)
    
    if new_content != original_content:
        with open(path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Updated cards in {path}")

for root, dirs, files in os.walk(app_dir):
    for file in files:
        if file.endswith(".tsx"):
            process_file(os.path.join(root, file))
