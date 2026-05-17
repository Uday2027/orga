'use client';

import { X, Package, User, Phone, MapPin, Truck, Calendar, DollarSign } from 'lucide-react';
import type { Order } from '@/types';

interface OrderDetailProps {
  order: Order;
  onClose: () => void;
  onStatusUpdate: (id: string, status: string) => void;
}

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending', color: 'bg-yellow-50 text-yellow-700' },
  { value: 'processing', label: 'Processing', color: 'bg-blue-50 text-blue-700' },
  { value: 'shipped', label: 'Shipped', color: 'bg-purple-50 text-purple-700' },
  { value: 'delivered', label: 'Delivered', color: 'bg-green-50 text-green-700' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-50 text-red-700' },
];

export function OrderDetail({ order, onClose, onStatusUpdate }: OrderDetailProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            অর্ডার #{order._id.slice(-6).toUpperCase()}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status */}
          <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">স্ট্যাটাস পরিবর্তন করুন</p>
              <select
                value={order.status}
                onChange={(e) => onStatusUpdate(order._id, e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            <span className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize ${
              STATUS_OPTIONS.find(s => s.value === order.status)?.color || 'bg-gray-50 text-gray-700'
            }`}>
              {order.status}
            </span>
          </div>

          {/* Customer Info */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-[#1B5E20]" />
              গ্রাহকের তথ্য
            </h3>
            <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">নাম:</span>
                <span className="font-medium text-gray-900">{order.customer.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">ফোন:</span>
                <span className="font-medium text-gray-900">{order.customer.phone}</span>
              </div>
              {order.customer.email && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">ইমেইল:</span>
                  <span className="font-medium text-gray-900">{order.customer.email}</span>
                </div>
              )}
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                <span className="text-gray-600">ঠিকানা:</span>
                <span className="font-medium text-gray-900">{order.customer.address}</span>
              </div>
            </div>
          </div>

          {/* Delivery */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#1B5E20]" />
              ডেলিভারি তথ্য
            </h3>
            <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">মেথড:</span>
                <span className="font-medium text-gray-900">{order.deliveryMethod}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">ডেলিভারি চার্জ:</span>
                <span className="font-medium text-gray-900">৳{order.deliveryCharge}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">তারিখ:</span>
                <span className="font-medium text-gray-900">
                  {new Date(order.createdAt).toLocaleDateString('bn-BD', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Items */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Package className="w-4 h-4 text-[#1B5E20]" />
              অর্ডারকৃত পণ্যসমূহ
            </h3>
            <div className="border border-gray-100 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-2 font-medium text-gray-600">পণ্য</th>
                    <th className="text-center px-4 py-2 font-medium text-gray-600">পরিমাণ</th>
                    <th className="text-right px-4 py-2 font-medium text-gray-600">দাম</th>
                    <th className="text-right px-4 py-2 font-medium text-gray-600">মোট</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {order.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-3 font-medium text-gray-900">{item.product.name}</td>
                      <td className="px-4 py-3 text-center text-gray-600">{item.quantity}</td>
                      <td className="px-4 py-3 text-right text-gray-600">৳{item.price}</td>
                      <td className="px-4 py-3 text-right font-medium text-[#1B5E20]">
                        ৳{item.price * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan={3} className="px-4 py-3 text-right font-medium text-gray-700">
                      সাবটোটাল:
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-gray-900">
                      ৳{order.total - order.deliveryCharge}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="px-4 py-3 text-right font-medium text-gray-700">
                      ডেলিভারি:
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-gray-900">
                      ৳{order.deliveryCharge}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="px-4 py-3 text-right font-bold text-gray-900">
                      সর্বমোট:
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-[#1B5E20] text-lg">
                      ৳{order.total}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
