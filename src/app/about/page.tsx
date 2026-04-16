'use client';

import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="pt-24 dark:bg-black min-h-screen">
      {/* Hero Section */}
      <section className="pb-24 px-6 md:px-8 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-16">
        <div className="space-y-8 animate-in fade-in slide-in-from-left-5 duration-700">
          <span className="text-blue-600 dark:text-blue-500 font-bold tracking-[0.2em] uppercase text-xs">Our Legacy</span>
          <h1 className="text-6xl md:text-8xl leading-[1.05] font-black tracking-tighter text-slate-900 dark:text-white">
            Expert <br className="hidden md:block"/>
            <span className="text-blue-600 dark:text-blue-500 italic">Repair.</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-zinc-400 max-w-lg leading-relaxed font-medium">
            At Cell Phone and Repair, we specialize in high-quality repair services for all mobile devices. Our experienced technicians are trained to handle everything from screen replacements to complex motherboard diagnostics.
          </p>
          <div className="flex gap-4 pt-4">
            <Link href="/services" className="bg-blue-600 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/20 active:scale-95 inline-block">
              View Our Services
            </Link>
          </div>
        </div>

        <div className="relative group animate-in fade-in slide-in-from-right-5 duration-700">
          <div className="aspect-square bg-slate-100 dark:bg-zinc-800 rounded-[3rem] overflow-hidden relative shadow-2xl border border-white/10">
            <img 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCt5ucahiVmhuhhmiyZ4gcRSeKengqiKCqatWjOjHDeHZCB4njMN9-zw3Dlx6W5IB0jo0EZyB7UlXwapqE9kELrn8_U_Qv-JVxuA2SgUPUA1tuvkXtJdJZw8mUDaunQRSlElsURDmSVww0GRBF2Yk4GGHIK2I2pAjr3pSX6UkUIn-Qav9kxzaW-LnzKRPxCeiEMp3NM3NGJV6Mq_IW2xdsATo0cFigl3agCskFnk01iu_CGR_KDpz_XKCu5LULFVHQ5A6JarluKN94"
              alt="Precision Repair Lab"
            />
          </div>
          <div className="absolute -bottom-10 -left-10 cupertino-glass dark:bg-zinc-900/60 p-8 rounded-[2rem] shadow-2xl max-w-sm hidden md:block border border-white/20 dark:border-white/5 animate-bounce-slow">
            <p className="text-xl font-bold dark:text-white mb-2 tracking-tight">0.01mm Precision</p>
            <p className="text-sm text-slate-500 dark:text-zinc-400 font-medium leading-relaxed">Our technicians use industry-leading calibration tools for every logic board repair, ensuring factory-standard results.</p>
          </div>
        </div>
      </section>

      {/* Bento Grid: The Pillars */}
      <section className="py-32 bg-slate-50 dark:bg-zinc-900/20 px-6 md:px-8 border-y border-slate-200 dark:border-white/5 transition-colors duration-500">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-20 text-center lg:text-left space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">Built on Excellence.</h2>
            <p className="text-xl text-slate-500 dark:text-zinc-400 max-w-2xl font-medium">The three core pillars that define our daily operations and our promise to you.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            {/* Tech Column */}
            <div className="col-span-1 md:col-span-2 lg:col-span-2 cupertino-glass dark:bg-zinc-900/40 p-12 rounded-[2.5rem] flex flex-col justify-between border border-white/20 dark:border-white/5 shadow-xl hover:shadow-blue-500/10 transition-all duration-500 h-full">
              <div>
                <div className="bg-blue-600/10 text-blue-600 w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-10 transition-transform group-hover:scale-110">
                  <span className="material-symbols-outlined text-3xl">precision_manufacturing</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-8">The Precision Behind the Repair.</h3>
                <p className="text-lg text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                  Every technician at CellphonesAndRepair undergoes over 500 hours of rigorous training. No one knows device architecture like our experts. From water damage to micro-soldering, our team is certified by the world's leading technology manufacturers.
                </p>
              </div>
              <div className="flex items-center gap-6 border-t border-slate-200 dark:border-white/10 pt-10 mt-12">
                <div className="flex -space-x-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white dark:border-zinc-800 shadow-lg overflow-hidden">
                      <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Technician" />
                    </div>
                  ))}
                </div>
                <span className="text-blue-600 dark:text-blue-500 font-bold hover:gap-8 gap-4 flex items-center transition-all cursor-pointer">Meet the Technicians <span className="material-symbols-outlined">arrow_forward</span></span>
              </div>
            </div>

            {/* Sustainability Card */}
            <div className="col-span-1 lg:col-span-1 bg-zinc-900 text-white p-12 rounded-[2.5rem] flex flex-col h-full border border-white/5 shadow-2xl group overflow-hidden relative">
              <div className="relative z-10">
                <span className="material-symbols-outlined text-5xl mb-10 text-emerald-400 group-hover:rotate-12 transition-transform">eco</span>
                <h3 className="text-3xl font-bold mb-6 tracking-tight">Sustainability</h3>
                <p className="text-zinc-400 leading-relaxed font-medium">
                  We believe in a circular economy. By choosing repair over replacement, our customers have helped divert over 15 tons of e-waste from landfills in 2023 alone.
                </p>
              </div>
              <div className="mt-auto pt-12 relative z-10">
                <div className="h-2 bg-zinc-800 rounded-full w-full mb-4">
                  <div className="h-full bg-emerald-400 w-3/4 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.5)]"></div>
                </div>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">75% Reduction Target</p>
              </div>
              <span className="material-symbols-outlined absolute -right-10 -bottom-10 text-[15rem] opacity-[0.03] group-hover:scale-110 transition-transform">eco</span>
            </div>

            {/* Precision Card */}
            <div className="col-span-1 lg:col-span-1 cupertino-glass dark:bg-zinc-900/40 p-12 rounded-[2.5rem] overflow-hidden relative group border border-white/20 dark:border-white/5 shadow-xl hover:shadow-blue-500/10 transition-all duration-500 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-bold mb-6 tracking-tight dark:text-white">Engineering</h3>
                <p className="text-slate-500 dark:text-zinc-400 font-medium leading-relaxed mb-10">
                  No repair is too small. We utilize medical-grade microscopes for board-level diagnostics.
                </p>
              </div>
              <div className="relative rounded-[2rem] overflow-hidden h-40 mt-auto border border-white/10 group-hover:scale-[1.02] transition-transform">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3sbEiUJz_fhlYZcGQjLGMa-sHp2odjXfQQvUp7in6NG0fU9VmrNqXFRJ-Zf36OzFHJIos1Pzqw0gt8JN3XDBZOKAdlzlsFJVA0QCZsIKXnFJjFUoVCvWhdw3zkTHnGkKK1XJfUMS48FO6_o9Tnoyk6WLoGi-oxiPbiLCk3PFNLdSiXTdAouHj0NVQzi9kBHDkdAVdrZ3h9LNUgFnp1cm76Nj9KbH3FTweEY2h6kB7Z9UtsvMuVzuFcqBr1gCN3o7E3ftiRpEA2AU" alt="Microscope view" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="relative py-40 px-6 md:px-8 bg-white dark:bg-black overflow-hidden transition-colors duration-500">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500 rounded-full blur-[150px]"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-12">
          <span className="text-blue-600 dark:text-blue-500 font-black text-sm tracking-[0.3em] uppercase mb-6 block">Our Mission</span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-[1.2] tracking-tight">
            "We strive to ensure that our customers are completely satisfied and leave with a working device and a smile on their face."
          </h2>
          <div className="flex flex-wrap justify-center gap-16 md:gap-24 pt-16 border-t border-slate-100 dark:border-white/5">
            <div className="text-center">
              <p className="text-5xl font-black text-blue-600 dark:text-blue-500 mb-2">12k+</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Devices Saved</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-black text-blue-600 dark:text-blue-500 mb-2">99%</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Success Rate</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-black text-blue-600 dark:text-blue-500 mb-2">15</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Years Excellence</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
