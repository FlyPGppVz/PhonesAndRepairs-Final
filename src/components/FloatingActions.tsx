'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

const STORAGE_KEY = 'cr_chat_history';

export default function FloatingActions() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load history
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setMessages(JSON.parse(stored));
    } else {
      setMessages([
        { sender: 'bot', text: 'Hello! How can I help you today?', time: new Date().toISOString() }
      ]);
    }
  }, []);

  // Save history
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const simulateBotResponse = (userText: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let responseText = "Thanks for your message! Our team will get back to you shortly.";
      const lower = userText.toLowerCase();

      if (lower.includes('repair') || lower.includes('broken')) {
        responseText = "We specialize in all types of repairs! Could you tell me more about your device and what's wrong with it?";
      } else if (lower.includes('price') || lower.includes('cost')) {
        responseText = "Prices vary depending on the model and issue. Please check our Service page or describe the device for an estimate.";
      } else if (lower.includes('hello') || lower.includes('hi')) {
        responseText = "Hi there! How can I assist you with your phone or tablet today?";
      }

      const botMsg: Message = { sender: 'bot', text: responseText, time: new Date().toISOString() };
      setMessages(prev => [...prev, botMsg]);
    }, 1200);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = { sender: 'user', text: inputValue, time: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    simulateBotResponse(inputValue);
  };

  return (
    <div className="fixed bottom-[20px] right-[20px] z-[9999] flex flex-col items-end gap-[10px] pointer-events-none scale-85 md:scale-100 transition-transform duration-300 ease-in-out">
      
      {/* Chat Window */}
      {isChatOpen && (
        <div className="w-[350px] h-[500px] bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 flex flex-col overflow-hidden pointer-events-auto transition-all animate-in zoom-in-95 fade-in duration-300 origin-bottom-right mb-2">
          {/* Header */}
          <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">smart_toy</span>
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight">C&R Support</h3>
                <p className="text-[10px] opacity-80 uppercase font-black tracking-widest">Always active</p>
              </div>
            </div>
            <button 
              onClick={() => setIsChatOpen(false)}
              className="hover:bg-white/20 p-2 rounded-xl transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Messages */}
          <div 
            ref={scrollRef}
            className="flex-1 p-5 overflow-y-auto bg-slate-50 dark:bg-neutral-950/50 flex flex-col gap-4"
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] py-3 px-4 text-[13px] font-medium leading-relaxed shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-2xl rounded-tr-none' 
                    : 'bg-white dark:bg-neutral-800 border border-slate-100 dark:border-white/5 dark:text-white rounded-2xl rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex w-full justify-start animate-in fade-in duration-300">
                <div className="bg-white dark:bg-neutral-800 border border-slate-100 dark:border-white/5 rounded-2xl rounded-tl-none p-3 shadow-sm flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce delay-150"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce delay-300"></span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white dark:bg-neutral-900 border-t border-slate-100 dark:border-white/5 flex items-center gap-2">
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="How can we help?"
              className="flex-1 bg-slate-100 dark:bg-white/5 border-none rounded-2xl py-3 px-5 text-sm outline-none focus:ring-1 focus:ring-blue-500/50 dark:text-white font-medium"
            />
            <button 
              onClick={handleSend}
              className={`bg-blue-600 text-white w-10 h-10 rounded-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-300 ease-in-out shadow-lg shadow-blue-500/20 ${!inputValue.trim() && 'opacity-50 pointer-events-none'}`}
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
            </button>
          </div>
        </div>
      )}

      {/* FAB Stack */}
      <div className="flex flex-col items-end gap-[10px] pointer-events-auto">
        {/* Service FAB */}
        <Link 
          href="/services"
          className="group flex items-center gap-3 bg-white dark:bg-blue-600 p-3 rounded-full shadow-xl border border-slate-100 dark:border-white/10 hover:scale-110 active:scale-95 transition-transform duration-300 ease-in-out cursor-pointer"
        >
          <span className="max-w-0 overflow-hidden group-hover:max-w-[150px] transition-all duration-500 ease-out font-black text-[10px] uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 pl-2 text-blue-600 dark:text-white">
            Repair Services
          </span>
          <span className="material-symbols-outlined text-blue-600 dark:text-white text-[24px]">build</span>
        </Link>

        {/* WhatsApp FAB */}
        <a 
          href="https://api.whatsapp.com/send/?phone=13136268888&text&type=phone_number&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white p-3 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-transform duration-300 ease-in-out cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
          </svg>
        </a>

        {/* Chat Toggle FAB */}
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`bg-blue-600 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-300 ease-in-out cursor-pointer ${isChatOpen ? 'rotate-90 shadow-blue-500/40' : ''}`}
        >
          <span className="material-symbols-outlined text-[28px]">{isChatOpen ? 'close' : 'smart_toy'}</span>
        </button>
      </div>
    </div>
  );
}
