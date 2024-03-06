'use client'
import Button from '../atoms/Button'
import Link from 'next/link'
import { UNDEFINED } from '@/constants'
import { usePathname } from 'next/navigation'
import { useSessionContext } from '@/contexts/Session'

export default function AppHeader(): React.JSX.Element {
  const { logout, userEmail, isAuthenticated } = useSessionContext()
  const pathname = usePathname()

  const handleLogout = (): void => {
    if (userEmail !== UNDEFINED) {
      logout({ email: userEmail })
    }
  }

  return (
    <header className='flex justify-between bg-white py-2 px-4 border-b-1 border-b-indigo-200 sticky top-0 z-10'>
      <div className='brand'>
        <Link
          className='nameApp bg-gradient-to-r  from-indigo-600 to-blue-600 inline-block text-transparent bg-clip-text font-bold'
          href='/'
        >
          MedInvima
        </Link>
      </div>
      {isAuthenticated ? (
        <div className='flex gap-2 items-center'>
          {pathname === '/app' ? null : (
            <Link className='text-sm max-sm:text-xs text-indigo-500 font-semibold hover:text-indigo-700' href='/app'>
              Ir a App
            </Link>
          )}
          <Button
            className='font-semibold text-sm max-sm:text-xs  text-indigo-500 hover:text-indigo-700'
            level='tertiary'
            onClick={handleLogout}
            size='xs'
          >
            Cerrar Sesion
          </Button>
        </div>
      ) : (
        <div className='flex gap-2 items-center'>
          <Link
            className='text-sm max-sm:text-xs text-indigo-500 font-semibold hover:text-indigo-700'
            href='/app/ingreso'
          >
            Iniciar sesion
          </Link>
          <Link
            className='text-sm max-sm:text-xs text-indigo-500 font-semibold hover:text-indigo-700'
            href='/app/registro'
          >
            Registrarse
          </Link>
        </div>
      )}
    </header>
  )
}
