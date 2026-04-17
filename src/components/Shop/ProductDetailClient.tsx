'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useCart } from '@/context/CartContext';

interface Variant {
  color_hex: string;
  image_url: string;
  color_name: string;
}

interface StorageOption {
  capacity: string;
  price_offset: number;
}

interface Product {
  id: string; // Added ID for cart integration
  title: string;
  description: string;
  price: number;
  category: string;
  processor_name: string;
  display_nits: string;
  refresh_rate: string;
  battery_desc: string;
  variants: Variant[];
  storage_options: StorageOption[];
  slug: string;
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const [activeVariant, setActiveVariant] = useState(product.variants[0] || { color_hex: '', image_url: '', color_name: '' });
  const [selectedStorage, setSelectedStorage] = useState<StorageOption>(
    product.storage_options && product.storage_options.length > 0 
      ? product.storage_options[0] 
      : { capacity: 'Standard', price_offset: 0 }
  );
  const { addToCart } = useCart();

  const displayPrice = Number(product.price) + selectedStorage.price_offset;

  const handleAddToCart = () => {
    addToCart(product, activeVariant, selectedStorage.capacity, displayPrice);
    toast.success(`${product.title} (${selectedStorage.capacity}) added to cart`, { icon: '🛒' });
  };

  return (
    <main className="pt-24 pb-20 px-4 md:px-8 max-w-[1440px] mx-auto min-h-screen">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-24">
        {/* Image Column */}
        <div className="lg:col-span-7 relative h-[600px] md:h-[800px] bg-slate-50 dark:bg-[#0a0a0a] rounded-3xl overflow-hidden flex flex-col items-center justify-center p-8 md:p-12 border border-slate-200/50 dark:border-white/5">
          <img 
            src={activeVariant.image_url} 
            alt={product.title}
            className="max-w-full h-[70%] md:h-[80%] object-contain drop-shadow-2xl transition-all duration-700 hover:scale-105"
          />
          
          <div className="mt-8 flex gap-6 z-10 bg-white/40 dark:bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/20 dark:border-white/5">
            {product.variants.map((v, i) => (
              <button
                key={i}
                onClick={() => setActiveVariant(v)}
                className={`w-8 h-8 rounded-full border-2 transition-all p-0.5 ${activeVariant.color_hex === v.color_hex ? 'border-blue-500 scale-110' : 'border-transparent opacity-80 hover:opacity-100'}`}
                title={v.color_name}
              >
                <div 
                  className="w-full h-full rounded-full shadow-inner" 
                  style={{ backgroundColor: v.color_hex }}
                />
              </button>
            ))}
          </div>

          <div className="absolute bottom-10 left-10 p-6 bg-white/60 dark:bg-black/60 backdrop-blur-md rounded-2xl max-w-[240px] border border-white/20">
            <p className="text-[10px] font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-2">Build Integrity</p>
            <p className="text-slate-900 dark:text-white text-sm font-medium">Precision engineered for excellence.</p>
          </div>
        </div>

        {/* Info Column */}
        <div className="lg:col-span-5 flex flex-col justify-center lg:sticky lg:top-32">
          <div className="mb-8">
            <span className="text-blue-600 dark:text-blue-400 font-semibold tracking-wide text-xs uppercase mb-3 block">{product.category}</span>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 leading-tight">{product.title}</h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-md mb-6">
              <span className="font-semibold text-slate-900 dark:text-white mr-2">{activeVariant.color_name}</span>. 
              {product.description}
            </p>
            <div className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
              ${displayPrice.toLocaleString()}
            </div>

            {/* Storage Selection */}
            {product.storage_options && product.storage_options.length > 0 && (
              <div className="space-y-4 mb-10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Choose your capacity</p>
                <div className="grid grid-cols-2 gap-3">
                  {product.storage_options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedStorage(opt)}
                      className={`flex flex-col items-center justify-center py-4 px-6 rounded-2xl border-2 transition-all ${selectedStorage.capacity === opt.capacity ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-500/10' : 'border-slate-100 dark:border-white/5 hover:border-slate-200 dark:hover:border-white/10'}`}
                    >
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{opt.capacity}</span>
                      {opt.price_offset > 0 && (
                        <span className="text-[10px] text-slate-500 mt-1">+{opt.price_offset} USD</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <button 
              onClick={handleAddToCart}
              className="w-full py-5 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98]"
            >
              Add to Cart
              <span className="material-symbols-outlined text-xl">shopping_bag</span>
            </button>
            <button className="w-full py-5 bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white rounded-full font-bold text-lg hover:bg-slate-200 dark:hover:bg-white/10 transition-all active:scale-[0.98]">
              Buy Now
            </button>
          </div>
        </div>
      </section>

      {/* Bento Specs */}
      <section className="mb-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Engineering Precision.</h2>
          <p className="text-slate-500 text-lg">Every component refined for professional peak performance.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-auto md:h-[600px]">
          <div className="md:col-span-2 md:row-span-2 bg-slate-900 text-white rounded-3xl p-10 flex flex-col justify-between overflow-hidden relative border border-white/5">
            <div>
              <h3 className="text-3xl font-bold mb-4">{product.processor_name}</h3>
              <p className="text-white/60 text-lg leading-relaxed max-w-sm">Next-generation performance architecture.</p>
            </div>
            <div className="relative h-48 mt-8 flex justify-end">
               <span className="material-symbols-outlined text-[120px] opacity-20 transform rotate-12">memory</span>
            </div>
          </div>
          
          <div className="md:col-span-2 bg-slate-50 dark:bg-white/5 rounded-3xl p-10 flex flex-col justify-between border border-slate-200/50 dark:border-white/5 transition-all hover:bg-slate-100 dark:hover:bg-white/10">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Display Technology</h3>
                <p className="text-slate-500 text-sm">Adaptive technology with fluid transitions.</p>
              </div>
              <span className="material-symbols-outlined text-blue-500 text-3xl">edgesensor_high</span>
            </div>
            <div className="flex items-end gap-12">
              <div>
                <p className="text-3xl font-bold">{product.display_nits} nits</p>
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1">Peak Brightness</p>
              </div>
              <div>
                <p className="text-3xl font-bold">{product.refresh_rate}</p>
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1">Refresh Rate</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-white/5 rounded-3xl p-8 flex flex-col items-center justify-center text-center border border-slate-200/50 dark:border-white/5 transition-all hover:scale-[1.02]">
            <span className="material-symbols-outlined text-blue-500 text-4xl mb-4">camera_enhance</span>
            <h3 className="font-bold">Advanced Camera</h3>
            <p className="text-xs text-slate-500 mt-2">Professional Imaging System</p>
          </div>

          <div className="bg-slate-50 dark:bg-white/5 rounded-3xl p-8 flex flex-col items-center justify-center text-center border border-slate-200/50 dark:border-white/5 transition-all hover:scale-[1.02]">
            <span className="material-symbols-outlined text-blue-500 text-4xl mb-4">battery_charging_full</span>
            <h3 className="font-bold">Battery Life</h3>
            <p className="text-xs text-slate-500 mt-2">{product.battery_desc}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
