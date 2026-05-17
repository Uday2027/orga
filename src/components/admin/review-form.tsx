'use client';

import { useState } from 'react';
import { X, Loader2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ReviewFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function ReviewForm({ onClose, onSuccess }: ReviewFormProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    initials: '',
    rating: 5,
    text: '',
  });

  function getInitials(name: string) {
    return name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.text) return;

    setLoading(true);
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          initials: form.initials || getInitials(form.name),
          rating: form.rating,
          text: form.text,
          isActive: true,
        }),
      });

      if (res.ok) {
        onSuccess();
        onClose();
      } else {
        alert('রিভিউ যোগ করতে ব্যর্থ');
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
          <h2 className="text-lg font-semibold text-gray-900">নতুন রিভিউ</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">নাম *</label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ইনিশিয়ালস</label>
              <Input
                value={form.initials}
                onChange={(e) => setForm({ ...form, initials: e.target.value })}
                placeholder="যেমন: সই"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">রেটিং</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setForm({ ...form, rating: r })}
                  className="p-1"
                >
                  <Star
                    className={`w-6 h-6 ${
                      r <= form.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">রিভিউ *</label>
            <textarea
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B5E20] text-sm"
              required
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
