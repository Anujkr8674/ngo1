import os

path = r"d:\My Project\Shakti project\ngo1\app\components\Navbar.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace xl:flex with lg:flex for Desktop Navigation Links
content = content.replace(
    'className="hidden xl:flex items-center gap-1"',
    'className="hidden lg:flex items-center gap-0.5 xl:gap-1"'
)

# Replace xl:flex with lg:flex for Donate CTA button
content = content.replace(
    'className="hidden xl:flex items-center"',
    'className="hidden lg:flex items-center"'
)

# Replace xl:hidden with lg:hidden for Mobile Hamburger Button
content = content.replace(
    'className="xl:hidden p-2 rounded-full hover:bg-foreground/5 transition-colors text-foreground"',
    'className="lg:hidden p-2 rounded-full hover:bg-foreground/5 transition-colors text-foreground"'
)

# Reduce padding on links slightly for lg screens to prevent wrapping
content = content.replace(
    'className={`relative px-4 py-2',
    'className={`relative px-2.5 xl:px-4 py-2'
)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("Navbar breakpoints updated.")
