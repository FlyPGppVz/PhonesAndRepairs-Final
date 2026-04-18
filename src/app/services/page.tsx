'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { addToInbox } from '@/lib/inbox';
import toast from 'react-hot-toast';

export default function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState('General');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const openQuoteModal = (category: string) => {
    setModalCategory(category);
    setIsModalOpen(true);
    setSuccess(false);
  };

  const closeQuoteModal = () => {
    setIsModalOpen(false);
  };

  const handleQuoteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    try {
      // 1. Add to dedicated quotes table (backwards compatibility)
      const { error: quoteError } = await supabase.from('appointments_quotes').insert([{
        customer_name: formData.get('name'),
        customer_email: formData.get('email'),
        device_category: modalCategory,
        issue_description: formData.get('description'),
        type: 'quote',
        status: 'pending'
      }]);

      if (quoteError) throw quoteError;

      // 2. Add to centralized Inbox
      await addToInbox({
        type: 'Quote',
        customer_name: formData.get('name') as string,
        email: formData.get('email') as string,
        message: formData.get('description') as string,
        metadata: { category: modalCategory }
      });

      setSuccess(true);
      toast.success("Quote request sent! We'll contact you soon.");
      setTimeout(() => closeQuoteModal(), 2000);
    } catch (err: any) {
      toast.error('Error: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-24 pb-20 dark:bg-[#0a0a0a] min-h-screen">
      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-8 mb-24 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left animate-in fade-in slide-in-from-left duration-1000">
            <h1 className="text-[3.5rem] md:text-[4.5rem] font-bold tracking-tight text-slate-900 dark:text-white mb-8 leading-[1.05]">
              Precision Repair for the <br />
              <span className="text-blue-600 dark:text-blue-400">Devices You Love.</span>
            </h1>
            <p className="text-[1.25rem] text-slate-500 dark:text-zinc-400 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              Specialized technical solutions for mobile hardware, tablets, and gaming consoles. We restore your technology to original factory standards.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => openQuoteModal('General')}
                className="px-8 py-4 bg-blue-600 dark:bg-blue-500 text-white rounded-full font-bold text-sm hover:opacity-90 transition-all active:scale-95 shadow-xl shadow-blue-500/20"
              >
                Book a Repair
              </button>
            </div>
          </div>
          <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl animate-in fade-in slide-in-from-right duration-1000">
            <video 
              className="w-full h-full object-cover" 
              autoPlay 
              muted 
              loop 
              playsInline
            >
              <source src="/assets/videos/Video_service.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-blue-600/10 pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* Main Categories */}
      <section className="max-w-[1440px] mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* iPhone */}
        <div className="md:col-span-8 bg-slate-50 dark:bg-[#0f0f0f] rounded-3xl p-10 flex flex-col md:flex-row gap-8 items-center border border-slate-100 dark:border-white/5 shadow-sm group hover:border-blue-500/30 transition-all duration-500">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-3xl">smartphone</span>
              <h2 className="text-[1.75rem] font-semibold dark:text-white">iPhone Repairs</h2>
            </div>
            <ul className="space-y-4">
              <li className="flex items-center gap-2 text-sm text-slate-500 dark:text-zinc-400 font-medium">
                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-lg">check_circle</span> Screen & OLED Replacement
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-500 dark:text-zinc-400 font-medium">
                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-lg">check_circle</span> Battery Health Restoration
              </li>
            </ul>
            <button 
              onClick={() => openQuoteModal('iPhone')}
              className="px-8 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-full font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-blue-500/20"
            >
              Get iPhone Quote
            </button>
          </div>
          <div className="flex-1 h-full overflow-hidden rounded-[2rem] border border-slate-200 dark:border-white/5">
            <img 
              className="w-full h-full min-h-[300px] object-cover transition-transform duration-700 group-hover:scale-110" 
              src="/assets/images/service_iphone_repair.jpg" 
              alt="iPhone Repair" 
            />
          </div>
        </div>

        {/* Android */}
        <div className="md:col-span-4 bg-slate-50 dark:bg-[#1a1c1e] rounded-3xl p-10 flex flex-col justify-between border border-slate-100 dark:border-white/5 transition-all duration-500 shadow-sm hover:border-blue-500/30">
          <div className="space-y-4">
            <span className="material-symbols-outlined text-slate-900 dark:text-white text-[46px]">phone_android</span>
            <h2 className="text-[1.75rem] font-bold dark:text-white">Android Repairs</h2>
            <p className="text-slate-500 dark:text-zinc-400 text-sm">Samsung Galaxy, Pixel, and OnePlus expert technical service.</p>
          </div>
          <button 
            onClick={() => openQuoteModal('Android')}
            className="mt-8 px-6 py-3 bg-white dark:bg-neutral-900 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 rounded-full font-bold text-sm hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition-all"
          >
            Get Quote
          </button>
        </div>

        {/* iPad & Tablet */}
        <div className="md:col-span-6 bg-[#0a0a0a] text-white rounded-3xl p-10 overflow-hidden relative group border border-white/5">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="space-y-6">
              <span className="material-symbols-outlined text-blue-400 text-3xl">tablet_mac</span>
              <h2 className="text-[1.75rem] font-semibold">iPad & Tablets Repairs</h2>
              <div className="grid grid-cols-2 gap-4 text-xs font-bold opacity-70">
                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">bolt</span> Logic Board</span>
                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">touch_app</span> Glass Fix</span>
              </div>
            </div>
            <button 
              onClick={() => openQuoteModal('iPad/Tablet')}
              className="mt-10 self-start px-8 py-3 bg-white text-black rounded-full font-bold text-sm hover:bg-blue-500 hover:text-white transition-all"
            >
              Get Quote
            </button>
          </div>
          <span className="material-symbols-outlined absolute -right-8 -bottom-8 text-[12rem] opacity-5 text-white pointer-events-none group-hover:scale-110 transition-transform duration-700">tablet_mac</span>
        </div>

        {/* Consoles */}
        <div className="md:col-span-6 bg-slate-50 dark:bg-[#1a1c1e] rounded-3xl p-10 border border-slate-100 dark:border-white/5 flex items-center gap-8 shadow-sm hover:border-blue-500/30 transition-all duration-500 group">
          <div className="flex-1 space-y-6">
            <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-3xl">videogame_asset</span>
            <h2 className="text-[1.75rem] font-semibold dark:text-white">Consoles Repairs</h2>
            <p className="text-slate-500 dark:text-zinc-400 text-sm">PlayStation, Xbox, and Nintendo specialized tech service.</p>
            <button 
              onClick={() => openQuoteModal('Console')}
              className="px-8 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-full font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-blue-500/20"
            >
              Get Quote
            </button>
          </div>
          <div className="flex-1 hidden md:block opacity-20 group-hover:opacity-40 transition-opacity">
            <span className="material-symbols-outlined text-[100px] text-blue-600">sports_esports</span>
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="max-w-[1440px] mx-auto px-8 mt-24 py-16 bg-slate-50 dark:bg-[#0f0f0f] rounded-3xl border border-slate-200 dark:border-white/5 transition-colors duration-500">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-[2.5rem] font-bold text-blue-600 dark:text-blue-400 mb-1">15k+</p>
            <p className="text-sm text-slate-500 dark:text-zinc-400 font-medium uppercase tracking-widest">Repairs Completed</p>
          </div>
          <div>
            <p className="text-[2.5rem] font-bold text-blue-600 dark:text-blue-400 mb-1">90d</p>
            <p className="text-sm text-slate-500 dark:text-zinc-400 font-medium uppercase tracking-widest">Service Warranty</p>
          </div>
          <div>
            <p className="text-[2.5rem] font-bold text-blue-600 dark:text-blue-400 mb-1">4.9</p>
            <p className="text-sm text-slate-500 dark:text-zinc-400 font-medium uppercase tracking-widest">Customer Rating</p>
          </div>
          <div>
            <p className="text-[2.5rem] font-bold text-blue-600 dark:text-blue-400 mb-1">1hr</p>
            <p className="text-sm text-slate-500 dark:text-zinc-400 font-medium uppercase tracking-widest">Avg. Repair Time</p>
          </div>
        </div>
      </section>

      {/* Quote Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" 
            onClick={closeQuoteModal}
          ></div>
          <div className="relative bg-white dark:bg-[#1a1c1e] w-full max-w-xl rounded-[2.5rem] shadow-2xl p-8 md:p-12 animate-in zoom-in slide-in-from-bottom-5 duration-300">
            <button 
              onClick={closeQuoteModal}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h2 className="text-3xl font-black mb-2 dark:text-white">{modalCategory} Repair</h2>
            <p className="text-slate-500 dark:text-zinc-400 mb-8 text-sm font-medium italic leading-relaxed">Describe the issue with your device.</p>
            
            <form onSubmit={handleQuoteSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-white/5 border-none dark:text-white focus:ring-2 focus:ring-blue-500/50 text-sm font-bold shadow-inner"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-white/5 border-none dark:text-white focus:ring-2 focus:ring-blue-500/50 text-sm font-bold shadow-inner"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Issue</label>
                <textarea 
                  name="description" 
                  required 
                  rows={4} 
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-white/5 border-none dark:text-white focus:ring-2 focus:ring-blue-500/50 text-sm font-bold shadow-inner"
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-5 bg-blue-600 dark:bg-blue-500 text-white rounded-full font-bold text-lg shadow-xl shadow-blue-500/20 hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Request'}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
