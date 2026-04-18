'use client';

import React from 'react';
import ProductForm from '@/components/Admin/ProductForm';

export default function NewProduct() {
  return (
    <main className="pt-32 pb-24 px-6 max-w-[1600px] mx-auto min-h-screen">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Add Masterpiece</h1>
        <p className="text-slate-500 mt-2">Create a new entry for your premium device collection.</p>
      </header>
      
      <ProductForm />
    </main>
  );
}
