'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard, Package, ShoppingCart, LogOut, Plus, Pencil, Trash2,
  Loader2, TrendingUp, DollarSign, AlertTriangle, Star, FileText,
  Tag, Search, ChevronDown, Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ProductForm } from '@/components/admin/product-form';
import { ProductEditForm } from '@/components/admin/product-edit-form';
import { OrderDetail } from '@/components/admin/order-detail';
import { CategoryForm } from '@/components/admin/category-form';
import { ReviewForm } from '@/components/admin/review-form';
import { BlogForm } from '@/components/admin/blog-form';
import { RevenueChart } from '@/components/admin/revenue-chart';
import type { Product, Order, Category, Review, Blog } from '@/types';

interface StatsData {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  todayRevenue: number;
  monthRevenue: number;
  lastMonthRevenue: number;
  yearRevenue: number;
  pendingOrders: number;
  lowStockProducts: { _id: string; name: string; stock: number }[];
  monthlyStats: { _id: { year: number; month: number }; revenue: number; orders: number }[];
}

type Tab = 'dashboard' | 'products' | 'orders' | 'categories' | 'reviews' | 'blogs';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 'dashboard') fetchStats();
  }, [activeTab]);

  async function fetchStats() {
    try {
      const res = await fetch('/api/admin/stats');
      const json = await res.json();
      if (json.data) setStats(json.data);
    } catch {
      // ignore
    }
  }

  async function fetchData() {
    setLoading(true);
    try {
      switch (activeTab) {
        case 'products':
        case 'dashboard': {
          const res = await fetch('/api/admin/products');
          const json = await res.json();
          setProducts(json.data || []);
          break;
        }
        case 'orders': {
          const res = await fetch('/api/admin/orders');
          const json = await res.json();
          setOrders(json.data || []);
          break;
        }
        case 'categories': {
          const res = await fetch('/api/admin/categories');
          const json = await res.json();
          setCategories(json.data || []);
          break;
        }
        case 'reviews': {
          const res = await fetch('/api/admin/reviews');
          const json = await res.json();
          setReviews(json.data || []);
          break;
        }
        case 'blogs': {
          const res = await fetch('/api/admin/blogs');
          const json = await res.json();
          setBlogs(json.data || []);
          break;
        }
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteProduct(id: string) {
    if (!confirm('আপনি কি এই পণ্যটি মুছে ফেলতে চান?')) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' });
      if (res.ok) setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch { alert('মুছে ফেলতে ব্যর্থ'); }
    finally { setDeletingId(null); }
  }

  async function handleDeleteCategory(id: string) {
    if (!confirm('আপনি কি এই ক্যাটাগরিটি মুছে ফেলতে চান?')) return;
    try {
      const res = await fetch(`/api/admin/categories?id=${id}`, { method: 'DELETE' });
      if (res.ok) setCategories((prev) => prev.filter((c) => c._id !== id));
    } catch { alert('মুছে ফেলতে ব্যর্থ'); }
  }

  async function handleDeleteReview(id: string) {
    if (!confirm('আপনি কি এই রিভিউটি মুছে ফেলতে চান?')) return;
    try {
      const res = await fetch(`/api/admin/reviews?id=${id}`, { method: 'DELETE' });
      if (res.ok) setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch { alert('মুছে ফেলতে ব্যর্থ'); }
  }

  async function handleDeleteBlog(id: string) {
    if (!confirm('আপনি কি এই ব্লগটি মুছে ফেলতে চান?')) return;
    try {
      const res = await fetch(`/api/admin/blogs?id=${id}`, { method: 'DELETE' });
      if (res.ok) setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch { alert('মুছে ফেলতে ব্যর্থ'); }
  }

  async function handleUpdateOrderStatus(id: string, status: string) {
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o._id === id ? { ...o, status } as Order : o))
        );
        if (viewingOrder && viewingOrder._id === id) {
          setViewingOrder({ ...viewingOrder, status } as Order);
        }
      }
    } catch { alert('স্ট্যাটাস আপডেট ব্যর্থ'); }
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.phone.includes(searchQuery);
    const matchesStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const s = stats;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#1B5E20]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white">
            <LayoutDashboard className="w-5 h-5" />
            এডমিন প্যানেল
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-green-100 hover:text-white transition-colors">
              ওয়েবসাইট দেখুন
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-green-100 hover:text-white hover:bg-white/10"
            >
              <LogOut className="w-4 h-4 mr-1.5" />
              লগআউট
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {[
            { key: 'dashboard' as Tab, label: 'ড্যাশবোর্ড', icon: LayoutDashboard },
            { key: 'products' as Tab, label: 'পণ্যসমূহ', icon: Package },
            { key: 'orders' as Tab, label: 'অর্ডারসমূহ', icon: ShoppingCart },
            { key: 'categories' as Tab, label: 'ক্যাটাগরি', icon: Tag },
            { key: 'reviews' as Tab, label: 'রিভিউসমূহ', icon: Star },
            { key: 'blogs' as Tab, label: 'ব্লগসমূহ', icon: FileText },
          ].map((tab) => (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? 'default' : 'outline'}
              onClick={() => { setActiveTab(tab.key); setSearchQuery(''); }}
              className={activeTab === tab.key ? 'bg-[#1B5E20] hover:bg-[#0D3B10]' : ''}
              size="sm"
            >
              <tab.icon className="w-4 h-4 mr-1.5" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* ========== DASHBOARD TAB ========== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-500">মোট পণ্য</CardTitle></CardHeader>
                <CardContent><div className="text-2xl font-bold text-[#1B5E20]">{s?.totalProducts ?? products.length}</div></CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-500">মোট অর্ডার</CardTitle></CardHeader>
                <CardContent><div className="text-2xl font-bold text-[#1B5E20]">{s?.totalOrders ?? 0}</div></CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-500">মোট রেভিনিউ</CardTitle></CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#1B5E20] flex items-center gap-1">
                    <DollarSign className="w-5 h-5" />৳{(s?.totalRevenue ?? 0).toLocaleString('bn-BD')}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-500">মাসিক রেভিনিউ</CardTitle></CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#1B5E20] flex items-center gap-1">
                    <TrendingUp className="w-5 h-5" />৳{(s?.monthRevenue ?? 0).toLocaleString('bn-BD')}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Secondary Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-500">আজকের রেভিনিউ</CardTitle></CardHeader>
                <CardContent><div className="text-xl font-bold text-[#1B5E20]">৳{(s?.todayRevenue ?? 0).toLocaleString('bn-BD')}</div></CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-500">বছরের রেভিনিউ</CardTitle></CardHeader>
                <CardContent><div className="text-xl font-bold text-[#1B5E20]">৳{(s?.yearRevenue ?? 0).toLocaleString('bn-BD')}</div></CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-500">Pending অর্ডার</CardTitle></CardHeader>
                <CardContent><div className="text-xl font-bold text-yellow-600">{s?.pendingOrders ?? 0}</div></CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              {s?.monthlyStats && <RevenueChart data={s.monthlyStats} />}

              {/* Low Stock Alert */}
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  কম স্টকে থাকা পণ্য
                </h3>
                {s?.lowStockProducts && s.lowStockProducts.length > 0 ? (
                  <div className="space-y-2">
                    {s.lowStockProducts.map((p) => (
                      <div key={p._id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-900">{p.name}</span>
                        <span className="text-sm font-bold text-orange-600">{p.stock}টি বাকি</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">সব পণ্যের স্টক ঠিক আছে</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========== PRODUCTS TAB ========== */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <h2 className="font-semibold text-gray-900">পণ্য তালিকা</h2>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="পণ্য খুঁজুন..."
                    className="pl-9 w-full sm:w-64"
                  />
                </div>
                <Button className="bg-[#1B5E20] hover:bg-[#0D3B10]" size="sm" onClick={() => setShowProductForm(true)}>
                  <Plus className="w-4 h-4 mr-1.5" />নতুন পণ্য
                </Button>
              </div>
            </div>
            {loading ? (
              <div className="p-8 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-[#1B5E20]" /></div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">ছবি</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">পণ্যের নাম</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">ক্যাটাগরি</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">দাম</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">স্টক</th>
                      <th className="text-center px-4 py-3 font-medium text-gray-600">স্ট্যাটাস</th>
                      <th className="text-right px-4 py-3 font-medium text-gray-600">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredProducts.map((product) => (
                      <tr key={product._id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          {product.images[0] ? (
                            <img src={product.images[0].url} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                          ) : (
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">No Img</div>
                          )}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900">{product.name}</td>
                        <td className="px-4 py-3 text-gray-600">{product.category}</td>
                        <td className="px-4 py-3 text-[#1B5E20] font-medium">৳{product.price}</td>
                        <td className="px-4 py-3">
                          <span className={`font-medium ${product.stock < 10 ? 'text-red-500' : 'text-gray-600'}`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            {product.isActive && <span className="px-2 py-0.5 text-xs bg-green-50 text-green-700 rounded-full">Active</span>}
                            {product.isFeatured && <span className="px-2 py-0.5 text-xs bg-amber-50 text-amber-700 rounded-full">Featured</span>}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => setEditingProduct(product)} className="p-1.5 text-gray-400 hover:text-[#1B5E20] transition-colors">
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteProduct(product._id)} disabled={deletingId === product._id} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                              {deletingId === product._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ========== ORDERS TAB ========== */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <h2 className="font-semibold text-gray-900">অর্ডার তালিকা</h2>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="গ্রাহক বা ফোন..."
                    className="pl-9 w-full sm:w-64"
                  />
                </div>
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
                >
                  <option value="all">সব স্ট্যাটাস</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            {loading ? (
              <div className="p-8 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-[#1B5E20]" /></div>
            ) : filteredOrders.length === 0 ? (
              <div className="p-8 text-center text-gray-500">কোনো অর্ডার পাওয়া যায়নি</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">অর্ডার আইডি</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">গ্রাহক</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">ফোন</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">ঠিকানা</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">মোট</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">স্ট্যাটাস</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">তারিখ</th>
                      <th className="text-right px-4 py-3 font-medium text-gray-600">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredOrders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-mono text-gray-600">{order._id.slice(-6).toUpperCase()}</td>
                        <td className="px-4 py-3 font-medium text-gray-900">{order.customer.name}</td>
                        <td className="px-4 py-3 text-gray-600">{order.customer.phone}</td>
                        <td className="px-4 py-3 text-gray-600 max-w-[200px] truncate">{order.customer.address}</td>
                        <td className="px-4 py-3 text-[#1B5E20] font-medium">৳{order.total}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full capitalize ${
                            order.status === 'delivered' ? 'bg-green-50 text-green-700' :
                            order.status === 'cancelled' ? 'bg-red-50 text-red-700' :
                            order.status === 'shipped' ? 'bg-purple-50 text-purple-700' :
                            order.status === 'processing' ? 'bg-blue-50 text-blue-700' :
                            'bg-yellow-50 text-yellow-700'
                          }`}>{order.status}</span>
                        </td>
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{new Date(order.createdAt).toLocaleDateString('bn-BD')}</td>
                        <td className="px-4 py-3 text-right">
                          <button onClick={() => setViewingOrder(order)} className="p-1.5 text-gray-400 hover:text-[#1B5E20] transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ========== CATEGORIES TAB ========== */}
        {activeTab === 'categories' && (
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">ক্যাটাগরি তালিকা</h2>
              <Button className="bg-[#1B5E20] hover:bg-[#0D3B10]" size="sm" onClick={() => setShowCategoryForm(true)}>
                <Plus className="w-4 h-4 mr-1.5" />নতুন ক্যাটাগরি
              </Button>
            </div>
            {loading ? (
              <div className="p-8 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-[#1B5E20]" /></div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">নাম</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Slug</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">বিবরণ</th>
                      <th className="text-right px-4 py-3 font-medium text-gray-600">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {categories.map((cat) => (
                      <tr key={cat._id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">{cat.name}</td>
                        <td className="px-4 py-3 text-gray-600 font-mono text-xs">{cat.slug}</td>
                        <td className="px-4 py-3 text-gray-600">{cat.description || '—'}</td>
                        <td className="px-4 py-3 text-right">
                          <button onClick={() => handleDeleteCategory(cat._id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ========== REVIEWS TAB ========== */}
        {activeTab === 'reviews' && (
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">রিভিউ তালিকা</h2>
              <Button className="bg-[#1B5E20] hover:bg-[#0D3B10]" size="sm" onClick={() => setShowReviewForm(true)}>
                <Plus className="w-4 h-4 mr-1.5" />নতুন রিভিউ
              </Button>
            </div>
            {loading ? (
              <div className="p-8 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-[#1B5E20]" /></div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">নাম</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">রেটিং</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">রিভিউ</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">স্ট্যাটাস</th>
                      <th className="text-right px-4 py-3 font-medium text-gray-600">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {reviews.map((review) => (
                      <tr key={review._id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#1B5E20] rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {review.initials}
                            </div>
                            <span className="font-medium text-gray-900">{review.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{review.text}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 text-xs rounded-full ${review.isActive ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                            {review.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button onClick={() => handleDeleteReview(review._id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ========== BLOGS TAB ========== */}
        {activeTab === 'blogs' && (
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">ব্লগ তালিকা</h2>
              <Button className="bg-[#1B5E20] hover:bg-[#0D3B10]" size="sm" onClick={() => setShowBlogForm(true)}>
                <Plus className="w-4 h-4 mr-1.5" />নতুন ব্লগ
              </Button>
            </div>
            {loading ? (
              <div className="p-8 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-[#1B5E20]" /></div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">শিরোনাম</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Slug</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Tags</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">স্ট্যাটাস</th>
                      <th className="text-right px-4 py-3 font-medium text-gray-600">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {blogs.map((blog) => (
                      <tr key={blog._id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">{blog.title}</td>
                        <td className="px-4 py-3 text-gray-600 font-mono text-xs">{blog.slug}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {blog.tags?.map((tag) => (
                              <span key={tag} className="px-2 py-0.5 text-xs bg-green-50 text-[#1B5E20] rounded-full">{tag}</span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 text-xs rounded-full ${blog.isPublished ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                            {blog.isPublished ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button onClick={() => handleDeleteBlog(blog._id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {showProductForm && <ProductForm onClose={() => setShowProductForm(false)} onSuccess={fetchData} />}
      {editingProduct && <ProductEditForm product={editingProduct} onClose={() => setEditingProduct(null)} onSuccess={fetchData} />}
      {viewingOrder && <OrderDetail order={viewingOrder} onClose={() => setViewingOrder(null)} onStatusUpdate={handleUpdateOrderStatus} />}
      {showCategoryForm && <CategoryForm onClose={() => setShowCategoryForm(false)} onSuccess={fetchData} />}
      {showReviewForm && <ReviewForm onClose={() => setShowReviewForm(false)} onSuccess={fetchData} />}
      {showBlogForm && <BlogForm onClose={() => setShowBlogForm(false)} onSuccess={fetchData} />}
    </div>
  );
}
