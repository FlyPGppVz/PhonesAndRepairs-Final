'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function FloatingFABs() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4 pointer-events-none">
      {/* WhatsApp FAB */}
      <a
        href="https://api.whatsapp.com/send/?phone=13136268888&text&type=phone_number&app_absent=0"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative pointer-events-auto animate-fade-in-up"
        style={{ animationDelay: '0.2s' }}
        aria-label="Chat on WhatsApp"
      >
        <div className="relative bg-[#25D366] text-white w-14 h-14 flex-shrink-0 rounded-full shadow-2xl hover:shadow-[#25D366]/40 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center">
          <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping pointer-events-none"></div>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
          </svg>
        </div>
      </a>

      {/* Service Area FAB */}
      <Link
        href="/services"
        className="group relative pointer-events-auto animate-fade-in-up"
        style={{ animationDelay: '0.4s' }}
        aria-label="Service Area"
      >
        <div className="relative bg-gradient-to-tr from-blue-600 to-blue-400 text-white p-3 h-14 rounded-full shadow-2xl hover:shadow-blue-500/40 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3">
          <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping pointer-events-none"></div>
          <span className="max-w-0 overflow-hidden group-hover:max-w-[150px] transition-all duration-500 ease-out font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 pl-1 text-sm uppercase tracking-widest">Service Area</span>
          <span className="material-symbols-outlined text-[28px]">support_agent</span>
        </div>
      </Link>

      {/* Chatbot FAB (Trigger) */}
      <button
        onClick={() => {
          // Dispatch a custom event that the Chatbot component can listen to
          window.dispatchEvent(new CustomEvent('toggle-chatbot'));
        }}
        className="group relative pointer-events-auto animate-fade-in-up"
        style={{ animationDelay: '0.6s' }}
        aria-label="Open Chatbot"
      >
        <div className="relative bg-blue-600 text-white w-14 h-14 flex-shrink-0 rounded-full shadow-2xl hover:shadow-blue-500/40 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center">
          <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping pointer-events-none"></div>
          <span className="material-symbols-outlined text-[28px]">chat</span>
        </div>
      </button>
    </div>
  );
}
