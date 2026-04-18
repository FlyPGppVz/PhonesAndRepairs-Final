'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart }),
      });

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Failed to create checkout session');
      }
    } catch (error: any) {
      toast.error(error.message || 'Checkout error');
      setIsLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <main className="min-h-screen pt-32 pb-24 px-6 flex flex-col items-center justify-center text-center">
        <div className="cupertino-glass p-12 rounded-[3rem] space-y-6 max-w-md animate-in fade-in zoom-in duration-500">
          <span className="material-symbols-outlined text-7xl text-slate-300 dark:text-zinc-700">shopping_basket</span>
          <h1 className="text-3xl font-bold dark:text-white">Your cart is empty</h1>
          <p className="text-slate-500 dark:text-zinc-400">Haven't found your dream device yet? Our store is full of the latest arrivals.</p>
          <Link href="/shop" className="inline-block bg-blue-600 dark:bg-blue-500 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 dark:hover:bg-blue-600 transition-all active:scale-[0.98]">
            Go to Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 max-w-5xl mx-auto">
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
        <header className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight dark:text-white text-center md:text-left">Your Cart.</h1>
          <p className="text-slate-500 dark:text-zinc-400 text-lg text-center md:text-left">Review your products before completing your secure checkout.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Listado de Productos */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={`${item.id}-${item.color}-${item.storage}`} className="cupertino-glass p-5 rounded-3xl flex items-center gap-6 group hover:shadow-xl hover:shadow-blue-500/5 transition-all">
                <div className="w-24 h-24 bg-slate-100 dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-inner flex-shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="text-lg font-bold dark:text-white">{item.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-zinc-400 flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded-full border border-slate-200 dark:border-white/5">
                      <span className="w-2 h-2 rounded-full border border-white/20" style={{ backgroundColor: item.colorHex || (item.color === 'White' ? '#fff' : item.color) }}></span>
                      {item.color}
                    </span>
                    <span className="bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded-full border border-slate-200 dark:border-white/5 font-medium">
                      {item.storage}
                    </span>
                  </p>
                  <p className="font-bold text-blue-600 dark:text-blue-400">${item.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-slate-100 dark:bg-zinc-800 rounded-2xl p-1 border border-slate-200 dark:border-white/5">
                    <button 
                      onClick={() => updateQuantity(item.id, item.color, item.storage, -1)}
                      className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-white dark:hover:bg-white/10 text-slate-500 dark:text-zinc-400 transition-all active:scale-90 disabled:opacity-30"
                      disabled={item.quantity <= 1}
                    >
                      <span className="material-symbols-outlined text-lg">remove</span>
                    </button>
                    <span className="w-10 text-center font-black dark:text-white text-sm">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.color, item.storage, 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-white dark:hover:bg-white/10 text-slate-500 dark:text-zinc-400 transition-all active:scale-90"
                    >
                      <span className="material-symbols-outlined text-lg">add</span>
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id, item.color, item.storage)}
                    className="p-1.5 text-slate-300 hover:text-red-500 transition-colors"
                    title="Remove item"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen de Compra */}
          <div className="lg:col-span-1">
            <div className="cupertino-glass p-8 rounded-[2.5rem] sticky top-32 space-y-6">
              <h2 className="text-2xl font-bold dark:text-white border-b border-slate-200 dark:border-white/10 pb-4">Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-slate-600 dark:text-zinc-400">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-medium">${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-zinc-400">
                  <span>Shipping</span>
                  <span className="text-green-500 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-2xl font-bold dark:text-white pt-4 border-t border-slate-200 dark:border-white/10">
                  <span>Total</span>
                  <span className="text-blue-600 dark:text-blue-400">${totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <button 
                className={`w-full ${isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600'} text-white py-5 rounded-3xl font-bold text-lg transition-all shadow-xl shadow-blue-500/20 active:scale-[0.98] mt-4 flex items-center justify-center gap-2`}
                onClick={handleCheckout}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Processing...
                  </span>
                ) : (
                  <>
                    Buy Now
                    <span className="material-symbols-outlined">bolt</span>
                  </>
                )}
              </button>

              <div className="text-center">
                <p className="text-[11px] text-slate-400 dark:text-zinc-500">
                  Secure payment encrypted with 256-bit SSL.<br/>We accept Visa, MasterCard, Apple Pay and Google Pay.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
