'use client'
import Button from '../atoms/Button'
import Link from 'next/link'
import { UNDEFINED } from '@/constants'
import { useSessionContext } from '@/contexts/Session'

export default function AppHeader(): React.JSX.Element {
  const { logout, userEmail, isAuthenticated } = useSessionContext()

  const handleLogout = (): void => {
    if (userEmail !== UNDEFINED) {
      logout({ email: userEmail })
    }
  }

  return (
    <header className='flex justify-between bg-white py-2 px-4 border-b-1 border-b-indigo-200 sticky top-0 z-10'>
      <div className='brand'>
        <span className='nameApp bg-gradient-to-r  from-indigo-600 to-blue-600 inline-block text-transparent bg-clip-text font-bold'>
          MedInvima
        </span>
      </div>
      {isAuthenticated ? (
        <div className='flex gap-2 items-center'>
          <Button className='font-semibold text-sm  text-indigo-700 ' level='tertiary' onClick={handleLogout} size='xs'>
            Cerrar Sesion
          </Button>
        </div>
      ) : (
        <div className='flex gap-2 items-center'>
          <Link className='text-sm text-indigo-700 font-semibold hover:text-indigo-500' href='/app/ingreso'>
            Iniciar sesion
          </Link>
          <Link className='text-sm text-indigo-700 font-semibold hover:text-indigo-500' href='/app/registro'>
            Registrarse
          </Link>
        </div>
      )}
    </header>
  )
}
