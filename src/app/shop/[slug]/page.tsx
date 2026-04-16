import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import ProductDetailClient from '@/components/Shop/ProductDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
