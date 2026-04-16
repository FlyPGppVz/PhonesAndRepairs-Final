'use client';

import React from 'react';

export default function TermsPage() {
  return (
    <main className="pt-32 pb-24 dark:bg-black min-h-screen">
      <section className="max-w-4xl mx-auto px-6 md:px-8 animate-in fade-in slide-in-from-top-5 duration-700">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-8">Terms of Service.</h1>
        <p className="text-slate-500 dark:text-zinc-500 font-bold uppercase tracking-widest text-xs mb-16">Effective Date: April 16, 2024</p>
        
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold dark:text-white">1. Service Agreement</h2>
            <p className="text-slate-600 dark:text-zinc-400 leading-relaxed font-medium transition-colors">
              By engaging with PhonesAndRepairs, you agree to our technical protocols. We provide elite repair services subject to component availability and device condition.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold dark:text-white">2. Warranty & Liability</h2>
            <p className="text-slate-600 dark:text-zinc-400 leading-relaxed font-medium transition-colors">
              Our 30-day warranty covers labor and parts explicitly handled by our technicians. It does not extend to subsequent physical damage or third-party tampering.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold dark:text-white">3. Technical Limitations</h2>
            <p className="text-slate-600 dark:text-zinc-400 leading-relaxed font-medium transition-colors">
              Certain complex repairs may void original manufacturer warranties. Our technicians will always inform you of such risks prior to procedure commencement.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
