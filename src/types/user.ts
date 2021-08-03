type AuthType = 'username' | 'email' | 'phone'
export type RegisterType = AuthType
export type LoginType = AuthType

interface AuthData {
  username?: string
  email?: string
  phone?: string
  password: string
  captcha: string
  type: RegisterType
}

export interface RegisterData extends AuthData {}

export interface RegisterFormData extends RegisterData {
  checked: boolean
}

export interface LoginData extends AuthData {}
