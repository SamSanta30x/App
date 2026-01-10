import type { Metadata } from 'next'
import Script from 'next/script'
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
      <body>
        {children}
        <Script 
          src="https://embed-b000e96e0b85.herokuapp.com/floating-button.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
