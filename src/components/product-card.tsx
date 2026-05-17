'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart.store';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { addItem, setDrawerOpen } = useCartStore();

  const handleOrderNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    router.push('/checkout');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setDrawerOpen(true);
  };

  return (
    <div className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/shop?product=${product.slug}`} className="block">
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          {product.images[0] ? (
            <Image
              src={product.images[0].url}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>
      </Link>

      <div className="p-3 sm:p-4">
        <Link href={`/shop?product=${product.slug}`}>
          <h3 className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] hover:text-[#1B5E20] transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold text-[#1B5E20]">
            ৳{product.price}
          </span>
          {product.comparePrice && product.comparePrice > product.price && (
            <span className="text-sm text-gray-400 line-through">
              ৳{product.comparePrice}
            </span>
          )}
        </div>

        <div className="mt-3 flex items-center gap-2">
          <Button
            onClick={handleOrderNow}
            className="flex-1 bg-[#1B5E20] hover:bg-[#0D3B10] text-xs sm:text-sm py-2 sm:py-2.5"
          >
            <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" />
            <span className="hidden sm:inline">অর্ডার করুন</span>
            <span className="sm:hidden">কিনুন</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleAddToCart}
            className="hidden sm:flex border-gray-200 hover:border-[#1B5E20] hover:text-[#1B5E20]"
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
