'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-slate-200/50">
      <nav className="flex items-center justify-between px-6 py-2 max-w-[1440px] mx-auto h-16">
        <div className="flex-1 flex items-center">
          <Link href="/" className="active:opacity-70 transition-all">
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">PhonesAndRepairs</span>
          </Link>
        </div>

        <div className="hidden md:flex flex-[2] items-center justify-center gap-8 font-sans text-[14px] font-medium tracking-tight">
          <Link href="/" className={`${pathname === '/' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'} hover:text-blue-500 transition-colors`}>Home</Link>
          <Link href="/shop" className={`${pathname?.startsWith('/shop') ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'} hover:text-blue-500 transition-colors`}>Shop</Link>
          <Link href="/services" className="text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors">Services</Link>
          <Link href="/admin/shop" className="text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors font-bold border-l pl-8 border-slate-200 dark:border-white/10">Admin Panel</Link>
        </div>

        <div className="flex-1 flex items-center justify-end gap-5">
          <button className="material-symbols-outlined text-slate-600 dark:text-slate-400 text-[22px]">search</button>
          <button className="material-symbols-outlined text-slate-600 dark:text-slate-400 text-[22px]">shopping_cart</button>
          <button className="material-symbols-outlined text-slate-600 dark:text-slate-400 text-[22px]">person</button>
        </div>
      </nav>
    </header>
  );
}
