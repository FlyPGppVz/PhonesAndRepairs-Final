'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="pt-24 dark:bg-black min-h-screen">
      {/* Hero Section */}
      <section className="px-6 md:px-8 py-20 md:py-32 max-w-[1440px] mx-auto text-center space-y-12">
        <div className="animate-in fade-in zoom-in duration-1000">
           <span className="inline-block px-6 py-2 rounded-full glass-blue text-blue-600 dark:text-blue-400 text-xs font-black tracking-[0.3em] uppercase mb-8 border border-blue-500/20">
            Next-Gen Tech Hub
          </span>
          <h1 className="text-6xl md:text-[9rem] font-black tracking-tighter leading-[0.8] dark:text-white mb-12">
            DESIGNED<br/>
            <span className="text-slate-300 dark:text-zinc-800 italic">TO BE</span><br/>
            REPAIRED.
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 dark:text-zinc-400 max-w-2xl mx-auto font-medium leading-relaxed mb-16">
            Elite diagnostics, surgical precision, and a curated selection of the world's most powerful mobile hardware.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link href="/shop" className="px-14 py-6 bg-blue-600 text-white rounded-full font-black text-xl shadow-2xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all w-full md:w-auto">
              Shop Devices
            </Link>
            <Link href="/services" className="px-14 py-6 cupertino-glass border border-slate-200 dark:border-white/10 dark:text-white rounded-full font-black text-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all w-full md:w-auto">
              Repair Request
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="px-6 md:px-8 py-32 bg-slate-50 dark:bg-zinc-900/10 border-y border-slate-200 dark:border-white/5">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Main Feature */}
          <div className="md:col-span-8 group relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-700">
            <img 
               src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTqT6E8-J-W8t9W2SjZ5c_Y6u-nK9-R-L-Q-V-Y-H-X-X-X-X-X-X-X-X-X" 
               alt="iPhone 16 Pro" 
               className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-16 flex flex-col justify-end gap-6 text-white">
               <span className="text-xs font-black tracking-[0.3em] uppercase opacity-70">New Arrival</span>
               <h2 className="text-5xl font-black tracking-tight">iPhone 16 Pro Max</h2>
               <p className="text-xl text-zinc-300 max-w-md font-medium">Titanium. Intelligence. Professional precision.</p>
               <Link href="/shop/iphone-16-pro-max" className="w-fit px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-blue-600 hover:text-white transition-all">Buy Now</Link>
            </div>
          </div>

          <div className="md:col-span-4 space-y-8">
            <div className="cupertino-glass dark:bg-zinc-900/40 p-12 h-full rounded-[3rem] border border-white/20 dark:border-white/5 shadow-xl flex flex-col justify-between group cursor-pointer hover:border-blue-500/30 transition-all">
               <div>
                  <span className="material-symbols-outlined text-5xl text-blue-600 mb-8">verified_user</span>
                  <h3 className="text-3xl font-black mb-4 dark:text-white uppercase tracking-tighter">Elite Warranty</h3>
                  <p className="text-slate-500 dark:text-zinc-400 font-medium leading-relaxed">Every repair includes our 30-day technical integrity guarantee.</p>
               </div>
               <span className="material-symbols-outlined text-slate-300 dark:text-zinc-800 self-end text-6xl group-hover:text-blue-600 transition-colors">arrow_forward</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Quick Access */}
      <section className="py-32 px-6 md:px-8 max-w-[1440px] mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-20 dark:text-white underline decoration-blue-600 underline-offset-8">SPECIALIZED SERVICES.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'iPhone', icon: 'smartphone', link: '/repairs/iphone' },
            { name: 'Android', icon: 'android', link: '/repairs/android' },
            { name: 'iPad & Tablet', icon: 'tablet_mac', link: '/repairs/ipad-tablet' },
            { name: 'Consoles', icon: 'stadia_controller', link: '/repairs/consoles' }
          ].map((service) => (
            <Link key={service.name} href={service.link} className="group p-12 cupertino-glass dark:bg-zinc-900/20 rounded-[2.5rem] border border-slate-100 dark:border-white/5 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all">
              <span className="material-symbols-outlined text-6xl text-slate-400 group-hover:text-blue-600 transition-colors mb-8 block">{service.icon}</span>
              <h3 className="text-xl font-black dark:text-white tracking-widest uppercase">{service.name}</h3>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
