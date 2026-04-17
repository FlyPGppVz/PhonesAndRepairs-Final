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
          <Link href="/shop" className={`${pathname?.startsWith('/shop') ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'} hover:text-blue-500 transition-colors`}>Shop</Link>
          
          <div className="relative group">
            <button className={`${pathname?.startsWith('/repairs') ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'} hover:text-blue-500 transition-colors flex items-center gap-1`}>
              Repairs
              <span className="material-symbols-outlined text-[18px]">expand_more</span>
            </button>
            <div className="absolute top-full -left-4 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100 z-50">
              <div className="cupertino-glass bg-white/90 dark:bg-neutral-800/90 rounded-2xl shadow-2xl min-w-[200px] py-3 border border-slate-200/50">
                <Link href="/repairs/iphone" className="block px-6 py-3 text-[13px] font-semibold text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white transition-colors">iPhone Repairs</Link>
                <Link href="/repairs/android" className="block px-6 py-3 text-[13px] font-semibold text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white transition-colors">Android Repairs</Link>
                <Link href="/repairs/ipad-tablet" className="block px-6 py-3 text-[13px] font-semibold text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white transition-colors">iPad & Tablet</Link>
                <Link href="/repairs/consoles" className="block px-6 py-3 text-[13px] font-semibold text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white transition-colors">Gaming Consoles</Link>
              </div>
            </div>
          </div>

          <Link href="/about" className={`${pathname === '/about' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'} hover:text-blue-500 transition-colors`}>About Us</Link>

          {user?.email?.startsWith('flypg65') && (
            <Link href="/admin/shop" className={`${pathname?.startsWith('/admin') ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'} hover:text-blue-500 transition-colors font-bold border-l pl-6 border-slate-200 dark:border-white/10`}>Admin</Link>
          )}
        </div>

        <div className="flex-1 flex items-center justify-end gap-2">
          <ThemeToggle />
          <button className="material-symbols-outlined text-slate-600 dark:text-slate-400 text-[18px] hover:text-blue-500 transition-colors p-2">search</button>
        </div>
      </nav>
    </header>
  );
}
