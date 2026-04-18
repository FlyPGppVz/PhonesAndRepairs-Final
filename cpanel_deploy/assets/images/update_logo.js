const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/Usuario/Desktop/Nuevo_tema/PhonesAndRepairs-Final';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let count = 0;
files.forEach(file => {
    const flPath = path.join(dir, file);
    let content = fs.readFileSync(flPath, 'utf8');
    
    // The logo src
    const longLogoUrl = "https://lh3.googleusercontent.com/aida/ADBb0ugoPYVqY6imupbG-s4AkZ2GwxaHNLoflGuNsXHymH3BB8mMZJQU_OraF8FMYuMg1N41NW2KltmC6WcnnMN903EK4LP3u0Stoz3YxCei7gHyCWUlcxR_52YdWa9yTD5p5Uk_Xc_QnwC6Mohce4D4nQ3_k996Bn3vttsyqc_6G_w1W-b5lDDKVN5Rg9C0au11pxVNAP0ROTLFeNgGNwzJ_sPbJA0pUG5cN64JSKKdeG_C4cVhxOHidPO2fSDTWK5zcGqJ48-FR5gnsQ";
    
    if (content.includes(longLogoUrl)) {
        content = content.replace(longLogoUrl, "./assets/images/logo-transparent.png");
        fs.writeFileSync(flPath, content);
        count++;
    }
});

console.log(`Updated logo URL in ${count} files.`);
