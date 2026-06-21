import os

path = r"d:\My Project\Shakti project\ngo1\app\about\page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Vision, Mission, Values
content = content.replace(
    'className="p-8 rounded-3xl glass-panel shadow-soft border border-white/60 flex flex-col gap-6"',
    'className="p-8 rounded-3xl bg-white/80 backdrop-blur-md shadow-premium border border-white flex flex-col gap-6"'
)

# Founders
content = content.replace(
    'glass-panel border border-white/60 shadow-soft',
    'bg-white/80 backdrop-blur-md border border-white shadow-premium'
)

# Advisors
content = content.replace(
    'className="p-8 rounded-3xl glass-panel border border-white shadow-soft flex flex-col gap-6 hover:shadow-premium transition-premium"',
    'className="p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-white shadow-soft flex flex-col gap-6 hover:shadow-premium hover:-translate-y-2 transition-all duration-300"'
)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print(f"Updated {path}")
