const fs = require('fs');
const path = 'c:/Users/Flypg/Desktop/Nuevo_tema/PhonesAndRepairs-Final/admin-panel.html';
let content = fs.readFileSync(path, 'utf8');

let newFunc = "        function generateProductPage(template, data) {\n";
newFunc += "            let html = template;\n";
newFunc += "            html = html.replace(/<title>.*?<\\/title>/, '<title>' + data.title + ' | Cellphones & Repairs</title>');\n";
newFunc += "            html = html.replace(/<h1 class=\"text-5xl md:text-7xl font-bold leading-tight mb-4 tracking-tighter italic\">.*?<\\/h1>/, '<h1 class=\"text-5xl md:text-7xl font-bold leading-tight mb-4 tracking-tighter italic\">' + data.marketingTitle + '</h1>');\n";
newFunc += "            html = html.replace(/<p class=\"text-xl md:text-2xl text-on-surface-variant mb-12 max-w-2xl font-light\">.*?<\\/p>/, '<p class=\"text-xl md:text-2xl text-on-surface-variant mb-12 max-w-2xl font-light\">' + data.marketingSubtitle + '</p>');\n";
newFunc += "            html = html.replace(/id=\"main-product-image\" class=\".*?\" src=\".*?\"/, 'id=\"main-product-image\" class=\"product-main-image max-w-full h-[70%] md:h-[80%] object-contain drop-shadow-2xl transition-all duration-500 scale-105\" src=\"' + data.images[0].replace('./assets/', '../assets/') + '\"');\n";
newFunc += "            const colorButtonsHtml = data.colors.map((col, idx) => '<button class=\"color-btn w-12 h-12 rounded-full border-2 border-transparent hover:border-blue-500 transition-all shadow-lg active:scale-95\" style=\"background-color: ' + col + ';\" data-color-name=\"Variant ' + (idx+1) + '\"></button>').join('');\n";
newFunc += "            html = html.replace(/<div class=\"flex items-center space-x-4 mb-8\">[\\s\\S]*?<\\/div>/, '<div class=\"flex items-center space-x-4 mb-8\">' + colorButtonsHtml + '</div>');\n";
newFunc += "            data.storage.forEach((item, idx) => {\n";
newFunc += "                const totalPrice = (data.price + item.extra).toLocaleString();\n";
newFunc += "                if(idx === 0) { html = html.replace(/>256GB<\\/button>/, '>' + item.label + '</button>'); html = html.replace(/data-price=\"\\\\$1,299\\.00\"/, 'data-price=\"$' + totalPrice + '\"'); }\n";
newFunc += "                if(idx === 1) { html = html.replace(/>512GB<\\/button>/, '>' + item.label + '</button>'); html = html.replace(/data-price=\"\\\\$1,499\\.00\"/, 'data-price=\"$' + totalPrice + '\"'); }\n";
newFunc += "                if(idx === 2) { html = html.replace(/>1TB<\\/button>/, '>' + item.label + '</button>'); html = html.replace(/data-price=\"\\\\$1,699\\.00\"/, 'data-price=\"$' + totalPrice + '\"'); }\n";
newFunc += "            });\n";
newFunc += "            html = html.replace(/<p class=\"text-on-surface text-sm font-medium\">Grade 5 Titanium enclosure with brushed obsidian texture.<\\/p>/, '<p class=\"text-on-surface text-sm font-medium\">' + data.specBuildIntegrity + '</p>');\n";
newFunc += "            const specsToMap = [\n";
newFunc += "                { id: 'specDisplay', label: '7.1-inch Super Retina XDR' },\n";
newFunc += "                { id: 'specBrightness', label: '2500 nits' },\n";
newFunc += "                { id: 'specRefresh', label: '120Hz' },\n";
newFunc += "                { id: 'specCamera', label: '48MP Main | 5x Optical Zoom' },\n";
newFunc += "                { id: 'specBattery', label: 'Up to 30 hours video playback.' }\n";
newFunc += "            ];\n";
newFunc += "            specsToMap.forEach(spec => {\n";
newFunc += "                const val = data[spec.id] ? data[spec.id].trim() : '';\n";
newFunc += "                if(!val) {\n";
newFunc += "                    const blockRegex = new RegExp('<div[^>]*>\\\\s*<label[^>]*>.*?' + spec.label.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&') + '.*?<\\\\/label>[^]*?<\\/div>', 'gi');\n";
newFunc += "                    html = html.replace(blockRegex, '');\n";
newFunc += "                } else {\n";
newFunc += "                    html = html.replace(new RegExp(spec.label.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&'), 'g'), val);\n";
newFunc += "                }\n";
newFunc += "            });\n";
newFunc += "            if(data.specRAM || data.specGPU || data.specStorage) {\n";
newFunc += "                let tech = '<div class=\"mt-8 p-10 bg-slate-50 border border-slate-200 rounded-[2.5rem] dark:bg-slate-900 border-none flex flex-col items-center\"><h4 class=\"text-[10px] font-bold uppercase tracking-[0.3em] text-blue-500 mb-8\">Internal Engineering</h4><div class=\"grid grid-cols-1 md:grid-cols-3 gap-10 w-full\">';\n";
newFunc += "                if(data.specRAM) tech += '<div class=\"text-center p-4 bg-white dark:bg-slate-800 rounded-3xl shadow-sm\"><p class=\"text-[9px] text-slate-400 uppercase font-bold mb-1 tracking-widest\">Memory</p><p class=\"text-xl font-bold\">' + data.specRAM + '</p></div>';\n";
newFunc += "                if(data.specGPU) tech += '<div class=\"text-center p-4 bg-white dark:bg-slate-800 rounded-3xl shadow-sm\"><p class=\"text-[9px] text-slate-400 uppercase font-bold mb-1 tracking-widest\">Graphics</p><p class=\"text-xl font-bold\">' + data.specGPU + '</p></div>';\n";
newFunc += "                if(data.specStorage) tech += '<div class=\"text-center p-4 bg-white dark:bg-slate-800 rounded-3xl shadow-sm\"><p class=\"text-[9px] text-slate-400 uppercase font-bold mb-1 tracking-widest\">Storage</p><p class=\"text-xl font-bold\">' + data.specStorage + '</p></div>';\n";
newFunc += "                tech += '</div></div>';\n";
newFunc += "                html = html.replace(/<section id=\"reviews\"/, tech + '<section id=\"reviews\"');\n";
newFunc += "            }\n";
newFunc += "            html = html.replace(/<h2 class=\"text-4xl font-bold tracking-tight mb-4\">.*?<\\/h2>/, '<h2 class=\"text-4xl font-bold tracking-tight mb-4\">' + data.marketingTitle + '</h2>');\n";
newFunc += "            html = html.replace(/<p class=\"text-on-surface-variant text-lg\">.*?<\\/p>/, '<p class=\"text-on-surface-variant text-lg\">' + data.marketingSubtitle + '</p>');\n";
newFunc += "            html = html.replace(/<h3 class=\"text-3xl font-bold mb-4\">.*?<\\/h3>/, '<h3 class=\"text-3xl font-bold mb-4\">' + data.specProcessor + '</h3>');\n";
newFunc += "            if(data.fillerImage) { html = html.replace(/<img class=\"absolute -bottom-10 -right-10 w-64 h-64 object-contain opacity-50\" .*? src=\".*?\"/, '<img class=\"absolute -bottom-10 -right-10 w-64 h-64 object-contain opacity-50\" src=\"' + data.fillerImage.replace('./assets/', '../assets/') + '\"/>'); }\n";
newFunc += "            html = html.replace(/<p class=\"text-sm font-bold\">Jonathan D.<\\/p>/, '<p class=\"text-sm font-bold\">' + (data.rev1Name || 'Admin') + '</p>');\n";
newFunc += "            html = html.replace(/<p class=\"text-on-surface-variant leading-relaxed text-sm\">The transition to titanium is incredible..*?<\\/p>/, '<p class=\"text-on-surface-variant leading-relaxed text-sm\">' + (data.rev1Comment || 'Masterful build.') + '</p>');\n";
newFunc += "            html = html.replace(/<p class=\"text-sm font-bold\">Sarah A.<\\/p>/, '<p class=\"text-sm font-bold\">' + (data.rev2Name || 'Expert Buyer') + '</p>');\n";
newFunc += "            html = html.replace(/<p class=\"text-on-surface-variant leading-relaxed text-sm\">The 5x optical zoom is finally where I need it to be.*?<\\/p>/, '<p class=\"text-on-surface-variant leading-relaxed text-sm\">' + (data.rev2Comment || 'State of the art.') + '</p>');\n";
newFunc += "            return html;\n";
newFunc += "        }";

const searchMarker = 'generateProductPage';
const startIndex = content.indexOf(searchMarker);

if (startIndex !== -1) {
    // Find the actual start of the line (function name is usually inside function keyword)
    let lineStart = content.lastIndexOf('function', startIndex);
    if(lineStart !== -1) {
        // Find function end
        let endMarker = 'return html;';
        let endIndex = content.indexOf(endMarker, startIndex);
        let closingBrace = content.indexOf('}', endIndex);
        const finalContent = content.substring(0, lineStart) + newFunc + content.substring(closingBrace + 1);
        fs.writeFileSync(path, finalContent);
        console.log('SUCCESS: Hardware engine active');
    } else { console.log('FAILED to find function keyword'); }
} else { console.log('FAILED to find generateProductPage'); }
