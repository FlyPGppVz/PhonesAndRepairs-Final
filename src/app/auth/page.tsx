'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'register') {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }

        const { error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            data: {
              first_name: firstName,
              last_name: lastName,
            }
          }
        });
        if (error) throw error;
        alert('Registration successful! Please check your email for verification.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push('/');
        router.refresh();
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-24 flex items-center justify-center px-6 bg-slate-50 dark:bg-black transition-colors">
      <div className="w-full max-w-[480px] cupertino-glass bg-white/70 dark:bg-zinc-900/70 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-white/20 dark:border-white/5 space-y-8 animate-in fade-in zoom-in duration-500">
        
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            {mode === 'login' ? 'Sign In.' : 'Create Account.'}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm md:text-base">
            {mode === 'login' ? 'Step into your personalized tech universe.' : 'Join our exclusive community of tech enthusiasts.'}
          </p>
        </div>

        <div className="flex bg-slate-100 dark:bg-zinc-800 p-1.5 rounded-2xl">
          <button 
            onClick={() => setMode('login')}
            className={`flex-1 py-3 rounded-xl font-bold transition-all duration-300 ${mode === 'login' ? 'bg-white dark:bg-zinc-700 shadow-md text-blue-600 dark:text-blue-400' : 'text-slate-400 hover:text-slate-500'}`}
          >
            Login
          </button>
          <button 
            onClick={() => setMode('register')}
            className={`flex-1 py-3 rounded-xl font-bold transition-all duration-300 ${mode === 'register' ? 'bg-white dark:bg-zinc-700 shadow-md text-blue-600 dark:text-blue-400' : 'text-slate-400 hover:text-slate-500'}`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleAuth} className="space-y-5">
          {mode === 'register' && (
            <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-300">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500 ml-2">Nombre</label>
                <input 
                  type="text" 
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-black/40 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/50 transition-all outline-none text-slate-900 dark:text-white"
                  placeholder="John"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500 ml-2">Apellidos</label>
                <input 
                  type="text" 
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-black/40 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/50 transition-all outline-none text-slate-900 dark:text-white"
                  placeholder="Appleseed"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500 ml-2">Correo Electrónico</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 dark:bg-black/40 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/50 transition-all outline-none text-slate-900 dark:text-white"
              placeholder="name@example.com"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500 ml-2">Contraseña</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 dark:bg-black/40 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/50 transition-all outline-none text-slate-900 dark:text-white"
              placeholder="••••••••"
            />
          </div>

          {mode === 'register' && (
            <div className="space-y-1.5 animate-in slide-in-from-top-2 duration-300">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500 ml-2">Confirmar Contraseña</label>
              <input 
                type="password" 
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-slate-50 dark:bg-black/40 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/50 transition-all outline-none text-slate-900 dark:text-white"
                placeholder="••••••••"
              />
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 dark:bg-blue-500 text-white py-4.5 rounded-full font-bold text-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/20 active:scale-[0.98] disabled:opacity-50 mt-4 h-[60px]"
          >
            {loading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-[11px] text-slate-400 dark:text-zinc-500 leading-relaxed px-4">
            Al continuar, aceptas nuestros <span className="text-blue-500 dark:text-blue-400 font-semibold underline underline-offset-4 cursor-pointer hover:text-blue-600">Términos y Condiciones</span> y nuestra <span className="text-blue-500 dark:text-blue-400 font-semibold underline underline-offset-4 cursor-pointer hover:text-blue-600">Política de Privacidad</span>.
          </p>
        </div>
      </div>
    </main>
  );
}
