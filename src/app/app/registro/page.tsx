'use client'
import { Button, Input, Text } from '@/components/atoms'
import { type ElementRef, type FormEventHandler, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { LoaderSpinner } from '@/assets/svg'
import { throttle } from '@/utils/'
import { useRouter } from 'next/navigation'
import { useSessionContext } from '@/contexts/Session'

export default function Registro(): JSX.Element {
  const { signup, errorMessage, hasError, isAuthenticated, successSignup, isFetching } = useSessionContext()
  const [firstTry, setFirstTry] = useState<boolean>(true)
  const router = useRouter()

  const [msg, setMsg] = useState<string>('')
  const [hasMsg, setHasMsg] = useState<boolean>(false)

  const inputEmailRef = useRef<ElementRef<'input'>>(null)
  const inputPasswordRef = useRef<ElementRef<'input'>>(null)
  const inputPasswordRepeatRef = useRef<ElementRef<'input'>>(null)
  const inputNameRef = useRef<ElementRef<'input'>>(null)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event): void => {
    event.preventDefault()
    setHasMsg(false)
    setFirstTry(false)
    const email = inputEmailRef.current?.value.trim()
    const password = inputPasswordRef.current?.value.trim()
    const name = inputNameRef.current?.value.trim()
    if (typeof email === 'string' && typeof password === 'string' && typeof name === 'string') {
      signup({ email, name, password })
    }
  }

  const timeToWait = 500
  const comparePasswordValues = throttle(() => {
    if (inputPasswordRef.current?.value.trim() === inputPasswordRepeatRef.current?.value.trim()) {
      setMsg('✅ Las contraseñas coinciden')
      setHasMsg(true)
    } else {
      setMsg('❗❗ Las contraseñas deben de coincidir')
      setHasMsg(true)
    }
  }, timeToWait)

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
        <form action='' className='flex flex-col gap-4' id='signupForm' onSubmit={handleSubmit}>
          <Text classname='text-md font-bold text-center text-indigo-800'>Registro de usuario</Text>
          <div className='flex flex-col gap-1'>
            <label className='text-indigo-800 text-sm' htmlFor='name'>
              Nombre:
            </label>
            <Input id='name' name='name' ref={inputNameRef} required type='text' />
          </div>
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
          <div className='flex flex-col gap-1'>
            <label className='text-indigo-800 text-sm' htmlFor='password'>
              Repetir Contraseña:
            </label>
            <Input
              id='passwordRepeat'
              name='passwordRepeat'
              onChange={comparePasswordValues}
              ref={inputPasswordRepeatRef}
              required
              type='password'
            />
          </div>
          <Button form='signupForm' level='primary' size='md' type='submit'>
            {isFetching ? (
              <>
                <LoaderSpinner color='#fff' size={20} />
                Registrando...
              </>
            ) : (
              'Registrar'
            )}
          </Button>
        </form>
        <div className='divide-y-1 p-2'>
          <div />
          <div />
        </div>
        <div className='flex flex-col gap-2 items-center'>
          <div className='flex items-center gap-2'>
            <Text classname='text-xs'>¿Ya tienes una cuenta?</Text>
            <Link className='text-xs font-semibold text-indigo-400 hover:text-indigo-700' href='/app/ingreso'>
              Ir a Ingreso
            </Link>
          </div>
        </div>
      </div>
      {successSignup ? (
        <div className='bg-white w-full flex flex-col gap-2  px-4 py-6 rounded-md shadow-md max-w-md m-auto'>
          <Text classname='text-sm text-indigo-900'>
            Se ha creado tu usuario, te enviamos un correo para que confirmes tu email y puedas ingresar
          </Text>
          <Link className='text-xs font-semibold text-indigo-400 hover:text-indigo-700' href='/app/ingreso'>
            Ir a Ingreso
          </Link>
        </div>
      ) : null}
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
