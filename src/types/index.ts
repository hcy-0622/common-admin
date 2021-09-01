export interface ApiResult<T = any> {
  code: number
  msg: string
  data: T
}

export type PromiseApiResult<T = any> = Promise<ApiResult<T>>
export type PaginationParams = { page: number; pageSize: number }
export type PaginationData<T = Record<string, any>> = {
  list: T[]
  total: number
}
