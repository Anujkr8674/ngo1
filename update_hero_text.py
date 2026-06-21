import os

app_dir = r"d:\My Project\Shakti project\ngo1\app"
for root, dirs, files in os.walk(app_dir):
    for file in files:
        if file.endswith(".tsx"):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8") as f:
                content = f.read()
            
            target = "glass-panel bg-[#FCFCFA]/30 backdrop-blur-md"
            if target in content:
                parts = content.split(target)
                if len(parts) == 2:
                    before = parts[0]
                    after_target = parts[1]
                    end_idx = after_target.find("</section>")
                    if end_idx != -1:
                        hero_block = after_target[:end_idx]
                        rest = after_target[end_idx:]
                        
                        hero_block = hero_block.replace("text-foreground", "text-white")
                        
                        new_content = before + target + hero_block + rest
                        with open(path, "w", encoding="utf-8") as f:
                            f.write(new_content)
                        print(f"Updated {path}")
