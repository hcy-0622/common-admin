import http from './http'
import { PromiseApiResult } from '@/types/common'
import type { RegisterData } from '@/types/user'

const userApi = {
  register: (data: RegisterData): PromiseApiResult =>
    http.post('/register', data),
  sendEmailCode: (email: string): PromiseApiResult =>
    http.get('/email_code', { params: { email } }),
}

export default userApi
