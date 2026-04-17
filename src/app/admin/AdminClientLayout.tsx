'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black flex flex-col md:flex-row transition-colors">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-72 bg-white dark:bg-neutral-900 border-r border-slate-200 dark:border-white/5 p-8 flex flex-col justify-between relative z-10">
        <div>
          <div className="mb-12">
            <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors group">
              <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
              Return to Site
            </Link>
          </div>
          
          <div className="space-y-10">
            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Management</h3>
              <nav className="space-y-1">
                <Link 
                  href="/admin/shop" 
                  className={`flex items-center gap-3 px-5 py-4 rounded-[1.5rem] font-bold text-sm transition-all ${pathname === '/admin/shop' ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' : 'text-slate-500 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-white/5'}`}
                >
                  <span className="material-symbols-outlined">inventory_2</span>
                  Inventory
                </Link>
                <Link 
                  href="/admin/inbox" 
                  className={`flex items-center gap-3 px-5 py-4 rounded-[1.5rem] font-bold text-sm transition-all ${pathname === '/admin/inbox' ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' : 'text-slate-500 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-white/5'}`}
                >
                  <span className="material-symbols-outlined">mail</span>
                  Inbox
                </Link>
                <div className="flex items-center gap-3 px-5 py-4 text-slate-300 dark:text-zinc-700 cursor-not-allowed opacity-50">
                  <span className="material-symbols-outlined">analytics</span>
                  <span className="text-sm font-bold">Analytics</span>
                </div>
              </nav>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">System</h3>
              <nav className="space-y-1">
                <Link 
                  href="/auth" 
                  className="flex items-center gap-3 px-5 py-4 rounded-[1.5rem] text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-white/5 font-bold text-sm transition-all"
                >
                  <span className="material-symbols-outlined">person</span>
                  Profile
                </Link>
              </nav>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 dark:border-white/5">
           <div className="flex items-center gap-3 px-4">
             <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-black">A</div>
             <div>
               <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest leading-none">Console Area</p>
               <p className="text-[9px] text-slate-400 mt-1 uppercase tracking-tighter">Root Administrator</p>
             </div>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 w-full bg-white dark:bg-black overflow-y-auto">
        <div className="max-w-[1240px] mx-auto p-6 md:p-12 lg:p-16 animate-in fade-in slide-in-from-bottom duration-1000">
          {children}
        </div>
      </div>
    </div>
  );
}
