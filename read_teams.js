const fs = require('fs');
const path = require('path');

const teamsHtml = fs.readFileSync(path.join(__dirname, 'scraped_pages', 'teams.html'), 'utf-8');

// Let's find Tarun Maiti and K G Verma in the text
const lines = teamsHtml.split('\n');
lines.forEach((line, index) => {
  if (line.includes('Tarun') || line.includes('Verma') || line.includes('Gautam') || line.includes('Mandal')) {
    console.log(`Line ${index}: ${line.trim()}`);
    // print 5 lines before and 5 lines after
    for (let i = -4; i <= 6; i++) {
      if (lines[index + i]) {
        console.log(`  [${i}]: ${lines[index + i].trim()}`);
      }
    }
  }
});
