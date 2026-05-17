'use client';

import { Phone } from 'lucide-react';
import { PHONE_NUMBER } from '@/lib/constants';

export function TopBar() {
  return (
    <div className="bg-[#0D3B10] text-white text-sm py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a
          href={`tel:${PHONE_NUMBER}`}
          className="flex items-center gap-2 hover:text-green-200 transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span>{PHONE_NUMBER}</span>
        </a>
        <span className="hidden sm:inline text-green-100">
          সারা বাংলাদেশে ফ্রি ডেলিভারি সেবা
        </span>
        <span className="hidden md:inline text-green-100">
          অর্ডার করুন খালি হাতে
        </span>
      </div>
    </div>
  );
}
