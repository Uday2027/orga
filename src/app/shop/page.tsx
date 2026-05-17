'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ProductCard } from '@/components/product-card';
import type { Product } from '@/types';

const CATEGORY_FILTERS = [
  { label: 'সকল পণ্য', value: 'all' },
  { label: 'ভেষজ', value: 'ভেষজ' },
  { label: 'টি-পাতা', value: 'টি-পাতা' },
  { label: 'গুঁড়ো', value: 'গুঁড়ো' },
  { label: 'রুপচর্চা', value: 'রুপচর্চা' },
  { label: 'হাট কালেকশন', value: 'হাট কালেকশন' },
];

const SORT_OPTIONS = [
  { label: 'নতুনতম', value: 'newest' },
  { label: 'দাম: কম থেকে বেশি', value: 'price-low' },
  { label: 'দাম: বেশি থেকে কম', value: 'price-high' },
  { label: 'নাম', value: 'name' },
];

function ShopPageContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (activeCategory !== 'all') params.set('category', activeCategory);
        if (initialSearch) params.set('search', initialSearch);
        params.set('sort', sortBy);

        const res = await fetch(`/api/products?${params.toString()}`);
        const json = await res.json();
        setProducts(json.data || []);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [activeCategory, sortBy, initialSearch]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">সকল পণ্য</h1>
        <p className="mt-2 text-gray-500">
          {loading ? 'লোড হচ্ছে...' : `${products.length}টি পণ্য পাওয়া গেছে`}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORY_FILTERS.map((cat) => (
            <Button
              key={cat.value}
              variant={activeCategory === cat.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(cat.value)}
              className={
                activeCategory === cat.value
                  ? 'bg-[#1B5E20] hover:bg-[#0D3B10]'
                  : 'border-gray-200 hover:border-[#1B5E20] hover:text-[#1B5E20]'
              }
            >
              {cat.label}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-square rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">কোনো পণ্য পাওয়া যায়নি</p>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <Skeleton className="h-10 w-48 mb-4" />
        <Skeleton className="h-5 w-32 mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-square rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    }>
      <ShopPageContent />
    </Suspense>
  );
}
