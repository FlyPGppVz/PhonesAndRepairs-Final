'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, totalPrice, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <main className="min-h-screen pt-32 pb-24 px-6 flex flex-col items-center justify-center text-center">
        <div className="cupertino-glass p-12 rounded-[3rem] space-y-6 max-w-md animate-in fade-in zoom-in duration-500">
          <span className="material-symbols-outlined text-7xl text-slate-300 dark:text-zinc-700">shopping_basket</span>
          <h1 className="text-3xl font-bold dark:text-white">Tu carrito está vacío</h1>
          <p className="text-slate-500 dark:text-zinc-400">¿Todavía no has encontrado el dispositivo de tus sueños? Nuestra tienda está llena de novedades.</p>
          <Link href="/shop" className="inline-block bg-blue-600 dark:bg-blue-500 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 dark:hover:bg-blue-600 transition-all active:scale-[0.98]">
            Ir a la tienda
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 max-w-5xl mx-auto">
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
        <header className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight dark:text-white text-center md:text-left">Tu Carrito.</h1>
          <p className="text-slate-500 dark:text-zinc-400 text-lg text-center md:text-left">Revisa tus productos antes de finalizar la compra segura.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Listado de Productos */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={`${item.id}-${item.color}`} className="cupertino-glass p-5 rounded-3xl flex items-center gap-6 group hover:shadow-xl hover:shadow-blue-500/5 transition-all">
                <div className="w-24 h-24 bg-slate-100 dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-inner flex-shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="text-lg font-bold dark:text-white">{item.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-zinc-400 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: 'white' }}></span>
                    Color: {item.color}
                  </p>
                  <p className="font-bold text-blue-600 dark:text-blue-400">${item.price.toLocaleString()}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-sm font-bold bg-slate-100 dark:bg-zinc-800 px-3 py-1 rounded-lg dark:text-white">x{item.quantity}</span>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
                  >
                    <span className="material-symbols-outlined text-xl">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen de Compra */}
          <div className="lg:col-span-1">
            <div className="cupertino-glass p-8 rounded-[2.5rem] sticky top-32 space-y-6">
              <h2 className="text-2xl font-bold dark:text-white border-b border-slate-200 dark:border-white/10 pb-4">Resumen</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-slate-600 dark:text-zinc-400">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-medium">${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-zinc-400">
                  <span>Envío</span>
                  <span className="text-green-500 font-medium">Gratis</span>
                </div>
                <div className="flex justify-between text-2xl font-bold dark:text-white pt-4 border-t border-slate-200 dark:border-white/10">
                  <span>Total</span>
                  <span className="text-blue-600 dark:text-blue-400">${totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <button 
                className="w-full bg-blue-600 dark:bg-blue-500 text-white py-5 rounded-3xl font-bold text-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/20 active:scale-[0.98] mt-4 flex items-center justify-center gap-2"
                onClick={() => alert('Próximamente: Conexión con Stripe Checkout')}
              >
                Pagar con Stripe
                <span className="material-symbols-outlined">shoppay</span>
              </button>

              <div className="text-center">
                <p className="text-[11px] text-slate-400 dark:text-zinc-500">
                  Pago seguro encriptado con SSL de 256 bits.<br/>Aceptamos Visa, MasterCard, Apple Pay y Google Pay.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
