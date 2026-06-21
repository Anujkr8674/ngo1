import os

files_to_update = [
    r"d:\My Project\Shakti project\ngo1\app\page.tsx",
    r"d:\My Project\Shakti project\ngo1\app\blog\[slug]\page.tsx",
    r"d:\My Project\Shakti project\ngo1\app\blog\page.tsx"
]

for path in files_to_update:
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    
    new_content = content.replace("group-hover:text-secondary", "group-hover:text-blue-600")
    
    if content != new_content:
        with open(path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Updated {path}")
