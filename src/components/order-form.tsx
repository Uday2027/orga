'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Trash2, Minus, Plus, ShoppingCart, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCartStore } from '@/store/cart.store';
import { DELIVERY_OPTIONS } from '@/lib/constants';

export function OrderForm() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCartStore();
  const [deliveryMethod, setDeliveryMethod] = useState(DELIVERY_OPTIONS[0].id);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  });

  const subtotal = totalPrice();
  const deliveryCharge = DELIVERY_OPTIONS.find((d) => d.id === deliveryMethod)?.charge || 0;
  const total = subtotal + deliveryCharge;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            product: {
              _id: item.product._id,
              name: item.product.name,
              slug: item.product.slug,
              images: item.product.images,
            },
            quantity: item.quantity,
            price: item.product.price,
          })),
          customer: {
            name: formData.name,
            phone: formData.phone,
            email: formData.email || undefined,
            address: formData.address,
          },
          deliveryMethod,
          deliveryCharge,
          total,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        clearCart();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-xl mx-auto text-center py-16">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-3">অর্ডার সম্পন্ন!</h2>
        <p className="text-gray-600 mb-8">
          আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে। শীঘ্রই আমাদের টিম আপনার সাথে যোগাযোগ করবে।
        </p>
        <Button
          onClick={() => router.push('/shop')}
          className="bg-[#1B5E20] hover:bg-[#0D3B10]"
        >
          আরও শপিং করুন
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <ShoppingCart className="w-10 h-10 text-[#1B5E20] mx-auto mb-3" />
        <h1 className="text-2xl font-bold text-[#1B5E20]">অর্ডার ফর্ম</h1>
        <p className="text-gray-500 mt-1">নিচের ফর্মটি পূরণ করে অর্ডারটি কনফার্ম করুন</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Cart Items */}
        {items.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">আপনার পণ্য</h3>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product._id}
                  className="flex items-center gap-3 pb-4 border-b border-gray-50 last:border-0 last:pb-0"
                >
                  <div className="w-14 h-14 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                    {item.product.images[0] ? (
                      <Image
                        src={item.product.images[0].url}
                        alt={item.product.name}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {item.product.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#1B5E20]">
                      ৳{item.product.price * item.quantity}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeItem(item.product._id)}
                      className="text-gray-400 hover:text-red-500 transition-colors mt-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Customer Info */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                আপনার নাম <span className="text-red-500">*</span>
              </label>
              <Input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="পুরো নাম লিখুন"
                className="bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                মোবাইল নম্বর <span className="text-red-500">*</span>
              </label>
              <Input
                required
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="01700000000"
                className="bg-gray-50"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              ইমেইল (ঐচ্ছিক)
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your@email.com (optional)"
              className="bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              সম্পূর্ণ ঠিকানা <span className="text-red-500">*</span>
            </label>
            <Input
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="গ্রাম, থানা, জেলা উল্লেখ করুন"
              className="bg-gray-50"
            />
          </div>
        </div>

        {/* Delivery */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">
            ডেলিভারি এরিয়া সিলেক্ট করুন <span className="text-red-500">*</span>
          </h3>
          <div className="space-y-3">
            {DELIVERY_OPTIONS.map((option) => (
              <label
                key={option.id}
                className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                  deliveryMethod === option.id
                    ? 'border-[#1B5E20] bg-green-50'
                    : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="delivery"
                    value={option.id}
                    checked={deliveryMethod === option.id}
                    onChange={() => setDeliveryMethod(option.id)}
                    className="w-4 h-4 text-[#1B5E20] accent-[#1B5E20]"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{option.label}</p>
                    <p className="text-sm text-gray-500">{option.sublabel}</p>
                  </div>
                </div>
                <span className="font-semibold text-[#1B5E20]">৳{option.charge}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">সাবটোটাল</span>
            <span className="font-medium">৳{subtotal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">ডেলিভারি চার্জ</span>
            <span className="font-medium">৳{deliveryCharge}</span>
          </div>
          <div className="border-t border-gray-100 pt-3 flex justify-between">
            <span className="font-semibold text-gray-900">মোট</span>
            <span className="text-lg font-bold text-[#1B5E20]">৳{total}</span>
          </div>
        </div>

        <Button
          type="submit"
          disabled={items.length === 0 || submitting}
          className="w-full bg-[#1B5E20] hover:bg-[#0D3B10] py-6 text-base font-semibold"
        >
          {submitting ? 'প্রসেসিং...' : 'অর্ডার কনফার্ম করুন'}
        </Button>
      </form>
    </div>
  );
}
