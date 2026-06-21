import os
import glob
import re

app_dir = r"d:\My Project\Shakti project\ngo1\app"
files = glob.glob(os.path.join(app_dir, "**", "*.tsx"), recursive=True)

# Classes to remove to reset backgrounds to default
bg_classes = [
    r"bg-gradient-pastel-mesh",
    r"bg-gradient-editorial",
    r"bg-gradient-soft-blue",
    r"bg-gradient-soft-purple",
    r"bg-gradient-accent-soft",
    r"bg-white/\d+",
    r"bg-transparent",
    r"bg-foreground/\d+",
    r"bg-primary/\d+",
    r"bg-secondary/\d+",
    r"bg-accent/\d+",
]

# We should not touch bg-white, bg-black, bg-primary, etc. if they don't have opacity, 
# except for the gradients which we explicitly match.
# Wait, let's keep bg-black/20 (hero overlay) and bg-white (navbar) safe.
# bg_classes regex will match the specified classes and remove them.

pattern = re.compile(r'\b(' + '|'.join(bg_classes) + r')\b')

count = 0
for file in files:
    with open(file, "r", encoding="utf-8") as f:
        content = f.read()
    
    # We want to skip replacing bg-secondary/40 inside Navbar as it's active menu color 
    # But wait, user said "all the bg clr and make it by default", maybe they don't mean the active menu?
    # I'll manually preserve Navbar's active menu if needed, or just exclude Navbar.tsx
    if "Navbar.tsx" in file:
        # Only remove bg-gradient-pastel-mesh just in case, but keep others safe
        pass
    else:
        new_content = pattern.sub('', content)
        # Clean up any double spaces left behind
        new_content = re.sub(r' +', ' ', new_content)
        new_content = new_content.replace('className=" "', 'className=""')
        
        if new_content != content:
            with open(file, "w", encoding="utf-8") as f:
                f.write(new_content)
            count += 1
            print(f"Updated {file}")

print(f"Total updated: {count}")
