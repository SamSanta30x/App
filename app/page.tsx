import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <>
     <script src="http://localhost:8080/copilot.js"></script>
  
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Beauty Orders
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Sistema de gestión de órdenes de productos de belleza
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/orders"
                className="inline-block bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Ver Órdenes
              </Link>
              <Link
                href="/orders/new"
                className="inline-block border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                Nueva Orden
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
