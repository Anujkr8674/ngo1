filepath = "app/page.tsx"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace p-8 md:p-16 with py-8 px-4 md:py-16 md:px-8
content = content.replace("p-8 md:p-16", "py-8 px-4 md:py-16 md:px-8")

# Replace p-12 md:p-20 with py-12 px-6 md:py-20 md:px-10
content = content.replace("p-12 md:p-20", "py-12 px-6 md:py-20 md:px-10")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Padding reduced on left and right.")
