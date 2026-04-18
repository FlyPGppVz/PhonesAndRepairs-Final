import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-slate-50 transition-colors duration-500">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 px-8 py-20 max-w-[1440px] mx-auto">
        <div className="col-span-2 lg:col-span-1 space-y-6">
          <div className="font-black text-2xl text-slate-900 tracking-tighter">CellphonesAndRepair.</div>
          <p className="font-sans text-sm text-slate-500 max-w-xs leading-relaxed font-medium">
            Precision engineering for your digital life. Master technical solutions for mobile hardware, tablets, and gaming consoles.
          </p>
        </div>
        
        <div className="flex flex-col gap-5">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Repairs</p>
          <Link className="text-sm text-slate-600 hover:text-blue-600 transition-all font-medium" href="/repairs/iphone">iPhone</Link>
          <Link className="text-sm text-slate-600 hover:text-blue-600 transition-all font-medium" href="/repairs/android">Android</Link>
          <Link className="text-sm text-slate-600 hover:text-blue-600 transition-all font-medium" href="/repairs/ipad-tablet">iPad & Tablet</Link>
          <Link className="text-sm text-slate-600 hover:text-blue-600 transition-all font-medium" href="/repairs/consoles">Consoles</Link>
        </div>

        <div className="flex flex-col gap-5">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Company</p>
          <Link className="text-sm text-slate-600 hover:text-blue-600 transition-all font-medium" href="/about">About Us</Link>
          <Link className="text-sm text-slate-600 hover:text-blue-600 transition-all font-medium" href="/careers">Careers</Link>
          <Link className="text-sm text-slate-600 hover:text-blue-600 transition-all font-medium" href="/sustainability">Sustainability</Link>
        </div>

        <div className="flex flex-col gap-5">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Support</p>
          <Link className="text-sm text-slate-600 hover:text-blue-600 transition-all font-medium" href="/contact">Contact</Link>
          <Link className="text-sm text-slate-600 hover:text-blue-600 transition-all font-medium" href="/services">Our Services</Link>
          <Link className="text-sm text-slate-600 hover:text-blue-600 transition-all font-medium" href="#">Help Center</Link>
        </div>

        <div className="flex flex-col gap-5">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Legal</p>
          <Link className="text-sm text-slate-600 hover:text-blue-600 transition-all font-medium" href="/privacy-policy">Privacy Policy</Link>
          <Link className="text-sm text-slate-600 hover:text-blue-600 transition-all font-medium" href="/terms">Terms</Link>
          <Link className="text-sm text-slate-600 hover:text-blue-600 transition-all font-medium" href="/cookies">Cookies</Link>
        </div>
      </div>

      <div className="px-8 py-10 border-t border-slate-200/50 max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <img 
            src="/assets/img/admin-logo.png" 
            alt="Blink Services Logo" 
            className="w-10 h-auto transition-all"
          />
          <p className="font-sans text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-relaxed">
            POWERED BY BLINK SERVICES LLC, BUILD FOR THE ELITE.
          </p>
        </div>
      </div>
    </footer>
  );
}
