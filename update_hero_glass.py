import os

app_dir = r"d:\My Project\Shakti project\ngo1\app"
for root, dirs, files in os.walk(app_dir):
    for file in files:
        if file.endswith(".tsx"):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8") as f:
                content = f.read()
            
            # The current classes we set previously:
            target = "glass-panel bg-[#FCFCFA]/30 backdrop-blur-md"
            if target in content:
                # Replace the light glass panel with a dark translucent panel
                new_classes = "bg-black/40 backdrop-blur-md"
                new_content = content.replace(target, new_classes)
                
                with open(path, "w", encoding="utf-8") as f:
                    f.write(new_content)
                print(f"Updated {path}")
