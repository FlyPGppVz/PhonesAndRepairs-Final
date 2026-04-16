const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    // Regex más agresivo para capturar cualquier botón de WhatsApp antiguo
    const whatsappRegex = /<a[\s\S]*?href="https:\/\/api\.whatsapp\.com\/send\/\?phone=13136268888[\s\S]*?<\/a>/g;
    const serviceAreaRegex = /<a[\s\S]*?aria-label="Service Area"[\s\S]*?<\/a>/g;
    
    let newContent = content.replace(whatsappRegex, '');
    newContent = newContent.replace(serviceAreaRegex, '');
    
    if (content !== newContent) {
        fs.writeFileSync(f, newContent);
        console.log(`Cleaned: ${f}`);
    }
});
