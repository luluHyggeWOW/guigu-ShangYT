import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from "@/store/modules/user";
const request = axios.create({
  baseURL: '/api',
  timeout: 5000
})
// 请求拦截器
request.interceptors.request.use((config) => {
  let userStore = useUserStore()
  if (userStore.userInfo.token) {
    config.headers.token = userStore.userInfo.token
  }
  return config
})
// 响应拦截器
request.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  // let status = error.response.status
  ElMessage({ type: error, message: error.message })
  return Promise.reject(new Error(error.message))
})
// 对外暴露
export default request