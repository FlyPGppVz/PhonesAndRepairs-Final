'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function IntegrationsPage() {
  const [stripePublic, setStripePublic] = useState('');
  const [stripeSecret, setStripeSecret] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    // Fetch current settings
    async function fetchSettings() {
      try {
        const { data, error } = await supabase.from('app_settings').select('*');
        if (!error && data) {
          const publicRecord = data.find(r => r.key === 'stripe_public_key');
          const secretRecord = data.find(r => r.key === 'stripe_secret_key');
          
          if (publicRecord) setStripePublic(publicRecord.value || '');
          if (secretRecord) setStripeSecret(secretRecord.value || '');
        }
      } catch (err) {
        console.error('Error fetching settings:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');
    
    try {
      // Upsert Public Key
      await supabase.from('app_settings').upsert({ key: 'stripe_public_key', value: stripePublic }, { onConflict: 'key' });
      // Upsert Secret Key
      await supabase.from('app_settings').upsert({ key: 'stripe_secret_key', value: stripeSecret }, { onConflict: 'key' });
      
      setSuccessMsg('Settings saved correctly!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error('Error saving settings:', err);
      alert('Error saving settings. Check console.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="animate-pulse">Loading settings...</div>;

  return (
    <div className="space-y-8 max-w-2xl">
      <h1 className="text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white">API Integrations</h1>
      <p className="text-slate-500 dark:text-zinc-400 font-medium">Manage third-party connections and sensitive server keys from here.</p>

      <form onSubmit={handleSave} className="space-y-6 bg-slate-50 dark:bg-[#1a1c1e] p-8 rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm">
        <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-slate-200">Stripe Configuration</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Publishable Key</label>
            <input 
              required
              type="text" 
              value={stripePublic}
              onChange={(e) => setStripePublic(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-black text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="pk_test_..."
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Secret Key</label>
            <input 
              required
              type="password" 
              value={stripeSecret}
              onChange={(e) => setStripeSecret(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-black text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="sk_test_..."
            />
            <p className="text-[10px] text-slate-400 mt-2 font-medium">This key is securely accessed via Supabase server-side RPC on Checkout.</p>
          </div>
        </div>

        <div className="pt-6 flex items-center justify-between">
            {successMsg ? <span className="text-green-500 font-bold text-sm">{successMsg}</span> : <span></span>}
            <button 
              type="submit" 
              disabled={saving}
              className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold text-sm tracking-widest uppercase hover:bg-blue-700 transition-all disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Keys'}
            </button>
        </div>
      </form>
    </div>
  );
}
