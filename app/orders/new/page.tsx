'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import OrderForm from '@/components/OrderForm';
import { Product } from '@/types';

export default function NewOrderPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Error al obtener los productos');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white dark:bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">Cargando productos...</p>
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
              Nueva Orden
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Crea una nueva orden de productos de belleza
            </p>
          </div>
          <OrderForm products={products} />
        </div>
      </main>
    </>
  );
}
