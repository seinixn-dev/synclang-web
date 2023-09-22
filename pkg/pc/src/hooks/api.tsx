import { useMutation, useQuery } from '@tanstack/react-query'
import { Config, requestService } from '@/utils/request.ts'
import { ApiTypes, ErrorRes } from '@/api/type.ts'
import { App } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export const useMyMutation = <
  T extends keyof ApiTypes,
  P extends ApiTypes[T][0],
  R extends ApiTypes[T][1]
>(
  url: T,
  config?: { requestConfig?: Config }
) => {
  const { requestConfig } = config || {}
  const { message } = App.useApp()
  const navigate = useNavigate()
  return useMutation<R, ErrorRes, P>({
    mutationFn: (values: P) => {
      return requestService(url, values, requestConfig)
    },
    onError: (error) => {
      switch (error?.status) {
        case 400:
          error?.data?.error && void message.error(error?.data?.error)
          break
        case 401:
          void message.error('登录已过期，请重新登录')
          navigate('/login')
          break
      }
    }
  })
}

interface QueryOptions {
  retry?: boolean | number
}

export const useMyQuery = <
  T extends keyof ApiTypes,
  P extends ApiTypes[T][0],
  R extends ApiTypes[T][1]
>(
  url: T,
  config?: {
    keys?: unknown[]
    params?: P
    options?: QueryOptions
    requestConfig?: Config
  }
) => {
  const { message } = App.useApp()
  const navigate = useNavigate()
  const { keys, params, options, requestConfig } = config || {}
  const myQuery = useQuery<R, ErrorRes>({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: keys ? [url, ...keys] : [url],
    queryFn: () => {
      return requestService(url, params, requestConfig)
    },
    retry: (_, error) => {
      return error?.status !== 401
    },
    ...options
  })

  useEffect(() => {
    if (myQuery.isError) {
      if (myQuery.isError) {
        switch (myQuery.error?.status) {
          case 400:
            myQuery.error?.data?.error && void message.error(myQuery.error?.data?.error)
            break
          case 401:
            void message.error('登录已过期，请重新登录')
            navigate('/login')
            break
        }
      }
    }
  }, [myQuery.isError])

  return myQuery
}
