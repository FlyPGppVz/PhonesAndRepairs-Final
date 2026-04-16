'use client';

import React from 'react';

export default function LocationsPage() {
  return (
    <main className="pt-32 pb-24 dark:bg-black min-h-screen">
      <section className="max-w-[1440px] mx-auto px-6 md:px-8 mb-20 animate-in fade-in slide-in-from-top-5 duration-700">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">Our Store.</h1>
          <p className="text-xl text-slate-500 dark:text-zinc-400 leading-relaxed font-medium">
            Visit our state-of-the-art repair lab in Dearborn, MI. We offer same-day diagnostics and premium part sourcing.
          </p>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        <div className="md:col-span-12 lg:col-span-5 space-y-8 animate-in fade-in slide-in-from-left-5 duration-700 delay-100">
          <div className="cupertino-glass dark:bg-zinc-900/40 p-10 md:p-14 rounded-[3rem] border border-white/20 dark:border-white/5 shadow-2xl space-y-12 h-full flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-black mb-8 dark:text-white tracking-tighter">Dearborn Lab</h2>
              <div className="space-y-10">
                <div className="flex items-start gap-6">
                  <div className="bg-blue-600/10 p-3 rounded-2xl border border-blue-500/20">
                    <span className="material-symbols-outlined text-blue-500 text-3xl">location_on</span>
                  </div>
                  <p className="text-xl font-medium leading-relaxed dark:text-white">
                    14631 W Warren Ave<br />
                    Dearborn, MI 48126, USA
                  </p>
                </div>
                <div className="flex items-start gap-6">
                   <div className="bg-blue-600/10 p-3 rounded-2xl border border-blue-500/20">
                    <span className="material-symbols-outlined text-blue-500 text-3xl">call</span>
                  </div>
                  <a href="tel:+13132006000" className="text-2xl font-black text-blue-600 dark:text-blue-500 hover:text-blue-400 transition-colors tracking-tight">
                    +1 313 200 6000
                  </a>
                </div>
              </div>
            </div>
            
            <div className="pt-10 border-t border-slate-100 dark:border-white/5">
              <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-6">Store Integrity</h4>
              <p className="text-sm text-slate-500 dark:text-zinc-400 font-medium leading-relaxed">
                Our facility is equipped with ISO-certified dust-free workstations and medical-grade microscopic diagnostics.
              </p>
            </div>
          </div>
        </div>

        <div className="md:col-span-12 lg:col-span-7 rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 h-[500px] lg:h-[700px] animate-in fade-in slide-in-from-right-5 duration-700 delay-200">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2950.4854580665287!2d-83.1901043234584!3d42.342838771195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883b34c9f238ac33%3A0xea54ff5ed868369e!2s14631%20W%20Warren%20Ave%2C%20Dearborn%2C%20MI%2048126!5e0!3m2!1sen!2sus!4v1712629837123!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
            className="grayscale dark:invert dark:opacity-80 transition-all duration-1000"
          ></iframe>
        </div>
      </section>
    </main>
  );
}
