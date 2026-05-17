'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

const POPULAR_CATEGORIES = [
  'টি-পাতা',
  'গুঁড়ো',
  'রুপচর্চা',
  'পাতা',
  'হাট কালেকশন',
  'কাঠা',
];

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="পণ্য খুঁজুন..."
                className="pl-12 pr-4 py-6 text-lg border-2 border-[#1B5E20] rounded-xl focus-visible:ring-[#1B5E20]"
              />
            </div>
            <button
              onClick={onClose}
              className="p-3 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-500">জনপ্রিয়:</span>
            {POPULAR_CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/shop?search=${encodeURIComponent(cat)}`}
                onClick={onClose}
                className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-[#1B5E20] hover:text-white rounded-full transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
