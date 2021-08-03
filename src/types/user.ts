type AuthType = 'username' | 'email' | 'phone'
export type RegisterType = AuthType
export type LoginType = AuthType

export interface RegisterData {
  username?: string
  email?: string
  phone?: string
  password: string
  captcha: string
  type: RegisterType
}

export interface RegisterFormData extends RegisterData {
  checked: boolean
}
