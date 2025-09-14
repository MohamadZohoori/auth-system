import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/contexts/auth-context'
import { ResponsiveContainer } from '@/components/layout/ResponsiveContainer' 

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Authentication System',
  description: 'Next.js Authentication System with client-side validation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ResponsiveContainer>
            {children}
          </ResponsiveContainer>
        </AuthProvider>
      </body>
    </html>
  )
}