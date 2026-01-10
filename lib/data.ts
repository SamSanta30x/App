import { Order, Product } from '@/types';

// Productos pre-cargados con imágenes de Unsplash
export const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Serum Vitamina C',
    category: 'Cuidado Facial',
    price: 45.99,
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
    description: 'Serum antioxidante para iluminar y proteger la piel',
  },
  {
    id: '2',
    name: 'Crema Hidratante Ácido Hialurónico',
    category: 'Cuidado Facial',
    price: 32.50,
    imageUrl: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400&h=400&fit=crop',
    description: 'Hidratación intensa de 24 horas',
  },
  {
    id: '3',
    name: 'Máscara Facial Arcilla',
    category: 'Tratamiento',
    price: 28.00,
    imageUrl: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop',
    description: 'Purifica y desintoxica los poros',
  },
  {
    id: '4',
    name: 'Contorno de Ojos Antiedad',
    category: 'Cuidado Facial',
    price: 55.00,
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    description: 'Reduce arrugas y bolsas',
  },
  {
    id: '5',
    name: 'Protector Solar SPF 50',
    category: 'Protección',
    price: 24.99,
    imageUrl: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=400&h=400&fit=crop',
    description: 'Protección UVA/UVB de amplio espectro',
  },
  {
    id: '6',
    name: 'Exfoliante Facial Suave',
    category: 'Tratamiento',
    price: 19.99,
    imageUrl: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop',
    description: 'Renueva la piel sin irritarla',
  },
  {
    id: '7',
    name: 'Tónico Facial Equilibrante',
    category: 'Cuidado Facial',
    price: 22.50,
    imageUrl: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop',
    description: 'Equilibra el pH y cierra poros',
  },
  {
    id: '8',
    name: 'Labial Mate Larga Duración',
    category: 'Maquillaje',
    price: 18.00,
    imageUrl: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop',
    description: 'Color intenso que dura todo el día',
  },
];

// Almacenamiento en memoria (en producción usarías una base de datos)
let orders: Order[] = [
  {
    id: '1',
    customerName: 'María García',
    customerEmail: 'maria@example.com',
    products: [
      {
        productId: '1',
        productName: 'Serum Vitamina C',
        quantity: 2,
        price: 45.99,
        imageUrl: initialProducts[0].imageUrl,
      },
      {
        productId: '4',
        productName: 'Contorno de Ojos Antiedad',
        quantity: 1,
        price: 55.00,
        imageUrl: initialProducts[3].imageUrl,
      },
    ],
    total: 146.98,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    customerName: 'Ana Martínez',
    customerEmail: 'ana@example.com',
    products: [
      {
        productId: '2',
        productName: 'Crema Hidratante Ácido Hialurónico',
        quantity: 1,
        price: 32.50,
        imageUrl: initialProducts[1].imageUrl,
      },
      {
        productId: '5',
        productName: 'Protector Solar SPF 50',
        quantity: 2,
        price: 24.99,
        imageUrl: initialProducts[4].imageUrl,
      },
    ],
    total: 82.48,
    status: 'completed',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export function getOrders(): Order[] {
  return orders;
}

export function getOrderById(id: string): Order | undefined {
  return orders.find(order => order.id === id);
}

export function createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Order {
  const newOrder: Order = {
    ...order,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  orders.push(newOrder);
  return newOrder;
}

export function updateOrder(id: string, updates: Partial<Order>): Order | null {
  const index = orders.findIndex(order => order.id === id);
  if (index === -1) return null;
  
  orders[index] = {
    ...orders[index],
    ...updates,
    id: orders[index].id,
    updatedAt: new Date().toISOString(),
  };
  return orders[index];
}

export function deleteOrder(id: string): boolean {
  const index = orders.findIndex(order => order.id === id);
  if (index === -1) return false;
  orders.splice(index, 1);
  return true;
}
