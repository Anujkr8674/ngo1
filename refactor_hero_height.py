import os
import glob

pages = glob.glob("app/**/page.tsx", recursive=True)

for p in pages:
    with open(p, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Only modify if it has a hero section with the background image pattern or similar
    # In other pages, hero sections use min-h-[50vh] or min-h-[60vh]
    if "min-h-[50vh]" in content or "min-h-[60vh]" in content or "min-h-[40vh]" in content:
        content = content.replace("min-h-[50vh]", "min-h-[90vh]")
        content = content.replace("min-h-[60vh]", "min-h-[90vh]")
        content = content.replace("min-h-[40vh]", "min-h-[90vh]")
        
        with open(p, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated hero height in {p}")
