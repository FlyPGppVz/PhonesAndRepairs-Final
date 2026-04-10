const fs = require('fs');
const path = require('path');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

let modified = 0;
files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    if (!content.includes('id="mobileMenuBtn"')) {
        content = content.replace(
            '<div class="flex items-center gap-5">', 
            '<div class="flex items-center gap-5">\n<button class="lg:hidden material-symbols-outlined text-slate-600 dark:text-slate-400 text-2xl active:opacity-70 transition-opacity" id="mobileMenuBtn">menu</button>'
        );
        fs.writeFileSync(f, content);
        modified++;
    }
});
console.log('Modified', modified);
