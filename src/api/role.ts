import http from './http'
import { GetRoleParams, Role, UserRole } from '@/types/role'

const roleApi = {
  getRoles: (params: GetRoleParams) => http.get('/api/v1/roles', { params }),
  createRole: (role: Role) => http.post('/api/v1/roles', role),
  updateRole: (id: number, role: Role) => http.put(`/api/v1/roles/${id}`, role),
  delRole: (id: number) => http.delete(`/api/v1/roles/${id}`),

  createUserRole: (data: UserRole) => http.post('/api/v1/user_role', data),
  deleteUserRole: (userId: number, data: UserRole) =>
    http.post(`/api/v1/user_role/${userId}`, data),
}

export default roleApi
