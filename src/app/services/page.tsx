'use client';

import React, { useState } from 'react';

export default function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState('General');
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');

  const openModal = (category: string) => {
    setModalCategory(category);
    setIsModalOpen(true);
    setFormStatus('idle');
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="pt-24 pb-20 dark:bg-black transition-colors duration-500">
      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-8 mb-24 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left space-y-8 animate-in fade-in slide-in-from-left-5 duration-700">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.05]">
              Precision Repair for the <br/>
              <span className="text-blue-600 dark:text-blue-500 italic">Devices You Love.</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-zinc-400 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
              Specialized technical solutions for mobile hardware, tablets, and gaming consoles. We restore your technology to original factory standards.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => openModal('General')}
                className="px-10 py-5 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 transition-all active:scale-95 shadow-2xl shadow-blue-500/20"
              >
                Book a Repair
              </button>
            </div>
          </div>
          <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl animate-in fade-in slide-in-from-right-5 duration-700">
            <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
              <source src="https://img1.wsimg.com/isteam/getty/494389158/:/cr=t:0%25,l:16.74%25,w:66.52%25,h:100%25/rs=w:1440,h:810,cg:true" type="video/mp4" />
              {/* Fallback image if video fails */}
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCt5ucahiVmhuhhmiyZ4gcRSeKengqiKCqatWjOjHDeHZCB4njMN9-zw3Dlx6W5IB0jo0EZyB7UlXwapqE9kELrn8_U_Qv-JVxuA2SgUPUA1tuvkXtJdJZw8mUDaunQRSlElsURDmSVww0GRBF2Yk4GGHIK2I2pAjr3pSX6UkUIn-Qav9kxzaW-LnzKRPxCeiEMp3NM3NGJV6Mq_IW2xdsATo0cFigl3agCskFnk01iu_CGR_KDpz_XKCu5LULFVHQ5A6JarluKN94" className="w-full h-full object-cover" alt="Repair Service" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* Main Categories */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* iPhone */}
        <div className="md:col-span-8 cupertino-glass dark:bg-zinc-900/40 rounded-[2.5rem] p-10 flex flex-col md:flex-row gap-10 items-center border border-white/20 dark:border-white/5 shadow-xl group hover:shadow-blue-500/10 transition-all duration-500">
          <div className="flex-1 space-y-8">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-500 text-4xl">smartphone</span>
              <h2 className="text-3xl font-bold dark:text-white">iPhone Repairs</h2>
            </div>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-slate-600 dark:text-zinc-400 font-medium">
                <span className="material-symbols-outlined text-blue-500 text-xl">check_circle</span> 
                Screen & OLED Replacement
              </li>
              <li className="flex items-center gap-3 text-slate-600 dark:text-zinc-400 font-medium">
                <span className="material-symbols-outlined text-blue-500 text-xl">check_circle</span> 
                Battery Health Restoration
              </li>
            </ul>
            <button 
              onClick={() => openModal('iPhone')}
              className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
            >
              Get iPhone Quote
            </button>
          </div>
          <div className="flex-1 rounded-[2rem] overflow-hidden shadow-lg border border-white/10">
            <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCfaQ_DkRYZnP16W9cWoOHF6KNN2pbPVaNudQJOlITzpZBdjpuZ22B5_q8fgG6V6WIDC7iWiQwBdDgrcHxlxf-6NDOvpnE6U5QFIg5u9AS-zcHU3lNLeJhIaFTwRMpyiycAqPfDPww_GDvm2xKdb-JALlsgLoEo4f6nEG8TIAuevloq3_0WfNx1HiyDI00twWxUFBLbK3fcbvh1mocH5RTMB3o3Vj1sVbxMuSAw6_rGLpg5v0FzpT2mHMqu_C3285vit39xnyU3F8" alt="iPhone Repair" />
          </div>
        </div>

        {/* Android */}
        <div className="md:col-span-4 bg-slate-100 dark:bg-zinc-800/80 rounded-[2.5rem] p-10 flex flex-col justify-between border border-white/10 dark:border-white/5 shadow-xl hover:shadow-blue-500/10 transition-all duration-500">
          <div className="space-y-6">
            <span className="material-symbols-outlined text-slate-900 dark:text-white text-6xl">phone_android</span>
            <h2 className="text-3xl font-bold dark:text-white">Android Repairs</h2>
            <p className="text-slate-500 dark:text-zinc-400 font-medium pb-6 leading-relaxed">
              Samsung Galaxy, Pixel, and OnePlus expert technical service.
            </p>
          </div>
          <button 
            onClick={() => openModal('Android')}
            className="w-full py-4 bg-white dark:bg-black text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 rounded-full font-bold text-sm hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all active:scale-95"
          >
            Get Android Quote
          </button>
        </div>

        {/* iPad & Tablet */}
        <div className="md:col-span-6 bg-[#0a0a0a] text-white rounded-[2.5rem] p-12 overflow-hidden relative group border border-white/5 shadow-2xl">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="space-y-8">
              <span className="material-symbols-outlined text-blue-500 text-5xl">tablet_mac</span>
              <h2 className="text-4xl font-bold">iPad & Tablets</h2>
              <div className="grid grid-cols-2 gap-6 text-sm font-bold opacity-60">
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-400">bolt</span> Logic Board
                </span>
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-400">touch_app</span> Glass Fix
                </span>
              </div>
            </div>
            <button 
              onClick={() => openModal('iPad/Tablet')}
              className="mt-12 self-start px-10 py-4 bg-white text-black rounded-full font-bold text-sm hover:bg-blue-500 hover:text-white transition-all active:scale-95"
            >
              Get Tablet Quote
            </button>
          </div>
          <span className="material-symbols-outlined absolute -right-12 -bottom-12 text-[20rem] opacity-[0.03] text-white pointer-events-none group-hover:scale-110 group-hover:-rotate-12 transition-all duration-1000">tablet_mac</span>
        </div>

        {/* Consoles */}
        <div className="md:col-span-6 cupertino-glass dark:bg-zinc-900/40 rounded-[2.5rem] p-12 border border-white/20 dark:border-white/5 flex items-center gap-10 shadow-xl group hover:shadow-blue-500/10 transition-all duration-500">
          <div className="flex-1 space-y-8">
            <span className="material-symbols-outlined text-blue-600 dark:text-blue-500 text-5xl">videogame_asset</span>
            <h2 className="text-4xl font-bold dark:text-white">Gaming Consoles</h2>
            <p className="text-slate-500 dark:text-zinc-400 font-medium leading-relaxed">
              PlayStation, Xbox, and Nintendo specialized tech service with original component sourcing.
            </p>
            <button 
              onClick={() => openModal('Console')}
              className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
            >
              Get Console Quote
            </button>
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-8 mt-32">
        <div className="cupertino-glass p-16 rounded-[3.5rem] border border-white/20 dark:border-white/5 shadow-2xl transition-all duration-500">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            <div className="space-y-2">
              <p className="text-5xl font-black text-blue-600 dark:text-blue-500">15k+</p>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Repairs Completed</p>
            </div>
            <div className="space-y-2">
              <p className="text-5xl font-black text-blue-600 dark:text-blue-500">90d</p>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Service Warranty</p>
            </div>
            <div className="space-y-2">
              <p className="text-5xl font-black text-blue-600 dark:text-blue-500">4.9</p>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Customer Rating</p>
            </div>
            <div className="space-y-2">
              <p className="text-5xl font-black text-blue-600 dark:text-blue-500">1hr</p>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Avg. Repair Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={closeModal}></div>
          <div className="relative bg-white dark:bg-zinc-900 w-full max-w-xl rounded-[3rem] shadow-2xl p-10 md:p-14 animate-in zoom-in-95 duration-300">
            <button onClick={closeModal} className="absolute top-8 right-8 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>

            {formStatus === 'idle' ? (
              <>
                <h2 className="text-4xl font-black mb-3 dark:text-white">{modalCategory} Repair.</h2>
                <p className="text-slate-500 dark:text-zinc-400 mb-10 text-lg font-medium italic">Describe the issue and our techs will send you a quote.</p>
                
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setFormStatus('success'); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-2">Your Name</label>
                      <input type="text" required className="w-full px-6 py-4.5 rounded-2xl bg-slate-50 dark:bg-black border-none focus:ring-2 focus:ring-blue-500/50 text-sm font-bold dark:text-white transition-all" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-2">Email Address</label>
                      <input type="email" required className="w-full px-6 py-4.5 rounded-2xl bg-slate-50 dark:bg-black border-none focus:ring-2 focus:ring-blue-500/50 text-sm font-bold dark:text-white transition-all" placeholder="name@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-2">Describe the Issue</label>
                    <textarea required rows={4} className="w-full px-6 py-4.5 rounded-2xl bg-slate-50 dark:bg-black border-none focus:ring-2 focus:ring-blue-500/50 text-sm font-bold dark:text-white transition-all" placeholder="Example: Cracked screen, No power, Water damage..."></textarea>
                  </div>
                  <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-full font-bold text-xl shadow-xl shadow-blue-500/20 hover:bg-blue-700 active:scale-[0.98] transition-all mt-4 h-[64px]">
                    Send Quote Request
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-10 space-y-6">
                <span className="material-symbols-outlined text-8xl text-green-500 animate-bounce">check_circle</span>
                <h3 className="text-3xl font-bold tracking-tight dark:text-white">Request Sent!</h3>
                <p className="text-slate-500 dark:text-zinc-400 text-lg">One of our master technicians will contact you via email shortly with a competitive quote.</p>
                <button onClick={closeModal} className="mt-8 px-10 py-4 bg-slate-100 dark:bg-zinc-800 rounded-full font-bold text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-zinc-700 transition-all">
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
