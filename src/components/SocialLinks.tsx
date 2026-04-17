'use client';

import React from 'react';

export default function SocialLinks() {
  return (
    <section className="px-8 py-24 bg-black dark:bg-[#050505] overflow-hidden relative border-t border-white/5">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto text-center relative z-10">
        <span className="text-blue-500 font-black tracking-[.3em] text-[10px] uppercase mb-4 block animate-in fade-in slide-in-from-bottom duration-700">
          Stay Connected
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter animate-in fade-in slide-in-from-bottom duration-700 delay-100">
          Follow our tech journey.
        </h2>
        <p className="text-zinc-500 text-lg font-medium max-w-xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
          Get the latest repair tips, behind-the-scenes content, and exclusive deals across our network.
        </p>

        <div className="flex justify-center items-center gap-12 md:gap-24 animate-in fade-in slide-in-from-bottom duration-700 delay-300">
          {/* Facebook */}
          <a 
            href="https://www.facebook.com/p/Cellphones-and-Repairs-100076521337365/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-4 text-zinc-500 hover:text-[#1877F2] transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center transition-all group-hover:bg-white/10 group-hover:border-[#1877F2]/30 group-hover:shadow-[0_0_30px_rgba(24,119,242,0.2)]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest transition-colors">Facebook</span>
          </a>

          {/* Instagram */}
          <a 
            href="https://www.instagram.com/cellphonesandrepairs/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-4 text-zinc-500 hover:text-[#E1306C] transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center transition-all group-hover:bg-white/10 group-hover:border-[#E1306C]/30 group-hover:shadow-[0_0_30px_rgba(225,48,108,0.2)]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest transition-colors">Instagram</span>
          </a>

          {/* TikTok */}
          <a 
            href="https://www.tiktok.com/@cellphonesrepairs7" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-4 text-zinc-500 hover:text-white transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center transition-all group-hover:bg-white/10 group-hover:border-white/30 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.84 4.84 0 01-1.01-.07z"/>
              </svg>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest transition-colors">TikTok</span>
          </a>
        </div>
      </div>
    </section>
  );
}
