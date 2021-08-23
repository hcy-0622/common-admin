import http from './http'
import { GetRolesParams, Role, UserRole } from '@/types/role'

const roleApi = {
  getRoles: (params: GetRolesParams = {}) => http.get('/v1/roles', { params }),
  createRole: (role: Role) => http.post('/v1/roles', role),
  updateRole: (id: number, role: Role) => http.put(`/v1/roles/${id}`, role),
  deleteRole: (id: number) => http.delete(`/v1/roles/${id}`),

  createUserRole: (data: UserRole) => http.post('/v1/user_role', data),
  deleteUserRole: (userId: number, data: UserRole) => http.post(`/v1/user_role/${userId}`, data),
}

export default roleApi
