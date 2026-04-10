const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    
    // Replace container
    let containerOld = 'overflow-hidden w-9 group-hover:w-64 h-9 group-hover:h-10 cursor-pointer"';
    let containerNew = 'overflow-hidden w-9 group-hover:w-64 focus-within:w-64 h-9 group-hover:h-10 focus-within:h-10 focus-within:bg-slate-100/90 dark:focus-within:bg-slate-800/90 focus-within:border-slate-200/50 dark:focus-within:border-slate-700/50 cursor-pointer"';
    
    // Replace input opacity
    let inputOld = 'opacity-0 group-hover:opacity-100 placeholder:text-slate-400';
    let inputNew = 'opacity-0 group-hover:opacity-100 focus:opacity-100 placeholder:text-slate-400';
    
    // Replace search icon color
    let iconOld = 'text-slate-600 dark:text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 text-[18px]';
    let iconNew = 'text-slate-600 dark:text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 text-[18px]';

    if (content.includes(containerOld)) {
        content = content.replace(containerOld, containerNew);
        content = content.replace(inputOld, inputNew);
        content = content.replace(iconOld, iconNew);
        fs.writeFileSync(f, content);
    }
});
console.log('Fixed search bar focus issues.');
