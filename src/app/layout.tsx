import './globals.css'
import GoogleAnalytics from '@/utils/googleanalytics'
import Header from '@/components/app/Header'
import { Inter } from 'next/font/google'
import { type Metadata } from 'next'
import SessionProvider from '@/contexts/Session'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  description: 'Facilita la búsqueda y acceso a registros sanitarios de medicamentos con Medinvima',
  icons: {
    apple: '/icon.png',
  },
  manifest: '/manifest.json',
  metadataBase: new URL('https://medinvima.web.app'),
  openGraph: {
    description: 'Facilita la búsqueda y acceso a registros sanitarios de medicamentos con Medinvima',
    images: [
      {
        height: 631,
        url: 'https://medinvima.web.app/og-1201x630.png',
        width: 1201,
      },
      {
        height: 222,
        url: 'https://medinvima.web.app/icon-222x222.png',
        width: 222,
      },
    ],
    siteName: 'Medinvima',
    title: 'Medinvima',
    type: 'website',
    url: 'https://medinvima.web.app/',
  },
  themeColor: '#000000',
  title: 'Medinvima',
}

export default function RootLayout({ children }: { readonly children: React.ReactNode }): React.JSX.Element {
  return (
    <html lang='es'>
      <GoogleAnalytics />
      <body className={`${inter.className}`}>
        <SessionProvider>
          <Header />
          <main className='flex flex-col'>{children}</main>
        </SessionProvider>
      </body>
    </html>
  )
}
