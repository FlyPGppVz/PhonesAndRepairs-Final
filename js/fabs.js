/**
 * # ARCHIVO: js/fabs.js
 * # PROPÓSITO: Inyectar y gestionar el dock de botones flotantes (WhatsApp y Service) 
 * # POSICIONAMIENTO: Bottom-Left (Izquierda) para evitar interferencias con el flujo principal.
 */

class FabsManager {
    constructor() {
        this.container = null;
        this.init();
    }

    init() {
        if (document.getElementById('cr-fabs-container')) return;
        this.renderDock();
    }

    renderDock() {
        // Crear el contenedor principal para el dock de botones
        this.container = document.createElement('div');
        this.container.id = 'cr-fabs-container';
        this.container.className = 'fixed bottom-24 right-6 z-[50000] flex flex-col items-end gap-4 pointer-events-none';
        
        // Botón WhatsApp
        const whatsappFab = this.createFab({
            id: 'fab-whatsapp',
            label: 'Chat on WhatsApp',
            href: 'https://api.whatsapp.com/send/?phone=13136268888&text&type=phone_number&app_absent=0',
            bg: 'bg-[#25D366]',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/></svg>`,
            delay: '0.2s'
        });

        // Botón Service
        const serviceFab = this.createFab({
            id: 'fab-service',
            label: 'Service Area',
            href: './services-unified-nav.html',
            bg: 'bg-gradient-to-tr from-primary to-blue-500',
            icon: `<span class="material-symbols-outlined">support_agent</span>`,
            delay: '0.4s',
            expandable: true
        });

        this.container.appendChild(whatsappFab);
        this.container.appendChild(serviceFab);
        document.body.appendChild(this.container);
    }

    createFab({ id, label, href, bg, icon, delay, expandable }) {
        const a = document.createElement('a');
        a.href = href;
        if (href.startsWith('http')) a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.id = id;
        a.className = 'group relative pointer-events-auto animate-fade-in-up';
        a.style.animationDelay = delay;
        a.setAttribute('aria-label', label);

        const content = `
            <div class="relative ${bg} text-white ${expandable ? 'p-3 rounded-full' : 'w-12 h-12 flex-shrink-0 rounded-full'} shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 pointer-events-auto">
                <div class="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping pointer-events-none"></div>
                ${expandable ? `<span class="max-w-0 overflow-hidden group-hover:max-w-[150px] transition-all duration-500 ease-out font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 pl-1 text-sm">${label}</span>` : ''}
                ${icon}
            </div>
        `;
        
        a.innerHTML = content;
        return a;
    }
}

// Inicialización
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new FabsManager());
} else {
    new FabsManager();
}
