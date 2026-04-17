'use client';

import React, { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SuccessPage() {
  const { clearCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    clearCart();
    const timer = setTimeout(() => {
      router.push('/');
    }, 8000);
    return () => clearTimeout(timer);
  }, [clearCart, router]);

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 flex flex-col items-center justify-center text-center">
      <div className="cupertino-glass p-12 rounded-[3.5rem] space-y-8 max-w-lg shadow-2xl shadow-green-500/10 animate-in fade-in zoom-in duration-700">
        <div className="w-24 h-24 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-5xl text-green-600 dark:text-green-400">check_circle</span>
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-black dark:text-white">Thanks for your purchase!</h1>
          <p className="text-slate-500 dark:text-zinc-400 text-lg leading-relaxed">
            Your order has been placed successfully. You will receive a confirmation email shortly with your tracking details.
          </p>
        </div>
        <div className="bg-slate-50 dark:bg-zinc-800/50 p-6 rounded-3xl border border-slate-100 dark:border-white/5">
          <p className="text-sm text-slate-400 dark:text-zinc-500">
            You will be redirected to the homepage in a few seconds...
          </p>
          <div className="w-full bg-slate-200 dark:bg-zinc-700 h-1.5 rounded-full mt-4 overflow-hidden">
            <div className="bg-green-500 h-full animate-progress-fast"></div>
          </div>
        </div>
        <Link href="/" className="inline-block bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-10 py-4 rounded-full font-bold hover:scale-105 transition-all active:scale-95">
          Back to Home Now
        </Link>
      </div>
      <style jsx>{`
        @keyframes progress { 0% { width: 0%; } 100% { width: 100%; } }
        .animate-progress-fast { animation: progress 8s linear forwards; }
      `}</style>
    </main>
  );
}
