'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Submit to legacy contact table
      const { error: contactError } = await supabase
        .from('contact_submissions')
        .insert([
          { 
            name: formData.name, 
            email: formData.email, 
            message: formData.message 
          }
        ]);

      if (contactError) throw contactError;

      // 2. Add to centralized Inbox
      await addToInbox({
        type: 'Contact',
        customer_name: formData.name,
        email: formData.email,
        message: formData.message,
      });

      toast.success('Message sent! We will get back to you soon.');
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Submission error:', err);
      toast.error('Connection error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-32 pb-24 dark:bg-[#0a0a0a] min-h-screen">
      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-8 mb-20 text-center animate-in fade-in slide-in-from-top duration-700">
        <h2 className="text-blue-600 dark:text-blue-400 font-black tracking-[0.3em] text-[10px] uppercase mb-4">Elite Technical Support</h2>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white mb-8 leading-tight">Contact Us</h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-medium">
          Whether you need a quick repair or a consultation for a customized tech solution, we're here to help. Reach out during normal business hours.
        </p>
      </section>

      {/* Bento Grid Content */}
      <section className="max-w-[1440px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Form Card */}
        <div className="lg:col-span-7 bg-white dark:bg-neutral-900/50 rounded-[3rem] p-10 md:p-14 shadow-sm border border-slate-100 dark:border-white/5 backdrop-blur-3xl animate-in fade-in slide-in-from-left duration-700">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <span className="material-symbols-outlined text-[30px]" style={{ fontVariationSettings: "'FILL' 1" }}>edit_note</span>
            </div>
            <h2 className="text-3xl font-black tracking-tighter dark:text-white">Drop us a line</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <input 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required 
                  className="w-full bg-slate-50 dark:bg-white/5 border border-transparent focus:border-blue-500/30 rounded-2xl px-6 py-4 outline-none transition-all text-slate-900 dark:text-white font-medium" 
                  placeholder="John Doe" 
                  type="text" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <input 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required 
                  className="w-full bg-slate-50 dark:bg-white/5 border border-transparent focus:border-blue-500/30 rounded-2xl px-6 py-4 outline-none transition-all text-slate-900 dark:text-white font-medium" 
                  placeholder="john@example.com" 
                  type="email" 
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Message</label>
              <textarea 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required 
                className="w-full bg-slate-50 dark:bg-white/5 border border-transparent focus:border-blue-500/30 rounded-2xl px-6 py-4 outline-none transition-all text-slate-900 dark:text-white font-medium resize-none" 
                placeholder="How can we help you today?" 
                rows={5} 
              />
            </div>
            
            {success && (
              <div className="p-6 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-2xl font-bold text-center animate-in zoom-in duration-300">
                Message sent successfully! We'll reply soon.
              </div>
            )}

            <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <p className="text-[11px] text-slate-500 dark:text-zinc-500 max-w-[280px] leading-relaxed font-medium">
                This site is protected by our <a className="underline hover:text-blue-600 transition-colors" href="/privacy">Privacy Policy</a>.
              </p>
              <button 
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-10 py-4 rounded-full font-black text-sm shadow-xl shadow-blue-500/20 hover:scale-[1.05] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:scale-100" 
                type="submit"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-5 space-y-8 animate-in fade-in slide-in-from-right duration-700">
          {/* Business Info Card */}
          <div className="bg-slate-900 rounded-[3rem] p-10 relative overflow-hidden shadow-2xl border border-white/5 group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-[120px] text-white">contact_support</span>
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-black text-white mb-10 uppercase tracking-tighter">Phones And Repairs</h3>
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">Our Store</p>
                    <p className="text-lg font-bold text-white leading-tight">14631 W Warren Ave<br />Dearborn, MI 48126, USA</p>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <span className="material-symbols-outlined">call</span>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">Call Us</p>
                    <a className="text-2xl font-black text-white hover:text-blue-400 transition-colors" href="tel:+13132006000">+1 313 200 6000</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours Card */}
          <div className="bg-white dark:bg-neutral-900/50 rounded-[3rem] p-10 border border-slate-100 dark:border-white/5 backdrop-blur-3xl shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">schedule</span>
              <h3 className="text-xl font-black tracking-tight dark:text-white uppercase">Business Hours</h3>
            </div>
            <ul className="space-y-6">
              <li className="flex justify-between items-center border-b border-slate-100 dark:border-white/5 pb-4">
                <span className="text-slate-600 dark:text-zinc-400 font-bold uppercase text-xs tracking-widest">Mon - Sat</span>
                <span className="font-black dark:text-white">10:00 am - 8:00 pm</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-zinc-400 font-bold uppercase text-xs tracking-widest">Sunday</span>
                <span className="font-black dark:text-white">10:00 am - 6:00 pm</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
