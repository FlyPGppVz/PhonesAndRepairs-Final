'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

export default function ConsoleRepairs() {
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
        device_category: 'Gaming Console',
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
      <section className="px-6 md:px-8 py-16 md:py-24 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-6 space-y-8 animate-in fade-in slide-in-from-left-5 duration-700">
          <span className="text-blue-600 dark:text-blue-500 font-bold tracking-[0.3em] uppercase text-xs">Precision Engineering</span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter dark:text-white leading-[1.1]">
            Resurrect Your <span className="text-blue-600 dark:text-blue-500 italic">Play.</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-zinc-400 max-w-lg leading-relaxed font-medium">
            Expert diagnostics and component-level repairs for PlayStation, Xbox, and Nintendo systems. We restore performance to factory standards.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <a href="https://wa.me/13132006000" target="_blank" className="px-10 py-5 glass-green text-green-700 rounded-full font-bold text-lg border border-green-500/20 hover:bg-green-500/10 transition-all flex items-center gap-3 active:scale-95">
              <span className="material-symbols-outlined font-bold">chat</span>
              Schedule via WhatsApp
            </a>
          </div>
        </div>
        
        <div className="lg:col-span-6 relative h-[500px] lg:h-[700px] animate-in fade-in slide-in-from-right-5 duration-700 group">
          <div className="absolute inset-0 bg-blue-600/5 rounded-[3rem] transform rotate-3 group-hover:rotate-0 transition-transform duration-700"></div>
          <img className="absolute inset-0 w-full h-full object-cover rounded-[3rem] shadow-2xl transition-transform duration-1000 group-hover:scale-[1.02]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBI2q7v1J_fNyxcGjs74fW4qRoXLfUOVSKwazHfVd_-u7xXNOJhZUJg72mZWQfgdqYOYFw8b_nUPVRLPa-LECepHnCVsJE8HQN2xknjUWKk8m1wWIEI35Hnh7OzBrjDVVzP4jB1woFUMQXVGMn3EQcwVhsR7Nt4khMYPzNpumnMqxNzjEzmte3nFwuTuZpWWUFQDIgsV3cJXMZEnvVvvxFxu_Ungwb0Fz-BRqryiyvu-ZHHVBVYMdAhBbSLFUoftFyUzy7oGW_T7p0" alt="Console Repair" />
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="bg-slate-50 dark:bg-zinc-900/20 py-32 px-6 md:px-8 border-y border-slate-200 dark:border-white/5">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 cupertino-glass dark:bg-zinc-900/40 p-12 rounded-[2.5rem] flex flex-col justify-between border border-white/20 dark:border-white/5 shadow-xl group hover:shadow-blue-500/10 transition-all">
            <div>
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-500 text-5xl mb-8">settings_input_hdmi</span>
              <h3 className="text-3xl font-black mb-6 dark:text-white">HDMI Port Replacement</h3>
              <p className="text-slate-500 dark:text-zinc-400 font-medium text-lg leading-relaxed max-w-xl">
                No signal? We perform microscopic soldering to replace damaged ports with original OEM specifications.
              </p>
            </div>
          </div>

          <div className="bg-zinc-900 text-white p-12 rounded-[2.5rem] flex flex-col justify-between shadow-2xl overflow-hidden relative group">
            <span className="material-symbols-outlined text-blue-500 text-5xl mb-8">thermostat</span>
            <h3 className="text-3xl font-bold mb-6">Thermal Management</h3>
            <p className="text-zinc-400 leading-relaxed font-medium">Combat overheating with high-conductivity thermal paste and deep system cleaning.</p>
            <span className="material-symbols-outlined absolute -right-10 -bottom-10 text-[15rem] opacity-[0.03] rotate-12 group-hover:scale-110 transition-transform">ac_unit</span>
          </div>

          <div className="cupertino-glass dark:bg-zinc-900/40 p-12 rounded-[2.5rem] border border-white/20 dark:border-white/5 shadow-xl">
            <span className="material-symbols-outlined text-blue-600 dark:text-blue-500 text-5xl mb-8">joystick</span>
            <h3 className="text-3xl font-bold mb-6 dark:text-white">Joy-Con Drift</h3>
            <p className="text-slate-500 dark:text-zinc-400 font-medium leading-relaxed">Permanent fixes for analog stick drift. Same-day service available for most handhelds.</p>
          </div>

          <div className="md:col-span-2 cupertino-glass dark:bg-zinc-900/40 p-12 rounded-[2.5rem] border border-white/20 dark:border-white/5 flex items-center gap-12 shadow-xl group hover:shadow-blue-500/10 transition-all">
            <div className="flex-1 space-y-6">
               <h3 className="text-3xl font-bold dark:text-white">Disc Drive Recovery</h3>
               <p className="text-slate-500 dark:text-zinc-400 font-medium leading-relaxed italic">Mechanical repairs for jammed drives and laser lens replacements.</p>
            </div>
            <div className="w-48 h-48 bg-slate-100 dark:bg-black rounded-full flex items-center justify-center border border-white/5">
               <span className="material-symbols-outlined text-7xl text-blue-600/20 group-hover:scale-110 group-hover:text-blue-600 transition-all duration-700">album</span>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Slot */}
      <section className="py-32 px-6 md:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black dark:text-white tracking-tight">Secure Your Slot.</h2>
          <p className="text-xl text-slate-500 dark:text-zinc-400 font-medium italic">Our lead technician will contact you within 2 business hours.</p>
        </div>
        <div className="cupertino-glass dark:bg-zinc-900/40 p-10 md:p-14 rounded-[3rem] border border-white/20 dark:border-white/5 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="relative group">
              <input name="name" required className="peer w-full bg-transparent border-t-0 border-x-0 border-b-2 border-slate-300 dark:border-zinc-700 py-4 px-0 focus:ring-0 focus:border-blue-500 transition-all text-xl font-bold dark:text-white placeholder-transparent" id="name" placeholder="Name" type="text" />
              <label className="absolute left-0 top-4 text-slate-400 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-500 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs uppercase font-black tracking-widest" htmlFor="name">Full Name</label>
            </div>
            <div className="relative group">
              <input name="model" required className="peer w-full bg-transparent border-t-0 border-x-0 border-b-2 border-slate-300 dark:border-zinc-700 py-4 px-0 focus:ring-0 focus:border-blue-500 transition-all text-xl font-bold dark:text-white placeholder-transparent" id="model" placeholder="Model" type="text" />
              <label className="absolute left-0 top-4 text-slate-400 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-500 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs uppercase font-black tracking-widest" htmlFor="model">Console Model (e.g. PS5 Slim)</label>
            </div>
            <div className="relative group">
              <input name="email" required className="peer w-full bg-transparent border-t-0 border-x-0 border-b-2 border-slate-300 dark:border-zinc-700 py-4 px-0 focus:ring-0 focus:border-blue-500 transition-all text-xl font-bold dark:text-white placeholder-transparent" id="email" placeholder="Email" type="email" />
              <label className="absolute left-0 top-4 text-slate-400 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-500 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs uppercase font-black tracking-widest" htmlFor="email">Email Address</label>
            </div>

            {success && (
              <div className="p-6 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl font-bold text-center">
                Appointment Sent! We'll reply shortly.
              </div>
            )}

            <button disabled={loading} className="w-full bg-blue-600 text-white py-6 rounded-full font-black text-xl shadow-xl shadow-blue-500/20 hover:bg-blue-700 active:scale-[0.98] transition-all min-h-[72px]">
              {loading ? 'Transmitting...' : 'Confirm Appointment'}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
