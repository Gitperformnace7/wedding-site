import type { Metadata } from 'next'
import React from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Рустем & Фариза | Свадебное приглашение',
  description: 'Приглашаем вас разделить с нами радость нашего особенного дня',
  keywords: 'свадьба, приглашение, Рустем, Фариза, 12 сентября 2025',
  authors: [{ name: 'Рустем & Фариза' }],
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
  robots: 'index, follow',
  openGraph: {
    title: 'Рустем & Фариза | Свадебное приглашение',
    description: 'Приглашаем вас разделить с нами радость нашего особенного дня',
    type: 'website',
    locale: 'ru_RU',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16', type: 'image/x-icon' },
      { url: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Great+Vibes&family=Allura&family=Alex+Brush&display=swap" rel="stylesheet" />
      </head>
      <body className="font-modern text-wedding-black bg-wedding-white">
        <div className="relative min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
} 