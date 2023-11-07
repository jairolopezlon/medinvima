import './globals.css'
import { Inter } from 'next/font/google'
import { type Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  description: 'Generated by create next app',
  icons: {
    apple: '/icon.png',
  },
  manifest: '/manifest.json',
  themeColor: '#000000',
  title: 'Create Next App',
}

export default function RootLayout({ children }: { readonly children: React.ReactNode }): React.JSX.Element {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
