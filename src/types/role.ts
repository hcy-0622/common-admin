import { Auth } from './auth'
import { PaginationParams } from './common'

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
