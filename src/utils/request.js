import Vue from 'vue'
import axios from 'axios'
import api from '@/api'
import store from '@/store'
import notification from 'ant-design-vue/es/notification'
import { ACCESS_TOKEN } from '@/store/mutation-types'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url
  timeout: 6000 // 请求超时时间
})

const err = error => {
  if (error.response) {
    const token = Vue.ls.get(ACCESS_TOKEN)
    switch (error.response.status) {
      case 401:
        // 排除登录接口
        if (
          !(
            error.response.config &&
            error.response.config.indexOf(api.Login) >= 0
          )
        ) {
          notification.error({
            message: '请求错误',
            description: 'Token不存在或已过期'
          })
          if (token) {
            store.dispatch('Logout').then(() => {
              setTimeout(() => {
                window.location.reload()
              }, 1500)
            })
          }
        }
        break
      case 403:
        notification.error({
          message: '请求错误',
          description: '您无权访问此资源'
        })
        break
      case 404:
        notification.error({
          message: '请求错误',
          description: '您请求的资源不存在'
        })
        break
      case 500:
        notification.error({
          message: '请求错误',
          description:
            (error.response.data && error.response.data.message) || '未知异常'
        })
        break
      default:
        break
    }
    return Promise.reject(error.response)
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    config.headers['Access-Token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, err)

// response interceptor
service.interceptors.response.use(response => {
  return response.data
}, err)

export default service
