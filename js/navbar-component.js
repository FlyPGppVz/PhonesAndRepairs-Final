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
                <a href="${basePath}index.html" class="text-sm font-bold ${currentPath.endsWith('index.html') || currentPath === '/' || currentPath.endsWith('/') ? 'text-primary' : 'opacity-70'} hover:opacity-100 hover:text-primary transition-all">Home</a>
                
                <!-- Full-Width Mega Menu (Restored from 6 hours ago) -->
                <div class="group h-full flex items-center">
                    <a href="${basePath}shop-fully-connected.html" class="flex items-center gap-1 text-sm font-bold ${currentPath.includes('shop') ? 'text-primary' : 'opacity-70'} group-hover:opacity-100 group-hover:text-primary transition-all py-4 cursor-pointer">
                        Shop
                        <span class="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:rotate-180">expand_more</span>
                    </a>
                    
                    <div class="fixed top-[64px] left-0 w-full bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-3xl border-b border-slate-200/50 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 z-[21000] py-16">
                        <div class="max-w-[1440px] mx-auto px-12 grid grid-cols-4 gap-12 text-left">
                            <!-- iPhones Column -->
                            <div>
                                <h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">iPhones</h4>
                                <ul class="space-y-4">
                                    <li><a href="${basePath}shop-fully-connected.html?category=iPhones" class="text-2xl font-semibold text-slate-800 dark:text-white hover:text-blue-500 transition-all">Shop All iPhone</a></li>
                                    <li><a href="${basePath}iphone-17-pro-max-detail.html" class="text-sm text-slate-500 hover:text-blue-500 transition-colors">iPhone 17 Pro Max</a></li>
                                    <li><a href="${basePath}iphone-16-pro-max-detail.html" class="text-sm text-slate-500 hover:text-blue-500 transition-colors">iPhone 16 Pro Max</a></li>
                                    <li><a href="${basePath}shop-fully-connected.html?category=iPhones" class="text-sm text-slate-500 hover:text-blue-500 transition-colors">Compare Models</a></li>
                                </ul>
                            </div>

                            <!-- Android Column -->
                            <div>
                                <h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Android</h4>
                                <ul class="space-y-4">
                                    <li><a href="${basePath}samsung-s25-ultra-detail.html" class="text-2xl font-semibold text-slate-800 dark:text-white hover:text-blue-500 transition-all">Samsung Galaxy</a></li>
                                    <li><a href="${basePath}samsung-s25-ultra-detail.html" class="text-sm text-slate-500 hover:text-blue-500 transition-colors">S25 Ultra</a></li>
                                    <li><a href="${basePath}shop-fully-connected.html?category=Samsung" class="text-sm text-slate-500 hover:text-blue-500 transition-colors">S24 Series</a></li>
                                    <li><a href="${basePath}shop-fully-connected.html?category=Samsung" class="text-sm text-slate-500 hover:text-blue-500 transition-colors">Certified Androids</a></li>
                                </ul>
                            </div>

                            <!-- iPads & Watch Column -->
                            <div>
                                <h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Ecosystem</h4>
                                <ul class="space-y-4">
                                    <li><a href="${basePath}shop-fully-connected.html?category=iPads" class="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-500 transition-colors">iPad</a></li>
                                    <li><a href="${basePath}product-detail-apple-watch-ultra-2-final.html" class="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-500 transition-colors">Apple Watch</a></li>
                                    <li><a href="${basePath}shop-fully-connected.html?category=Consoles" class="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-500 transition-colors">Consoles & Gaming</a></li>
                                </ul>
                            </div>

                            <!-- Accessories Column -->
                            <div>
                                <h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Shop Selection</h4>
                                <ul class="space-y-4">
                                    <li><a href="${basePath}shop-fully-connected.html?category=Accessories" class="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-500 transition-colors">Essential Accessories</a></li>
                                    <li><a href="${basePath}chargers-and-cables-detail.html" class="text-sm text-slate-500 hover:text-blue-500 transition-colors">Cables & Power</a></li>
                                    <li><a href="${basePath}phone-cases-detail.html" class="text-sm text-slate-500 hover:text-blue-500 transition-colors">Cases & Protection</a></li>
                                    <li><a href="${basePath}airpods-detail.html" class="text-sm text-slate-500 hover:text-blue-500 transition-colors">AirPods & Audio</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <a href="${basePath}services-unified-nav.html" class="text-sm font-bold ${currentPath.includes('services') ? 'text-primary' : 'opacity-70'} hover:opacity-100 hover:text-primary transition-all">Services</a>
                <a href="${basePath}contact-unified-nav.html" class="text-sm font-bold ${currentPath.includes('contact') ? 'text-primary' : 'opacity-70'} hover:opacity-100 hover:text-primary transition-all">Contact</a>
                <a href="${basePath}about-us-unified-nav.html" class="text-sm font-bold ${currentPath.includes('about-us') ? 'text-primary' : 'opacity-70'} hover:opacity-100 hover:text-primary transition-all">About Us</a>

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
                        <div id="nav-user-dropdown" class="bg-white dark:bg-[#1a1c1e] rounded-2xl shadow-2xl border border-slate-200/50 dark:border-white/5 overflow-hidden min-w-[200px] py-2">
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
        // Global event delegation for theme toggle (Bulletproof)
        document.addEventListener('click', (e) => {
            const toggle = e.target.closest('#themeToggle');
            if (toggle) {
                e.preventDefault();
                const isDark = document.documentElement.classList.toggle('dark');
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
                window.dispatchEvent(new CustomEvent('themeChanged', { detail: { isDark } }));
                console.log('Theme toggled:', isDark ? 'dark' : 'light');
            }
        });
    }
};

// Initialize as soon as possible and on DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => NavbarComponent.render());
} else {
    NavbarComponent.render();
}
