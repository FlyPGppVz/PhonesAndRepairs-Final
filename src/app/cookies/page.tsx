'use client';

import React from 'react';

export default function CookiePolicy() {
  return (
    <main className="pt-32 pb-24 dark:bg-black min-h-screen">
      <section className="max-w-4xl mx-auto px-6 md:px-8 animate-in fade-in slide-in-from-top-5 duration-700">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-8">Cookie Policy.</h1>
        <p className="text-slate-500 dark:text-zinc-500 font-bold uppercase tracking-widest text-xs mb-16">Optimizing Your Digital Experience</p>
        
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold dark:text-white">1. How We Use Cookies</h2>
            <p className="text-slate-600 dark:text-zinc-400 leading-relaxed font-medium transition-colors">
              We use small data files called "cookies" to maintain your session, persist your shopping cart transitions, and understand how you interact with our platform.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold dark:text-white">2. Essential Cookies</h2>
            <p className="text-slate-600 dark:text-zinc-400 leading-relaxed font-medium transition-colors">
              Some cookies are mission-critical. These handle authentication states and secure checkout processes. These cannot be disabled for technical safety.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold dark:text-white">3. Analytics & Customization</h2>
            <p className="text-slate-600 dark:text-zinc-400 leading-relaxed font-medium transition-colors">
              We may use performance cookies to map user Journeys and improve our repair dispatch algorithms.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
