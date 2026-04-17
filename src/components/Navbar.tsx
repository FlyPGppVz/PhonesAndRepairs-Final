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
          <Link href="/" className="active:opacity-70 transition-all">
            <img 
              src="/assets/images/logo-transparent.png" 
              alt="PhonesAndRepairs Logo" 
              className="h-8 w-auto object-contain scale-95 dark:invert dark:brightness-200"
            />
          </Link>
        </div>

        <div className="hidden md:flex flex-[3] items-center justify-center gap-6 font-sans text-[12px] font-medium tracking-tight">
          <Link href="/" className={`${pathname === '/' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'} hover:text-blue-500 transition-colors`}>Home</Link>
          <Link href="/services" className={`${pathname === '/services' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'} hover:text-blue-500 transition-colors`}>Services</Link>
          <Link href="/shop" className={`${pathname?.startsWith('/shop') && !pathname?.startsWith('/admin') ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'} hover:text-blue-500 transition-colors`}>Shop</Link>
          <Link href="/about" className={`${pathname === '/about' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'} hover:text-blue-500 transition-colors`}>About Us</Link>
          <Link href="/contact" className={`${pathname === '/contact' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'} hover:text-blue-500 transition-colors`}>Contact</Link>

          {user?.email?.startsWith('flypg65') && (
            <Link href="/admin/shop" className={`${pathname?.startsWith('/admin') ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'} hover:text-blue-500 transition-colors font-bold border-l pl-6 border-slate-200 dark:border-white/10`}>Admin</Link>
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
