/**
 * # ARCHIVO: js/navbar-component.js
 * # PROPÓSITO: Cargar la navegación unificada dinámicamente en todas las páginas.
 */

const NavbarComponent = {
    render() {
        const header = document.querySelector('header');
        if (!header) return;

        header.innerHTML = `
        <nav class="flex items-center justify-between px-6 py-2 max-w-[1440px] mx-auto">
            <!-- Left Column: Logo -->
            <div class="flex-1 flex items-center">
                <a class="active:opacity-70 transition-all cursor-pointer" href="./index.html">
                    <img alt="CellphonesAndRepair Logo" class="h-12 w-auto object-contain scale-95" src="./assets/images/logo-transparent.png">
                </a>
            </div>

            <!-- Center Column: Navigation Links -->
            <div class="hidden md:flex flex-[2] items-center justify-center gap-8 font-sans text-[15px] font-medium tracking-tight">
                <a class="text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-300 scale-95 active:opacity-70 cursor-pointer" href="./index.html">Home</a>
                
                <div class="group h-full flex items-center">
                    <a class="text-slate-600 dark:text-slate-400 group-hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-300 scale-95 active:opacity-70 cursor-pointer flex items-center gap-1 py-4" href="./shop-fully-connected.html">
                        Shop
                        <span class="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:rotate-180">expand_more</span>
                    </a>
                    <!-- Mega Menu -->
                    <div class="fixed top-[64px] left-0 w-full bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-3xl border-b border-slate-200/50 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 z-50 py-16">
                        <div class="max-w-[1440px] mx-auto px-12 grid grid-cols-4 gap-12 text-slate-900 dark:text-white">
                            <div>
                                <h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">iPhones</h4>
                                <ul class="space-y-4">
                                    <li><a href="./shop-fully-connected.html?category=iPhones" class="text-xl font-semibold hover:text-blue-500 transition-all">All iPhones</a></li>
                                    <li><a href="./iphone-17-pro-max-detail.html" class="text-sm text-slate-500 hover:text-blue-500 transition-colors">iPhone 17 Pro Max</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Android</h4>
                                <ul class="space-y-4">
                                    <li><a href="./shop-fully-connected.html?category=Samsung" class="text-xl font-semibold hover:text-blue-500 transition-all">Samsung Galaxy</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Ecosystem</h4>
                                <ul class="space-y-4">
                                    <li><a href="./shop-fully-connected.html?category=iPads" class="text-sm font-semibold hover:text-blue-500 transition-colors">iPad</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Selection</h4>
                                <ul class="space-y-4">
                                    <li><a href="./shop-fully-connected.html?category=Accessories" class="text-sm font-semibold hover:text-blue-500 transition-colors">Accessories</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <a class="text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-300 scale-95 active:opacity-70 cursor-pointer" href="./services-unified-nav.html">Services</a>
                <a class="text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-300 scale-95 active:opacity-70 cursor-pointer" href="./contact-unified-nav.html">Contact</a>
                <a class="text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-300 scale-95 active:opacity-70 cursor-pointer" href="./about-us-unified-nav.html">About Us</a>
            </div>

            <!-- Right Column: Icons -->
            <div class="flex-1 flex items-center justify-end gap-5">
                <button class="lg:hidden material-symbols-outlined text-slate-600 dark:text-slate-400 text-2xl" id="mobileMenuBtn">menu</button>
                
                <div class="relative group" id="nav-cart-wrapper">
                    <a href="./shopping-cart-final-nav.html" class="material-symbols-outlined text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors text-[24px]">shopping_cart</a>
                    <span id="nav-cart-badge" class="hidden absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none">0</span>
                </div>

                <div class="relative group">
                    <button class="material-symbols-outlined text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors text-[24px]">person</button>
                    <div class="absolute right-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right scale-95 group-hover:scale-100 z-50">
                        <div id="nav-user-dropdown" class="cupertino-glass bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl overflow-hidden min-w-[200px] py-2 border border-slate-200/50">
                            <a class="block px-6 py-3 text-[13px] font-semibold tracking-wide text-on-surface hover:bg-black/5 dark:hover:bg-white/5 transition-colors uppercase" href="./login-final-nav.html">Sign In</a>
                            <a class="block px-6 py-3 text-[13px] font-semibold tracking-wide text-on-surface hover:bg-black/5 dark:hover:bg-white/5 transition-colors uppercase border-b border-on-surface/10" href="./create-account-final-nav.html">Create Account</a>
                        </div>
                    </div>
                </div>

                <button id="themeToggle" class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-neutral-800 transition-all border border-slate-200/50 dark:border-white/5">
                    <span class="material-symbols-outlined text-amber-500 dark:hidden">light_mode</span>
                    <span class="material-symbols-outlined text-blue-400 hidden dark:block">dark_mode</span>
                </button>
            </div>
        </nav>
        `;

        this.attachListeners();
    },

    attachListeners() {
        const toggle = document.getElementById('themeToggle');
        if (toggle) {
            toggle.onclick = () => {
                const isDark = document.documentElement.classList.toggle('dark');
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
            };
        }
    }
};

document.addEventListener('DOMContentLoaded', () => NavbarComponent.render());
