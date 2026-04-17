'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

export default function TabletRepairs() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      const { error } = await supabase.from('appointments_quotes').insert([{
        customer_name: formData.get('name'),
        customer_email: formData.get('email'),
        device_category: 'Tablet',
        device_model: formData.get('model'),
        type: 'repair_request',
        status: 'pending'
      }]);

      if (error) throw error;
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      toast.error('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-24 dark:bg-black min-h-screen">
      <section className="px-6 md:px-8 py-16 md:py-24 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 animate-in fade-in slide-in-from-left-5 duration-700">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-500 text-xs font-bold tracking-[0.2em] uppercase">Large Screen Specialists</span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[1] dark:text-white">
            iPad & <br/>
            <span className="text-blue-600 dark:text-blue-500 italic">Tablets.</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-zinc-400 max-w-md leading-relaxed font-medium">
            From iPad Pro display lamination to charging port replacements. Our technicians specialize in large-format mobile hardware.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
             <a href="https://wa.me/13132006000" target="_blank" className="px-10 py-5 glass-green text-green-700 rounded-full font-bold text-lg border border-green-500/20 hover:bg-green-500/10 transition-all flex items-center gap-3 active:scale-95">
              <span className="material-symbols-outlined font-bold">chat</span>
              Schedule via WhatsApp
            </a>
          </div>
        </div>
        
        <div className="relative group animate-in fade-in slide-in-from-right-5 duration-700">
          <div className="aspect-video rounded-[3rem] overflow-hidden bg-slate-100 dark:bg-zinc-800 shadow-2xl border border-white/10">
            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3sbEiUJz_fhlYZcGQjLGMa-sHp2odjXfQQvUp7in6NG0fU9VmrNqXFRJ-Zf36OzFHJIos1Pzqw0gt8JN3XDBZOKAdlzlsFJVA0QCZsIKXnFJjFUoVCvWhdw3zkTHnGkKK1XJfUMS48FO6_o9Tnoyk6WLoGi-oxiPbiLCk3PFNLdSiXTdAouHj0NVQzi9kBHDkdAVdrZ3h9LNUgFnp1cm76Nj9KbH3FTweEY2h6kB7Z9UtsvMuVzuFcqBr1gCN3o7E3ftiRpEA2AU" alt="Tablet Repair" />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 dark:bg-zinc-900/20 py-32 px-6 md:px-8 border-y border-slate-200 dark:border-white/5">
        <div className="max-w-[1440px] mx-auto">
          <div className="cupertino-glass dark:bg-zinc-900/40 p-12 md:p-20 rounded-[3.5rem] border border-white/20 dark:border-white/5 shadow-2x">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl font-black mb-8 dark:text-white">Get a quote for your tablet repair.</h2>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-2">Your Full Name</label>
                    <input name="name" required className="w-full bg-slate-100 dark:bg-black border-none rounded-2xl px-6 py-5 focus:ring-2 focus:ring-blue-500/50 transition-all font-bold dark:text-white" placeholder="John Doe" type="text" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-2">Tablet Model</label>
                      <input name="model" required className="w-full bg-slate-100 dark:bg-black border-none rounded-2xl px-6 py-5 focus:ring-2 focus:ring-blue-500/50 transition-all font-bold dark:text-white" placeholder="e.g. iPad Pro 12.9 (M2)" type="text" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-2">Email Address</label>
                      <input name="email" required className="w-full bg-slate-100 dark:bg-black border-none rounded-2xl px-6 py-5 focus:ring-2 focus:ring-blue-500/50 transition-all font-bold dark:text-white" placeholder="name@example.com" type="email" />
                    </div>
                  </div>
                  
                  {success && (
                    <div className="p-6 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl font-bold text-center">
                      Technical request received. We'll be in touch!
                    </div>
                  )}

                  <button disabled={loading} className="px-16 py-5 bg-blue-600 text-white rounded-full font-bold text-xl hover:bg-blue-700 active:scale-95 shadow-xl shadow-blue-500/20 disabled:opacity-50 min-h-[72px]">
                    {loading ? 'Transmitting...' : 'Request Quote'}
                  </button>
                </form>
              </div>
              <div className="bg-zinc-900 rounded-[2.5rem] p-12 text-white shadow-2xl space-y-12">
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold tracking-tight">Express Mail-In</h3>
                  <p className="text-zinc-400 font-medium leading-relaxed">Can't make it to the store? We offer secure mail-in repair services with 24-hour turnaround on most tablet models.</p>
                </div>
                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                  <div>
                    <p className="text-4xl font-black text-blue-500 mb-1">24h</p>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Fast Turnaround</p>
                  </div>
                  <div>
                    <p className="text-4xl font-black text-blue-500 mb-1">OEM</p>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Quality Parts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
