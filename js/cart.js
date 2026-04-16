/**
 * # ARCHIVO: js/cart.js
 * # PROPÓSITO GENERAL: Módulo E-Commerce (Guest-friendly).
 *   Provee todas las transacciones simuladas del carrito de compra en RAM y LocalStorage.
 * # PATRÓN DE DISEÑO: Módulo IIFE (Immediately Invoked Function Expression)
 *   ¿Para qué sirve?: Previene la contaminación del objeto 'window' global y crea propiedades privadas
 *   que no pueden ser interferidas o hackeadas fácilmente desde la consola del navegador.
 */

const Cart = (() => {

    // # CONSTANTES GLOBALES Y PRIVADAS
    // ¿Qué hace?: Definición matemática estática del ID con el cual se guardará la data en disco.
    const KEY = 'cr_cart';

    /* =======================================================================================================
     * # CAPA DE DATOS (DATA LAYER & STATE MANAGEMENT)
     * ======================================================================================================= */
    
    // ¿Qué hace?: Lee el carrito guardado localmente desde el disco duro del visitante.
    // ¿Para qué sirve?: Evita que el usuario pierda sus productos al refrescar F5 accidentalmente.
    function load() {
        try { 
            return JSON.parse(localStorage.getItem(KEY)) || []; 
        } catch { 
            return []; // Falla silenciosa y retorno en blanco con Clean Code (Evita bloquear el sitio).
        }
    }

    // ¿Qué hace?: Sobrescribe el almacenamiento con cadena plana generada desde JSON.
    // ¿Para qué sirve?: Activar la persistencia del estado modificado post-adición o borrado.
    function save(items) {
        localStorage.setItem(KEY, JSON.stringify(items));
    }

    // Exportadores Simples Privados (Getters limpios)
    function getItems() { return load(); }

    function getCount() {
        return load().reduce((sum, i) => sum + i.qty, 0);
    }

    function getSubtotal() {
        return load().reduce((sum, i) => sum + (parseFloat(i.price) * i.qty), 0);
    }

    // ¿Qué hace?: Añade producto estructurado (Objeto). Suma cantidades si ya existía.
    // ¿Para qué sirve?: Lógica central E-Commerce del Shopping Cart.
    function addItem(product) {
        // Estructura esperada: product = { id, name, subtitle, price, image }
        const items = load();
        const existing = items.find(i => i.id === product.id);
        
        if (existing) {
            existing.qty = Math.min(existing.qty + 1, 10); // Límite de compra anti-bugs a 10 unidades.
        } else {
            items.push({ ...product, qty: 1 });
        }
        
        save(items);
        dispatchChange();
    }

    // ¿Qué hace?: Lógica destructiva. Crea un array espejo y purga el ID objetivo.
    function removeItem(id) {
        save(load().filter(i => i.id !== id));
        dispatchChange();
    }

    // ¿Qué hace?: Mutación discreta de cantidad para controles con (+/-).
    function updateQty(id, qty) {
        const items = load();
        const item = items.find(i => i.id === id);
        if (item) {
            item.qty = Math.max(1, Math.min(qty, 10));
            save(items);
            dispatchChange();
        }
    }

    // ¿Qué hace?: Purga absoluta de elementos guardados.
    function clear() { 
        save([]); 
        dispatchChange(); 
    }

    // ¿Qué hace?: Inicia el proceso de pago real con Stripe vía Vercel Serverless API.
    async function checkout() {
        const items = getItems();
        if (items.length === 0) return;

        const btn = document.getElementById('cart-checkout-btn');
        const originalText = btn ? btn.innerHTML : 'Check Out';
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = `<span class="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span> Processing...`;
        }

        try {
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    cartItems: items.map(i => ({
                        id: i.id,
                        name: i.name,
                        price: i.price,
                        quantity: i.qty,
                        image: i.image
                    }))
                })
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error(data.error || 'Server error');
            }
        } catch (err) {
            console.error('Checkout error:', err);
            alert('Payment Error: ' + err.message);
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = originalText;
            }
        }
    }

    // ¿Qué hace?: Emite un pulso sonoro u onda (CustomEvent) a todo el Documento.
    // ¿Para qué sirve?: Avisa a toda la Interfaz Gráfica (UI) que los datos por detrás acaban de mutar, para forzar redibujos.
    function dispatchChange() {
        window.dispatchEvent(new CustomEvent('cart:updated'));
    }

    /* =======================================================================================================
     * # CAPA DE INTERFAZ DE USUARIO (VIEW & UI RENDERING)
     * ======================================================================================================= */

    // -----------------------------------------------------------
    //  #1. Dibujado de Mini Cesta (Dropdown Navbar superior)
    // -----------------------------------------------------------
    function renderNavDropdown() {
        // Cacheo visual temporal (DOM local logic)
        const dropdown = document.getElementById('nav-cart-dropdown');
        if (!dropdown) return; // Si la página actual no tiene barra de navegación con Dropdown, termina sin errores.

        const items = getItems();
        const count = getCount();

        // Sub-vista A: Carrito vacío visual
        if (items.length === 0) {
            dropdown.innerHTML = `
                <div class="flex flex-col items-center justify-center py-6 gap-3">
                    <span class="material-symbols-outlined text-slate-300 text-[48px]">shopping_bag</span>
                    <p class="text-[13px] font-semibold text-slate-500">Your bag is empty</p>
                    <p class="text-[11px] text-slate-400 text-center leading-relaxed">Looks like you haven't added<br>anything yet. Start exploring!</p>
                    <a href="./shop-fully-connected.html"
                       class="mt-2 block px-6 py-2.5 rounded-full bg-primary text-white text-[11px] font-bold hover:opacity-90 transition-all uppercase tracking-widest shadow-lg shadow-primary/20">
                        Shop Now
                    </a>
                </div>`;
            return;
        }

        // Sub-vista B: Carrito poblado con truncado inteligente (máximo 3 visibles)
        const itemsHtml = items.slice(0, 3).map(item => `
            <div class="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
                <img src="${item.image}" alt="${item.name}"
                     class="w-10 h-10 rounded-lg object-contain bg-slate-50 shrink-0">
                <div class="flex-1 min-w-0">
                    <p class="text-[12px] font-semibold text-slate-800 truncate">${item.name}</p>
                    <p class="text-[11px] text-slate-400">${item.subtitle || ''}</p>
                </div>
                <div class="text-right shrink-0">
                    <p class="text-[12px] font-bold text-slate-800">$${(parseFloat(item.price) * item.qty).toFixed(2)}</p>
                    <p class="text-[10px] text-slate-400">×${item.qty}</p>
                </div>
            </div>`).join('');

        const more = items.length > 3 ? `<p class="text-[11px] text-slate-400 text-center mt-1">+${items.length - 3} more item${items.length - 3 > 1 ? 's' : ''}</p>` : '';

        // Ensamblaje en tiempo real
        dropdown.innerHTML = `
            <div class="space-y-1 mb-3">${itemsHtml}</div>
            ${more}
            <div class="flex justify-between items-center pt-3 border-t border-slate-100 mb-3">
                <span class="text-[12px] font-semibold text-slate-500">Subtotal (${count} item${count !== 1 ? 's' : ''})</span>
                <span class="text-[14px] font-bold text-slate-900">$${getSubtotal().toFixed(2)}</span>
            </div>
            <a href="./shopping-cart-final-nav.html"
               class="block w-full py-3 text-center rounded-full bg-primary text-white text-[12px] font-bold hover:opacity-90 transition-all uppercase tracking-widest shadow-lg shadow-primary/20">
                View Bag &amp; Checkout
            </a>`;
    }

    // -----------------------------------------------------------
    //  #2. Lógica del Número rojo/indicador (Badge Numérico Superior)
    // -----------------------------------------------------------
    function updateBadge() {
        const badge = document.getElementById('nav-cart-badge');
        const count = getCount();
        if (!badge) return;
        
        if (count > 0) {
            badge.textContent = count > 9 ? '9+' : count;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }

    // -----------------------------------------------------------
    //  #3. Dibujado Dinámico de Pantalla Completa de Carrito (Checkout)
    // -----------------------------------------------------------
    function renderCartPage() {
        // Inicialización de identificadores que son tocados únicamente en pantallas e-commerce completas
        const container = document.getElementById('cart-items-container');
        const summarySubtotal = document.getElementById('cart-subtotal');
        const summaryTotal = document.getElementById('cart-total');
        const summaryTax = document.getElementById('cart-tax');
        const emptyState = document.getElementById('cart-empty-state');
        const summaryPanel = document.getElementById('cart-summary-panel');
        const checkoutBtn = document.getElementById('cart-checkout-btn');

        if (!container) return; // Validación Clean Code: si existimos fuera del carrito, abórtate limpiamente

        const items = getItems();
        const subtotal = getSubtotal();
        const tax = subtotal * 0.0825; // Lógica Financiera: Cálculo duro de impuesto MI de 8.25%
        const total = subtotal + tax;

        // Limpieza de renderizado si no hay piezas
        if (items.length === 0) {
            container.innerHTML = '';
            if (emptyState) emptyState.classList.remove('hidden');
            if (summaryPanel) summaryPanel.classList.add('opacity-50', 'pointer-events-none');
            if (summarySubtotal) summarySubtotal.textContent = '$0.00';
            if (summaryTax) summaryTax.textContent = '$0.00';
            if (summaryTotal) summaryTotal.textContent = '$0.00';
            return;
        }

        // Activaciones si hay piezas de compra detectadas en caché interactiva
        if (emptyState) emptyState.classList.add('hidden');
        if (summaryPanel) summaryPanel.classList.remove('opacity-50', 'pointer-events-none');

        // Renderizado del objeto global en Plantilla Literaria (Templating ES6)
        container.innerHTML = items.map(item => `
            <div class="bg-surface-container-lowest rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-center md:items-start group"
                 data-id="${item.id}">
                <div class="w-40 h-40 bg-surface-container-low rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                    <img src="${item.image}" alt="${item.name}"
                         class="w-full h-full object-contain scale-90 group-hover:scale-100 transition-transform duration-500">
                </div>
                <div class="flex-grow space-y-4">
                    <div class="flex justify-between items-start">
                        <div>
                            <h2 class="text-[1.5rem] font-semibold text-on-background leading-tight">${item.name}</h2>
                            <p class="text-on-surface-variant text-sm mt-1">${item.subtitle || ''}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-lg font-bold text-on-background">$${(parseFloat(item.price) * item.qty).toFixed(2)}</p>
                            <p class="text-xs text-on-surface-variant">$${parseFloat(item.price).toFixed(2)} each</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-6 pt-2">
                        <div class="flex items-center bg-surface-container-high rounded-full px-4 py-1 gap-4">
                            <!-- Inyección funcional limpia de los controladores + y - apuntando al módulo público -->
                            <button onclick="Cart.updateQty('${item.id}', ${item.qty - 1})"
                                    class="p-1 hover:text-primary transition-colors">
                                <span class="material-symbols-outlined text-sm">remove</span>
                            </button>
                            <span class="text-sm font-medium w-6 text-center">${item.qty}</span>
                            <button onclick="Cart.updateQty('${item.id}', ${item.qty + 1})"
                                    class="p-1 hover:text-primary transition-colors">
                                <span class="material-symbols-outlined text-sm">add</span>
                            </button>
                        </div>
                        <button onclick="Cart.removeItem('${item.id}')"
                                class="text-sm text-red-500 font-medium hover:underline underline-offset-4 transition-all flex items-center gap-1">
                            <span class="material-symbols-outlined text-base">delete</span> Remove
                        </button>
                    </div>
                </div>
            </div>`).join('');

        if (summarySubtotal) summarySubtotal.textContent = `$${subtotal.toFixed(2)}`;
        if (summaryTax) summaryTax.textContent = `$${tax.toFixed(2)}`;
        if (summaryTotal) summaryTotal.textContent = `$${total.toFixed(2)}`;

        if (checkoutBtn) {
            checkoutBtn.onclick = (e) => {
                e.preventDefault();
                checkout();
            };
        }
    }

    // -----------------------------------------------------------
    //  #4. Event Listeners Auto-máticos de Compra ("Add to Cart")
    // -----------------------------------------------------------
    // ¿Qué hace?: Busca automáticamente todos los botones de compra del HTML configurados con los Data-Atributes correctos sin reescribir manualmente cada ID o click por separado.
    function wireAddToCartButtons() {
        document.querySelectorAll('[data-add-to-cart]').forEach(btn => {
            btn.addEventListener('click', () => {
                const product = {
                    id:       btn.dataset.productId   || 'unknown-' + Date.now(),
                    name:     btn.dataset.productName  || 'Product',
                    subtitle: btn.dataset.productSub   || '',
                    price:    btn.dataset.productPrice || '0',
                    image:    btn.dataset.productImage || './assets/images/logo-transparent.png',
                };
                Cart.addItem(product);
                showToast(product.name);
            });
        });
    }

    // -----------------------------------------------------------
    //  #5. Alerta Externa de Eventos (Toasts en el Viewport)
    // -----------------------------------------------------------
    // ¿Para qué sirve?: Para informar gratamente al usuario mediante pantalla que su clic surtió un proceso comercial efectivo (confirmación efímera flotante).
    // 🔥 ANÁLISIS DE CAPAS (Z-INDEX):
    // Z-index asignado: z-[2147483640]
    // Razón arquitectónica: Protege al Chatbot maestro que corre en [2147483647], lo que asegura el respeto jerárquico inquebrantable de vistas. Al mismo tiempo es lo suficientemente grande como para sobreponerse encima de WhatsApp o Cabeceras Sticky en iOS/Android.
    function showToast(name) {
        let toast = document.getElementById('cart-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'cart-toast';
            toast.className = 'fixed bottom-[230px] right-6 z-[2147483640] flex items-center gap-3 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl text-sm font-medium transition-all duration-300 translate-y-4 opacity-0 pointer-events-none';
            document.body.appendChild(toast);
        }
        
        toast.innerHTML = `<span class="material-symbols-outlined text-green-400">check_circle</span> <span><strong>${name}</strong> added to bag</span>`;
        toast.classList.remove('translate-y-4', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');
        
        clearTimeout(toast._timer);
        toast._timer = setTimeout(() => {
            toast.classList.add('translate-y-4', 'opacity-0');
            toast.classList.remove('translate-y-0', 'opacity-100');
        }, 2800);
    }

    /* =======================================================================================================
     * # MOTOR PRINCIPAL DE EJECUCIÓN DEL MÓDULO PÚBLICO (INIT & EXPORT DE API)
     * ======================================================================================================= */
    
    // ¿Qué hace?: Función orquestadora de los hilos de vista.
    function init() {
        updateBadge();
        renderNavDropdown();
        renderCartPage();
        wireAddToCartButtons();

        // Subscripción global a evento `cart:updated`. Recibe cualquier impulso de los componentes de botón internos y fuerza un redibujo visual en paralelo.
        window.addEventListener('cart:updated', () => {
            updateBadge();
            renderNavDropdown();
            renderCartPage();
        });
    }

    // Secuencia condicional inteligente de inyección Clean-Code
    // Evalúa que los HTML se hayan cargado sin romperse, e inicializa todo transparentemente.
    document.readyState === 'loading'
        ? document.addEventListener('DOMContentLoaded', init)
        : init();

    // ¿Para qué sirve esto?: Exportar *solamente* los comandos públicos seguros para control manual de la página de HTML.
    // Esto oculta al exterior las variables y funciones privadas internas impidiendo hackeos visuales y variables sueltas.
    return { addItem, removeItem, updateQty, clear, getItems, getCount, getSubtotal, checkout };
})();
