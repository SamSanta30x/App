'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Order, Product, OrderProduct } from '@/types';

interface OrderFormProps {
  order?: Order;
  products: Product[];
}

export default function OrderForm({ order, products }: OrderFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [customerName, setCustomerName] = useState(order?.customerName || '');
  const [customerEmail, setCustomerEmail] = useState(order?.customerEmail || '');
  const [selectedProducts, setSelectedProducts] = useState<OrderProduct[]>(
    order?.products || []
  );
  const [status, setStatus] = useState<'pending' | 'completed' | 'cancelled'>(
    order?.status || 'pending'
  );

  const addProduct = (product: Product) => {
    const existingProduct = selectedProducts.find(p => p.productId === product.id);
    if (existingProduct) {
      setSelectedProducts(selectedProducts.map(p =>
        p.productId === product.id
          ? { ...p, quantity: p.quantity + 1 }
          : p
      ));
    } else {
      setSelectedProducts([
        ...selectedProducts,
        {
          productId: product.id,
          productName: product.name,
          quantity: 1,
          price: product.price,
          imageUrl: product.imageUrl,
        },
      ]);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setSelectedProducts(selectedProducts.filter(p => p.productId !== productId));
    } else {
      setSelectedProducts(selectedProducts.map(p =>
        p.productId === productId ? { ...p, quantity } : p
      ));
    }
  };

  const removeProduct = (productId: string) => {
    setSelectedProducts(selectedProducts.filter(p => p.productId !== productId));
  };

  const total = selectedProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = order ? `/api/orders/${order.id}` : '/api/orders';
      const method = order ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          customerEmail,
          products: selectedProducts,
          status,
        }),
      });

      if (!response.ok) throw new Error('Error al guardar la orden');

      router.push('/orders');
      router.refresh();
    } catch (error) {
      alert('Error al guardar la orden');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulario principal */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Información del Cliente
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Estado
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
                >
                  <option value="pending">Pendiente</option>
                  <option value="completed">Completada</option>
                  <option value="cancelled">Cancelada</option>
                </select>
              </div>
            </div>
          </div>

          {/* Selección de productos */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Productos Disponibles
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border border-gray-200 dark:border-gray-800 rounded-lg p-3 hover:border-gray-400 dark:hover:border-gray-600 transition-colors cursor-pointer"
                  onClick={() => addProduct(product)}
                >
                  <div className="relative w-full h-24 mb-2 rounded overflow-hidden">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-1 truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    {product.category}
                  </p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resumen */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 sticky top-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Productos Seleccionados
            </h2>
            {selectedProducts.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No hay productos seleccionados
              </p>
            ) : (
              <div className="space-y-3 mb-4 max-h-[400px] overflow-y-auto">
                {selectedProducts.map((product) => (
                  <div
                    key={product.productId}
                    className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={product.imageUrl}
                        alt={product.productName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {product.productName}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        ${product.price.toFixed(2)} c/u
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.productId, product.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                      >
                        -
                      </button>
                      <span className="text-sm font-medium text-gray-900 dark:text-white w-6 text-center">
                        {product.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.productId, product.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => removeProduct(product.productId)}
                        className="ml-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  Total:
                </span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${total.toFixed(2)}
                </span>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading || selectedProducts.length === 0}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white dark:text-black bg-black dark:bg-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Guardando...' : order ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
