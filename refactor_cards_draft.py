import os
import glob
import re

app_dir = r"d:\My Project\Shakti project\ngo1\app"
files = glob.glob(os.path.join(app_dir, "**", "page.tsx"), recursive=True)

card_class_snippet = r"(glass-panel\s+)?(border\s+border-[^\s]+\s+)?(shadow-soft\s+)?hover:-translate-y-2\s+hover:border-primary\s+hover:shadow-premium\s+transition-all\s+duration-300"

count = 0
for file in files:
    with open(file, "r", encoding="utf-8") as f:
        content = f.read()

    # Find if there are any matches
    if not re.search(card_class_snippet, content):
        continue

    # Determine relative path for import
    rel_path = os.path.relpath(file, app_dir)
    depth = rel_path.count(os.sep)
    if depth == 0:
        import_path = "./components/Card"
    else:
        import_path = "../" * depth + "components/Card"

    # Add import statement if not exists
    if "import { Card" not in content and "import { MotionCard" not in content:
        # Find the last import
        import_end = 0
        for match in re.finditer(r'^import .*?;$', content, re.MULTILINE):
            import_end = match.end()
        
        if import_end > 0:
            content = content[:import_end] + f'\nimport {{ Card, MotionCard }} from "{import_path}";' + content[import_end:]
        else:
            content = f'import {{ Card, MotionCard }} from "{import_path}";\n' + content

    # Now we need to replace the tags and remove the duplicate classes.
    # We will use regex to find <div ... className="..." ...> where className contains the snippet.
    
    # We have different tags: <div, <motion.div, <article
    # We will replace them manually by finding the tags
    
    def replacer(match):
        tag_start = match.group(1) # e.g. "div" or "motion.div" or "article"
        attrs = match.group(2)
        classes = match.group(3)
        
        # Remove the card_class_snippet from classes
        new_classes = re.sub(card_class_snippet, "", classes).strip()
        # Clean up double spaces
        new_classes = re.sub(r'\s+', ' ', new_classes)
        
        # Determine new tag
        if "motion.div" in tag_start:
            new_tag = "MotionCard"
            as_prop = ""
        elif "article" in tag_start:
            new_tag = "Card"
            as_prop = ' as="article"'
        else:
            new_tag = "Card"
            as_prop = ""
            
        return f"<{new_tag}{as_prop} {attrs} className=\"{new_classes}\"".replace("  ", " ")

    # We match <tag ... className="..." ...>
    # Note: Regex parsing HTML/JSX is generally flaky, but works for simple predictable formats.
    # Pattern: <(div|motion\.div|article)([^>]*?)className="([^"]*?hover:-translate-y-2[^"]*?)"
    
    pattern = r'<(div|motion\.div|article)([^>]*?)className="([^"]*?hover:-translate-y-2[^"]*?)"'
    
    new_content = re.sub(pattern, replacer, content)
    
    # Also need to replace the closing tags.
    # This is tricky because of nested divs.
    # Actually, a better approach since we just want to replace classes and use components is:
    # Use generic search/replace for <div to <Card if we know it has the class.
    # But closing tags </div -> </Card> is hard without a proper parser.
    pass

