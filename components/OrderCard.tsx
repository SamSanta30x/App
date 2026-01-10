'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Order } from '@/types';

interface OrderCardProps {
  order: Order;
  onDelete: (id: string) => void;
}

export default function OrderCard({ order, onDelete }: OrderCardProps) {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            Orden #{order.id}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {order.customerName}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            {order.customerEmail}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}
        >
          {order.status === 'pending' ? 'Pendiente' : order.status === 'completed' ? 'Completada' : 'Cancelada'}
        </span>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Productos ({order.products.length}):
        </p>
        <div className="flex gap-2 flex-wrap">
          {order.products.map((product, index) => (
            <div key={index} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
              <div className="relative w-10 h-10 rounded overflow-hidden">
                <Image
                  src={product.imageUrl}
                  alt={product.productName}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-xs">
                <p className="font-medium text-gray-900 dark:text-white">{product.productName}</p>
                <p className="text-gray-600 dark:text-gray-400">x{product.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-800">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Fecha: {formatDate(order.createdAt)}
          </p>
          <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
            ${order.total.toFixed(2)}
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/orders/${order.id}/edit`}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Editar
          </Link>
          <button
            onClick={() => {
              if (confirm('¿Estás seguro de eliminar esta orden?')) {
                onDelete(order.id);
              }
            }}
            className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
