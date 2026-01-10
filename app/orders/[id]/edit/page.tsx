'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import OrderForm from '@/components/OrderForm';
import { Order, Product } from '@/types';

export default function EditOrderPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      const loadData = async () => {
        setLoading(true);
        await Promise.all([fetchOrder(params.id as string), fetchProducts()]);
        setLoading(false);
      };
      loadData();
    }
  }, [params.id]);

  const fetchOrder = async (id: string) => {
    try {
      const response = await fetch(`/api/orders/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          router.push('/orders');
          return;
        }
        throw new Error('Error al obtener la orden');
      }
      const data = await response.json();
      setOrder(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar la orden');
      router.push('/orders');
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Error al obtener los productos');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar los productos');
    }
  };

  if (loading || !order) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white dark:bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">Cargando orden...</p>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Editar Orden #{order.id}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Modifica los detalles de la orden
            </p>
          </div>
          <OrderForm order={order} products={products} />
        </div>
      </main>
    </>
  );
}
