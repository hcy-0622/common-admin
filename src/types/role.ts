import { PaginationParams } from './common'

export interface Role {
  id: number
  roleName: string
  roleDesc: string
  roleState: boolean
}

export interface GetRoleParams extends Partial<PaginationParams> {
  keyword?: string
}

export interface UserRole {
  userId: number
  roleId: number
}
