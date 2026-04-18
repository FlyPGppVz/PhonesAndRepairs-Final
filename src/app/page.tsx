'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SocialLinks from '@/components/SocialLinks';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await supabase.from('newsletter_subscribers').insert([{ email }]);
      setSubscribed(true);
      setEmail('');
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <main className="dark:bg-[#0a0a0a] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[870px] flex items-end pb-48 justify-center overflow-hidden bg-white">
        <div className="z-10 text-left px-8 md:px-24 w-full relative max-w-[1440px] mx-auto">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight drop-shadow-2xl max-w-4xl animate-in fade-in slide-in-from-left duration-1000">
            Expertly Restored.<br />
            Seamlessly Repaired.<br />
            Premium New Devices.
          </h1>
          <p className="text-lg md:text-xl text-white/95 mb-10 font-medium max-w-3xl drop-shadow-md animate-in fade-in slide-in-from-left duration-1000 delay-200 leading-relaxed">
            Professional sales and repair services for the devices you can't live without. Whether you are looking for the latest upgrade or a precision fix, our certified technicians and premium parts ensure your technology always performs at its peak.
          </p>
        </div>
        <div className="absolute inset-0 z-0 overflow-hidden bg-slate-900">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover opacity-50 scale-105"
          >
            <source src="/assets/videos/Home-iphone-17.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90 dark:to-[#0a0a0a]"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-[#0a0a0a] to-transparent"></div>
      </section>

      {/* Category Icons Row */}
      <section className="max-w-[1440px] mx-auto px-12 md:px-20 py-24 relative z-30">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-10 md:gap-12 items-start">
          {[
            { label: 'iPhone', icon: 'smartphone', param: 'iphone' },
            { label: 'Android', icon: 'phone_android', param: 'android' },
            { label: 'iPads', icon: 'tablet_mac', param: 'ipads' },
            { label: 'Smartwatch', icon: 'watch', param: 'smartwatch' },
            { label: 'Accessories', icon: 'headphones', param: 'accessories' },
            { label: 'Consoles', icon: 'videogame_asset', param: 'consoles' }
          ].map((cat) => (
            <Link 
              key={cat.label} 
              href={`/shop?category=${cat.param}`} 
              className="group flex flex-col items-center gap-4 transition-all"
            >
              <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center bg-white dark:bg-neutral-900 transition-all group-hover:bg-slate-50 dark:group-hover:bg-neutral-800 group-hover:scale-110 shadow-sm group-hover:shadow-xl group-hover:shadow-blue-500/10 overflow-hidden">
                <span className="material-symbols-outlined text-[110px] md:text-[125px] text-[#1d1d1f] dark:text-white transition-transform group-hover:rotate-12 leading-none">{cat.icon}</span>
              </div>
              <span className="text-[10px] font-black text-slate-400 dark:text-zinc-500 font-sans tracking-[0.2em] uppercase group-hover:text-blue-600 transition-colors">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="px-8 py-24 max-w-[1440px] mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* iPhone Repair Card */}
          <div className="md:col-span-8 bg-slate-50 dark:bg-neutral-900 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row justify-between overflow-hidden relative group border border-slate-200 dark:border-white/5 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5">
            <div className="z-10 flex flex-col justify-between h-full py-4">
              <div>
                <span className="text-blue-600 dark:text-blue-400 font-black tracking-[0.3em] text-[10px] uppercase mb-4 block">Premium Care</span>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tighter">iPhone Repair</h2>
                <p className="text-slate-600 dark:text-zinc-400 max-w-sm mb-8 font-medium">From screen replacements to logic board diagnostics, we restore your iPhone to factory standards.</p>
              </div>
              <Link href="/services" className="text-blue-600 dark:text-blue-400 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all uppercase tracking-widest">
                Start my repair <span className="material-symbols-outlined">chevron_right</span>
              </Link>
            </div>
            <div className="mt-12 md:mt-0 flex justify-end items-center">
              <img 
                className="w-full md:w-[350px] h-auto object-contain transform group-hover:scale-110 transition-transform duration-700 drop-shadow-2xl" 
                src="/assets/images/iphone-16-pro-max-desert.png" 
                alt="iPhone Repair"
              />
            </div>
          </div>

          {/* Samsung Repair Card */}
          <div className="md:col-span-4 bg-black rounded-[3rem] p-10 flex flex-col justify-between overflow-hidden relative group text-white cursor-pointer hover:shadow-2xl transition-all" onClick={() => window.location.href='/services'}>
            <div className="z-10">
              <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter">Samsung Repair</h2>
              <p className="text-slate-400 text-sm mb-8 font-medium">Certified parts for Galaxy S and Note series. Original quality, zero compromise.</p>
              <Link href="/services" className="text-blue-400 font-bold text-xs flex items-center gap-1 uppercase tracking-widest">
                Explore services <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
            <div className="mt-8 flex justify-center">
              <img 
                className="w-[75%] h-auto object-contain transform group-hover:scale-110 transition-transform duration-700 animate-float" 
                src="/assets/images/Tienda/S25-png.webp" 
                alt="Samsung Repair"
              />
            </div>
          </div>

          {/* New and Used Devices Card */}
          <div className="md:col-span-4 bg-slate-50 dark:bg-neutral-900 rounded-[3rem] p-10 flex flex-col justify-between overflow-hidden relative group cursor-pointer border border-slate-200 dark:border-white/5 hover:shadow-2xl transition-all" onClick={() => window.location.href='/shop'}>
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tighter leading-none">New & Used Devices</h2>
              <p className="text-slate-600 dark:text-zinc-400 text-sm font-medium">Quality checked and ready for you.</p>
            </div>
            <div className="flex-grow flex items-center justify-center py-8">
              <video 
                className="w-full h-auto rounded-[2rem] shadow-2xl" 
                autoPlay 
                muted 
                loop 
                playsInline
              >
                <source src="/assets/videos/new_and_used_device.mp4" type="video/mp4" />
              </video>
            </div>
            <Link 
              href="/shop" 
              className="bg-blue-600 text-white rounded-full py-4 px-8 text-xs font-black uppercase tracking-widest w-fit inline-block hover:bg-blue-700 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/40 transition-all duration-300 active:scale-95"
            >
              Shop Devices
            </Link>
          </div>

          {/* The Repair Standard Card */}
          <div className="md:col-span-8 bg-slate-50 dark:bg-neutral-900 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center gap-10 border border-slate-200 dark:border-white/5 hover:shadow-2xl transition-all">
            <div className="flex-1 space-y-6">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">The Repair Standard</h2>
              <div className="space-y-6">
                <div className="flex gap-4 group/item">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover/item:scale-110 transition-transform">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">30-Day Warranty</h4>
                    <p className="text-sm text-slate-500 dark:text-zinc-400 font-medium">Every repair is backed by our comprehensive service guarantee.</p>
                  </div>
                </div>
                <div className="flex gap-4 group/item">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover/item:scale-110 transition-transform">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>timer</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Express Service</h4>
                    <p className="text-sm text-slate-500 dark:text-zinc-400 font-medium">Most screen repairs completed in under 60 minutes.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full h-full">
              <div className="aspect-video rounded-[2rem] overflow-hidden shadow-2xl relative group bg-black border border-white/5">
                <video 
                  src="/assets/videos/Iphone-17-repair.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                ></video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Banner Section */}
      <section className="px-8 pb-24 max-w-[1440px] mx-auto animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
        <div className="bg-black rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 border border-white/10 overflow-hidden relative group">
          {/* Pulsating Radial Glow Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,_rgba(255,255,255,0.08)_0%,_transparent_70%)] blur-[100px] rounded-full pointer-events-none animate-pulse-glow opacity-50"></div>

          <div className="flex-1 z-10 space-y-6">
            <span className="text-[11px] font-black tracking-[0.3em] text-slate-500 uppercase block">stay in the loop</span>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-[1.1] bg-gradient-to-br from-blue-700 via-blue-500 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">
              Subscribe to keep up with our great deals.
            </h2>
            <p className="text-zinc-400 text-lg font-medium max-w-lg leading-relaxed">
              Stay ahead of the curve with exclusive offers, the latest product updates, and special discounts delivered straight to your inbox.
            </p>
            <div className="space-y-4">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 items-center">
                {subscribed ? (
                  <div className="bg-green-500/20 text-green-400 px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase border border-green-500/30 flex items-center justify-center gap-2 w-full max-w-sm">
                    <span className="material-symbols-outlined">check_circle</span>
                    Subscribed
                  </div>
                ) : (
                  <>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email" 
                      required 
                      className="w-full sm:flex-1 bg-white border border-slate-200 rounded-full px-8 py-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
                    />
                    <button 
                      type="submit" 
                      className="w-full sm:w-auto bg-[#0a46b3] text-white px-10 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/40 active:scale-95 whitespace-nowrap"
                    >
                      Subscribe Now
                    </button>
                  </>
                )}
              </form>
              <p className="text-[11px] text-slate-500 font-medium">No spam, ever. Unsubscribe at any time.</p>
            </div>
          </div>
          <div className="flex-1 relative flex justify-center items-center">
            <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full transform group-hover:scale-150 transition-transform duration-1000"></div>
            <img 
              src="/assets/images/banner-subscribe-products.png" 
              alt="Various Electronic Devices" 
              className="relative z-10 w-full max-w-[500px] h-auto object-contain transform group-hover:-translate-y-4 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* Social Media Links Section */}
      <SocialLinks />
    </main>
  );
}
