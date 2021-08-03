import http from './http'
import { PromiseApiResult } from '@/types/common'
import type { LoginData, RegisterData } from '@/types/user'

const userApi = {
  register: (data: RegisterData): PromiseApiResult =>
    http.post('/register', data),
  login: (data: LoginData): PromiseApiResult => http.post('/login', data),
  sendEmailCode: (email: string): PromiseApiResult =>
    http.get('/email_code', { params: { email } }),
}

export default userApi
