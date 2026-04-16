'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

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

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-slate-200/50 text-slate-900 dark:text-white">
      <nav className="flex items-center justify-between px-6 py-2 max-w-[1440px] mx-auto h-16">
        <div className="flex-1 flex items-center">
          <Link href="/" className="active:opacity-70 transition-all">
            <span className="font-bold text-xl tracking-tight">PhonesAndRepairs</span>
          </Link>
        </div>

        <div className="hidden md:flex flex-[2] items-center justify-center gap-8 font-sans text-[14px] font-medium tracking-tight">
          <Link href="/" className={`${pathname === '/' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'} hover:text-blue-500 transition-colors`}>Home</Link>
          <Link href="/shop" className={`${pathname?.startsWith('/shop') && !pathname?.startsWith('/admin') ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'} hover:text-blue-500 transition-colors`}>Shop</Link>
          <Link href="/services" className="text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors">Services</Link>
          <Link href="/admin/shop" className={`${pathname?.startsWith('/admin') ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'} hover:text-blue-500 transition-colors font-bold border-l pl-8 border-slate-200 dark:border-white/10`}>Admin Panel</Link>
        </div>

        <div className="flex-1 flex items-center justify-end gap-5">
          <button className="material-symbols-outlined text-slate-600 dark:text-slate-400 text-[22px] hover:text-blue-500 transition-colors">search</button>
          <button className="material-symbols-outlined text-slate-600 dark:text-slate-400 text-[22px] hover:text-blue-500 transition-colors">shopping_cart</button>
          
          {user ? (
            <div className="flex items-center gap-4">
              <span className="hidden lg:block text-[10px] font-bold uppercase tracking-widest text-slate-400">{user.email.split('@')[0]}</span>
              <button onClick={handleLogout} className="material-symbols-outlined text-red-500 text-[22px] hover:scale-110 transition-all">logout</button>
            </div>
          ) : (
            <Link href="/auth" className="material-symbols-outlined text-slate-600 dark:text-slate-400 text-[22px] hover:text-blue-500 transition-colors">person</Link>
          )}
        </div>
      </nav>
    </header>
  );
}
