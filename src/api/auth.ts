import http from './http'
import { Auth, GetAuthsParams } from '@/types/auth'

const authApi = {
  getAuths: (params: GetAuthsParams) => http.get('/v1/rights', { params }),
  createAuth: (auth: Auth) => http.post('/v1/rights', auth),
  updateAuth: (id: number, auth: Auth) => http.put(`/v1/rights/${id}`, auth),
  deleteAuth: (id: number) => http.delete(`/v1/rights/${id}`),
}

export default authApi
