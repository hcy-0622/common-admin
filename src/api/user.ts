import http from './http'
import { PaginationData, PromiseApiResult } from '@/types/common'
import { GetUsersParams, LoginData, RegisterData, User } from '@/types/user'

const userApi = {
  register: (data: RegisterData): PromiseApiResult => http.post('/register', data),
  login: (data: LoginData): PromiseApiResult => http.post('/login', data),
  sendEmailCode: (email: string): PromiseApiResult => http.get('/email_code', { params: { email } }),

  getUsers: (params: GetUsersParams): PromiseApiResult<PaginationData<User>> => http.get('/api/v1/users', { params }),
  createUser: (user: User): PromiseApiResult =>
    http.post(`/api/v1/users`, {
      ...user,
      avatarURL: user.avatarURL ? user.avatarURL.replace(/^http:\/\/[^/]+/, '') : undefined,
    }),
  updateUser: (id: number, user: User): PromiseApiResult =>
    http.put(`/api/v1/users/${id}`, {
      ...user,
      avatarURL: user.avatarURL ? user.avatarURL.replace(/^http:\/\/[^/]+/, '') : undefined,
    }),
  deleteUser: (id: string) => http.delete(`/api/v1/users/${id}`),

  getImageCode: () => `${window.location.origin}/api/image_code`,
  getGithubPassport: () => `${window.location.origin}/api/passport/github`,
  getImportUsers: () => `${window.location.origin}/api/api/v1/import_users`,
  getExportUsers: () => `${window.location.origin}/api/api/v1/export_users`,
  getUploadAvatar: () => `${window.location.origin}/api/api/v1/upload_avatar`,
}

export default userApi
