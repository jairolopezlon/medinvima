'use client'
import { Button, Input, Text } from '@/components/atoms'
import { type ElementRef, type FormEventHandler, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSessionContext } from '@/contexts/Session'

export default function Ingreso(): JSX.Element {
  const [firstTry, setFirstTry] = useState<boolean>(true)
  const { login, passwordResetStatus, passwordReset, errorMessage, hasError, isAuthenticated } = useSessionContext()
  const router = useRouter()

  const [msg, setMsg] = useState<string>('')
  const [hasMsg, setHasMsg] = useState<boolean>(false)

  const inputEmailRef = useRef<ElementRef<'input'>>(null)
  const inputPasswordRef = useRef<ElementRef<'input'>>(null)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event): void => {
    event.preventDefault()
    setFirstTry(false)
    const email = inputEmailRef.current?.value.trim()
    const password = inputPasswordRef.current?.value.trim()
    if (typeof email === 'string' && typeof password === 'string') {
      login({ email, password })
    }
  }

  const handleResetPassword = (): void => {
    setHasMsg(true)
    setFirstTry(false)
    const email = inputEmailRef.current?.value.trim()

    if (email === '') {
      setMsg('❗❗ El correo electrónico es requerido para enviarte el enlace de recuperación')
      inputEmailRef.current?.focus()
      return
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/u
    if (!emailRegex.test(email ?? '')) {
      setMsg('❗❗ El correo electrónico no es válido')
      inputEmailRef.current?.focus()
      return
    }

    if (typeof email === 'string') {
      passwordReset({ email })
    }
  }

  useEffect(() => {
    if (passwordResetStatus === 'sending') {
      setMsg('Enviando correo electrónico...')
    }
    if (passwordResetStatus === 'sent') {
      setMsg('📧 Se ha enviado un correo electrónico para recuperar la contraseña')
    }
  }, [passwordResetStatus])

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/app')
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/app')
    }
  }, [isAuthenticated])

  return (
    <div className='flex flex-col gap-2 max-w-md m-auto'>
      <div className='flex flex-col gap-2 bg-white px-4 py-6 rounded-md shadow-md'>
        <form action='' className='flex flex-col gap-4' id='loginForm' onSubmit={handleSubmit}>
          <Text classname='text-md font-bold text-center text-indigo-800'>Inicio de sesión</Text>
          <div className='flex flex-col gap-1'>
            <label className='text-indigo-800 text-sm' htmlFor='email'>
              Correo:
            </label>
            <Input id='email' name='email' ref={inputEmailRef} required type='email' />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-indigo-800 text-sm' htmlFor='password'>
              Contraseña:
            </label>
            <Input id='password' name='password' ref={inputPasswordRef} required type='password' />
          </div>
          <Button form='loginForm' level='primary' size='md' type='submit'>
            Ingresar
          </Button>
        </form>
        <div className='divide-y-1 p-2'>
          <div />
          <div />
        </div>
        <div className='flex flex-col gap-2 items-center'>
          <div className='flex items-center flex-wrap justify-center'>
            <Text classname='text-xs whitespace-nowrap'>¿Olvidaste tu contraseña?</Text>
            <Button
              classname='!bg-transparent font-semibold text-indigo-400 hover:text-indigo-700 whitespace-nowrap'
              handleClick={handleResetPassword}
              level='tertiary'
              size='xs'
            >
              Enviar correo de recuperación
            </Button>
          </div>
          <div className='flex items-center gap-2'>
            <Text classname='text-xs'>¿No tienes cuenta?</Text>
            <Link className='text-xs font-semibold text-indigo-400 hover:text-indigo-700' href='/app/registro'>
              Regístrate
            </Link>
          </div>
        </div>
      </div>
      {hasMsg && firstTry ? (
        <div className=' w-full flex flex-col gap-2 bg-white px-4 py-6 rounded-md shadow-md max-w-md m-auto'>
          <Text classname='text-sm text-indigo-900'>{msg}</Text>
        </div>
      ) : null}
      {hasError && firstTry ? (
        <div className='bg-red-50 w-full flex flex-col gap-2 border-red-100 border-1  px-4 py-6 rounded-md shadow-md max-w-md m-auto'>
          <Text classname='text-sm text-indigo-900'>❗❗ {errorMessage}</Text>
        </div>
      ) : null}
    </div>
  )
}
