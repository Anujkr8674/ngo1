const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, 'scraped_pages');
const blogFiles = [
  {
    file: 'turning-purpose-into-lasting-impact-through-human-connection-a-journey-of-collective-action.html',
    slug: 'turning-purpose-into-lasting-impact-through-human-connection-a-journey-of-collective-action',
    date: '2026-06-01',
    author: 'Admin'
  },
  {
    file: 'restoring-coastal-resilience-through-csr-mangrove-plantation-initiative-in-sundarban-west-bengal.html',
    slug: 'restoring-coastal-resilience-through-csr-mangrove-plantation-initiative-in-sundarban-west-bengal',
    date: '2026-06-01',
    author: 'Admin'
  },
  {
    file: '%f0%9f%8e%93-a-defining-milestone-in-our-journey-supporting-over-100-students-through-education.html',
    slug: 'supporting-over-100-students-through-education',
    date: '2026-04-10',
    author: 'Admin'
  },
  {
    file: 'breaking-silence-building-awareness-live4help-foundations-cancer-awareness-programme-at-darjeeling-hills-university-w-b.html',
    slug: 'cancer-awareness-programme-at-darjeeling-hills-university-w-b',
    date: '2026-03-24',
    author: 'Admin'
  },
  {
    file: 'live4help-foundation-organizes-community-medical-camp-at-ashapur-tea-garden-naxalbari-darjeeling-west-bengal.html',
    slug: 'community-medical-camp-at-ashapur-tea-garden-naxalbari-darjeeling',
    date: '2026-03-21',
    author: 'Admin'
  }
];

const compiledBlogs = [];

blogFiles.forEach(b => {
  const htmlPath = path.join(rootDir, b.file);
  if (!fs.existsSync(htmlPath)) {
    console.error(`File not found: ${b.file}`);
    return;
  }
  
  const html = fs.readFileSync(htmlPath, 'utf-8');
  
  // Extract Title
  const titleMatch = html.match(/<h1[^>]*class="[^"]*entry-title[^"]*"[^>]*>([\s\S]*?)<\/h1>/i) 
                     || html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';

  // Extract Content paragraphs from body. We want text within post body.
  // Standard WordPress content is inside class="entry-content" or class="post-content"
  let contentHtml = '';
  const entryContentMatch = html.match(/<div class="entry-content[^"]*">([\s\S]*?)<\/div>\s*<!-- \.entry-content -->/i)
                           || html.match(/<div class="entry-content[^"]*">([\s\S]*?)<\/div>/i)
                           || html.match(/<div class="wpb_wrapper">([\s\S]*?)<\/div>/i);
  
  if (entryContentMatch) {
    contentHtml = entryContentMatch[1];
  } else {
    contentHtml = html;
  }

  // Extract paragraphs
  const pRegex = /<p>([\s\S]*?)<\/p>/gi;
  let pMatch;
  const paragraphs = [];
  while ((pMatch = pRegex.exec(contentHtml)) !== null) {
    let text = pMatch[1].replace(/<[^>]+>/g, '').trim();
    text = text
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&#8217;/g, "'")
      .replace(/&#8211;/g, "–")
      .replace(/&#038;/g, "&")
      .replace(/\s+/g, ' ');
    if (text.length > 5 && !text.includes('Save my name') && !text.includes('Leave a Reply')) {
      paragraphs.push(text);
    }
  }

  // Extract subheadings (H2, H3)
  const hRegex = /<(h2|h3)[^>]*>([\s\S]*?)<\/\1>/gi;
  let hMatch;
  const subheadings = [];
  while ((hMatch = hRegex.exec(contentHtml)) !== null) {
    let text = hMatch[2].replace(/<[^>]+>/g, '').trim();
    text = text
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&#8217;/g, "'")
      .replace(/&#8211;/g, "–")
      .replace(/&#038;/g, "&");
    if (text.length > 3 && !text.includes('Leave a Reply') && !text.includes('Recent') && !text.includes('Categories')) {
      subheadings.push({ level: hMatch[1], text });
    }
  }

  // Extract Images
  const imgRegex = /<img[^>]+src="([^"]+)"/gi;
  let imgMatch;
  const images = [];
  while ((imgMatch = imgRegex.exec(contentHtml)) !== null) {
    const src = imgMatch[1];
    if (src && !src.includes('L4HLOGO') && !src.includes('avatar') && !src.includes('wp-emoji') && !src.endsWith('.svg')) {
      images.push(src);
    }
  }

  // If entryContentMatch fails, let's fall back to paragraphs extracted from the whole file but filtered
  if (paragraphs.length === 0) {
    // try to extract from whole body
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    const bodyHtml = bodyMatch ? bodyMatch[1] : html;
    const fallbackRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
    while ((pMatch = fallbackRegex.exec(bodyHtml)) !== null) {
      let text = pMatch[1].replace(/<[^>]+>/g, '').trim();
      text = text
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&#8217;/g, "'")
        .replace(/&#8211;/g, "–")
        .replace(/\s+/g, ' ');
      if (text.length > 15 && !text.includes('Save my name') && !text.includes('Leave a Reply') && !text.includes('Quick Links') && !text.includes('Get in Touch')) {
        paragraphs.push(text);
      }
    }
  }

  compiledBlogs.push({
    title: title.replace(/&#8217;/g, "'").replace(/&#8211;/g, "–").replace(/&amp;/g, "&").replace(/&#038;/g, "&").trim(),
    slug: b.slug,
    date: b.date,
    author: b.author,
    paragraphs,
    subheadings,
    images: Array.from(new Set(images))
  });
});

// Create app/data if it doesn't exist
const dataDir = path.join(__dirname, 'app', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

fs.writeFileSync(path.join(dataDir, 'blogs.json'), JSON.stringify(compiledBlogs, null, 2), 'utf-8');
console.log(`Successfully compiled ${compiledBlogs.length} blogs into app/data/blogs.json`);
