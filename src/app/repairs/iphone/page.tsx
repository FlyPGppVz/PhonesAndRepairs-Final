'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function IPhoneRepairs() {
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
        device_category: 'iPhone',
        device_model: formData.get('model'),
        type: 'repair_request',
        status: 'pending'
      }]);

      if (error) throw error;
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-24 dark:bg-black min-h-screen">
      {/* Hero */}
      <section className="px-6 md:px-8 py-16 md:py-24 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-5 space-y-8 animate-in fade-in slide-in-from-left-5 duration-700">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-500 text-xs font-bold tracking-[0.2em] uppercase">Expert Solutions</span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[1] dark:text-white">
            iPhone <br/>
            <span className="text-blue-600 dark:text-blue-500 italic">Precision.</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-zinc-400 max-w-md leading-relaxed font-medium">
            Surgical-grade screen replacements and technical restorations. We treat your device like the masterpiece it is.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="https://wa.me/13132006000" target="_blank" className="px-10 py-5 glass-green text-green-700 rounded-full font-bold text-lg border border-green-500/20 hover:bg-green-500/10 transition-all flex items-center gap-3 active:scale-95">
              <span className="material-symbols-outlined font-bold">chat</span>
              WhatsApp Us
            </a>
          </div>
        </div>
        
        <div className="lg:col-span-7 relative group animate-in fade-in slide-in-from-right-5 duration-700">
          <div className="aspect-[16/10] rounded-[3rem] overflow-hidden bg-slate-100 dark:bg-zinc-800 shadow-2xl border border-white/10">
            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCfaQ_DkRYZnP16W9cWoOHF6KNN2pbPVaNudQJOlITzpZBdjpuZ22B5_q8fgG6V6WIDC7iWiQwBdDgrcHxlxf-6NDOvpnE6U5QFIg5u9AS-zcHU3lNLeJhIaFTwRMpyiycAqPfDPww_GDvm2xKdb-JALlsgLoEo4f6nEG8TIAuevloq3_0WfNx1HiyDI00twWxUFBLbK3fcbvh1mocH5RTMB3o3Vj1sVbxMuSAw6_rGLpg5v0FzpT2mHMqu_C3285vit39xnyU3F8" alt="iPhone Repair" />
          </div>
          <div className="absolute -bottom-10 -left-10 cupertino-glass dark:bg-zinc-900/60 p-8 rounded-[2rem] shadow-2xl max-w-sm hidden md:block border border-white/20 dark:border-white/5">
             <div className="flex items-center gap-4 mb-3">
              <span className="material-symbols-outlined text-blue-500 text-3xl font-bold">verified</span>
              <p className="font-black dark:text-white">Certified Techs</p>
            </div>
            <p className="text-sm text-slate-500 dark:text-zinc-400 font-medium leading-relaxed">Every repair undergoes a 25-point performance verification protocol before handover.</p>
          </div>
        </div>
      </section>

      {/* Booking Bento */}
      <section className="bg-slate-50 dark:bg-zinc-900/20 py-32 px-6 md:px-8 border-y border-slate-200 dark:border-white/5 transition-colors duration-500">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 cupertino-glass dark:bg-zinc-900/40 p-12 md:p-16 rounded-[3rem] border border-white/20 dark:border-white/5 shadow-2xl">
            <div className="mb-12">
              <h2 className="text-4xl font-black mb-4 dark:text-white">Request an Appointment.</h2>
              <p className="text-lg text-slate-500 dark:text-zinc-400 font-medium italic">Fill in the technical specifications for a prioritized quote.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-2">Full Name</label>
                  <input name="name" required className="w-full bg-slate-100 dark:bg-black border-none rounded-2xl px-6 py-4.5 focus:ring-2 focus:ring-blue-500/50 transition-all font-bold dark:text-white" placeholder="John Doe" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-2">iPhone Model</label>
                  <input name="model" required className="w-full bg-slate-100 dark:bg-black border-none rounded-2xl px-6 py-4.5 focus:ring-2 focus:ring-blue-500/50 transition-all font-bold dark:text-white" placeholder="e.g. iPhone 15 Pro Max" type="text" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-2">Email Address</label>
                <input name="email" required className="w-full bg-slate-100 dark:bg-black border-none rounded-2xl px-6 py-4.5 focus:ring-2 focus:ring-blue-500/50 transition-all font-bold dark:text-white" placeholder="name@example.com" type="email" />
              </div>
              
              {success && (
                <div className="p-6 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl font-bold text-center">
                  Appointment request sent! Check your inbox soon.
                </div>
              )}

              <button disabled={loading} className="w-full py-5 bg-blue-600 text-white rounded-full font-bold text-xl shadow-xl shadow-blue-500/20 hover:bg-blue-700 active:scale-[0.98] transition-all min-h-[64px]">
                {loading ? 'Processing...' : 'Confirm Request'}
              </button>
            </form>
          </div>

          <div className="flex flex-col gap-8">
            <div className="bg-zinc-900 text-white p-12 rounded-[3rem] flex-1 flex flex-col justify-between relative overflow-hidden group shadow-2xl">
              <div className="relative z-10">
                <h3 className="text-3xl font-black mb-6">Express Fix</h3>
                <p className="text-zinc-400 font-medium leading-relaxed">
                  Screen and battery replacements completed in under 45 minutes by on-site technicians.
                </p>
              </div>
              <div className="mt-12 group-hover:scale-110 transition-transform flex items-center gap-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-zinc-900 bg-zinc-800 overflow-hidden">
                       <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Tech" />
                    </div>
                  ))}
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Technicians Available</span>
              </div>
              <span className="material-symbols-outlined absolute -right-10 -bottom-10 text-[15rem] opacity-[0.03] rotate-12">bolt</span>
            </div>

            <div className="bg-blue-600 text-white p-12 rounded-[3rem] group hover:scale-[1.02] transition-all shadow-2xl shadow-blue-600/20">
              <span className="material-symbols-outlined text-4xl mb-6 font-bold">verified_user</span>
              <h3 className="text-2xl font-black mb-4 tracking-tight">30-Day Warranty</h3>
              <p className="text-blue-100 font-medium leading-relaxed">We stand by our craftsmanship. Every part and labor comes with a full guarantee.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Grid */}
      <section className="py-32 px-6 md:px-8 max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4">
            <h2 className="text-5xl font-black dark:text-white tracking-tight leading-tight">Our Expertise.</h2>
            <p className="text-xl text-slate-500 dark:text-zinc-400 font-medium max-w-lg">Advanced micro-soldering and authentic component integration for all generations.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: 'screenshot', title: 'Display Module', desc: 'Retina and ProMotion display restoration with True Tone calibration.' },
            { icon: 'battery_charging_full', title: 'Power Cells', desc: 'Original capacity battery replacements with health cycle optimization.' },
            { icon: 'photo_camera', title: 'Optics & Sensors', desc: 'Sapphire lens repair and LiDAR sensor realignment.' },
            { icon: 'water_drop', title: 'Liquid Damage', desc: 'Ultrasonic cleaning and moisture-wicking component stabilization.' }
          ].map((item, i) => (
             <div key={i} className="cupertino-glass dark:bg-zinc-900/40 p-10 rounded-[2.5rem] border border-white/20 dark:border-white/5 shadow-xl group hover:shadow-blue-500/10 transition-all duration-500">
                <span className="material-symbols-outlined text-4xl text-blue-600 dark:text-blue-500 mb-6 font-bold">{item.icon}</span>
                <h4 className="text-xl font-bold dark:text-white mb-4">{item.title}</h4>
                <p className="text-slate-500 dark:text-zinc-400 font-medium leading-relaxed text-sm">{item.desc}</p>
             </div>
          ))}
        </div>
      </section>
    </main>
  );
}
