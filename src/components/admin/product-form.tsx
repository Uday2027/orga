'use client';

import { useState, useRef } from 'react';
import { X, Upload, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ProductFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function ProductForm({ onClose, onSuccess }: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imagePublicId, setImagePublicId] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    comparePrice: '',
    stock: '',
    category: 'ভেষজ',
    tags: '',
  });

  function generateSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 60);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64 = reader.result as string;
        setPreviewUrl(base64);

        // Upload to Cloudinary via API
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64 }),
        });

        const data = await res.json();
        if (data.data) {
          setPreviewUrl(data.data.url);
          setImagePublicId(data.data.publicId);
        }
        setUploading(false);
      };
    } catch {
      setUploading(false);
      alert('ছবি আপলোড ব্যর্থ হয়েছে');
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.price || !form.stock) {
      alert('সব আবশ্যক ফিল্ড পূরণ করুন');
      return;
    }

    setLoading(true);
    try {
      const slug = form.slug || generateSlug(form.name);
      const payload = {
        name: form.name,
        slug,
        description: form.description,
        price: Number(form.price),
        comparePrice: form.comparePrice ? Number(form.comparePrice) : undefined,
        stock: Number(form.stock),
        category: form.category,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        images: previewUrl ? [{ url: previewUrl, publicId: imagePublicId || undefined }] : [],
        isActive: true,
        isFeatured: false,
      };

      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        onSuccess();
        onClose();
      } else {
        const err = await res.json();
        alert(err.error?.message || 'পণ্য যোগ করতে ব্যর্থ');
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
          <h2 className="text-lg font-semibold text-gray-900">নতুন পণ্য যোগ করুন</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">পণ্যের ছবি</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-[#1B5E20] hover:bg-green-50/30 transition-colors"
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg mx-auto"
                />
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-500">ছবি আপলোড করতে ক্লিক করুন</span>
                </div>
              )}
              {uploading && (
                <div className="mt-2 flex items-center justify-center gap-2 text-sm text-[#1B5E20]">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  আপলোড হচ্ছে...
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">পণ্যের নাম *</label>
              <Input
                value={form.name}
                onChange={(e) => {
                  const name = e.target.value;
                  setForm((f) => ({
                    ...f,
                    name,
                    slug: f.slug || generateSlug(name),
                  }));
                }}
                placeholder="পণ্যের নাম"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <Input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="product-slug"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">বিবরণ</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="পণ্যের বিবরণ লিখুন"
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent text-sm"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">দাম *</label>
              <Input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="০"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">পুরাতন দাম</label>
              <Input
                type="number"
                value={form.comparePrice}
                onChange={(e) => setForm({ ...form, comparePrice: e.target.value })}
                placeholder="০"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">স্টক *</label>
              <Input
                type="number"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                placeholder="০"
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags (কমা দিয়ে)</label>
              <Input
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                placeholder="tag1, tag2"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              বাতিল
            </Button>
            <Button
              type="submit"
              disabled={loading || uploading}
              className="flex-1 bg-[#1B5E20] hover:bg-[#0D3B10]"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
              ) : null}
              পণ্য যোগ করুন
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
