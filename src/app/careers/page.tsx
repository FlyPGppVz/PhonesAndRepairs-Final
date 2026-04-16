'use client';

import React from 'react';

export default function CareersPage() {
  return (
    <main className="pt-32 pb-24 dark:bg-black min-h-screen">
      <section className="max-w-[1440px] mx-auto px-6 md:px-8 text-center space-y-8 mb-24 animate-in fade-in slide-in-from-top-5 duration-700">
        <span className="text-blue-600 dark:text-blue-500 font-bold tracking-[0.3em] uppercase text-xs">Join the Elite</span>
        <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight">
          Craft Your <br/>
          <span className="text-blue-600 dark:text-blue-500 italic">Future.</span>
        </h1>
        <p className="text-xl text-slate-500 dark:text-zinc-400 leading-relaxed font-medium max-w-2xl mx-auto">
          We’re looking for master technicians and tech enthusiasts who believe in precision, quality, and the art of repair.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-8 space-y-8">
        {[
          { title: 'Master Senior Technician', type: 'Full-time', loc: 'Dearborn, MI', icon: 'precision_manufacturing' },
          { title: 'Customer Experience Lead', type: 'Full-time', loc: 'Dearborn, MI', icon: 'support_agent' },
          { title: 'Operations Manager', type: 'Full-time', loc: 'Hybrid', icon: 'settings_account_box' }
        ].map((job, i) => (
          <div key={i} className="cupertino-glass dark:bg-zinc-900/40 p-8 md:p-10 rounded-[2.5rem] border border-white/20 dark:border-white/5 shadow-xl group hover:shadow-blue-500/10 hover:scale-[1.01] transition-all duration-500 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="bg-slate-100 dark:bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center">
                <span className="material-symbols-outlined text-blue-600 dark:text-blue-500 text-3xl">{job.icon}</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold dark:text-white">{job.title}</h3>
                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-zinc-400 font-bold uppercase tracking-widest">
                  <span>{job.type}</span>
                  <span className="text-slate-300 dark:text-zinc-700">•</span>
                  <span>{job.loc}</span>
                </div>
              </div>
            </div>
            <button className="bg-slate-900 dark:bg-white text-white dark:text-black px-10 py-4 rounded-full font-bold hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white transition-all active:scale-95">
              Apply Now
            </button>
          </div>
        ))}
      </section>

      <section className="bg-slate-50 dark:bg-zinc-900/20 py-32 mt-32 border-t border-slate-200 dark:border-white/5">
        <div className="max-w-[1440px] mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">Why work with us?</h2>
            <div className="space-y-10">
              {[
                { title: 'Training Program', desc: 'Sponsorship for industry-leading certifications from top tech manufacturers.' },
                { title: 'Premium Labs', desc: 'Work with medical-grade microscopes and top-tier diagnostic equipment.' },
                { title: 'Culture of Excellence', desc: 'Join a team that values precision and customer satisfaction above all else.' }
              ].map((benefit, i) => (
                <div key={i} className="flex gap-6">
                  <span className="material-symbols-outlined text-blue-600 dark:text-blue-500 text-3xl">verified</span>
                  <div className="space-y-1">
                    <h4 className="text-xl font-bold dark:text-white">{benefit.title}</h4>
                    <p className="text-slate-500 dark:text-zinc-400 font-medium leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 relative">
            <img className="w-full h-full object-cover" src="https://img1.wsimg.com/isteam/getty/494389158/:/cr=t:0%25,l:16.74%25,w:66.52%25,h:100%25/rs=w:1440,h:810,cg:true" alt="Our Team" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-12">
              <p className="text-white font-bold text-2xl italic">"The precision we demand is matched only by the respect we show our experts."</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
