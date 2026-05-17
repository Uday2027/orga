'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { useCartStore } from '@/store/cart.store';

export function CartDrawer() {
  const { items, isOpen, setDrawerOpen, removeItem, updateQuantity, totalPrice } = useCartStore();
  const total = totalPrice();

  return (
    <Sheet open={isOpen} onOpenChange={setDrawerOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-[#1B5E20]">
            <ShoppingBag className="w-5 h-5" />
            শপিং কার্ট
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-gray-500 mb-4">আপনার কার্ট খালি</p>
            <Link
              href="/shop"
              onClick={() => setDrawerOpen(false)}
              className="inline-flex items-center justify-center bg-[#1B5E20] hover:bg-[#0D3B10] text-white text-sm font-medium rounded-lg px-4 py-2.5 transition-colors"
            >
              শপিং করুন
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => (
                <div key={item.product._id} className="flex gap-3">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                    {item.product.images[0] ? (
                      <Image
                        src={item.product.images[0].url}
                        alt={item.product.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-sm font-semibold text-[#1B5E20] mt-1">
                      ৳{item.product.price}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.product._id, item.quantity - 1)
                        }
                        className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product._id, item.quantity + 1)
                        }
                        className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeItem(item.product._id)}
                        className="ml-auto p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <SheetFooter className="flex-col gap-4 border-t pt-4">
              <div className="flex items-center justify-between w-full">
                <span className="text-sm text-gray-600">মোট</span>
                <span className="text-lg font-bold text-[#1B5E20]">৳{total}</span>
              </div>
              <Link
                href="/checkout"
                onClick={() => setDrawerOpen(false)}
                className="inline-flex items-center justify-center w-full bg-[#1B5E20] hover:bg-[#0D3B10] text-white text-base font-medium rounded-lg py-3.5 transition-colors"
              >
                চেকআউট করুন
              </Link>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
