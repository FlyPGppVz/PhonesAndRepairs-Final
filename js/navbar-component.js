const NavbarComponent = {
    render() {
        // Selector flexible para soportar todas las versiones de las páginas
        const header = document.querySelector('header') || document.getElementById('navbar-placeholder');
        if (!header) return;

        const currentPath = window.location.pathname;
        let basePath = './';
        
        // Detección inteligente de profundidad de ruta
        if (currentPath.includes('/admin/')) basePath = '../';
        // Si estamos en una sub-URL o página interna
        if (currentPath.split('/').length > 2 && !currentPath.includes('/admin/')) {
            // basePath ya es './' pero podemos forzarlo si es necesario
        }

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
                <a href="${basePath}index.html" class="text-sm font-bold ${currentPath.endsWith('index.html') || currentPath === '/' ? 'text-primary' : 'opacity-70'} hover:opacity-100 hover:text-primary transition-all">Home</a>
                
                <!-- Mega Menu Shop -->
                <div class="group h-full flex items-center">
                    <a href="${basePath}shop-fully-connected.html" class="flex items-center gap-1 text-sm font-bold ${currentPath.includes('shop') ? 'text-primary' : 'opacity-70'} group-hover:opacity-100 group-hover:text-primary transition-all py-4 cursor-pointer">
                        Shop
                        <span class="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:rotate-180">expand_more</span>
                    </a>
                    
                    <div class="fixed top-[64px] left-0 w-full bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-3xl border-b border-slate-200/50 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 z-[21000] py-16">
                        <div class="max-w-[1440px] mx-auto px-12 grid grid-cols-4 gap-12 text-left">
                            <div>
                                <h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">iPhones</h4>
                                <ul class="space-y-4">
                                    <li><a href="${basePath}shop-fully-connected.html?category=iPhones" class="text-2xl font-semibold text-slate-800 dark:text-white hover:text-blue-500 transition-all">Shop All iPhone</a></li>
                                    <li><a href="${basePath}shop-fully-connected.html?category=iPhones" class="text-sm text-slate-500 hover:text-blue-500 transition-colors">Compare Models</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Android</h4>
                                <ul class="space-y-4">
                                    <li><a href="${basePath}shop-fully-connected.html?category=Samsung" class="text-2xl font-semibold text-slate-800 dark:text-white hover:text-blue-500 transition-all">Samsung Galaxy</a></li>
                                    <li><a href="${basePath}shop-fully-connected.html?category=Samsung" class="text-sm text-slate-500 hover:text-blue-500 transition-colors">S25 Ultra</a></li>
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
                <!-- Cart -->
                <a href="${basePath}shopping-cart-final-nav.html" class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-all relative group">
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
                             <div class="px-6 py-3 animate-pulse bg-slate-100 dark:bg-white/5 h-10 w-full mb-1"></div>
                        </div>
                    </div>
                </div>

                <!-- Night Mode -->
                <button id="themeToggle" class="ml-1 p-2 rounded-full bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-all active:scale-90 border border-slate-200/50 dark:border-white/5 shadow-sm">
                    <span class="material-symbols-outlined text-amber-500 dark:hidden text-[20px]">light_mode</span>
                    <span class="material-symbols-outlined text-blue-400 hidden dark:block text-[20px]">dark_mode</span>
                </button>
            </div>
        </nav>
        `;

        this.updateAuthUI(basePath);
        this.attachListeners();
    },

    async updateAuthUI(basePath) {
        const dropdown = document.getElementById('nav-user-dropdown');
        if (!dropdown) return;

        const { data: { session } } = await _supabase.auth.getSession();

        if (!session) {
            dropdown.innerHTML = `
                <a href="${basePath}login-final-nav.html" class="block px-6 py-3 text-[13px] font-bold opacity-70 hover:opacity-100 hover:bg-slate-50 dark:hover:bg-white/5">Sign In</a>
                <a href="${basePath}create-account-final-nav.html" class="block px-6 py-3 text-[13px] font-bold opacity-70 hover:opacity-100 hover:bg-slate-50 dark:hover:bg-white/5">Register</a>
            `;
            return;
        }

        // Detección de Admin (DB + Hardcoded Fallback para Flypg65@gmail.com)
        const { data: admin } = await _supabase.from('admins').select('*').eq('user_id', session.user.id).single();
        const isMasterAdmin = session.user.email === 'Flypg65@gmail.com';

        dropdown.innerHTML = `
            <div class="px-6 py-2 border-b border-slate-100 dark:border-white/5 mb-2">
                <p class="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Account</p>
                <p class="text-[12px] font-semibold truncate">${session.user.email}</p>
            </div>
            ${(admin || isMasterAdmin) ? `<a href="${basePath}admin/products.html" class="block px-6 py-3 text-[13px] font-bold text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">Admin Dashboard</a>` : ''}
            <a href="${basePath}my-profile-final-nav.html" class="block px-6 py-3 text-[13px] font-bold opacity-70 hover:opacity-100 hover:bg-slate-50 dark:hover:bg-white/5">My Account</a>
            <button onclick="_supabase.auth.signOut().then(()=>location.reload())" class="w-full text-left px-6 py-3 text-[13px] font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 border-t border-slate-100 dark:border-white/5 mt-2">Sign Out</button>
        `;
    },

    attachListeners() {
        document.addEventListener('click', (e) => {
            const toggle = e.target.closest('#themeToggle');
            if (toggle) {
                e.preventDefault();
                const isDark = document.documentElement.classList.toggle('dark');
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
            }
        });
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => NavbarComponent.render());
} else {
    NavbarComponent.render();
}
