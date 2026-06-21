filepath = "app/page.tsx"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

replacements = [
    (
        '<section className="py-20 px-6 md:px-12 border-y border-foreground/5 bg-[#FFF6ED]">\n <div className="max-w-7xl mx-auto">',
        '<section className="py-8 px-6 md:px-12 border-y border-foreground/5 bg-white">\n <div className="max-w-7xl mx-auto bg-[#FFF6ED] rounded-[3rem] p-8 md:p-16 border border-foreground/5">'
    ),
    (
        '<section className="py-24 px-6 md:px-12 text-center bg-[#F5FAF5]">\n <div className="max-w-4xl mx-auto flex flex-col gap-8 items-center">',
        '<section className="py-8 px-6 md:px-12 text-center bg-white">\n <div className="max-w-5xl mx-auto bg-[#F5FAF5] rounded-[3rem] p-8 md:p-16 flex flex-col gap-8 items-center border border-foreground/5">'
    ),
    (
        '<section className="py-24 px-6 md:px-12 bg-[#FDF8F5]">\n <div className="max-w-7xl mx-auto flex flex-col gap-16">',
        '<section className="py-8 px-6 md:px-12 bg-white">\n <div className="max-w-7xl mx-auto bg-[#FDF8F5] rounded-[3rem] p-8 md:p-16 flex flex-col gap-12 border border-foreground/5">'
    ),
    (
        '<section className="py-24 px-6 md:px-12 overflow-hidden bg-[#F6F7FA]">\n <div className="max-w-7xl mx-auto flex flex-col gap-16">',
        '<section className="py-8 px-6 md:px-12 overflow-hidden bg-white">\n <div className="max-w-7xl mx-auto bg-[#F6F7FA] rounded-[3rem] p-8 md:p-16 flex flex-col gap-12 border border-foreground/5">'
    ),
    (
        '<section className="py-24 px-6 md:px-12 bg-[#FFFDF0]">\n <div className="max-w-7xl mx-auto flex flex-col gap-16">',
        '<section className="py-8 px-6 md:px-12 bg-white">\n <div className="max-w-7xl mx-auto bg-[#FFFDF0] rounded-[3rem] p-8 md:p-16 flex flex-col gap-12 border border-foreground/5">'
    ),
    (
        '<section className="py-24 px-6 md:px-12 bg-[#F9F5FA]">\n <div className="max-w-7xl mx-auto flex flex-col gap-16">',
        '<section className="py-8 px-6 md:px-12 bg-white">\n <div className="max-w-7xl mx-auto bg-[#F9F5FA] rounded-[3rem] p-8 md:p-16 flex flex-col gap-12 border border-foreground/5">'
    ),
    (
        '<section className="py-24 px-6 md:px-12 pb-32 bg-[#F2FAFA]">\n <Card className="max-w-7xl mx-auto p-12 md:p-20 rounded-[3rem] border-white/80 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">',
        '<section className="py-8 px-6 md:px-12 pb-24 bg-white">\n <div className="max-w-7xl mx-auto bg-[#F2FAFA] rounded-[3rem] p-8 md:p-16 border border-foreground/5 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">'
    ),
    (
        '<section className="py-24 px-6 md:px-12 bg-[#F2FAFA]">\n <Card className="max-w-7xl mx-auto p-12 md:p-20 rounded-[3rem] border-white/80 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">',
        '<section className="py-8 px-6 md:px-12 pb-24 bg-white">\n <div className="max-w-7xl mx-auto bg-[#F2FAFA] rounded-[3rem] p-8 md:p-16 border border-foreground/5 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">'
    )
]

for old, new in replacements:
    if old in content:
        content = content.replace(old, new)
    else:
        print(f"COULD NOT FIND:\n{old}\n")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done updating section containers.")
