'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useCart } from '@/context/CartContext';

import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

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
    router.refresh();
  };

  const { totalItems } = useCart();

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-slate-200/50 text-slate-900 dark:text-white">
      <nav className="flex items-center justify-between px-6 py-1 max-w-[1440px] mx-auto h-14">
        <div className="flex-1 flex items-center">
          <Link href="/" className="active:opacity-70 transition-all font-black text-lg tracking-tighter">
            CellphonesAndRepair.
          </Link>
        </div>

        <div className="hidden md:flex flex-[2] items-center justify-center gap-6 font-sans text-[12px] font-bold tracking-[0.05em] uppercase">
          <Link href="/" className={`${pathname === '/' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'} hover:text-blue-600 transition-all duration-300`}>Home</Link>
          
          <div className="relative group/shop h-full flex items-center">
            <Link href="/shop" className={`${pathname?.startsWith('/shop') && !pathname?.startsWith('/admin') ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'} hover:text-blue-600 transition-all duration-300 flex items-center gap-1`}>
              Shop <span className="material-symbols-outlined text-[14px]">expand_more</span>
            </Link>
            
            <div className="absolute top-14 left-1/2 -translate-x-1/2 w-[600px] bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-3xl border border-slate-200/50 dark:border-white/5 shadow-2xl rounded-3xl p-8 opacity-0 invisible group-hover/shop:opacity-100 group-hover/shop:visible transition-all duration-500 translate-y-2 group-hover/shop:translate-y-0 z-50">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-[10px] text-slate-400 uppercase tracking-widest mb-4">Devices</h4>
                  <div className="space-y-3">
                    <Link href="/shop?category=iPhones" className="block text-xl font-bold text-slate-900 dark:text-white hover:text-blue-600 transition-colors">iPhones</Link>
                    <Link href="/shop?category=Samsung" className="block text-xl font-bold text-slate-900 dark:text-white hover:text-blue-600 transition-colors">Samsung</Link>
                    <Link href="/shop?category=iPad" className="block text-xl font-bold text-slate-900 dark:text-white hover:text-blue-600 transition-colors">iPads & Tablets</Link>
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] text-slate-400 uppercase tracking-widest mb-4">Support & More</h4>
                  <div className="space-y-3">
                    <Link href="/services" className="block text-xl font-bold text-slate-900 dark:text-white hover:text-blue-600 transition-colors">Repairs</Link>
                    <Link href="/shop?category=Accessories" className="block text-xl font-bold text-slate-900 dark:text-white hover:text-blue-600 transition-colors">Accessories</Link>
                    <Link href="/shop?category=Consoles" className="block text-xl font-bold text-slate-900 dark:text-white hover:text-blue-600 transition-colors">Consoles</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link href="/services" className={`${pathname === '/services' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'} hover:text-blue-600 transition-all duration-300`}>Services</Link>
          <Link href="/contact" className={`${pathname === '/contact' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'} hover:text-blue-600 transition-all duration-300`}>Contact</Link>
          <Link href="/about" className={`${pathname === '/about' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'} hover:text-blue-600 transition-all duration-300 underline-offset-4 decoration-blue-600`}>About Us</Link>
          
          {user?.email === 'flypg65@gmail.com' && (
            <Link href="/admin/shop" className={`${pathname?.startsWith('/admin') ? 'text-blue-600 dark:text-blue-400' : 'text-blue-600 font-black border-l pl-4'} hover:opacity-80 transition-all`}>Admin</Link>
          )}
        </div>

        <div className="flex-1 flex items-center justify-end gap-3">
          <ThemeToggle />
          <button className="material-symbols-outlined text-slate-600 dark:text-slate-400 text-[18px] hover:text-blue-500 transition-colors p-1.5">search</button>
          
          <Link href="/cart" className="relative group p-1.5 lowercase">
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-400 text-[18px] hover:text-blue-500 transition-colors">shopping_cart</span>
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-blue-600 text-white text-[9px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden lg:block text-[9px] font-bold uppercase tracking-widest text-slate-400">{user.email.split('@')[0]}</span>
              <button onClick={handleLogout} className="material-symbols-outlined text-red-500 text-[18px] hover:scale-110 transition-all p-1.5">logout</button>
            </div>
          ) : (
            <Link href="/auth" className="material-symbols-outlined text-slate-600 dark:text-slate-400 text-[18px] hover:text-blue-500 transition-colors p-1.5">person</Link>
          )}
        </div>
      </nav>
    </header>
  );
}
