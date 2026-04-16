import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default async function ShopPage() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <header className="mb-16 text-center">
        <h1 className="text-6xl font-bold tracking-tight mb-4">The Store.</h1>
        <p className="text-xl text-slate-500">Pick the perfect device for your digital lifestyle.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(products || []).map((p) => {
          const mainImage = p.variants?.[0]?.image_url || '';
          return (
            <Link 
              key={p.id} 
              href={`/shop/${p.slug}`}
              className="group bg-slate-50 dark:bg-neutral-900 rounded-[2.5rem] p-8 border border-slate-200/50 dark:border-white/5 transition-all hover:scale-[1.02] hover:shadow-2xl flex flex-col items-center text-center"
            >
              <div className="h-64 flex items-center justify-center mb-8 relative">
                <img 
                  src={mainImage} 
                  alt={p.title}
                  className="max-h-full object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <span className="text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-2 block">{p.category}</span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{p.title}</h2>
              <p className="text-slate-500 text-sm mb-6 line-clamp-2 px-4">{p.description}</p>
              <div className="text-xl font-bold">${Number(p.price).toLocaleString()}</div>
              
              <div className="mt-6 flex gap-2">
                {p.variants?.map((v: any, i: number) => (
                  <div 
                    key={i} 
                    className="w-3 h-3 rounded-full border border-white/20 shadow-sm" 
                    style={{ backgroundColor: v.color_hex }}
                  />
                ))}
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
