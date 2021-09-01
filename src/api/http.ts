import axios from 'axios'
import { ElMessage } from 'element-plus'

const http = axios.create({
  baseURL: '/api',
  timeout: 15000,
  withCredentials: true,
})
const source = axios.CancelToken.source()

const getActionRights = () => {
  const data = sessionStorage.getItem('user_info')
  if (!data) return null
  const userInfo = JSON.parse(data)
  const actionRights = userInfo.rightTree.find((r: any) => r.rightsType === 'action')
  return actionRights
}
const actionRights = getActionRights()
const isRequest = (rights: any, path: string, method: string) => {
  const regex = new RegExp(`^${rights.rightsPath}(/[0-9]*)?$`, 'i')
  if (regex.test(path) && rights.rightsMethod === method) return true
  if (rights.children) {
    for (let i = 0; i < rights.children.length; i++) {
      const item = rights.children[i]
      if (isRequest(item, path, method)) return true
    }
  }
  return false
}
// 添加请求拦截器
http.interceptors.request.use(
  (config) => {
    const curPath = config.url || ''
    const curMethod = config.method || ''
    if (
      !(curPath.startsWith('/v1/register') || curPath.startsWith('/v1/login') || curPath.startsWith('/v1/email_code'))
    ) {
      const flag = isRequest(actionRights, curPath, curMethod)
      console.log(config.url, flag)
      if (!flag) {
        config.cancelToken = source.token
        source.cancel('没有对应的请求权限')
      }
    }
    // 在发送请求之前做些什么
    // config.headers.Authorization = sessionStorage.getItem('token')
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
http.interceptors.response.use(
  (response) => {
    if (response.status === 200) return response.data
    return Promise.reject(response)
  },
  (error) => {
    // 对响应错误做点什么
    if (error.response && error.response.data) {
      let msg = error.response.data.msg
      if (typeof msg !== 'string') msg = JSON.stringify(msg)
      ElMessage.error(msg)
    }
    return Promise.reject(error)
  }
)

export default http
