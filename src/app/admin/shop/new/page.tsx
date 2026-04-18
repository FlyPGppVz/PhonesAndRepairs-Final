'use client';

import React from 'react';
import ProductForm from '@/components/Admin/ProductForm';

export default function NewProduct() {
  return (
    <main className="pt-32 pb-24 px-6 max-w-full mx-auto min-h-screen">
      <ProductForm 
        headerTitle="Add Masterpiece" 
        headerSubtitle="Create a new entry for your premium device collection." 
      />
    </main>
  );
}
