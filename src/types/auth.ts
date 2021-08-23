import { PaginationParams } from './common'

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
