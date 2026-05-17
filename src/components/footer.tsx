'use client';

import Link from 'next/link';
import { Leaf, MapPin, Phone, Mail, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { APP_NAME, APP_TAGLINE, PHONE_NUMBER, EMAIL, ADDRESS, FOOTER_LINKS } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-[#0D3B10] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#1B5E20] rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold">{APP_NAME}</h3>
                <p className="text-xs text-green-200">{APP_TAGLINE}</p>
              </div>
            </Link>
            <p className="text-sm text-green-100 leading-relaxed mb-4">
              প্রকৃতির শক্তিতে সুস্থ থাকুন। আমরা সরাসরি প্রকৃতি থেকে ভেষজ পণ্য সংগ্রহ করে আপনার দোরগোড়ায় পৌঁছে দিই।
            </p>
            <div className="space-y-2 text-sm text-green-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>{ADDRESS}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <span>{PHONE_NUMBER}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <span>{EMAIL}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 border-b border-green-700 pb-2 inline-block">
              দ্রুত লিঙ্ক
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.quick.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-green-100 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold mb-4 border-b border-green-700 pb-2 inline-block">
              আইনি তথ্য
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-green-100 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold mb-4 border-b border-green-700 pb-2 inline-block">
              যুক্ত থাকুন
            </h4>
            <p className="text-sm text-green-100 mb-4">
              আমাদের সাথে যুক্ত থাকুন নতুন অফার ও পণ্যের আপডেট পেতে
            </p>
            <div className="flex gap-2 mb-6">
              <Input
                type="email"
                placeholder="Email"
                className="bg-green-800/50 border-green-700 text-white placeholder:text-green-300"
              />
              <Button className="bg-white text-[#1B5E20] hover:bg-green-100 shrink-0">
                সাবস্ক্রাইব
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-green-800/50 rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-green-800/50 rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-green-200">
          <p>© {new Date().getFullYear()} সর্বস্বত্ব সংরক্ষিত {APP_NAME}</p>
          <p>
            ডেভেলপড বাই{' '}
            <span className="text-white font-medium">কার্টু ডিজিটাল</span>
          </p>
          <div className="flex items-center gap-3">
            <Link href="#" className="hover:text-white transition-colors">
              শর্তাবলী
            </Link>
            <span>|</span>
            <Link href="#" className="hover:text-white transition-colors">
              গোপনীয়তা নীতি
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
