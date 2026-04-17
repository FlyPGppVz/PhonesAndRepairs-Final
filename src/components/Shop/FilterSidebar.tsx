'use client';

import React from 'react';

const CATEGORIES = [
  { id: 'iphone', label: 'iPhone' },
  { id: 'android', label: 'Android' },
  { id: 'ipads', label: 'iPads' },
  { id: 'smartwatch', label: 'Smartwatch' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'consoles', label: 'Consoles' }
];

const BRANDS = ['Apple', 'Samsung', 'Acer', 'Lenovo', 'ASUS', 'Sony', 'Microsoft', 'Nintendo', 'Xiaomi'];

interface FilterSidebarProps {
  search: string;
  setSearch: (val: string) => void;
  selectedCategories: string[];
  toggleCategory: (id: string) => void;
  selectedBrands: string[];
  toggleBrand: (name: string) => void;
  minPrice: string;
  setMinPrice: (val: string) => void;
  maxPrice: string;
  setMaxPrice: (val: string) => void;
  clearFilters: () => void;
}

export default function FilterSidebar({
  search,
  setSearch,
  selectedCategories,
  toggleCategory,
  selectedBrands,
  toggleBrand,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  clearFilters
}: FilterSidebarProps) {
  return (
    <aside className="w-full md:w-64 flex-shrink-0 space-y-8 animate-in fade-in slide-in-from-left duration-700">
      {/* Search Bar */}
      <div className="space-y-3">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Search Products</h3>
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors text-xl">search</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="MacBook, PS5..."
            className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-white/5 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Categories</h3>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <label key={cat.id} className="flex items-center gap-3 group cursor-pointer">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.id)}
                  onChange={() => toggleCategory(cat.id)}
                  className="peer appearance-none w-5 h-5 border border-slate-300 dark:border-white/10 rounded-md checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer"
                />
                <span className="material-symbols-outlined absolute text-white text-sm opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">check</span>
              </div>
              <span className="text-sm font-medium text-slate-600 dark:text-zinc-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{cat.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Brands</h3>
        <div className="grid grid-cols-1 gap-2">
          {BRANDS.map((brand) => (
            <label key={brand} className="flex items-center gap-3 group cursor-pointer">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                  className="peer appearance-none w-5 h-5 border border-slate-300 dark:border-white/10 rounded-md checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer"
                />
                <span className="material-symbols-outlined absolute text-white text-sm opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">check</span>
              </div>
              <span className="text-sm font-medium text-slate-600 dark:text-zinc-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Price Range ($)</h3>
        <div className="flex gap-3">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min"
            className="w-1/2 px-3 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-white/5 rounded-xl text-sm focus:outline-none focus:border-blue-600 transition-all"
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max"
            className="w-1/2 px-3 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-white/5 rounded-xl text-sm focus:outline-none focus:border-blue-600 transition-all"
          />
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={clearFilters}
        className="w-full py-3 px-4 border border-slate-200 dark:border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-500 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-neutral-800 transition-all active:scale-95"
      >
        Clear All Filters
      </button>
    </aside>
  );
}
