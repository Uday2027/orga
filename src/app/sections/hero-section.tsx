'use client';

import Link from 'next/link';
import { ArrowRight, Leaf, Heart, ShoppingCart, Star, Truck } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative bg-[#1B5E20] overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4" />
      <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-white/5 rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
              <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              ১০০% প্রাকৃতিক ও ভেষজ
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              মা ভেষজ<br />বাণিজ্যালয়
            </h1>

            <h2 className="text-xl sm:text-2xl font-semibold text-green-100">
              প্রাকৃতিক ভেষজ পণ্য
            </h2>

            <p className="text-green-100 text-base sm:text-lg leading-relaxed max-w-lg">
              প্রকৃতির শক্তিতে সুস্থ থাকুন। ভেষজ গুঁড়ো, চা, হাটি কেয়ার ও আরও অনেক কিছু — সরাসরি প্রকৃতি থেকে আপনার দোরগোড়ায়।
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center bg-white text-[#1B5E20] hover:bg-green-50 px-6 py-3.5 text-base font-semibold rounded-xl transition-colors"
              >
                এখনই কিনুন
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center border-2 border-white/40 text-white hover:bg-white/10 px-6 py-3.5 text-base font-semibold rounded-xl transition-colors"
              >
                সব পণ্য দেখুন
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-green-100 text-sm">
                <Leaf className="w-4 h-4" />
                <span>১০০% ভেষজ</span>
              </div>
              <div className="flex items-center gap-2 text-green-100 text-sm">
                <Truck className="w-4 h-4" />
                <span>ফ্রি ডেলিভারি</span>
              </div>
              <div className="flex items-center gap-2 text-green-100 text-sm">
                <Star className="w-4 h-4" />
                <span>সর্বোচ্চ রেটেড</span>
              </div>
            </div>
          </div>

          {/* Right Content - Brand Visual */}
          <div className="relative hidden lg:flex items-center justify-center">
            <div className="relative w-80 h-80">
              {/* Outer ring */}
              <div className="absolute inset-0 border-2 border-white/20 rounded-full" />
              <div className="absolute inset-4 border border-white/10 rounded-full" />
              
              {/* Center logo card */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-[#0D3B10] rounded-2xl p-8 shadow-2xl">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-[#1B5E20] rounded-xl flex items-center justify-center">
                      <Leaf className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-white">মা ভেষজ</h3>
                      <p className="text-sm text-[#F9A825] font-medium">বাণিজ্যালয়</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-2 right-0 bg-white rounded-xl px-3 py-2 shadow-lg flex items-center gap-2">
                <Leaf className="w-4 h-4 text-[#1B5E20]" />
                <span className="text-xs font-medium text-gray-700">ভেষজ গুঁড়ো</span>
              </div>
              <div className="absolute top-1/3 -left-4 bg-white rounded-xl px-3 py-2 shadow-lg flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                <span className="text-xs font-medium text-gray-700">হাট কেয়ার</span>
              </div>
              <div className="absolute bottom-8 -right-2 bg-white rounded-xl px-3 py-2 shadow-lg flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-[#1B5E20]" />
                <span className="text-xs font-medium text-gray-700">ভেষজ চা</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
