export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number;
  images: { url: string; publicId?: string }[];
  category: string;
  tags: string[];
  stock: number;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parent?: string;
  isActive: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email?: string;
  address: string;
}

export interface Order {
  _id: string;
  items: OrderItem[];
  customer: CustomerInfo;
  deliveryMethod: string;
  deliveryCharge: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  _id: string;
  name: string;
  initials: string;
  rating: number;
  text: string;
  isActive: boolean;
  createdAt: string;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  tags: string[];
  isPublished: boolean;
  createdAt: string;
}
