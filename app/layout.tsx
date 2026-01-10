import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Beauty Orders - Sistema de Gestión',
  description: 'Sistema de gestión de órdenes de productos de belleza',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
