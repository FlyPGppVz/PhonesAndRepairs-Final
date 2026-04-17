'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

export default function AndroidRepairs() {
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
        device_category: 'Android',
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
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-500 text-xs font-bold tracking-[0.2em] uppercase">Multi-Brand Excellence</span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[1] dark:text-white">
            Android <br/>
            <span className="text-blue-600 dark:text-blue-500 italic">Reimagined.</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-zinc-400 max-w-md leading-relaxed font-medium">
            From Samsung Galaxy to Google Pixel. We restore all Android ecosystems using genuine components and clinical precision.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <a href="https://wa.me/13132006000" target="_blank" className="px-10 py-5 glass-green text-green-700 rounded-full font-bold text-lg border border-green-500/20 hover:bg-green-500/10 transition-all flex items-center gap-3 active:scale-95">
              <span className="material-symbols-outlined font-bold">chat</span>
              Schedule via WhatsApp
            </a>
          </div>
        </div>
        
        <div className="relative group animate-in fade-in slide-in-from-right-5 duration-700">
          <div className="aspect-[16/10] rounded-[3rem] overflow-hidden bg-slate-100 dark:bg-zinc-800 shadow-2xl border border-white/10">
            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmmqtrq2P4a_CIsU5tZGYZf9Cw_Hw6vlMdlBcHkOXFjpahmCFt3AzwZlsZ65LLnPEa1RMOX0KjGnh0WqMdqTMyqScPZMe20kqlHYhZJawESSq3gX_rgMBlO75C0krj_0rBuP39mv6HHtkWlG_uBqLn2oEXXnMcdA6M1dxs1bcTNEs5HauVNNrXg9SSRWugdtUNugBt91kiyhdqI38Qc3d33aLzXhCOL5pXpyeOyKD6mjpdtjrtxWokGgEc-c-fjZml6rNvlGA9t5Q" alt="Android Repair" />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 dark:bg-zinc-900/20 py-32 px-6 md:px-8 border-y border-slate-200 dark:border-white/5 transition-colors duration-500">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
           <div className="lg:col-span-8 cupertino-glass dark:bg-zinc-900/40 p-12 md:p-16 rounded-[3rem] border border-white/20 dark:border-white/5 shadow-2xl">
            <h2 className="text-4xl font-black mb-12 dark:text-white">Professional Intake Form.</h2>
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="relative group">
                  <input name="name" required className="peer w-full bg-transparent border-t-0 border-x-0 border-b-2 border-slate-300 dark:border-zinc-700 py-4 px-0 focus:ring-0 focus:border-blue-500 transition-all text-xl font-bold dark:text-white placeholder-transparent" id="name" placeholder="Name" type="text" />
                  <label className="absolute left-0 top-4 text-slate-400 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-500 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs uppercase font-black tracking-widest" htmlFor="name">Full Name</label>
                </div>
                <div className="relative group">
                  <input name="model" required className="peer w-full bg-transparent border-t-0 border-x-0 border-b-2 border-slate-300 dark:border-zinc-700 py-4 px-0 focus:ring-0 focus:border-blue-500 transition-all text-xl font-bold dark:text-white placeholder-transparent" id="model" placeholder="Model" type="text" />
                  <label className="absolute left-0 top-4 text-slate-400 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-500 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs uppercase font-black tracking-widest" htmlFor="model">Device Model (e.g. Galaxy S24)</label>
                </div>
              </div>
              <div className="relative group">
                <input name="email" required className="peer w-full bg-transparent border-t-0 border-x-0 border-b-2 border-slate-300 dark:border-zinc-700 py-4 px-0 focus:ring-0 focus:border-blue-500 transition-all text-xl font-bold dark:text-white placeholder-transparent" id="email" placeholder="Email" type="email" />
                <label className="absolute left-0 top-4 text-slate-400 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-500 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs uppercase font-black tracking-widest" htmlFor="email">Email Address</label>
              </div>
              
              {success && (
                <div className="p-6 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl font-bold text-center">
                  Request confirmed. Our technical lead will reply shortly.
                </div>
              )}

              <button disabled={loading} className="px-16 py-5 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full font-bold text-xl hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white transition-all active:scale-95 disabled:opacity-50 min-h-[64px]">
                {loading ? 'Submitting...' : 'Confirm Appointment'}
              </button>
            </form>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="p-10 bg-blue-600 text-white rounded-[3rem] shadow-2xl">
              <span className="material-symbols-outlined text-4xl mb-6 font-bold">memory</span>
              <h3 className="text-2xl font-black mb-4 tracking-tight">Genuine Parts</h3>
              <p className="text-blue-100 font-medium leading-relaxed italic text-sm">We source components directly from certified distributors to ensure system integrity and longevity.</p>
            </div>
            <div className="p-10 cupertino-glass dark:bg-zinc-900/60 rounded-[3rem] border border-white/20 dark:border-white/5 shadow-xl">
              <span className="material-symbols-outlined text-4xl text-blue-600 mb-6 font-bold">verified_user</span>
              <h3 className="text-2xl font-black mb-4 tracking-tight dark:text-white">30-Day Warranty</h3>
              <p className="text-slate-500 dark:text-zinc-400 font-medium leading-relaxed text-sm">Peace of mind guaranteed. All Android repairs come with an extensive warranty on labor and parts.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
