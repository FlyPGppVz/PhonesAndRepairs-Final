'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Check session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const { totalItems } = useCart();

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 text-slate-900 touch-manipulation">
      <nav className="flex items-center justify-between px-6 py-1 max-w-[1440px] mx-auto h-14">
        <div className="flex-1 flex items-center">
          <Link href="/" className="active:opacity-70 transition-all">
            <img 
              src="/assets/images/logo-transparent.png" 
              alt="CellphonesAndRepair" 
              className="h-[42px] w-auto object-contain"
            />
          </Link>
        </div>

        <div className="hidden md:flex flex-[2] items-center justify-center gap-6 font-sans text-[12px] font-bold tracking-[0.05em] uppercase">
          <Link href="/" className={`${pathname === '/' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'} hover:text-blue-600 transition-all duration-300`}>Home</Link>
          
          <div className="relative group/shop h-full flex items-center">
            <Link href="/shop" className={`${pathname?.startsWith('/shop') && !pathname?.startsWith('/admin') ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'} hover:text-blue-600 transition-all duration-300 flex items-center gap-1`}>
              Shop <span className="material-symbols-outlined text-[14px]">expand_more</span>
            </Link>
            
            <div className="fixed top-14 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200/50 shadow-2xl opacity-0 invisible group-hover/shop:opacity-100 group-hover/shop:visible transition-all duration-300 translate-y-0 z-50 overflow-hidden">
              <div className="max-w-[1440px] mx-auto px-20 py-16">
                <div className="grid grid-cols-4 gap-12">
                  {/* Column 1: IPHONES */}
                  <div className="space-y-6">
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] block">iphones</span>
                    <div className="space-y-4">
                      <Link href="/shop?category=iPhones" className="block text-xl font-bold text-slate-900 dark:text-white hover:text-blue-600 transition-colors tracking-tight text-transform-none">Shop All iPhone</Link>
                      <div className="space-y-2">
                        <Link href="/shop?model=17-pro-max" className="block text-[13px] font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors text-transform-none">iPhone 17 Pro Max</Link>
                        <Link href="/shop?model=16-pro-max" className="block text-[13px] font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors text-transform-none">iPhone 16 Pro Max</Link>
                        <Link href="/shop?compare=true" className="block text-[13px] font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors text-transform-none">Compare Models</Link>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: ANDROID */}
                  <div className="space-y-6">
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] block">android</span>
                    <div className="space-y-4">
                      <Link href="/shop?category=Samsung" className="block text-xl font-bold text-slate-900 dark:text-white hover:text-blue-600 transition-colors tracking-tight text-transform-none">Samsung Galaxy</Link>
                      <div className="space-y-2">
                        <Link href="/shop?model=s25-ultra" className="block text-[13px] font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors text-transform-none">S25 Ultra</Link>
                        <Link href="/shop?category=Samsung" className="block text-[13px] font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors text-transform-none">S24 Series</Link>
                        <Link href="/shop?certified=true" className="block text-[13px] font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors text-transform-none">Certified Androids</Link>
                      </div>
                    </div>
                  </div>

                  {/* Column 3: ECOSYSTEM */}
                  <div className="space-y-6">
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] block">ecosystem</span>
                    <div className="space-y-3 pt-1">
                      <Link href="/shop?category=iPad" className="block text-[15px] font-bold text-slate-900 dark:text-white hover:text-blue-600 transition-colors text-transform-none">iPad</Link>
                      <Link href="/shop?category=Watch" className="block text-[15px] font-bold text-slate-900 dark:text-white hover:text-blue-600 transition-colors text-transform-none">Apple Watch</Link>
                      <Link href="/shop?category=Consoles" className="block text-[15px] font-bold text-slate-900 dark:text-white hover:text-blue-600 transition-colors text-transform-none">Consoles & Gaming</Link>
                    </div>
                  </div>

                  {/* Column 4: SHOP SELECTION */}
                  <div className="space-y-6">
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] block">shop selection</span>
                    <div className="space-y-4">
                      <Link href="/shop?category=Accessories" className="block text-xl font-bold text-slate-900 dark:text-white hover:text-blue-600 transition-colors tracking-tight text-transform-none">Essential Accessories</Link>
                      <div className="space-y-2">
                        <Link href="/shop?tag=cables" className="block text-[13px] font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors text-transform-none">Cables & Power</Link>
                        <Link href="/shop?tag=cases" className="block text-[13px] font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors text-transform-none">Cases & Protection</Link>
                        <Link href="/shop?category=AirPods" className="block text-[13px] font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors text-transform-none">AirPods & Audio</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link href="/services" className={`${pathname === '/services' ? 'text-blue-600' : 'text-slate-500'} hover:text-blue-600 transition-all duration-300`}>Service</Link>
          <Link href="/contact" className={`${pathname === '/contact' ? 'text-blue-600' : 'text-slate-500'} hover:text-blue-600 transition-all duration-300`}>Contact</Link>
          <Link href="/about" className={`${pathname === '/about' ? 'text-blue-600' : 'text-slate-500'} hover:text-blue-600 transition-all duration-300 underline-offset-4 decoration-blue-600`}>About Us</Link>
          
          {user?.email === 'flypg65@gmail.com' && (
            <Link href="/admin" className={`${pathname?.startsWith('/admin') ? 'text-blue-600' : 'text-blue-600 font-black border-l pl-4'} hover:opacity-80 transition-all`}>Admin</Link>
          )}
        </div>

        <div className="flex-1 flex items-center justify-end gap-2 md:gap-3">
          <div className="hidden md:flex group relative items-center bg-slate-50 rounded-full px-2 py-1 border border-transparent focus-within:border-blue-500/50 focus-within:bg-white transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/5">
            <input 
              type="text"
              placeholder="Search store..."
              className="w-0 group-hover:w-40 focus:w-40 transition-all duration-500 outline-none bg-transparent text-[11px] font-bold tracking-tight text-slate-900 placeholder:text-slate-400 px-0 group-hover:px-2 focus:px-2"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const query = (e.target as HTMLInputElement).value;
                  if (query) router.push(`/shop?q=${encodeURIComponent(query)}`);
                }
              }}
            />
            <span className="material-symbols-outlined text-slate-600 text-[18px] group-hover:text-blue-500 transition-colors p-1 cursor-default">search</span>
          </div>
          
          <Link href="/cart" className="relative group p-1.5 lowercase">
            <span className="material-symbols-outlined text-slate-600 text-[22px] md:text-[18px] hover:text-blue-500 transition-colors">shopping_cart</span>
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-blue-600 text-white text-[9px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <div className="hidden md:flex items-center gap-3">
              <span className="hidden lg:block text-[9px] font-bold uppercase tracking-widest text-slate-400">{user.email.split('@')[0]}</span>
              <button onClick={handleLogout} className="material-symbols-outlined text-red-500 text-[18px] hover:scale-110 transition-all p-1.5">logout</button>
            </div>
          ) : (
            <Link href="/auth" className="hidden md:block material-symbols-outlined text-slate-600 text-[18px] hover:text-blue-500 transition-colors p-1.5 cursor-pointer">person</Link>
          )}

          {/* MOBILE HAMBURGER MENU (3 bar icon) */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-1.5 text-slate-900 hover:text-blue-600 transition-colors touch-manipulation z-50 relative"
            aria-label="Toggle Menu"
          >
            <span className="material-symbols-outlined text-[28px]">
              {isMenuOpen ? 'close' : 'menu'}
            </span>
          </button>

        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <div 
        className={`md:hidden fixed inset-0 bg-white z-40 transition-all duration-300 ease-in-out transform ${
          isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full bg-white px-8 pt-24 pb-12 overflow-y-auto">
          {/* Menu Links */}
          <div className="flex flex-col gap-10 font-sans text-lg font-bold uppercase tracking-[0.05em]">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className={`py-1 ${pathname === '/' ? 'text-blue-600' : 'text-slate-900'}`}>Home</Link>
            <Link href="/shop" onClick={() => setIsMenuOpen(false)} className={`py-1 ${pathname?.startsWith('/shop') ? 'text-blue-600' : 'text-slate-900'}`}>Shop</Link>
            <Link href="/services" onClick={() => setIsMenuOpen(false)} className={`py-1 ${pathname === '/services' ? 'text-blue-600' : 'text-slate-900'}`}>Service</Link>
            <Link href="/about" onClick={() => setIsMenuOpen(false)} className={`py-1 ${pathname === '/about' ? 'text-blue-600' : 'text-slate-900'}`}>About us</Link>
            <Link href="/contact" onClick={() => setIsMenuOpen(false)} className={`py-1 ${pathname === '/contact' ? 'text-blue-600' : 'text-slate-900'}`}>Contact</Link>
          </div>

          <div className="mt-auto pt-8 border-t border-slate-100 flex flex-col gap-6 font-sans text-[12px] font-bold uppercase tracking-[0.05em]">
             {user ? (
                <button 
                  onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                  className="w-full text-left py-1 text-red-500 flex items-center justify-between"
                >
                  Logout
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                </button>
             ) : (
                <Link 
                  href="/auth" 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full text-left py-1 text-slate-900 flex items-center justify-between"
                >
                  Login 
                  <span className="material-symbols-outlined text-[18px]">person</span>
                </Link>
             )}
          </div>
        </div>
      </div>
    </header>
  );
}
