import { createClient } from '@/lib/supabaseServer';
import ShopContent from '@/components/Shop/ShopContent';
import React, { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default async function ShopPage() {
  const supabase = createClient();
  const { data: initialProducts } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto min-h-screen">
      <header className="mb-20 text-center animate-in fade-in slide-in-from-top duration-1000">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-b from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-zinc-400 dark:to-zinc-600 bg-clip-text text-transparent uppercase">The Store.</h1>
        <p className="text-lg md:text-xl text-slate-500 dark:text-zinc-400 font-medium max-w-2xl mx-auto tracking-tight">Pick the perfect device for your digital lifestyle. Expertly restored, premium certified.</p>
      </header>

      <Suspense fallback={<div className="text-center py-20 animate-pulse text-xs font-black uppercase tracking-widest text-slate-400">Restoring Experience...</div>}>
        <ShopContent initialProducts={initialProducts || []} />
      </Suspense>
    </main>
  );
}
