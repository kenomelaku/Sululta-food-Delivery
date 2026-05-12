export type UserRole = 'CUSTOMER' | 'RESTAURANT' | 'DRIVER' | 'ADMIN' | 'SUPER_ADMIN';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  profileImage?: string;
  isVerified: boolean;
}

export interface Restaurant {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  logo: string;
  banner: string;
  rating: number;
  deliveryFee: number;
  isOpen: boolean;
  categories: string[];
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  categoryId: string;
  name: string;
  description: string;
  image: string;
  price: number;
  discountPrice?: number;
  isAvailable: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  customerId: string;
  restaurantId: string;
  driverId?: string;
  status: 'PENDING' | 'ACCEPTED' | 'PREPARING' | 'ON_THE_WAY' | 'DELIVERED' | 'CANCELLED';
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: 'TELEBIRR' | 'CBE_BIRR' | 'CASH_ON_DELIVERY';
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED';
  deliveryAddress: string;
  latitude: number;
  longitude: number;
  createdAt: string;
}