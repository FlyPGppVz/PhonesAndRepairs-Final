import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-neutral-950 transition-colors duration-500">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 px-8 py-20 max-w-[1440px] mx-auto">
        <div className="col-span-2 lg:col-span-1 space-y-6">
          <div className="font-black text-2xl text-slate-900 dark:text-white tracking-tighter">PhonesAndRepairs.</div>
          <p className="font-sans text-sm text-slate-500 dark:text-zinc-400 max-w-xs leading-relaxed font-medium">
            Precision engineering for your digital life. Master technical solutions for mobile hardware, tablets, and gaming consoles.
          </p>
        </div>
        
        <div className="flex flex-col gap-5">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Repairs</p>
          <Link className="text-sm text-slate-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-white transition-all font-medium" href="/repairs/iphone">iPhone</Link>
          <Link className="text-sm text-slate-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-white transition-all font-medium" href="/repairs/android">Android</Link>
          <Link className="text-sm text-slate-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-white transition-all font-medium" href="/repairs/ipad-tablet">iPad & Tablet</Link>
          <Link className="text-sm text-slate-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-white transition-all font-medium" href="/repairs/consoles">Consoles</Link>
        </div>

        <div className="flex flex-col gap-5">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Company</p>
          <Link className="text-sm text-slate-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-white transition-all font-medium" href="/about">About Us</Link>
          <Link className="text-sm text-slate-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-white transition-all font-medium" href="/careers">Careers</Link>
          <Link className="text-sm text-slate-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-white transition-all font-medium" href="/sustainability">Sustainability</Link>
          <Link className="text-sm text-slate-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-white transition-all font-medium" href="/locations">Locations</Link>
        </div>

        <div className="flex flex-col gap-5">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Support</p>
          <Link className="text-sm text-slate-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-white transition-all font-medium" href="/contact">Contact</Link>
          <Link className="text-sm text-slate-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-white transition-all font-medium" href="/services">Our Services</Link>
          <Link className="text-sm text-slate-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-white transition-all font-medium" href="#">Help Center</Link>
        </div>

        <div className="flex flex-col gap-5">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Legal</p>
          <Link className="text-sm text-slate-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-white transition-all font-medium" href="/privacy-policy">Privacy Policy</Link>
          <Link className="text-sm text-slate-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-white transition-all font-medium" href="/terms">Terms</Link>
          <Link className="text-sm text-slate-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-white transition-all font-medium" href="/cookies">Cookies</Link>
        </div>
      </div>

      <div className="px-8 py-10 border-t border-slate-200/50 dark:border-slate-800/50 max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="font-sans text-xs font-bold text-slate-400 uppercase tracking-widest">© 2024 PhonesAndRepairs. Built for the elite.</p>
        <div className="flex gap-6">
          <span className="material-symbols-outlined text-slate-400 hover:text-blue-600 transition-colors cursor-pointer">facebook</span>
          <span className="material-symbols-outlined text-slate-400 hover:text-blue-600 transition-colors cursor-pointer">potted_plant</span>
          <span className="material-symbols-outlined text-slate-400 hover:text-blue-600 transition-colors cursor-pointer">shield</span>
        </div>
      </div>
    </footer>
  );
}
