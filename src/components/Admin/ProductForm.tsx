'use client';

import React, { useState, useEffect } from 'react';
import { phpApi } from '@/lib/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { searchProductSpecs } from '@/lib/productSpecs';
import ImageTransformer from './ImageTransformer';
import { processAndUploadImage } from '@/lib/utils/image-processor';
import ProductDetailClient from '@/components/Shop/ProductDetailClient';
interface Variant {
  color_hex: string;
  image_url: string;
  color_name: string;
}

interface StorageOption {
  capacity: string;
  price_offset: number;
}

interface ProductFormProps {
  initialData?: any;
  id?: string;
  headerTitle?: string;
  headerSubtitle?: React.ReactNode;
}

export default function ProductForm({ initialData, id, headerTitle, headerSubtitle }: ProductFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    price: '',
    category: 'iPhones',
    processor_name: '',
    display_nits: '',
    refresh_rate: '',
    battery_desc: '',
  });

  const [variants, setVariants] = useState<Variant[]>([]);
  const [storageOptions, setStorageOptions] = useState<StorageOption[]>([]);
  
  const [editingFile, setEditingFile] = useState<{ index: number; file: File } | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        slug: initialData.slug || '',
        description: initialData.description || '',
        price: initialData.price.toString() || '',
        category: initialData.category || 'iPhones',
        processor_name: initialData.processor_name || '',
        display_nits: initialData.display_nits || '',
        refresh_rate: initialData.refresh_rate || '',
        battery_desc: initialData.battery_desc || '',
      });
      setVariants(initialData.variants || []);
      setStorageOptions(initialData.storage_options || []);
    }
  }, [initialData]);

  const handleTitleBlur = () => {
    if (!formData.title) return;
    
    const specs = searchProductSpecs(formData.title);
    if (specs) {
      setFormData(prev => ({
        ...prev,
        description: prev.description || specs.description,
        processor_name: prev.processor_name || specs.processor_name,
        display_nits: prev.display_nits || specs.display_nits,
        refresh_rate: prev.refresh_rate || specs.refresh_rate,
        battery_desc: prev.battery_desc || specs.battery_desc,
        category: prev.category === 'iPhones' && specs.category !== 'iPhones' ? specs.category : prev.category,
      }));

      // Only auto-fill arrays if they are empty
      let updatedVariants = false;
      let updatedStorage = false;

      if (variants.length === 0 && specs.variants && specs.variants.length > 0) {
        setVariants(specs.variants);
        updatedVariants = true;
      }
      
      if (storageOptions.length === 0 && specs.storage_options && specs.storage_options.length > 0) {
        setStorageOptions(specs.storage_options);
        updatedStorage = true;
      }
      
      // Give a subtle hint to the user
      toast.success('Auto-filled official specifications', { 
        icon: '✨',
        style: { fontSize: '12px' }
      });
    }
  };

  const addStorageOption = () => {
    setStorageOptions([...storageOptions, { capacity: '', price_offset: 0 }]);
  };

  const updateStorageOption = (index: number, field: keyof StorageOption, value: any) => {
    const updated = [...storageOptions];
    updated[index] = { ...updated[index], [field]: value };
    setStorageOptions(updated);
  };

  const removeStorageOption = (index: number) => {
    setStorageOptions(storageOptions.filter((_, i) => i !== index));
  };

  const addVariant = () => {
    setVariants([...variants, { color_hex: '#063183', image_url: '', color_name: '' }]);
  };

  const updateVariant = (index: number, field: keyof Variant, value: string) => {
    const updated = [...variants];
    updated[index] = { ...updated[index], [field]: value };
    setVariants(updated);
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleFileUpload = (index: number, file: File) => {
    setEditingFile({ index, file });
  };

  const handleConfirmTransform = async (imageElement: HTMLImageElement, cropDetails: any, containerSize: number) => {
    if (!editingFile) return;
    const { index } = editingFile;
    setEditingFile(null);
    
    // Add toast to indicate processing
    const toastId = toast.loading('Processing and optimizing image...');
    
    try {
      const publicUrl = await processAndUploadImage(
        imageElement, 
        cropDetails, 
        containerSize, 
        formData.slug || formData.title || 'product'
      );
      updateVariant(index, 'image_url', publicUrl);
      toast.success('Image optimized and uploaded successfully', { id: toastId });
    } catch (error) {
      toast.error('Failed to process image', { id: toastId });
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const productPayload = {
      ...formData,
      price: parseFloat(formData.price),
      variants,
      storage_options: storageOptions,
      main_image_url: variants[0]?.image_url || '',
    };

    try {
      const token = localStorage.getItem('admin_token') || 'temp-token';
      await phpApi.saveProduct(productPayload, id ? 'PUT' : 'POST', token);
      
      router.push('/admin/shop');
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || 'Error saving product');
    }
    setIsSaving(false);
  };

  const previewProduct = {
    id: id || 'preview-id',
    ...formData,
    price: parseFloat(formData.price) || 0,
    variants: variants.length > 0 ? variants : [{ color_hex: '#ccc', image_url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2U1ZTdlYiIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJjZW50cmFsIj5SZWFkeTwvdGV4dD48L3N2Zz4=', color_name: 'Preview Color' }],
    storage_options: storageOptions.length > 0 ? storageOptions : [{ capacity: 'Standard', price_offset: 0 }],
    slug: formData.slug || 'preview',
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[20%_70%] gap-[4%] items-start max-w-[94%] mx-auto w-full">
      <div className="flex flex-col gap-8 w-full">
        <div>
          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 mb-2 block">Información</span>
          {(headerTitle || headerSubtitle) && (
            <header>
              {headerTitle && <h1 className="text-4xl font-bold tracking-tight">{headerTitle}</h1>}
              {headerSubtitle && <p className="text-slate-500 mt-2">{headerSubtitle}</p>}
            </header>
          )}
        </div>
        <form onSubmit={handleSubmit} className="space-y-12 w-full">
      <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 border border-slate-200 dark:border-white/5 shadow-xl space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-500">info</span>
            Basic Information
          </h2>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Product Title</label>
            <input 
              type="text" 
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              onBlur={handleTitleBlur}
              className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              placeholder="e.g. iPhone 17 Pro Max"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Slug (URL Path)</label>
            <input 
              type="text" 
              required
              value={formData.slug}
              onChange={(e) => setFormData({...formData, slug: e.target.value})}
              className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              placeholder="iphone-17-pro-max"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Category</label>
            <select 
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 transition-all outline-none appearance-none"
            >
              <option value="iPhones">iPhones</option>
              <option value="Samsung">Samsung</option>
              <option value="iPads">iPads</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Price (USD)</label>
            <input 
              type="number" 
              required
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              placeholder="1299.00"
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Description</label>
            <textarea 
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 transition-all outline-none resize-none"
              placeholder="Tell us about this masterpiece..."
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 border border-slate-200 dark:border-white/5 shadow-xl space-y-6">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-purple-500">settings_input_component</span>
          Technical Specifications
        </h2>
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Processor Name</label>
            <input 
              type="text" 
              value={formData.processor_name}
              onChange={(e) => setFormData({...formData, processor_name: e.target.value})}
              className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="A19 Pro Bionic"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Display (Nits)</label>
            <input 
              type="text" 
              value={formData.display_nits}
              onChange={(e) => setFormData({...formData, display_nits: e.target.value})}
              className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="2500 nits"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Refresh Rate</label>
            <input 
              type="text" 
              value={formData.refresh_rate}
              onChange={(e) => setFormData({...formData, refresh_rate: e.target.value})}
              className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="120Hz ProMotion"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Battery Description</label>
            <input 
              type="text" 
              value={formData.battery_desc}
              onChange={(e) => setFormData({...formData, battery_desc: e.target.value})}
              className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Optimized for all-day usage"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 border border-slate-200 dark:border-white/5 shadow-xl space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-500">palette</span>
            Color Variants
          </h2>
          <button 
            type="button" 
            onClick={addVariant}
            className="text-sm font-bold text-blue-500 hover:text-blue-600 flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">add_circle</span>
            Add Color
          </button>
        </div>

        <div className="space-y-6">
          {variants.map((variant, index) => (
            <div key={index} className="flex flex-col gap-6 p-6 bg-slate-50 dark:bg-white/5 rounded-2xl relative group">
              <button 
                type="button" 
                onClick={() => removeVariant(index)}
                className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>

              <div className="flex flex-col items-center gap-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Hex</label>
                <input 
                  type="color" 
                  value={variant.color_hex}
                  onChange={(e) => updateVariant(index, 'color_hex', e.target.value)}
                  className="w-12 h-12 bg-transparent border-none cursor-pointer"
                />
              </div>

              <div className="flex-1 space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Color Name</label>
                <input 
                  type="text" 
                  value={variant.color_name}
                  onChange={(e) => updateVariant(index, 'color_name', e.target.value)}
                  className="w-full bg-white dark:bg-black/20 border-none rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="e.g. Titanium Black"
                />
              </div>

              <div className="flex-[2] space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Product Image URL</label>
                <div className="flex gap-3">
                  <input 
                    type="text" 
                    value={variant.image_url}
                    onChange={(e) => updateVariant(index, 'image_url', e.target.value)}
                    className="flex-1 bg-white dark:bg-black/20 border-none rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="https://..."
                  />
                  <label className="bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors">
                    <span className="material-symbols-outlined text-sm">upload</span>
                    Upload
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => e.target.files && handleFileUpload(index, e.target.files[0])}
                    />
                  </label>
                </div>
              </div>
            </div>
          ))}
          {variants.length === 0 && (
            <div className="text-center py-10 border-2 border-dashed border-slate-100 dark:border-white/5 rounded-3xl text-slate-400 text-sm">
              No variants added yet. At least one color is required.
            </div>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 border border-slate-200 dark:border-white/5 shadow-xl space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-green-500">storage</span>
            Storage Options
          </h2>
          <button 
            type="button" 
            onClick={addStorageOption}
            className="text-sm font-bold text-blue-500 hover:text-blue-600 flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">add_circle</span>
            Add Tier
          </button>
        </div>

        <div className="space-y-4">
          {storageOptions.map((opt, index) => (
            <div key={index} className="flex flex-col gap-4 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl relative group">
              <button 
                type="button" 
                onClick={() => removeStorageOption(index)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <span className="material-symbols-outlined text-xs">close</span>
              </button>
              
              <div className="flex-1 space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Capacity</label>
                <input 
                  type="text" 
                  value={opt.capacity}
                  onChange={(e) => updateStorageOption(index, 'capacity', e.target.value)}
                  className="w-full bg-white dark:bg-black/20 border-none rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="e.g. 256GB"
                />
              </div>

              <div className="w-full md:w-48 space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Price Offset (+USD)</label>
                <input 
                  type="number" 
                  value={opt.price_offset}
                  onChange={(e) => updateStorageOption(index, 'price_offset', parseFloat(e.target.value) || 0)}
                  className="w-full bg-white dark:bg-black/20 border-none rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
            </div>
          ))}
          {storageOptions.length === 0 && (
            <div className="text-center py-6 border-2 border-dashed border-slate-100 dark:border-white/5 rounded-2xl text-slate-400 text-xs">
              No storage tiers defined. Standard prices will apply.
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button 
          type="button" 
          onClick={() => router.back()}
          className="px-8 py-4 rounded-full font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-all"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          disabled={isSaving}
          className="bg-blue-600 text-white px-12 py-4 rounded-full font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {isSaving ? 'Saving Masterpiece...' : id ? 'Update Product' : 'Create Product'}
        </button>
      </div>
      </form>
    </div>
    {/* High-Fidelity Detailed Preview Column - STICKY PARALLEL VIEW */}
    <div className="flex flex-col gap-8 w-full hidden xl:flex sticky top-24 h-fit z-20">
      <div>
        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 mb-2 block">Live Preview</span>
        <header>
          <h1 className="text-4xl font-bold tracking-tight">Interactive View</h1>
          <p className="text-slate-500 mt-2">Professional rendering of your masterpiece.</p>
        </header>
      </div>
      <div className="bg-white dark:bg-neutral-950 rounded-[2.5rem] border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col min-h-screen">
        <div className="px-6 py-4 bg-slate-50 dark:bg-zinc-900/50 border-b border-slate-200 dark:border-white/5 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-zinc-400">Live Detail Preview</span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium">Auto-updating Rendering</span>
        </div>
        
        <div className="flex-1">
          <div className="origin-top transform -mt-20 scale-[0.98]">
            <ProductDetailClient product={previewProduct as any} />
          </div>
        </div>
      </div>
    </div>

    {editingFile && (
      <ImageTransformer 
        file={editingFile.file} 
        onConfirm={handleConfirmTransform} 
        onCancel={() => setEditingFile(null)} 
      />
    )}
    </div>
  );
}
