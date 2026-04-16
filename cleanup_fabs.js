const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let modified = 0;

// Patrones de bloques a eliminar (incluyendo comentarios y saltos de línea)
const patterns = [
    /<!-- WhatsApp FAB -->[\s\S]*?<a[\s\S]*?aria-label="Chat on WhatsApp"[\s\S]*?<\/a>/g,
    /<!-- Animated Service Area FAB -->[\s\S]*?<a[\s\S]*?aria-label="Service Area"[\s\S]*?<\/a>/g,
    /<!-- FAB for quick action - positioned above chatbot widget -->/g
];

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    let original = content;

    patterns.forEach(p => {
        content = content.replace(p, '');
    });

    if (content !== original) {
        fs.writeFileSync(f, content);
        modified++;
    }
});

console.log(`Successfully cleaned up FABs from ${modified} HTML files.`);
