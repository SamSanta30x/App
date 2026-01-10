export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  description: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  products: OrderProduct[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface OrderProduct {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  imageUrl: string;
}
