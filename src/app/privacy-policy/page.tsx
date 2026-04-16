'use client';

import React from 'react';

export default function PrivacyPolicy() {
  return (
    <main className="pt-32 pb-24 dark:bg-black min-h-screen">
      <section className="max-w-4xl mx-auto px-6 md:px-8 animate-in fade-in slide-in-from-top-5 duration-700">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-8">Privacy Policy.</h1>
        <p className="text-slate-500 dark:text-zinc-500 font-bold uppercase tracking-widest text-xs mb-16">Last Updated: April 2024</p>
        
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold dark:text-white">1. Data Stewardship</h2>
            <p className="text-slate-600 dark:text-zinc-400 leading-relaxed font-medium transition-colors">
              At PhonesAndRepairs, we take your digital sovereignty seriously. This policy outlines how we collect, process, and safeguard the personal technical data you entrust to us during the device lifecycle.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold dark:text-white">2. Information Collection</h2>
            <p className="text-slate-600 dark:text-zinc-400 leading-relaxed font-medium transition-colors">
              We collect information necessary to perform surgical repairs and logistics, including name, contact details, and device-specific telemetry required for diagnostics.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold dark:text-white">3. Technical Security</h2>
            <p className="text-slate-600 dark:text-zinc-400 leading-relaxed font-medium transition-colors">
              Your device data never leaves our local laboratory intranet unless explicitly required for cloud-based motherboard authentication with manufacturers.
            </p>
          </div>

          <div className="p-10 cupertino-glass dark:bg-zinc-900/40 rounded-3xl border border-white/20 dark:border-white/5 border-dashed">
            <h3 className="text-xl font-black mb-4 dark:text-white">Data Protection Officer</h3>
            <p className="text-sm text-slate-500 dark:text-zinc-400 font-medium leading-relaxed">
              If you have concerns about your data footprints, contact our compliance team at <span className="text-blue-600 font-bold">privacy@phonesandrepairs.com</span>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
