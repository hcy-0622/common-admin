import { PaginationParams } from './common'

export interface Role {
  id: number
  roleName: string
  roleDesc: string
  roleState: boolean
}

export interface GetRoleParams extends PaginationParams {
  keyword?: string
}
