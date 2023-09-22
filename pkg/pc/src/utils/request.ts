import { ApiTypes } from '@/api/type.ts'
import axios, { AxiosError } from 'axios'

export interface Config {}

type requestFuncType = <
  T extends keyof ApiTypes,
  P extends ApiTypes[T][0],
  R extends ApiTypes[T][1]
>(
  path: T,
  params?: P,
  config?: Config
) => Promise<R>

const axiosInstance = axios.create({
  baseURL: '/api'
})
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  config.headers.Authorization = `Bearer ${token}`
  return config
})

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error?.response as AxiosError['response'])
  }
)

export const requestService: requestFuncType = (path, params, config) => {
  const [method, url] = path.split(' ')
  return axiosInstance.request({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: params,
    ...config
  })
}
