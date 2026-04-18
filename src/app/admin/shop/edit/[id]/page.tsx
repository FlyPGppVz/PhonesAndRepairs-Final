'use client';

import React, { useEffect, useState } from 'react';
import ProductForm from '@/components/Admin/ProductForm';
import { supabase } from '@/lib/supabase';
import { useParams } from 'next/navigation';

interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  category: string;
  [key: string]: any;
}

export default function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      
      if (!error) setProduct(data);
      setLoading(false);
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) return (
    <div className="pt-32 text-center animate-pulse text-slate-400 font-bold">
      Fetching device blueprints...
    </div>
  );

  return (
    <main className="pt-32 pb-24 px-6 max-w-[1600px] mx-auto min-h-screen">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Refine Blueprint</h1>
        <p className="text-slate-500 mt-2">Adjusting specifications for {product?.title}.</p>
      </header>
      
      <ProductForm initialData={product} id={id as string} />
    </main>
  );
}
