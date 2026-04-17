import { createClient } from '@/lib/supabaseServer';
import { notFound } from 'next/navigation';
import ProductDetailClient from '@/components/Shop/ProductDetailClient';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const supabase = await createClient();

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
