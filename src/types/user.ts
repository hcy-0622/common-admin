import { PaginationParams } from './common'
import { Role } from './role'

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

export type RegisterData = AuthData

export interface RegisterFormData extends RegisterData {
  checked: boolean
}

export type LoginData = AuthData

export interface User {
  id: number
  username: string | null
  email: string | null
  phone: string | null
  avatarURL: string | null
  local: boolean
  github: boolean
  userState: boolean
  roles: Role[]
}

export interface GetUsersParams extends PaginationParams {
  role?: string
  origin?: string
  type?: string
  keyword?: string
}
