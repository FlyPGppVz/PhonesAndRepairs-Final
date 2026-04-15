/**
 * # ARCHIVO: js/main.js
 * # PROPÓSITO GENERAL: Archivo principal de Lógica Global para interacciones sueltas transversales
 *   en todo el portal de CellphonesAndRepair (ej: menús, buscadores, y personalizadores de productos).
 */

// # EJECUCIÓN PRINCIPAL DE DOM
// ¿Qué hace?: Se asegura de que el documento HTML (DOM) haya terminado de cargar completamente antes de inicializar la app.
// ¿Para qué sirve?: Evita errores de tipo "Cannot read properties of null" al intentar acceder a elementos visuales que aún no existen en pantalla por una carga lenta.
document.addEventListener('DOMContentLoaded', () => {

    /* =======================================================================================================
     * # FUNCIONALIDAD DE CAJA BÚSQUEDA (SEARCH BAR GLOBAL)
     * ======================================================================================================= */
    
    // # VARIABLES LOCALES (Elementos)
    // ¿Qué hace?: Toma una referencia en memoria al input textual del buscador de productos en la barra de navegación.
    // Clean Code: La búsqueda DOM (get) es una operación pesada, la guardamos aquí 1 vez (DOM Caching).
    const searchInput = document.getElementById('navSearchInput');

    if (searchInput) {
        // ¿Qué hace?: Lee la URL actual de la ventana y extrae los parámetros 'search='.
        // ¿Para qué sirve?: Para que si el usuario recarga la página, vea aún reflejada la frase que buscó recién.
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('search');
        if (searchQuery) {
            searchInput.value = searchQuery;
        }

        // # LISTENER DE TECLADO
        // ¿Qué hace?: Escucha cada pulsación del teclado para capturar la tecla "Enter".
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                // Si la búsqueda no está vacía, redirige al usuario construyendo la URL segura (encodeURIComponent)
                // ¿Para qué sirve?: Nos traslada virtualmente al catálogo de "shop-fully-connected.html" ya pre-filtrado.
                if (query) {
                    window.location.href = `shop-fully-connected.html?search=${encodeURIComponent(query)}`;
                } else {
                    window.location.href = 'shop-fully-connected.html';
                }
            }
        });
    }

    /* =======================================================================================================
     * # AUTO-INYECCIÓN PARALELA DE WIDGET DE CHAT (PERFORMANCE Y Z-INDEX)
     * ======================================================================================================= */
    
    // ¿Qué hace?: Crea un elemento <script> de forma programática apuntando a 'chatbot.js' 
    // y lo añade al cuerpo del html al final del flujo principal.
    // ¿Para qué sirve?: Para liberar los flujos paralelos del DOM, acelerando la carga visual de la página
    // y para forzar explícitamente a su renderización z-[2147483647] al último momento sin interrupciones.
    const chatbotScript = document.createElement('script');
    chatbotScript.src = './js/chatbot.js';
    document.body.appendChild(chatbotScript);


    /* =======================================================================================================
     * # MANEJADORES DE VISTA DE PRODUCTOS (E-COMMERCE DETAIL PAGES)
     * ======================================================================================================= */

    // -----------------------------------------------------------
    //  #1. Selector Lógico de Almacenamiento y Precios (Unificado)
    // -----------------------------------------------------------
    const storageButtons = document.querySelectorAll('.storage-btn');
    const priceDisplay = document.querySelector('.product-price');
    
    if (storageButtons.length > 0 && priceDisplay) {
        storageButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // 1. Update active state (Main logic)
                storageButtons.forEach(b => {
                    b.classList.remove('bg-primary-container', 'text-on-primary-container', 'ring-1', 'ring-primary', 'border-primary', 'ring-2', 'active-storage');
                    b.classList.add('bg-surface-container-lowest', 'text-on-surface', 'border', 'border-outline-variant/20');
                    
                    // Specific logic for Ipad style buttons with inner span
                    const span = b.querySelector('.font-bold');
                    if (span) {
                        span.classList.remove('text-on-primary-container');
                        span.classList.add('text-on-surface');
                    }
                });
                
                btn.classList.remove('bg-surface-container-lowest', 'text-on-surface', 'border', 'border-outline-variant/20');
                btn.classList.add('bg-primary-container', 'text-on-primary-container', 'ring-2', 'ring-primary', 'border-primary', 'active-storage');
                
                const activeSpan = btn.querySelector('.font-bold');
                if (activeSpan) {
                    activeSpan.classList.add('text-on-primary-container');
                    activeSpan.classList.remove('text-on-surface');
                }

                // 2. Dynamic Price Update with Fade effect
                const newPrice = btn.getAttribute('data-price') || btn.dataset.price;
                if (newPrice) {
                    priceDisplay.style.opacity = '0';
                    priceDisplay.style.transform = 'translateY(5px)';
                    setTimeout(() => {
                        priceDisplay.textContent = newPrice;
                        priceDisplay.style.opacity = '1';
                        priceDisplay.style.transform = 'translateY(0)';
                    }, 150);
                }
            });
        });
    }

    // -----------------------------------------------------------
    //  #2. Selector UI de Colores (Apple-Style Switcher)
    // -----------------------------------------------------------
    const colorButtons = document.querySelectorAll('.color-btn');
    const mainProductImage = document.querySelector('.product-main-image');
    
    if (colorButtons.length > 0 && mainProductImage) {
        // Preload color images for instant switching
        colorButtons.forEach(btn => {
            const imgUrl = btn.dataset.image || btn.getAttribute('data-image');
            if (imgUrl) {
                const img = new Image();
                img.src = imgUrl;
            }
        });

        colorButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const newImage = btn.getAttribute('data-image') || btn.dataset.image;
                if (!newImage || mainProductImage.src.includes(newImage)) return;

                // Apple-style premium transition
                mainProductImage.style.opacity = '0.4';
                mainProductImage.style.transform = 'scale(0.98)';
                
                const img = new Image();
                img.onload = () => {
                    mainProductImage.src = newImage;
                    mainProductImage.style.opacity = '1';
                    mainProductImage.style.transform = 'scale(1)';
                };
                img.src = newImage;

                // Update UI selection
                colorButtons.forEach(b => {
                    b.classList.remove('active-color', 'ring-primary');
                    b.style.outline = 'none';
                });
                
                btn.classList.add('active-color');
                btn.style.outline = '2px solid #063183';
                btn.style.outlineOffset = '3px';

                // Update text label if present
                const colorLabel = document.querySelector('.color-label');
                if (colorLabel && btn.getAttribute('aria-label')) {
                    colorLabel.textContent = btn.getAttribute('aria-label');
                }
            });
        });
    }

    // -----------------------------------------------------------
    //  #3. Theme Toggle Logic (Dark/Light Mode)
    // -----------------------------------------------------------
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            // Alternar clase .dark en el root (html)
            const isDark = document.documentElement.classList.toggle('dark');
            
            // Guardar preferencia en localStorage
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            // Log para debug (opcional)
            console.log(`Theme switched to: ${isDark ? 'dark' : 'light'}`);
        });
    }

    // -----------------------------------------------------------
    //  #4. Dynamic Mobile Menu Injection & Logic
    // -----------------------------------------------------------
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    if (mobileMenuBtn) {
        // Create Mobile Menu Overlay dynamically if it doesn't exist
        if (!document.getElementById('mobileMenuOverlay')) {
            const overlay = document.createElement('div');
            overlay.id = 'mobileMenuOverlay';
            overlay.className = 'fixed inset-0 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-2xl z-[100] transform transition-transform duration-500 translate-x-full pointer-events-none flex flex-col p-8';
            overlay.innerHTML = `
                <div class="flex justify-between items-center mb-12">
                    <img src="./assets/images/logo-transparent.png" class="h-10 w-auto object-contain dark:invert" alt="Logo">
                    <button id="closeMobileMenu" class="material-symbols-outlined text-3xl text-slate-600 dark:text-slate-400">close</button>
                </div>
                <nav class="flex flex-col gap-8">
                    <a href="./index.html" class="text-3xl font-bold text-slate-900 dark:text-white hover:text-blue-500 transition-colors">Home</a>
                    <a href="./shop-fully-connected.html" class="text-3xl font-bold text-slate-900 dark:text-white hover:text-blue-500 transition-colors">Shop</a>
                    <a href="./services-unified-nav.html" class="text-3xl font-bold text-slate-900 dark:text-white hover:text-blue-500 transition-colors">Services</a>
                    <a href="./contact-unified-nav.html" class="text-3xl font-bold text-slate-900 dark:text-white hover:text-blue-500 transition-colors">Contact</a>
                    <a href="./about-us-unified-nav.html" class="text-3xl font-bold text-slate-900 dark:text-white hover:text-blue-500 transition-colors">About Us</a>
                </nav>
                <div class="mt-auto pt-10 border-t border-slate-200 dark:border-slate-800">
                    <p class="text-sm text-slate-500 dark:text-slate-400 font-medium">© 2024 CellphonesAndRepair</p>
                </div>
            `;
            document.body.appendChild(overlay);

            const closeBtn = document.getElementById('closeMobileMenu');
            
            const toggleMenu = (open) => {
                if (open) {
                    overlay.classList.remove('translate-x-full', 'pointer-events-none');
                    overlay.classList.add('pointer-events-auto');
                    document.body.style.overflow = 'hidden';
                } else {
                    overlay.classList.add('translate-x-full', 'pointer-events-none');
                    overlay.classList.remove('pointer-events-auto');
                    document.body.style.overflow = '';
                }
            };

            mobileMenuBtn.addEventListener('click', () => toggleMenu(true));
            closeBtn.addEventListener('click', () => toggleMenu(false));
            
            // Close on link click
            overlay.querySelectorAll('nav a').forEach(link => {
                link.addEventListener('click', () => toggleMenu(false));
            });
        }
    }

    // Diagnóstico silencioso para QA (Útil a futuro)
    console.log("C&R App & Global Logic successfully initialized.");
});
