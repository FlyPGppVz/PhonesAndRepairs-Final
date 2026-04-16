/**
 * # ARCHIVO: js/auth.js
 * # PROPÓSITO: Gestionar el estado de autenticación y roles de usuario.
 */

const AuthManager = {
    // Verificar si hay una sesión activa al cargar
    async init() {
        const { data: { session }, error } = await _supabase.auth.getSession();
        
        if (session && session.user) {
            console.log('Sesión detectada:', session.user.email);
            this.updateUIAfterLogin(session.user);
            await this.checkAdminStatus(session.user.id);
        } else {
            console.log('No se detectó sesión activa.');
            this.updateUIAfterLogout();
        }

        // Listener de cambios para actualizaciones en tiempo real
        _supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('Auth Event:', event);
            if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION') && session) {
                this.updateUIAfterLogin(session.user);
                await this.checkAdminStatus(session.user.id);
            } else if (event === 'SIGNED_OUT') {
                this.updateUIAfterLogout();
            }
        });
    },

    // Actualizar elementos de la Nav Bar (Sign In -> Profile / My Account)
    // Verificar si el usuario es Admin
    async checkAdminStatus(userId) {
        try {
            const { data, error } = await _supabase
                .from('admins')
                .select('user_id')
                .eq('user_id', userId)
                .maybeSingle();

            if (data) {
                localStorage.setItem('is_admin', 'true');
                this.showAdminLink();
            } else {
                localStorage.setItem('is_admin', 'false');
            }
        } catch (err) {
            console.error('Error verificando admin:', err);
            localStorage.setItem('is_admin', 'false');
        }
    },

    showAdminLink() {
        if (localStorage.getItem('is_admin') !== 'true') return;

        const adminLink = document.createElement('a');
        adminLink.id = 'navAdminDashboardLink';
        adminLink.href = './admin/dashboard.html';
        adminLink.className = 'block px-6 py-3 text-[13px] font-bold text-blue-500 hover:bg-black/5 dark:hover:bg-white/5 transition-colors uppercase border-t border-on-surface/10';
        adminLink.textContent = 'Admin Dashboard';
        
        const dropdown = document.getElementById('nav-user-dropdown');
        if (dropdown && !document.getElementById('navAdminDashboardLink')) {
            dropdown.appendChild(adminLink);
        }
    },

    updateUIAfterLogin(user) {
        const dropdown = document.getElementById('nav-user-dropdown');
        if (dropdown) {
            // Limpiar dropdown y mostrar opciones de usuario
            dropdown.innerHTML = `
                <div class="px-6 py-3 border-b border-on-surface/10 mb-1">
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Logged in as</p>
                    <p class="text-[12px] font-semibold truncate">${user.email}</p>
                </div>
                <a class="block px-6 py-3 text-[13px] font-semibold tracking-wide text-on-surface hover:bg-black/5 dark:hover:bg-white/5 transition-colors uppercase" href="./my-profile-final-nav.html">My Profile</a>
                <a class="block px-6 py-3 text-[13px] font-semibold tracking-wide text-on-surface hover:bg-black/5 dark:hover:bg-white/5 transition-colors uppercase border-b border-on-surface/10" href="./my-orders.html">My Orders</a>
                <button onclick="AuthManager.logout()" class="w-full text-left block px-6 py-3 text-[13px] font-semibold tracking-wide text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors uppercase">Sign Out</button>
            `;
            this.showAdminLink();
        }
    },

    updateUIAfterLogout() {
        const dropdown = document.getElementById('nav-user-dropdown');
        if (dropdown) {
            dropdown.innerHTML = `
                <a class="block px-6 py-3 text-[13px] font-semibold tracking-wide text-on-surface hover:bg-black/5 dark:hover:bg-white/5 transition-colors uppercase" href="./login-final-nav.html">Sign In</a>
                <a class="block px-6 py-3 text-[13px] font-semibold tracking-wide text-on-surface hover:bg-black/5 dark:hover:bg-white/5 transition-colors uppercase" href="./create-account-final-nav.html">Create Account</a>
            `;
        }
    },

    async logout() {
        const { error } = await _supabase.auth.signOut();
        if (!error) {
            localStorage.removeItem('is_admin');
            window.location.href = './index.html';
        }
    }
};

// Auto-inicializar
document.addEventListener('DOMContentLoaded', () => AuthManager.init());
