const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

let totalFixed = 0;

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    
    // Regex to match script tags with any spacing or single/double quotes
    const mainRegex = /<script\s+src=["']\.\/js\/main\.js["']>\s*<\/script>/gi;
    const cartRegex = /<script\s+src=["']\.\/js\/cart\.js["']>\s*<\/script>/gi;
    
    const mainMatches = content.match(mainRegex) || [];
    const cartMatches = content.match(cartRegex) || [];

    if (mainMatches.length > 1 || cartMatches.length > 1) {
        console.log(`Fixing duplicates in ${f}...`);
        
        // Remove ALL occurrences
        let newContent = content.replace(mainRegex, '').replace(cartRegex, '');
        
        // Re-insert exactly once before </body>
        const mainTag = '<script src="./js/main.js"></script>';
        const cartTag = '<script src="./js/cart.js"></script>';
        
        const bodyCloseIndex = newContent.lastIndexOf('</body>');
        if (bodyCloseIndex !== -1) {
            newContent = newContent.substring(0, bodyCloseIndex) + 
                         cartTag + mainTag + '\n' +
                         newContent.substring(bodyCloseIndex);
        } else {
            newContent += '\n' + cartTag + mainTag;
        }
        
        fs.writeFileSync(f, newContent);
        totalFixed++;
    }
});

console.log(`Done! Cleaned up scripts in ${totalFixed} files.`);
