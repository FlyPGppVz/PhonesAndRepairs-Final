/**
 * # ARCHIVO: add_mobile_menu.js
 * # TIPO: Script Node.js de automatización local (Backend Development Script).
 * # PROPÓSITO: Operar una inyección masiva automatizada de código HTML a través del sistema de archivos `.html`.
 */

// # LIBRERÍAS DE SISTEMA (Módulos Core Node)
// ¿Qué hace?: Llama a librerías file-system y resoluciones de ruta.
const fs = require('fs');
const path = require('path');

// # CAPTURA DE ÁRBOL DE DIRECTORIO
// ¿Qué hace?: Rastrea todos los archivos del directorio actual finalizados con .html
// ¿Para qué sirve?: Armar un arreglo maestro para mutarlos de forma masiva en lote (batch upload).
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

// # REGISTRO ESTADÍSTICO
let modified = 0;

// # MOTOR DE REEMPLAZO BATCH (DOM INJECTION EN TEXTO PLANO)
// ¿Qué hace?: Lee cada archivo HTML e inyecta sintaxis rígida en zonas no parcheadas.
// Lógica Clean Code: Busca una etiqueta ancla conocida `<div class="flex items-center gap-5">` y si no halla el `id="mobileMenuBtn"`, inyecta el botón hamburguesa dentro.
files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    
    // Verificación de integridad: Evita inyecciones duplicadas
    if (!content.includes('id="mobileMenuBtn"')) {
        content = content.replace(
            '<div class="flex items-center gap-5">', 
            // Botón de menú hamburguesa con UI Mobile adaptativa (se oculta en pantallas lg)
            '<div class="flex items-center gap-5">\n<button class="lg:hidden material-symbols-outlined text-slate-600 dark:text-slate-400 text-2xl active:opacity-70 transition-opacity" id="mobileMenuBtn">menu</button>'
        );
        // Aplica el commit destructivo final
        fs.writeFileSync(f, content);
        modified++;
    }
});

// Consola Log final de auditoría
console.log('Modified HTML files to include mobile menu:', modified);
