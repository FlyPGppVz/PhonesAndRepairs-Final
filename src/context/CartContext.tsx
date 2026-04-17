'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  color: string;
  storage: string;
  slug: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: any, variant: any, storage: string, priceWithOffset: number) => void;
  removeFromCart: (id: string, color: string, storage: string) => void;
  updateQuantity: (id: string, color: string, storage: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: any, variant: any, storage: string, priceWithOffset: number) => {
    setCart(prev => {
      const existing = prev.find(item => 
        item.id === product.id && 
        item.color === variant.color_name && 
        item.storage === storage
      );

      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.color === variant.color_name && item.storage === storage
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, {
        id: product.id,
        title: product.title,
        price: priceWithOffset,
        image: variant.image_url,
        color: variant.color_name,
        storage: storage,
        slug: product.slug,
        quantity: 1
      }];
    });
  };

  const removeFromCart = (id: string, color: string, storage: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.color === color && item.storage === storage)));
  };

  const updateQuantity = (id: string, color: string, storage: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id && item.color === color && item.storage === storage) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
