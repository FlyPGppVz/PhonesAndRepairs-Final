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
    //  #1. Selector Lógico de Capacidad de Almacenamiento (Storage)
    // -----------------------------------------------------------
    const storageButtons = document.querySelectorAll('.storage-btn');
    const priceDisplay = document.querySelector('.product-price');
    
    storageButtons.forEach(btn => {
        // ¿Qué hace?: Inyecta un listener por cada botón "128gb", "256gb", etc., en la pantalla.
        btn.addEventListener('click', () => {
            
            // a) Limpieza de hermanos (Reset)
            // Lógica: Restablecer todos los botones a la vista "Apagado/Base"
            const parent = btn.parentElement;
            parent.querySelectorAll('.storage-btn').forEach(b => {
                b.classList.remove('bg-primary-container', 'text-on-primary-container', 'ring-1', 'ring-primary', 'border-primary');
                b.classList.add('bg-surface-container-lowest', 'text-on-surface', 'border-outline-variant');
            });
            
            // b) Activación del botón clickeado
            // Lógica: Asignarle propiedades "Activo" (Aros en css o highlights visuales)
            btn.classList.remove('bg-surface-container-lowest', 'text-on-surface', 'border-outline-variant');
            btn.classList.add('bg-primary-container', 'text-on-primary-container', 'ring-1', 'ring-primary', 'border-primary');
            
            // c) Actualización de Precios (Data Layer binding)
            // ¿Para qué sirve?: Reemplazar en la web dinámicamente el HTML que muestra los dólares del producto
            // si el componente trae un atributo `data-price`.
            if (btn.dataset.price && priceDisplay) {
                priceDisplay.textContent = btn.dataset.price;
            }
        });
    });

    // -----------------------------------------------------------
    //  #2. Selector UI de Colores (Apple-Style Switcher)
    // -----------------------------------------------------------
    const colorButtons = document.querySelectorAll('.color-btn');
    const mainProductImage = document.querySelector('.product-main-image');
    
    colorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
             
            // a) Desmarcar el color previamente elegido en la botonera 
            // ¿Para qué sirve?: Evitar que dos colores luzcan 'seleccionados' visualmente al mismo tiempo.
            const container = btn.parentElement;
            container.querySelectorAll('.color-btn').forEach(b => {
                b.style.outline = 'none';
                b.classList.remove('active-color');
            });
            
            // b) Aplicar anillo activo azul al botón nuevo seleccionado
            btn.classList.add('active-color');
            btn.style.outline = '2px solid #063183';
            btn.style.outlineOffset = '3px';

            // c) Intercambio dinámico de Imágen Central (Fade In / Fade Out Effect)
            // Lógica: Recupera lo inyectado en `data-image="xxx.jpg"` dentro del div que tocamos 
            // e intercambia la ruta de la etiqueta global <img>.
            const newImage = btn.getAttribute('data-image') || btn.dataset.image;
            if (mainProductImage && newImage) {
                // Generamos una microtransición estéticamente más sofisticada con time-outs.
                mainProductImage.style.opacity = '0.4';
                setTimeout(() => {
                    mainProductImage.src = newImage;
                    mainProductImage.style.opacity = '1';
                }, 150);
            }

            // d) Actualizar Texto Adicional
            // Lógica: Reemplaza opcionalmente el indicador textual de "Titanium" o "Blue".
            const colorLabel = document.querySelector('.color-label');
            if (colorLabel && btn.getAttribute('aria-label')) {
                colorLabel.textContent = btn.getAttribute('aria-label');
            }
        });
    });

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

    // Diagnóstico silencioso para QA (Útil a futuro)
    console.log("C&R App & Global Logic successfully initialized.");
});
