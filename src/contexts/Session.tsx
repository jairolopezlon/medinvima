'use client'
import {
  type UserCredential,
  type UserDataResponse,
  type UserDataToCreate,
  loginService,
  logoutService,
  passwordResetService,
  signupService,
  validateToken,
} from '@/services/Auth'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { UNDEFINED } from '@/constants'
import { useRouter } from 'next/navigation'

interface SessionData {
  errorMessage: string | undefined
  hasError: boolean
  isAuthenticated: boolean
  isEmailVerify: boolean
  successSignup: boolean
  isFetching: boolean
  login: (credential: UserCredential) => void
  logout: ({ email }: { email: string }) => void
  passwordReset: ({ email }: { email: string }) => void
  passwordResetStatus: 'withoutSend' | 'sent' | 'sending'
  signup: (credential: UserDataToCreate) => void
  userEmail: string | undefined
  userName: string | undefined
  userToken: string | undefined
  validateSession: () => void
}

const TIMEOUT = 10000

const SessionContext = createContext<SessionData | undefined>(UNDEFINED)

interface SessionProviderProps {
  readonly children: React.ReactNode
}

export default function SessionProvider({ children }: SessionProviderProps): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [userName, setUserName] = useState<string>()
  const [userEmail, setUserEmail] = useState<string>()
  const [userToken, setUserToken] = useState<string>()
  const [hasError, setHasError] = useState<boolean>(false)
  const [successSignup, setSuccessSignup] = useState<boolean>(false)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>()
  const [isEmailVerify, setIsEmailVerify] = useState<boolean>(false)
  const [passwordResetStatus, setPasswordResetStatus] = useState<'withoutSend' | 'sent' | 'sending'>('withoutSend')

  const router = useRouter()

  const setLocalData = (loginResult?: UserDataResponse): void => {
    setUserName(() => {
      const newValue = loginResult?.name ?? ''
      localStorage.setItem('userName', newValue)
      return newValue
    })
    setUserEmail(() => {
      const newValue = loginResult?.email ?? ''
      localStorage.setItem('userEmail', newValue)
      return newValue
    })
    setUserToken(() => {
      const newValue = loginResult?.token ?? ''
      localStorage.setItem('token', newValue)
      return newValue
    })
    setIsEmailVerify(() => {
      const newValue = loginResult?.isVerify === true ? 'true' : 'false'
      localStorage.setItem('emailVerify', newValue)
      return loginResult?.isVerify ?? false
    })
  }

  const login = ({ email, password }: UserCredential): void => {
    setHasError(false)
    setIsFetching(true)

    void loginService({ email, password })
      .then((result) => {
        if ('error' in result) {
          setHasError(true)
          setErrorMessage(result.error)
          return
        }
        const userData: UserDataResponse = result
        setLocalData(userData)
        setIsAuthenticated(true)
        router.push('/app')
      })
      .finally(() => {
        setIsFetching(false)
      })
  }

  const signup = ({ email, password, name }: UserDataToCreate): void => {
    setHasError(false)
    setIsFetching(true)
    void signupService({ email, name, password })
      .then((result) => {
        setSuccessSignup(false)
        if ('error' in result) {
          setHasError(true)
          setErrorMessage(result.error)
          return
        }
        setSuccessSignup(true)
        setTimeout(() => {
          router.push('/app/ingreso')
        }, TIMEOUT)
      })
      .finally(() => {
        setIsFetching(false)
      })
  }

  const logout = ({ email }: { email: string }): void => {
    setHasError(false)
    setIsFetching(true)
    void logoutService({ email })
      .then((result) => {
        if ('error' in result) {
          setHasError(true)
          setErrorMessage(result.error)
          return
        }
        setLocalData()
        setIsAuthenticated(false)
        router.push('/')
      })
      .finally(() => {
        setIsFetching(false)
      })
  }

  const passwordReset = ({ email }: { email: string }): void => {
    setHasError(false)
    setIsFetching(true)
    setPasswordResetStatus('withoutSend')
    setPasswordResetStatus('sending')

    void passwordResetService({ email })
      .then((result) => {
        if ('error' in result) {
          setHasError(true)
          setErrorMessage(result.error)
          setPasswordResetStatus('withoutSend')
        }
      })
      .finally(() => {
        setIsFetching(false)
        setPasswordResetStatus('sent')
      })
  }

  const validateSession = (): void => {
    setHasError(false)
    const token = localStorage.getItem('token')

    if (token === UNDEFINED || token === null || token === '') {
      setLocalData()
      return
    }

    void validateToken(token).then((result) => {
      if ('error' in result) {
        setHasError(true)
        setErrorMessage(result.error)
        return
      }
      const userData: UserDataResponse = result
      setLocalData(userData)
      setIsAuthenticated(true)
      router.push('/app')
    })
  }

  useEffect(() => {
    validateSession()
  }, [])

  const providerValue = useMemo(
    () => ({
      errorMessage,
      hasError,
      isAuthenticated,
      isEmailVerify,
      isFetching,
      login,
      logout,
      passwordReset,
      passwordResetStatus,
      signup,
      successSignup,
      userEmail,
      userName,
      userToken,
      validateSession,
    }),
    [
      errorMessage,
      hasError,
      isAuthenticated,
      isEmailVerify,
      isFetching,
      login,
      logout,
      passwordReset,
      passwordResetStatus,
      signup,
      successSignup,
      userEmail,
      userName,
      userToken,
      validateSession,
    ],
  )

  return <SessionContext.Provider value={providerValue}>{children}</SessionContext.Provider>
}

export const useSessionContext = (): SessionData => {
  const context = useContext(SessionContext)

  if (context === UNDEFINED) {
    throw new Error('⚠ useSession must be used into a SessionProvider')
  }

  return context
}
