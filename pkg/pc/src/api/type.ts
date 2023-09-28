import { ApiPath } from './path'
import { AxiosError } from 'axios'

export type ErrorRes = AxiosError<{ error: string }>['response']
export interface LoginReq {
  username: string
  password: string
  passwordConfirm: string
}
export interface RegisterReq {
  username: string
  nickname?: string
  password: string
  passwordConfirm: string
  email: string
}

export interface RegisterRes {
  message: string
}

export interface MeRes {
  id: number
  username?: string
  nickname?: string
  email?: string
}

export interface ProjectCreateReq {
  name: string
  desc?: string
}
export interface ApiTypes {
  [ApiPath.login]: [LoginReq, { token: string }]
  [ApiPath.register]: [RegisterReq, RegisterRes]
  [ApiPath.me]: [undefined, MeRes]
  [ApiPath.projectCreate]: [ProjectCreateReq, { id: number }]
}
