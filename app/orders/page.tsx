'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import OrderCard from '@/components/OrderCard';
import { Order } from '@/types';

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      if (!response.ok) throw new Error('Error al obtener las órdenes');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar las órdenes');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Error al eliminar la orden');

      setOrders(orders.filter(order => order.id !== id));
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar la orden');
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white dark:bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">Cargando órdenes...</p>
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
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Órdenes
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Gestiona todas las órdenes de productos de belleza
              </p>
            </div>
            <Link
              href="/orders/new"
              className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Nueva Orden
            </Link>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-12 border border-gray-200 dark:border-gray-800 rounded-lg">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No hay órdenes aún
              </p>
              <Link
                href="/orders/new"
                className="inline-block px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Crear Primera Orden
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
