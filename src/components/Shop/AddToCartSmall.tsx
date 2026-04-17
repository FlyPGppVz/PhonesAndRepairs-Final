'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';

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
    
    // Premium toast feedback
    toast.success(`${product.title} añadido`, {
      icon: '🛒',
    });
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
