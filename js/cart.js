/*
 * CellphonesAndRepair — Cart System
 * Guest-friendly cart powered by localStorage.
 * No login required. Works across all pages.
 */

const Cart = (() => {
    const KEY = 'cr_cart';

    /* ── Data Layer ─────────────────────────────────────── */
    function load() {
        try { return JSON.parse(localStorage.getItem(KEY)) || []; }
        catch { return []; }
    }

    function save(items) {
        localStorage.setItem(KEY, JSON.stringify(items));
    }

    function getItems() { return load(); }

    function getCount() {
        return load().reduce((sum, i) => sum + i.qty, 0);
    }

    function getSubtotal() {
        return load().reduce((sum, i) => sum + (parseFloat(i.price) * i.qty), 0);
    }

    function addItem(product) {
        // product = { id, name, subtitle, price, image }
        const items = load();
        const existing = items.find(i => i.id === product.id);
        if (existing) {
            existing.qty = Math.min(existing.qty + 1, 10);
        } else {
            items.push({ ...product, qty: 1 });
        }
        save(items);
        dispatchChange();
    }

    function removeItem(id) {
        save(load().filter(i => i.id !== id));
        dispatchChange();
    }

    function updateQty(id, qty) {
        const items = load();
        const item = items.find(i => i.id === id);
        if (item) {
            item.qty = Math.max(1, Math.min(qty, 10));
            save(items);
            dispatchChange();
        }
    }

    function clear() { save([]); dispatchChange(); }

    function dispatchChange() {
        window.dispatchEvent(new CustomEvent('cart:updated'));
    }

    /* ── Navbar Mini-Cart Dropdown ──────────────────────── */
    function renderNavDropdown() {
        const dropdown = document.getElementById('nav-cart-dropdown');
        if (!dropdown) return;

        const items = getItems();
        const count = getCount();

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

    /* ── Badge Count on Cart Icon ───────────────────────── */
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

    /* ── Full Cart Page Renderer ────────────────────────── */
    function renderCartPage() {
        const container = document.getElementById('cart-items-container');
        const summarySubtotal = document.getElementById('cart-subtotal');
        const summaryTotal = document.getElementById('cart-total');
        const summaryTax = document.getElementById('cart-tax');
        const emptyState = document.getElementById('cart-empty-state');
        const summaryPanel = document.getElementById('cart-summary-panel');
        const checkoutBtn = document.getElementById('cart-checkout-btn');

        if (!container) return;

        const items = getItems();
        const subtotal = getSubtotal();
        const tax = subtotal * 0.0825; // ~8.25% MI tax
        const total = subtotal + tax;

        if (items.length === 0) {
            container.innerHTML = '';
            if (emptyState) emptyState.classList.remove('hidden');
            if (summaryPanel) summaryPanel.classList.add('opacity-50', 'pointer-events-none');
            if (summarySubtotal) summarySubtotal.textContent = '$0.00';
            if (summaryTax) summaryTax.textContent = '$0.00';
            if (summaryTotal) summaryTotal.textContent = '$0.00';
            return;
        }

        if (emptyState) emptyState.classList.add('hidden');
        if (summaryPanel) summaryPanel.classList.remove('opacity-50', 'pointer-events-none');

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
    }

    /* ── "Add to Cart" Button Auto-Wire ─────────────────── */
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

    /* ── Toast Notification ─────────────────────────────── */
    function showToast(name) {
        let toast = document.getElementById('cart-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'cart-toast';
            toast.className = 'fixed bottom-[230px] right-6 z-[9998] flex items-center gap-3 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl text-sm font-medium transition-all duration-300 translate-y-4 opacity-0 pointer-events-none';
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

    /* ── Init ───────────────────────────────────────────── */
    function init() {
        updateBadge();
        renderNavDropdown();
        renderCartPage();
        wireAddToCartButtons();

        window.addEventListener('cart:updated', () => {
            updateBadge();
            renderNavDropdown();
            renderCartPage();
        });
    }

    document.readyState === 'loading'
        ? document.addEventListener('DOMContentLoaded', init)
        : init();

    // Public API
    return { addItem, removeItem, updateQty, clear, getItems, getCount, getSubtotal };
})();
