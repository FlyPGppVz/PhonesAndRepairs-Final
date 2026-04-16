/**
 * Modern Unified Navbar Component
 * Restores the premium Apple-style Mega Menu with the latest Theme Engine and Path Resolution.
 */
const NavbarComponent = {
    render() {
        const header = document.querySelector('header');
        if (!header) return;

        const currentPath = window.location.pathname;
        const basePath = currentPath.includes('/admin/') ? '../' : './';
        const isAdmin = localStorage.getItem('isAdmin') === 'true';

        header.innerHTML = `
        <nav class="flex items-center justify-between px-6 py-2 max-w-[1440px] mx-auto h-[64px]">
            <!-- Logo Section -->
            <div class="flex-1 flex items-center">
                <a href="${basePath}index.html" class="flex items-center gap-3 active:scale-95 transition-transform">
                    <img src="${basePath}assets/images/logo-transparent.png" alt="CellphonesAndRepair" class="h-10 w-auto dark:brightness-125">
                </a>
            </div>

            <!-- Modern Navigation -->
            <div class="hidden md:flex items-center gap-10">
                <a href="${basePath}index.html" class="text-sm font-bold opacity-70 hover:opacity-100 hover:text-primary transition-all">Home</a>
                
                <!-- Apple-style Mega Menu (The design from 5 hours ago) -->
                <div class="group py-4">
                    <a href="${basePath}shop-fully-connected.html" class="flex items-center gap-1 text-sm font-bold opacity-70 group-hover:opacity-100 group-hover:text-primary transition-all">
                        Shop
                        <span class="material-symbols-outlined text-[18px] group-hover:rotate-180 transition-transform duration-500">expand_more</span>
                    </a>
                    
                    <div class="fixed top-[64px] left-0 w-full bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-2xl border-b border-slate-200/50 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 z-50 py-12">
                        <div class="max-w-[1440px] mx-auto px-12 grid grid-cols-4 gap-12">
                            <div class="space-y-6">
                                <h3 class="text-[11px] font-black uppercase tracking-widest text-primary/80">Smartphones</h3>
                                <ul class="space-y-4">
                                    <li><a href="${basePath}shop-fully-connected.html?brand=Apple" class="flex items-center gap-3 text-sm font-bold opacity-60 hover:opacity-100 hover:text-primary transition-all">
                                        <span class="material-symbols-outlined text-lg">apple</span> iPhone Series
                                    </a></li>
                                    <li><a href="${basePath}shop-fully-connected.html?brand=Samsung" class="flex items-center gap-3 text-sm font-bold opacity-60 hover:opacity-100 hover:text-primary transition-all">
                                        <span class="material-symbols-outlined text-lg">smartphone</span> Samsung Galaxy
                                    </a></li>
                                </ul>
                            </div>
                            <div class="space-y-6">
                                <h3 class="text-[11px] font-black uppercase tracking-widest text-primary/80">Computing</h3>
                                <ul class="space-y-4">
                                    <li><a href="${basePath}shop-fully-connected.html?brand=Apple" class="flex items-center gap-3 text-sm font-bold opacity-60 hover:opacity-100 hover:text-primary transition-all">
                                        <span class="material-symbols-outlined text-lg">tablet_mac</span> iPads & Tablets
                                    </a></li>
                                </ul>
                            </div>
                            <div class="space-y-6">
                                <h3 class="text-[11px] font-black uppercase tracking-widest text-primary/80">Gaming</h3>
                                <ul class="space-y-4">
                                    <li><a href="${basePath}shop-fully-connected.html?brand=Sony" class="flex items-center gap-3 text-sm font-bold opacity-60 hover:opacity-100 hover:text-primary transition-all">
                                        <span class="material-symbols-outlined text-lg">videogame_asset</span> PlayStation 5
                                    </a></li>
                                </ul>
                            </div>
                            <div class="bg-primary/5 dark:bg-white/5 rounded-3xl p-6 flex flex-col justify-between border border-primary/10">
                                <div>
                                    <span class="px-2 py-1 bg-primary text-on-primary text-[9px] font-black uppercase tracking-widest rounded mb-4 inline-block">Weekly Deal</span>
                                    <h4 class="text-sm font-bold mb-2">iPhone 15 Pro Max</h4>
                                    <p class="text-[11px] opacity-60">Genuine screen replacement starting at $199.</p>
                                </div>
                                <a href="${basePath}shop-fully-connected.html" class="text-xs font-black uppercase tracking-widest text-primary mt-4 flex items-center gap-2">Explore <span class="material-symbols-outlined text-sm">arrow_forward</span></a>
                            </div>
                        </div>
                    </div>
                </div>

                <a href="${basePath}services-unified-nav.html" class="text-sm font-bold ${currentPath.includes('services') ? 'text-primary' : 'opacity-70'} hover:opacity-100 hover:text-primary transition-all">Services</a>
                <a href="${basePath}contact-unified-nav.html" class="text-sm font-bold opacity-70 hover:opacity-100 hover:text-primary transition-all">Contact</a>
                <a href="${basePath}about-us-unified-nav.html" class="text-sm font-bold opacity-70 hover:opacity-100 hover:text-primary transition-all">About Us</a>
            </div>

            <!-- Modern Actions -->
            <div class="flex-1 flex items-center justify-end gap-1 md:gap-3">
                <!-- Search Icon -->
                <button class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-slate-500 dark:text-slate-400 hover:text-primary">
                    <span class="material-symbols-outlined text-[24px]">search</span>
                </button>

                <!-- Cart -->
                <a href="${basePath}cart-final.html" class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-all relative group">
                    <span class="material-symbols-outlined text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors text-[24px]">shopping_cart</span>
                    <div id="cart-badge-count" class="absolute top-1 right-1 w-4 h-4 bg-primary text-on-primary text-[10px] font-black rounded-full flex items-center justify-center opacity-0 scale-0 transition-transform shadow-lg">0</div>
                </a>


                <!-- Account -->
                <div class="relative group">
                    <button class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-slate-500 dark:text-slate-400 hover:text-primary">
                        <span class="material-symbols-outlined text-[24px]">account_circle</span>
                    </button>
                    <div class="absolute right-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right scale-95 group-hover:scale-100 z-50">
                        <div class="bg-white dark:bg-[#1a1c1e] rounded-2xl shadow-2xl border border-slate-200/50 dark:border-white/5 overflow-hidden min-w-[200px] py-2">
                            ${isAdmin ? `
                                <a href="${basePath}admin-dashboard-final.html" class="flex items-center gap-3 px-6 py-3 text-[12px] font-black uppercase text-primary hover:bg-primary/5 transition-colors">
                                    <span class="material-symbols-outlined text-lg">dashboard</span> Admin Panel
                                </a>
                                <hr class="border-slate-100 dark:border-white/5 my-2">
                            ` : ''}
                            <a href="${basePath}login-final-nav.html" class="block px-6 py-3 text-[13px] font-bold opacity-70 hover:opacity-100 hover:bg-slate-50 dark:hover:bg-white/5">Sign In</a>
                            <a href="${basePath}create-account-final-nav.html" class="block px-6 py-3 text-[13px] font-bold opacity-70 hover:opacity-100 hover:bg-slate-50 dark:hover:bg-white/5">Register</a>
                        </div>
                    </div>
                </div>

                <!-- Modern Night Mode Toggle (Amber/Blue) -->
                <button id="themeToggle" class="ml-1 p-2 rounded-full bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-all active:scale-90 border border-slate-200/50 dark:border-white/5 shadow-sm">
                    <span class="material-symbols-outlined text-amber-500 dark:hidden text-[20px]">light_mode</span>
                    <span class="material-symbols-outlined text-blue-400 hidden dark:block text-[20px]">dark_mode</span>
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
                window.dispatchEvent(new CustomEvent('themeChanged', { detail: { isDark } }));
            };
        }
    }
};

document.addEventListener('DOMContentLoaded', () => NavbarComponent.render());
