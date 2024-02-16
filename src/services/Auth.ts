const AUTH_API_ORIGIN = process.env.NEXT_PUBLIC_URL_API_AUTH_SERVICES ?? 'http://localhost:8888'
const AUTH_API_SERVELESS_URL = `${AUTH_API_ORIGIN}/.netlify/functions/server`
const AUTH_API_CURRENT_VERSION_URL = `${AUTH_API_SERVELESS_URL}/v1/auth`

export interface UserCredential {
  email: string
  password: string
}
export interface UserDataToCreate extends UserCredential {
  name: string
}
export interface ErrorAuth {
  error: string
  code: string
}
export interface SuccessResponse {
  status: string
}
export interface UserDataResponse {
  email: string
  name: string
  token: string
  isVerify: boolean
}

export const loginService = async (credential: UserCredential): Promise<UserDataResponse | ErrorAuth> => {
  const response = await fetch(`${AUTH_API_CURRENT_VERSION_URL}/login`, {
    body: JSON.stringify(credential),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
  const data = await response.json()
  return data
}

export const signupService = async (credential: UserDataToCreate): Promise<SuccessResponse | ErrorAuth> => {
  const response = await fetch(`${AUTH_API_CURRENT_VERSION_URL}/signup`, {
    body: JSON.stringify(credential),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
  const data = await response.json()
  return data
}

export const passwordResetService = async ({ email }: { email: string }): Promise<ErrorAuth | SuccessResponse> => {
  const response = await fetch(`${AUTH_API_CURRENT_VERSION_URL}/password-reset`, {
    body: JSON.stringify({ email }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
  const data = (await response.json()) as ErrorAuth | SuccessResponse
  return data
}

export const logoutService = async ({ email }: { email: string }): Promise<ErrorAuth | SuccessResponse> => {
  const response = await fetch(`${AUTH_API_CURRENT_VERSION_URL}/logout`, {
    body: JSON.stringify({ email }),
    credentials: 'include',
    method: 'POST',
  })
  const data = await response.json()
  return data
}

export const validateToken = async (token: string): Promise<ErrorAuth | UserDataResponse> => {
  const response = await fetch(`${AUTH_API_CURRENT_VERSION_URL}/validate-token`, {
    credentials: 'include',
    headers: {
      'x-token': token,
    },
    method: 'POST',
  })
  const data = await response.json()
  return data
}
