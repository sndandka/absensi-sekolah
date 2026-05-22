const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// replace <div class="tw"> with <div class="tw resp-table">
html = html.replace(/<div class="tw">/g, '<div class="tw resp-table">');

fs.writeFileSync('index.html', html);
console.log('Done!');
