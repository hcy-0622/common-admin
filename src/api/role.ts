import http from './http'
import { PaginationParams } from '@/types'
import { Auth } from '@/api/auth'

export interface Role {
  id: number
  roleName: string
  roleDesc: string
  roleState: boolean
  rights: Auth[]
}
export type GetRolesParams = Partial<PaginationParams & { keyword: string }>

export interface UserRole {
  userId: number
  roleId: number
}

const roleApi = {
  getRoles: (params: GetRolesParams = {}) => http.get('/v1/roles', { params }),
  createRole: (role: Role) => http.post('/v1/roles', role),
  updateRole: (id: number, role: Role) => http.put(`/v1/roles/${id}`, role),
  deleteRole: (id: number) => http.delete(`/v1/roles/${id}`),

  createUserRole: (data: UserRole) => http.post('/v1/user_role', data),
  deleteUserRole: (userId: number, data: UserRole) => http.post(`/v1/user_role/${userId}`, data),
}

export default roleApi
