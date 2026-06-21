import os
import glob

app_dir = r"d:\My Project\Shakti project\ngo1\app"
files = glob.glob(os.path.join(app_dir, "**", "page.tsx"), recursive=True)

old_box_str1 = "bg-black/10 p-8 sm:p-12 md:p-16 rounded-[2.5rem] border border-white/60 shadow-premium"
old_box_str2 = "bg-black/10 p-8 sm:p-12 md:p-16 rounded-[2.5rem] border border-white/60 shadow-premium text-center flex flex-col items-center gap-6"

count = 0
for file in files:
    with open(file, "r", encoding="utf-8") as f:
        content = f.read()
    
    modified = False
    
    # Remove the inner floating box padding and background
    if old_box_str1 in content:
        content = content.replace(old_box_str1, "w-full")
        modified = True
    
    # Add a slight dark overlay to the entire hero background to keep text legible
    if 'bg-[#FCFCFA]/10' in content:
        content = content.replace('bg-[#FCFCFA]/10', 'bg-black/20')
        modified = True
        
    if modified:
        with open(file, "w", encoding="utf-8") as f:
            f.write(content)
        count += 1
        print(f"Updated {file}")

print(f"Total updated: {count}")
