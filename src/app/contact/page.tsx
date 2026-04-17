'use client';

import React, { useState } from 'react';
import { addToInbox } from '@/lib/inbox';
import toast from 'react-hot-toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addToInbox({
        type: 'Contact',
        customer_name: formData.name,
        email: formData.email,
        message: formData.message,
      });

      toast.success('Message sent! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (err: any) {
      toast.error('Error sending message: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="pt-24 pb-20 dark:bg-[#0a0a0a] min-h-screen">
      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-8 mb-20 text-center pt-16 animate-in fade-in slide-in-from-bottom duration-1000">
        <h2 className="text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-[0.3em] mb-4">The best in one-click cell phone repair</h2>
        <h1 className="text-[3.5rem] md:text-[5rem] font-black tracking-tighter text-slate-900 dark:text-white mb-8 leading-[1]">Contact Us</h1>
        <p className="text-xl text-slate-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-medium">
          Better yet, see us in person! We love our customers, so feel free to visit during normal business hours.
        </p>
      </section>

      {/* Bento Grid Content */}
      <section className="max-w-[1440px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Form Card */}
        <div className="lg:col-span-7 bg-white dark:bg-[#0f0f0f] rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 dark:border-white/5 animate-in fade-in slide-in-from-left-5 duration-1000">
          <div className="flex items-center gap-4 mb-10">
            <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-[36px] font-black">edit_note</span>
            <h2 className="text-3xl font-black dark:text-white tracking-tight">Drop us a line!</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                  className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500/50 transition-all dark:text-white text-sm font-bold shadow-inner" 
                  placeholder="John Doe" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                  className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500/50 transition-all dark:text-white text-sm font-bold shadow-inner" 
                  placeholder="john@example.com" 
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Message</label>
              <textarea 
                name="message" 
                value={formData.message}
                onChange={handleChange}
                required 
                rows={5} 
                className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500/50 transition-all dark:text-white text-sm font-bold shadow-inner resize-none" 
                placeholder="How can we help you today?"
              ></textarea>
            </div>
            <div className="pt-8 border-t border-slate-100 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <p className="text-[11px] text-slate-400 max-w-xs leading-relaxed font-medium">
                Our technicians review every inquiry within 2 hours during business hours.
              </p>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-12 py-5 rounded-full font-black text-sm shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-5 space-y-8 animate-in fade-in slide-in-from-right-5 duration-1000">
          {/* Business Info Card */}
          <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <h3 className="text-2xl font-black mb-8 italic tracking-tighter">Cell Phones And Repairs</h3>
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <span className="material-symbols-outlined text-blue-400 bg-blue-400/10 p-2 rounded-xl">location_on</span>
                  <div>
                    <p className="text-[11px] text-slate-400 uppercase font-black tracking-widest mb-2">Our Store</p>
                    <p className="text-lg font-bold leading-relaxed tracking-tight">14631 W Warren Ave<br />Dearborn, MI 48126, USA</p>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <span className="material-symbols-outlined text-blue-400 bg-blue-400/10 p-2 rounded-xl">call</span>
                  <div>
                    <p className="text-[11px] text-slate-400 uppercase font-black tracking-widest mb-2">Call Us</p>
                    <a className="text-2xl font-black hover:text-blue-400 transition-colors tracking-tighter" href="tel:+13132006000">+1 313 200 6000</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -right-12 -bottom-12 opacity-5">
              <span className="material-symbols-outlined text-[240px]">storefront</span>
            </div>
          </div>

          {/* Business Hours Card */}
          <div className="bg-slate-50 dark:bg-[#0f0f0f] rounded-[2.5rem] p-10 border border-slate-100 dark:border-white/5 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 font-black">schedule</span>
              <h3 className="text-xl font-black dark:text-white uppercase tracking-tighter">Business Hours</h3>
            </div>
            <ul className="space-y-6">
              <li className="flex justify-between items-center border-b border-slate-200 dark:border-white/5 pb-4">
                <span className="text-slate-500 dark:text-zinc-400 font-bold text-xs uppercase tracking-widest">Monday — Saturday</span>
                <span className="font-black dark:text-white">10:00 am — 08:00 pm</span>
              </li>
              <li className="flex justify-between items-center pb-4">
                <span className="text-slate-500 dark:text-zinc-400 font-bold text-xs uppercase tracking-widest">Sunday</span>
                <span className="font-black dark:text-white">10:00 am — 06:00 pm</span>
              </li>
            </ul>
            <div className="mt-10">
              <a 
                href="/services"
                className="w-full py-5 bg-white dark:bg-neutral-800 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 rounded-full text-sm font-black shadow-sm hover:bg-slate-50 dark:hover:bg-neutral-700 transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                <span className="material-symbols-outlined text-[20px] font-black">calendar_today</span>
                Book Appointment
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-[1440px] mx-auto px-8 mt-24 animate-in fade-in slide-in-from-bottom duration-1000">
        <div className="relative h-[550px] rounded-[3rem] overflow-hidden shadow-2xl group border border-slate-200 dark:border-white/5">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2950.4854580665287!2d-83.1901043234584!3d42.342838771195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883b34c9f238ac33%3A0xea54ff5ed868369e!2s14631%20W%20Warren%20Ave%2C%20Dearborn%2C%20MI%2048126!5e0!3m2!1sen!2sus!4v1712629837123!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
            className="filter grayscale-[0.2] dark:invert-[0.9] dark:hue-rotate-[180deg] dark:brightness-[0.8] dark:contrast-[1.2]"
          ></iframe>
          
          {/* Map Overlay UI */}
          <div className="absolute top-8 left-8 pointer-events-none">
            <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/40 dark:border-white/5">
              <h4 className="font-black text-sm mb-1 dark:text-white uppercase tracking-tighter">Cell Phones And Repairs</h4>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-bold">14631 W Warren Ave, Dearborn, MI</p>
            </div>
          </div>

          {/* Open in Maps button */}
          <div className="absolute bottom-8 right-8">
            <a 
              className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-widest text-slate-900 dark:text-white shadow-2xl hover:bg-white dark:hover:bg-neutral-800 transition-all flex items-center gap-3 active:scale-95 border border-white/20 dark:border-white/5" 
              href="https://www.google.com/maps/place/14631+W+Warren+Ave,+Dearborn,+MI+48126" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined text-[18px] font-black">open_in_new</span>
              View on Google Maps
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
