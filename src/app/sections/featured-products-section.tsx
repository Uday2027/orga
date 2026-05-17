'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/product-card';
import { Skeleton } from '@/components/ui/skeleton';
import type { Product } from '@/types';

export function FeaturedProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products?featured=true&limit=8');
        const json = await res.json();
        setProducts(json.data || []);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            আমাদের পণ্য সমূহ
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            ১০০% প্রাকৃতিক ও কেমিক্যাল ফ্রি ভেষজ পণ্য
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">কোনো পণ্য পাওয়া যায়নি</p>
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center border-2 border-[#1B5E20] text-[#1B5E20] hover:bg-[#1B5E20] hover:text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            সব পণ্য দেখুন
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
