'use client';

import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import { Header } from '@/components/Header';
import { Notifications } from '@/components/Notifications';
import { LoadingScreen } from '@/components/LoadingScreen';
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts';
import { CreatorBadge } from '@/components/CreatorBadge';

// Font configurations
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const jetBrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

// Metadata
export const metadata: Metadata = {
  title: 'Dream Garage - Premium 3D Automotive Showcase by HARSHVARDHAN SINGH CHAUHAN',
  description: 'Explore your dream cars in an immersive 3D experience. Configure, compare, and admire the finest automotive masterpieces. Created by HARSHVARDHAN SINGH CHAUHAN.',
  keywords: ['cars', '3D', 'automotive', 'showcase', 'configurator', 'garage', 'performance', 'luxury', 'HARSHVARDHAN SINGH CHAUHAN'],
  authors: [{ name: 'HARSHVARDHAN SINGH CHAUHAN' }],
  openGraph: {
    title: 'Dream Garage - Premium 3D Automotive Showcase',
    description: 'Explore your dream cars in an immersive 3D experience. Created by HARSHVARDHAN SINGH CHAUHAN.',
    url: 'https://dream-garage.vercel.app',
    siteName: 'Dream Garage',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Dream Garage - Premium 3D Automotive Showcase',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dream Garage - Premium 3D Automotive Showcase',
    description: 'Explore your dream cars in an immersive 3D experience. Created by HARSHVARDHAN SINGH CHAUHAN.',
    images: ['/og-image.png'],
    creator: '@HarshuBuilds',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

// Root layout component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${jetBrains.variable} antialiased`}
        style={{
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
        }}
      >
        <Providers>
          {/* Loading Screen */}
          <LoadingScreen />
          
          {/* Main Layout */}
          <div className="min-h-screen bg-dark-1000 text-white">
            {/* Header */}
            <Header />
            
            {/* Main Content */}
            <main className="pt-[var(--header-height)]">
              {children}
            </main>
            
            {/* Notifications */}
            <Notifications />
            
            {/* Keyboard Shortcuts Help */}
            <KeyboardShortcuts />
            
            {/* Creator Badge - Floating badge */}
            <CreatorBadge />
          </div>
        </Providers>
      </body>
    </html>
  );
}
