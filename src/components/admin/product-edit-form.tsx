'use client';

import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Product } from '@/types';

interface ProductEditFormProps {
  product: Product;
  onClose: () => void;
  onSuccess: () => void;
}

export function ProductEditForm({ product, onClose, onSuccess }: ProductEditFormProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: String(product.price),
    comparePrice: product.comparePrice ? String(product.comparePrice) : '',
    stock: String(product.stock),
    category: product.category,
    tags: product.tags?.join(', ') || '',
    isActive: product.isActive,
    isFeatured: product.isFeatured,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        id: product._id,
        name: form.name,
        slug: form.slug,
        description: form.description,
        price: Number(form.price),
        comparePrice: form.comparePrice ? Number(form.comparePrice) : undefined,
        stock: Number(form.stock),
        category: form.category,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        isActive: form.isActive,
        isFeatured: form.isFeatured,
      };

      const res = await fetch('/api/admin/products', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        onSuccess();
        onClose();
      } else {
        const err = await res.json();
        alert(err.error?.message || 'আপডেট ব্যর্থ');
      }
    } catch {
      alert('একটি ত্রুটি হয়েছে');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">পণ্য এডিট করুন</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">পণ্যের নাম *</label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <Input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">বিবরণ</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B5E20] text-sm"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">দাম *</label>
              <Input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">পুরাতন দাম</label>
              <Input
                type="number"
                value={form.comparePrice}
                onChange={(e) => setForm({ ...form, comparePrice: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">স্টক *</label>
              <Input
                type="number"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ক্যাটাগরি</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B5E20] text-sm"
              >
                <option value="ভেষজ">ভেষজ</option>
                <option value="টি-পাতা">টি-পাতা</option>
                <option value="গুঁড়ো">গুঁড়ো</option>
                <option value="রুপচর্চা">রুপচর্চা</option>
                <option value="হাট কালেকশন">হাট কালেকশন</option>
                <option value="কাঠা">কাঠা</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
              <Input
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                className="w-4 h-4 accent-[#1B5E20]"
              />
              <span className="text-sm text-gray-700">অ্যাক্টিভ</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isFeatured}
                onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                className="w-4 h-4 accent-[#1B5E20]"
              />
              <span className="text-sm text-gray-700">ফিচার্ড</span>
            </label>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              বাতিল
            </Button>
            <Button type="submit" disabled={loading} className="flex-1 bg-[#1B5E20] hover:bg-[#0D3B10]">
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : null}
              আপডেট করুন
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
