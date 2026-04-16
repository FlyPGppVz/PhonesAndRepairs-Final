class NavbarComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.initTheme();
        this.initMobileMenu();
        // Mega Menu no longer needs dynamic fetch for categories to maintain the classic design
    }

    initTheme() {
        const themeToggle = this.querySelector('#theme-toggle');
        if (!themeToggle) return;

        const updateIcon = (isDark) => {
            const icon = themeToggle.querySelector('.material-symbols-outlined');
            if (icon) icon.textContent = isDark ? 'light_mode' : 'dark_mode';
        };

        const currentTheme = localStorage.getItem('theme') || 
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        
        updateIcon(currentTheme === 'dark');

        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateIcon(isDark);
            
            window.dispatchEvent(new CustomEvent('themeChanged', { detail: { isDark } }));
        });
    }

    initMobileMenu() {
        const mobileMenuBtn = this.querySelector('#mobile-menu-btn');
        const mobileMenu = this.querySelector('#mobile-menu');
        const closeMenuBtn = this.querySelector('#close-menu-btn');

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.remove('translate-x-full');
            });
        }

        if (closeMenuBtn && mobileMenu) {
            closeMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.add('translate-x-full');
            });
        }
    }

    render() {
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        
        this.innerHTML = `
        <nav class="flex items-center justify-between px-6 py-2 max-w-[1440px] mx-auto h-full">
            <!-- Left Column: Logo -->
            <div class="flex-1 flex items-center">
                <a href="./index.html" class="flex items-center gap-3 group transition-all duration-500">
                    <div class="relative flex items-center justify-center">
                        <div class="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-all duration-700"></div>
                        <img src="./assets/images/Cell_Logo.png" alt="CellphonesAndRepair" class="h-10 w-auto relative z-10 brightness-100 dark:brightness-125 transition-all duration-500 group-hover:scale-105">
                    </div>
                </a>
            </div>

            <!-- Center Column: Navigation -->
            <div class="hidden md:flex items-center gap-10">
                <a href="./index.html" class="text-sm font-bold tracking-tight text-on-surface/70 hover:text-primary transition-all duration-300">Home</a>
                
                <!-- Shop with Mega Menu -->
                <div class="group/shop relative py-4">
                    <a href="./shop-fully-connected.html" class="flex items-center gap-1 text-sm font-bold tracking-tight text-on-surface/70 hover:text-primary transition-all duration-300">
                        Shop
                        <span class="material-symbols-outlined text-[18px] group-hover/shop:rotate-180 transition-transform duration-500">expand_more</span>
                    </a>
                    
                    <!-- Apple-style Mega Menu -->
                    <div class="absolute top-[100%] left-1/2 -translate-x-1/2 w-[900px] bg-white dark:bg-[#0f0f0f] rounded-3xl shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] border border-slate-100 dark:border-white/5 opacity-0 invisible group-hover/shop:opacity-100 group-hover/shop:visible transition-all duration-500 transform translate-y-4 group-hover/shop:translate-y-0 z-50 p-10">
                        <div class="grid grid-cols-4 gap-12">
                            <!-- Phones Column -->
                            <div class="space-y-6">
                                <h3 class="text-[11px] font-black uppercase tracking-[0.2em] text-primary/80">Smartphones</h3>
                                <ul class="space-y-4">
                                    <li><a href="./shop-fully-connected.html?brand=Apple" class="flex items-center gap-3 text-sm font-bold text-on-surface/60 hover:text-primary transition-colors group/item">
                                        <span class="material-symbols-outlined text-lg opacity-40 group-hover/item:opacity-100 transition-opacity">apple</span>
                                        iPhone Series
                                    </a></li>
                                    <li><a href="./shop-fully-connected.html?brand=Samsung" class="flex items-center gap-3 text-sm font-bold text-on-surface/60 hover:text-primary transition-colors group/item">
                                        <span class="material-symbols-outlined text-lg opacity-40 group-hover/item:opacity-100 transition-opacity">smartphone</span>
                                        Samsung Galaxy
                                    </a></li>
                                    <li><a href="./shop-fully-connected.html?brand=Google" class="flex items-center gap-3 text-sm font-bold text-on-surface/60 hover:text-primary transition-colors group/item">
                                        <span class="material-symbols-outlined text-lg opacity-40 group-hover/item:opacity-100 transition-opacity">google</span>
                                        Pixel Devices
                                    </a></li>
                                </ul>
                            </div>

                            <!-- Computing Column -->
                            <div class="space-y-6">
                                <h3 class="text-[11px] font-black uppercase tracking-[0.2em] text-primary/80">Computing</h3>
                                <ul class="space-y-4">
                                    <li><a href="./shop-fully-connected.html?brand=Apple" class="flex items-center gap-3 text-sm font-bold text-on-surface/60 hover:text-primary transition-colors group/item">
                                        <span class="material-symbols-outlined text-lg opacity-40 group-hover/item:opacity-100 transition-opacity">tablet_mac</span>
                                        iPads & Tablets
                                    </a></li>
                                    <li><a href="./shop-fully-connected.html?brand=Apple" class="flex items-center gap-3 text-sm font-bold text-on-surface/60 hover:text-primary transition-colors group/item">
                                        <span class="material-symbols-outlined text-lg opacity-40 group-hover/item:opacity-100 transition-opacity">laptop_mac</span>
                                        MacBooks
                                    </a></li>
                                </ul>
                            </div>

                            <!-- Gaming Column -->
                            <div class="space-y-6">
                                <h3 class="text-[11px] font-black uppercase tracking-[0.2em] text-primary/80">Gaming</h3>
                                <ul class="space-y-4">
                                    <li><a href="./shop-fully-connected.html?brand=Sony" class="flex items-center gap-3 text-sm font-bold text-on-surface/60 hover:text-primary transition-colors group/item">
                                        <span class="material-symbols-outlined text-lg opacity-40 group-hover/item:opacity-100 transition-opacity">videogame_asset</span>
                                        PlayStation
                                    </a></li>
                                    <li><a href="./shop-fully-connected.html?brand=Microsoft" class="flex items-center gap-3 text-sm font-bold text-on-surface/60 hover:text-primary transition-colors group/item">
                                        <span class="material-symbols-outlined text-lg opacity-40 group-hover/item:opacity-100 transition-opacity">sports_esports</span>
                                        Xbox Series
                                    </a></li>
                                    <li><a href="./shop-fully-connected.html?brand=Nintendo" class="flex items-center gap-3 text-sm font-bold text-on-surface/60 hover:text-primary transition-colors group/item">
                                        <span class="material-symbols-outlined text-lg opacity-40 group-hover/item:opacity-100 transition-opacity">videogame_asset_off</span>
                                        Nintendo Switch
                                    </a></li>
                                </ul>
                            </div>

                            <!-- Featured Promo -->
                            <div class="col-span-1 bg-slate-50 dark:bg-white/5 rounded-2xl p-6 flex flex-col justify-between border border-slate-100 dark:border-white/5">
                                <div>
                                    <span class="px-2 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded mb-4 inline-block">Weekly Deal</span>
                                    <h4 class="text-sm font-bold mb-2 leading-tight">iPhone 15 Pro Max Restoration</h4>
                                    <p class="text-[11px] text-on-surface/50 leading-relaxed">Genuine display replacement starting at $199.</p>
                                </div>
                                <a href="./shop-fully-connected.html" class="mt-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:gap-3 transition-all">
                                    Learn More <span class="material-symbols-outlined text-sm">arrow_forward</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <a href="./services-unified-nav.html" class="text-sm font-bold tracking-tight text-on-surface/70 hover:text-primary transition-all duration-300">Services</a>
                <a href="./about-us-unified-nav.html" class="text-sm font-bold tracking-tight text-on-surface/70 hover:text-primary transition-all duration-300">About Us</a>
                <a href="./contact-unified-nav.html" class="text-sm font-bold tracking-tight text-on-surface/70 hover:text-primary transition-all duration-300">Contact</a>
                ${isAdmin ? `<a href="./admin-dashboard-final.html" class="text-sm font-black uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full hover:bg-primary hover:text-on-primary transition-all duration-300">Admin</a>` : ''}
            </div>

            <!-- Right Column: Actions -->
            <div class="flex-1 flex items-center justify-end gap-3 md:gap-6">
                <div class="relative group hidden sm:block">
                    <input type="text" placeholder="Search devices..." class="w-12 group-hover:w-64 bg-slate-100/50 dark:bg-white/5 border-none rounded-full py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/50 transition-all duration-700 outline-none backdrop-blur-md placeholder:text-slate-400">
                    <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-slate-400 group-hover:text-primary transition-colors pointer-events-none">search</span>
                </div>

                <div class="flex items-center gap-1 md:gap-2">
                    <button id="theme-toggle" class="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-500 active:scale-95 group relative">
                        <span class="material-symbols-outlined text-[24px] text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors">dark_mode</span>
                    </button>
                    
                    <a href="./cart-final.html" class="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-500 active:scale-95 group relative">
                        <span class="material-symbols-outlined text-[24px] text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors">shopping_bag</span>
                        <div id="cart-badge-count" class="absolute top-1 right-1 w-4 h-4 bg-primary text-on-primary text-[10px] font-black rounded-full flex items-center justify-center opacity-0 scale-0 transition-all duration-500 shadow-lg shadow-primary/30">0</div>
                    </a>

                    <a href="./login-final-nav.html" class="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-500 active:scale-95 group">
                        <span class="material-symbols-outlined text-[24px] text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors">account_circle</span>
                    </a>

                    <button id="mobile-menu-btn" class="md:hidden p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-500 group">
                        <span class="material-symbols-outlined text-[24px] text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors">menu</span>
                    </button>
                </div>
            </div>
        </nav>

        <!-- Mobile Menu Drawer -->
        <div id="mobile-menu" class="fixed inset-0 z-[100] translate-x-full transition-transform duration-700 md:hidden bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-2xl">
            <div class="flex flex-col h-full p-8">
                <div class="flex items-center justify-between mb-12">
                    <img src="./assets/images/Cell_Logo.png" class="h-8 w-auto dark:brightness-125" alt="Logo">
                    <button id="close-menu-btn" class="p-4 rounded-full bg-slate-100 dark:bg-white/5 shadow-inner">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div class="flex flex-col gap-6">
                    <a href="./index.html" class="text-3xl font-black tracking-tight hover:text-primary transition-colors italic">Home.</a>
                    <a href="./shop-fully-connected.html" class="text-3xl font-black tracking-tight hover:text-primary transition-colors italic">Shop.</a>
                    <a href="./services-unified-nav.html" class="text-3xl font-black tracking-tight hover:text-primary transition-colors italic">Services.</a>
                    <a href="./about-us-unified-nav.html" class="text-3xl font-black tracking-tight hover:text-primary transition-colors italic">About US.</a>
                    <a href="./contact-unified-nav.html" class="text-3xl font-black tracking-tight hover:text-primary transition-colors italic text-primary">Contact.</a>
                </div>
            </div>
        </div>
        `;
    }
}

customElements.define('navbar-component', NavbarComponent);
