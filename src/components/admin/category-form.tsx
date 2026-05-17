'use client';

import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CategoryFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function CategoryForm({ onClose, onSuccess }: CategoryFormProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', slug: '', description: '' });

  function generateSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 60);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name) return;

    setLoading(true);
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          slug: form.slug || generateSlug(form.name),
          description: form.description,
          isActive: true,
        }),
      });

      if (res.ok) {
        onSuccess();
        onClose();
      } else {
        alert('ক্যাটাগরি যোগ করতে ব্যর্থ');
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
      <div className="relative bg-white rounded-2xl w-full max-w-md shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">নতুন ক্যাটাগরি</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">নাম *</label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value, slug: form.slug || generateSlug(e.target.value) })}
              placeholder="ক্যাটাগরির নাম"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
            <Input
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              placeholder="category-slug"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">বিবরণ</label>
            <Input
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="বিবরণ (ঐচ্ছিক)"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">বাতিল</Button>
            <Button type="submit" disabled={loading} className="flex-1 bg-[#1B5E20] hover:bg-[#0D3B10]">
              {loading && <Loader2 className="w-4 h-4 animate-spin mr-1.5" />}
              যোগ করুন
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
