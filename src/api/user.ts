import http from './http'
import { PaginationData, PromiseApiResult } from '@/types'
import { PaginationParams } from '@/types'
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
  rightTree: any[]
}

export type GetUsersParams = Partial<
  PaginationParams & {
    role: string
    origin: string
    type: string
    keyword: string
  }
>

const userApi = {
  register: (data: RegisterData): PromiseApiResult => http.post('/v1/register', data),
  login: (data: LoginData): PromiseApiResult<User> => http.post('/v1/login', data),
  sendEmailCode: (email: string): PromiseApiResult => http.get('/v1/email_code', { params: { email } }),

  getUsers: (params: GetUsersParams = {}): PromiseApiResult<PaginationData<User>> => http.get('/v1/users', { params }),
  createUser: (user: User): PromiseApiResult =>
    http.post(`/v1/users`, {
      ...user,
      avatarURL: user.avatarURL ? user.avatarURL.replace(/^http:\/\/[^/]+/, '') : undefined,
    }),
  updateUser: (id: number, user: User): PromiseApiResult =>
    http.put(`/v1/users/${id}`, {
      ...user,
      avatarURL: user.avatarURL ? user.avatarURL.replace(/^http:\/\/[^/]+/, '') : undefined,
    }),
  deleteUser: (id: string) => http.delete(`/v1/users/${id}`),

  getImageCode: () => `${window.location.origin}/api/v1/image_code`,
  getGithubPassport: () => `${window.location.origin}/api/v1/passport/github`,
  getImportUsers: () => `${window.location.origin}/api/v1/import_users`,
  getExportUsers: () => `${window.location.origin}/api/v1/export_users`,
  getUploadAvatar: () => `${window.location.origin}/api/v1/upload_avatar`,
}

export default userApi
