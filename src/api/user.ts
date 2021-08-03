import http from './http'
import { PaginationData, PromiseApiResult } from '@/types/common'
import { GetUsersParams, LoginData, RegisterData, User } from '@/types/user'

const userApi = {
  register: (data: RegisterData): PromiseApiResult =>
    http.post('/register', data),
  login: (data: LoginData): PromiseApiResult => http.post('/login', data),
  sendEmailCode: (email: string): PromiseApiResult =>
    http.get('/email_code', { params: { email } }),

  getUsers: (params: GetUsersParams): PromiseApiResult<PaginationData<User>> =>
    http.get('/api/v1/users', { params }),
  updateUser: (id: number, user: User): PromiseApiResult =>
    http.put(`/api/v1/users/${id}`, user),

  getImageCode: () => `${window.location.origin}/api/image_code`,
  getGithubPassport: () => `${window.location.origin}/api/passport/github`,
  getImportUsers: () => `${window.location.origin}/api/api/v1/import_users`,
  getExportUsers: () => `${window.location.origin}/api/api/v1/export_users`,
}

export default userApi
