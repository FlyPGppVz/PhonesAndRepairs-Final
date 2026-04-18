'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductDetailClient from '@/components/Shop/ProductDetailClient';
import { phpApi } from '@/lib/api';

function ProductContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!slug) {
        setLoading(false);
        return;
      }
      const data = await phpApi.getProduct(slug);
      setProduct(data);
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen pt-32 text-center text-slate-400">Loading Product...</div>;
  }

  if (!product) {
    return <div className="min-h-screen pt-32 text-center text-slate-400">Product Not Found.</div>;
  }

  return <ProductDetailClient product={product} />;
}

export default function ProductDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center text-slate-400">Loading...</div>}>
      <ProductContent />
    </Suspense>
  );
}
