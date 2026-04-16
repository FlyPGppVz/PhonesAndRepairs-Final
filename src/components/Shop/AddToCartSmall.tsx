'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';

interface Product {
  id: string;
  title: string;
  price: number;
  variants: any[];
}

export default function AddToCartSmall({ product }: { product: any }) {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const firstVariant = product.variants?.[0] || { color_hex: '', image_url: '', color_name: 'Standard' };
    addToCart(product, firstVariant);
    // Simple visual feedback without alert for smoother experience on listing
    const target = e.currentTarget as HTMLButtonElement;
    const originalText = target.innerHTML;
    target.innerHTML = '<span class="material-symbols-outlined">check</span>';
    target.classList.add('bg-emerald-500');
    setTimeout(() => {
      target.innerHTML = originalText;
      target.classList.remove('bg-emerald-500');
    }, 2000);
  };

  return (
    <button 
      onClick={handleQuickAdd}
      className="p-3 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-500/20 hover:scale-110 active:scale-95 transition-all flex items-center justify-center group/btn"
      title="Add to Cart"
    >
      <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
    </button>
  );
}
