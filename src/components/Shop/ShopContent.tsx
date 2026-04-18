'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import FilterSidebar from './FilterSidebar';
import AddToCartSmall from './AddToCartSmall';

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function ShopContent({ initialProducts }: { initialProducts: any[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Filters State
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const debouncedSearch = useDebounce(search, 300);

  const [selectedCategories, setSelectedCategories] = useState<string[]>(searchParams.getAll('category'));
  const [selectedBrands, setSelectedBrands] = useState<string[]>(searchParams.getAll('brand'));
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);

  // Update URL function
  const updateURL = useCallback(() => {
    const params = new URLSearchParams();
    if (search) params.set('q', search);
    selectedCategories.forEach(cat => params.append('category', cat));
    selectedBrands.forEach(brand => params.append('brand', brand));
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    
    // Use replace to avoid bloating history
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [search, selectedCategories, selectedBrands, minPrice, maxPrice, pathname, router]);

  // Effect to update URL when filters change
  useEffect(() => {
    updateURL();
  }, [debouncedSearch, selectedCategories, selectedBrands, minPrice, maxPrice, updateURL]);

  // Effect to sync URL params to state (on popstate)
  useEffect(() => {
    const cats = searchParams.getAll('category');
    const brands = searchParams.getAll('brand');
    setSelectedCategories(cats);
    setSelectedBrands(brands);
    setSearch(searchParams.get('q') || '');
    setMinPrice(searchParams.get('minPrice') || '');
    setMaxPrice(searchParams.get('maxPrice') || '');
  }, [searchParams]);

  // Query Supabase when URL params or state change
  useEffect(() => {
    async function getFilteredProducts() {
      setLoading(true);
      let query = supabase.from('products').select('*');

      if (debouncedSearch) {
        query = query.ilike('title', `%${debouncedSearch}%`);
      }

      if (selectedCategories.length > 0) {
        // Handle URL params mapping safely by normalizing input
        const mappedCats = selectedCategories.map(c => {
          const normalized = c.toLowerCase().trim();
          if (normalized === 'android') return 'Android';
          if (normalized === 'iphone' || normalized === 'iphones') return 'iPhones';
          if (normalized === 'ipads' || normalized === 'ipad') return 'iPads';
          if (normalized === 'samsung') return 'Samsung';
          if (normalized === 'watch' || normalized === 'apple watch') return 'Watch';
          if (normalized === 'consoles') return 'Consoles';
          if (normalized === 'accessories') return 'Accessories';
          // Return the sanitized original with first letter capitalized as fallback
          return normalized.charAt(0).toUpperCase() + normalized.slice(1);
        });
        query = query.in('category', mappedCats);
      }

      if (selectedBrands.length > 0) {
        query = query.in('brand', selectedBrands);
      }

      if (minPrice) {
        query = query.gte('price', parseFloat(minPrice));
      }

      if (maxPrice) {
        query = query.lte('price', parseFloat(maxPrice));
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (!error && data) {
        setProducts(data);
      }
      setLoading(false);
    }

    getFilteredProducts();
  }, [debouncedSearch, selectedCategories, selectedBrands, minPrice, maxPrice]);

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const toggleBrand = (name: string) => {
    setSelectedBrands(prev => 
      prev.includes(name) ? prev.filter(b => b !== name) : [...prev, name]
    );
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedCategories([]);
    setSelectedBrands([]);
    setMinPrice('');
    setMaxPrice('');
    router.replace(pathname);
  };

  return (
    <div className="flex flex-col md:flex-row gap-12">
      {/* Sidebar */}
      <FilterSidebar 
        search={search}
        setSearch={setSearch}
        selectedCategories={selectedCategories}
        toggleCategory={toggleCategory}
        selectedBrands={selectedBrands}
        toggleBrand={toggleBrand}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        clearFilters={clearFilters}
      />

      {/* Product List */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none">
            {loading ? 'Searching...' : `${products.length} Products Found`}
          </h2>
        </div>

        {products.length === 0 && !loading ? (
          <div className="py-20 text-center space-y-4 animate-in fade-in duration-500">
            <span className="material-symbols-outlined text-6xl text-slate-200 dark:text-neutral-800">search_off</span>
            <p className="text-slate-500 font-medium">No products match your filters.</p>
            <button onClick={clearFilters} className="text-blue-600 font-bold hover:underline">Clear all filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {products.map((p) => {
              const mainImage = p.main_image_url || p.variants?.[0]?.image_url || '';
              return (
                <div key={p.id} className="relative group animate-in fade-in slide-in-from-bottom duration-500">
                  <Link 
                    href={`/shop/${p.slug}`}
                    className="h-full bg-slate-50 dark:bg-neutral-900 rounded-[2.25rem] p-6 border border-slate-200/50 dark:border-white/5 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/5 flex flex-col items-center text-center overflow-hidden"
                  >
                    <div className="h-40 md:h-48 flex items-center justify-center mb-6 relative w-full">
                      <div className="absolute inset-0 bg-blue-500/5 blur-[40px] rounded-full scale-0 group-hover:scale-100 transition-transform duration-700"></div>
                      <img 
                        src={mainImage} 
                        alt={p.title}
                        className="max-h-full max-w-[75%] object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="space-y-1.5 w-full">
                      <div className="flex justify-center gap-2 mb-1.5">
                        <span className="text-blue-600 dark:text-blue-400 text-[8px] font-black uppercase tracking-[0.2em]">{p.category}</span>
                        {p.brand && (
                          <span className="text-slate-400 text-[8px] font-black uppercase tracking-[0.2em] px-2 border-l border-slate-200 dark:border-white/10">{p.brand}</span>
                        )}
                      </div>
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-tight px-1">{p.title}</h2>
                      <p className="text-slate-500 text-[11px] line-clamp-2 px-2 h-8 leading-relaxed opacity-80">{p.description}</p>
                      
                      <div className="pt-3 flex flex-col items-start mt-auto space-y-2">
                        <span className="text-lg font-black text-slate-900 dark:text-white">${Number(p.price).toLocaleString()}</span>
                        <div className="flex -space-x-1">
                          {p.variants?.slice(0, 3).map((v: any, i: number) => (
                            <div 
                              key={i} 
                              className="w-2.5 h-2.5 rounded-full border border-white dark:border-neutral-900 shadow-sm" 
                              style={{ backgroundColor: v.color_hex }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                  {/* Integrated Buy Button */}
                  <div className="absolute bottom-6 right-6 z-20 group/btn transition-transform duration-300 hover:scale-110">
                    <AddToCartSmall product={p} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
