export interface ApiResult<T = any> {
  code: number
  msg: string
  data: T
}

export type PromiseApiResult<T = any> = Promise<ApiResult<T>>
