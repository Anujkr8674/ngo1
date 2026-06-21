import os
import glob

app_dir = r"d:\My Project\Shakti project\ngo1\app"
files = glob.glob(os.path.join(app_dir, "**", "page.tsx"), recursive=True)

old_str = "bg-black/20 backdrop-blur-sm"
new_str = "bg-black/10"

count = 0
for file in files:
    with open(file, "r", encoding="utf-8") as f:
        content = f.read()
    
    if old_str in content:
        content = content.replace(old_str, new_str)
        with open(file, "w", encoding="utf-8") as f:
            f.write(content)
        count += 1
        print(f"Updated {file}")

print(f"Total updated: {count}")
