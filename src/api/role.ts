import http from './http'
import { GetRoleParams, Role } from '@/types/role'

const roleApi = {
  getRoles: (params: GetRoleParams) => http.get('/api/v1/roles', { params }),
  createRole: (role: Role) => http.post('/api/v1/roles', role),
  updateRole: (id: number, role: Role) => http.put(`/api/v1/roles/${id}`, role),
  delRole: (id: number) => http.delete(`/api/v1/roles/${id}`),
}

export default roleApi
