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
    const firstStorage = product.storage_options && product.storage_options.length > 0 
      ? product.storage_options[0] 
      : { capacity: 'Standard', price_offset: 0 };
    
    const finalPrice = Number(product.price) + firstStorage.price_offset;
    
    addToCart(product, firstVariant, firstStorage.capacity, finalPrice);
    
    // Premium toast feedback
    toast.success(`${product.title} (${firstStorage.capacity}) added`, {
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
