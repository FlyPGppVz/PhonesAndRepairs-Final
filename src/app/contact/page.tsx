'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function ContactPage() {
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
        device_category: 'Contact Form',
        issue_description: formData.get('message'),
        type: 'contact',
        status: 'pending'
      }]);

      if (error) throw error;
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      alert('Error sending message: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-32 pb-24 dark:bg-black min-h-screen">
      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-8 mb-20 text-center space-y-4 animate-in fade-in slide-in-from-top-5 duration-700">
        <h2 className="text-blue-600 dark:text-blue-500 font-bold text-sm uppercase tracking-[0.4em]">Elite Technical Support</h2>
        <h1 className="text-6xl md:text-8xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">Contact Us.</h1>
        <p className="text-xl text-slate-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-medium">
          Better yet, see us in person! We love our customers, so feel free to visit during normal business hours.
        </p>
      </section>

      {/* Bento Grid Content */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Form Card */}
        <div className="lg:col-span-7 cupertino-glass dark:bg-zinc-900/40 rounded-[3rem] p-10 md:p-14 shadow-2xl border border-white/20 dark:border-white/5 animate-in fade-in slide-in-from-left-5 duration-700">
          <div className="flex items-center gap-4 mb-12">
            <span className="material-symbols-outlined text-blue-600 dark:text-blue-500 text-5xl">edit_note</span>
            <h2 className="text-4xl font-bold tracking-tight dark:text-white">Drop us a line!</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest ml-2">Full Name</label>
                <input name="name" required className="w-full bg-slate-50 dark:bg-black border-none rounded-2xl px-6 py-4.5 focus:ring-2 focus:ring-blue-500/50 transition-all text-slate-900 dark:text-white font-bold" placeholder="John Doe" type="text" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest ml-2">Email Address</label>
                <input name="email" required className="w-full bg-slate-50 dark:bg-black border-none rounded-2xl px-6 py-4.5 focus:ring-2 focus:ring-blue-500/50 transition-all text-slate-900 dark:text-white font-bold" placeholder="john@example.com" type="email" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest ml-2">Message</label>
              <textarea name="message" required className="w-full bg-slate-50 dark:bg-black border-none rounded-2xl px-6 py-4.5 focus:ring-2 focus:ring-blue-500/50 transition-all text-slate-900 dark:text-white font-bold resize-none" placeholder="How can we help you today?" rows={5}></textarea>
            </div>
            
            {success && (
              <div className="p-6 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl font-bold text-center animate-in zoom-in duration-300">
                Message sent successfully! We'll reply soon.
              </div>
            )}

            <div className="pt-8 border-t border-slate-100 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <p className="text-[11px] text-slate-400 dark:text-zinc-500 max-w-xs leading-relaxed font-medium">
                Our team responds to all inquiries within 24 business hours. By submitting, you agree to our <span className="underline cursor-pointer hover:text-blue-500 transition-colors">Privacy Policy</span>.
              </p>
              <button 
                disabled={loading}
                className="bg-blue-600 text-white px-12 py-5 rounded-full font-bold text-lg shadow-xl shadow-blue-500/20 hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 min-w-[200px]" 
                type="submit"
              >
                {loading ? 'Sending...' : (
                  <>
                    Send Message
                    <span className="material-symbols-outlined text-xl">send</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-5 space-y-8 animate-in fade-in slide-in-from-right-5 duration-700">
          {/* Business Info Card */}
          <div className="bg-zinc-900 dark:bg-zinc-900 text-white rounded-[3rem] p-10 md:p-12 relative overflow-hidden shadow-2xl border border-white/5 group">
            <div className="relative z-10 space-y-12">
              <h3 className="text-3xl font-bold tracking-tight">PhonesAndRepairs</h3>
              <div className="space-y-10">
                <div className="flex items-start gap-6">
                  <div className="bg-blue-600/10 p-3 rounded-2xl border border-blue-500/20">
                    <span className="material-symbols-outlined text-blue-500 text-3xl">location_on</span>
                  </div>
                  <div>
                    <p className="text-[11px] text-zinc-500 uppercase font-bold tracking-widest mb-2">Our Store</p>
                    <p className="text-xl font-medium leading-relaxed">14631 W Warren Ave<br />Dearborn, MI 48126, USA</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="bg-blue-600/10 p-3 rounded-2xl border border-blue-500/20">
                    <span className="material-symbols-outlined text-blue-500 text-3xl">call</span>
                  </div>
                  <div>
                    <p className="text-[11px] text-zinc-500 uppercase font-bold tracking-widest mb-2">Call Us</p>
                    <a className="text-2xl font-black hover:text-blue-400 transition-colors" href="tel:+13132006000">+1 313 200 6000</a>
                  </div>
                </div>
              </div>
            </div>
            <span className="material-symbols-outlined absolute -right-12 -top-12 text-[25rem] opacity-[0.03] group-hover:scale-110 transition-all duration-1000 rotate-12">map</span>
          </div>

          {/* Business Hours Card */}
          <div className="cupertino-glass dark:bg-zinc-900/40 rounded-[3rem] p-10 md:p-12 border border-white/20 dark:border-white/5 shadow-xl">
            <div className="flex items-center gap-4 mb-10">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-500 text-3xl">schedule</span>
              <h3 className="text-2xl font-bold dark:text-white tracking-tight">Business Hours</h3>
            </div>
            <ul className="space-y-8">
              <li className="flex justify-between items-center border-b border-slate-100 dark:border-white/5 pb-6">
                <span className="text-slate-500 dark:text-zinc-400 font-bold uppercase text-[11px] tracking-widest">Mon - Sat</span>
                <span className="font-bold text-lg dark:text-white">10:00 am - 08:00 pm</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-zinc-400 font-bold uppercase text-[11px] tracking-widest">Sunday</span>
                <span className="font-black text-lg text-blue-600 dark:text-blue-500">10:00 am - 06:00 pm</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Map Placeholder or Integration could go here */}
    </main>
  );
}
