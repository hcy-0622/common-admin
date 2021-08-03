import axios from 'axios'
import { ElMessage } from 'element-plus'

const http = axios.create({
  baseURL: '/api',
  timeout: 15000,
  withCredentials: true,
})

// 添加请求拦截器
http.interceptors.request.use(
  (config) => {
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
      ElMessage.error(error.response.data.msg)
    }
    return Promise.reject(error)
  }
)

export default http
