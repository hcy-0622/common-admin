import http from './http'
import { PaginationParams } from '@/types'

export interface Auth {
  id: number
  rightsName: string
  rightsDesc: string
  rightsType: string
  rightsMethod: string
  level: number
  pid: number
  rightsPath: string
  rightsState: boolean
}

export type GetAuthsParams = Partial<
  PaginationParams & {
    type: string
    rightsType: string
    level: number
    keyword: string
  }
>

const authApi = {
  getAuths: (params: GetAuthsParams = {}) => http.get('/v1/rights', { params }),
  createAuth: (auth: Auth) => http.post('/v1/rights', auth),
  updateAuth: (id: number, auth: Auth) => http.put(`/v1/rights/${id}`, auth),
  deleteAuth: (id: number) => http.delete(`/v1/rights/${id}`),
  createRoleAuths: (roleId: number, rightsIds: number[]) => http.post('/v1/roleRights', { roleId, rightsIds }),
  deleteRoleAuths: (roleId: number, rightsIds: number[]) =>
    http.delete(`/v1/roleRights/${roleId}`, { data: { rightsIds } }),
}

export default authApi
