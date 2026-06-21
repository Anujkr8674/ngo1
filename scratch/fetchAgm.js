const fs = require('fs');

async function fetchAgm() {
  try {
    const res = await fetch('https://live4help.org/agm/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });
    const html = await res.text();
    fs.writeFileSync('scratch/agm_html.txt', html);
    console.log('Saved to scratch/agm_html.txt. Length:', html.length);
    
    // Find PDF URLs
    const pdfMatches = html.match(/href="([^"]+\.pdf)"/gi);
    if (pdfMatches) {
        console.log("Found PDFs:", pdfMatches.map(m => m.replace(/href="|"/g, '')));
    } else {
        console.log("No PDFs found");
    }
  } catch (err) {
    console.error('Error fetching:', err);
  }
}
fetchAgm();
