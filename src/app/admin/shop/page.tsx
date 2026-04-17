'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { revalidateShop } from '@/app/actions';

interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  category: string;
}

export default function AdminShop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('id, title, slug, price, category')
      .order('created_at', { ascending: false });

    if (!error && data) setProducts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      toast.error('Error deleting product');
    } else {
      await revalidateShop();
      fetchProducts();
    }
  };

  return (
    <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Shop Inventory</h1>
          <p className="text-slate-500 mt-2">Manage your catalog, variants and technical specifications.</p>
        </div>
        <Link 
          href="/admin/shop/new" 
          className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined">add</span>
          New Product
        </Link>
      </header>

      <div className="bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-white/5 shadow-xl">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-white/5 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
            <tr>
              <th className="px-8 py-5">Product</th>
              <th className="px-8 py-5">Category</th>
              <th className="px-8 py-5">Price</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
            {products.map((p) => (
              <tr key={p.id} className="group hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                <td className="px-8 py-6">
                  <div className="font-bold text-slate-900 dark:text-white">{p.title}</div>
                  <div className="text-xs text-slate-400 font-mono">{p.slug}</div>
                </td>
                <td className="px-8 py-6">
                  <span className="bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {p.category}
                  </span>
                </td>
                <td className="px-8 py-6 font-semibold text-slate-700 dark:text-slate-200">
                  ${Number(p.price).toLocaleString()}
                </td>
                <td className="px-8 py-6 text-right space-x-2">
                  <Link 
                    href={`/shop/${p.slug}`}
                    target="_blank"
                    className="p-2 text-slate-400 hover:text-blue-500 transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">visibility</span>
                  </Link>
                  <Link 
                    href={`/admin/shop/edit/${p.id}`}
                    className="p-2 text-slate-400 hover:text-amber-500 transition-all"
                  >
                    <span className="material-symbols-outlined text-lg">edit</span>
                  </Link>
                  <button 
                    onClick={() => deleteProduct(p.id)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-all"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </td>
              </tr>
            ))}
            {isLoading && (
              <tr>
                <td colSpan={4} className="px-8 py-20 text-center animate-pulse text-slate-400 font-medium">
                  Loading catalog inventory...
                </td>
              </tr>
            )}
            {!isLoading && products.length === 0 && (
              <tr>
                <td colSpan={4} className="px-8 py-20 text-center text-slate-400">
                  No products found. Start by adding one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
