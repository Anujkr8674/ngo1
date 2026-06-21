import os

app_dir = r"d:\My Project\Shakti project\ngo1\app"
for root, dirs, files in os.walk(app_dir):
    for file in files:
        if file.endswith(".tsx"):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8") as f:
                content = f.read()
            if "bg-[#FCFCFA]/35" in content or "bg-[#FCFCFA]/30" in content:
                new_content = content.replace("bg-[#FCFCFA]/35", "bg-[#FCFCFA]/10").replace("bg-[#FCFCFA]/30", "bg-[#FCFCFA]/10")
                with open(path, "w", encoding="utf-8") as f:
                    f.write(new_content)
                print(f"Updated {path}")
