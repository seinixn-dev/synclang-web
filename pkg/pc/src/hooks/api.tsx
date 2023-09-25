import { useMutation, useQuery } from '@tanstack/react-query'
import { Config, requestService } from '@/utils/request.ts'
import { ApiTypes, ErrorRes } from '@/api/type.ts'
import { App } from 'antd'
import { useEffect } from 'react'
import { MessageInstance } from 'antd/es/message/interface'
import { useMyNavigate } from '@/hooks/navigate.tsx'

const errorHandle = (
  error: ErrorRes,
  message: MessageInstance,
  navigate: ReturnType<typeof useMyNavigate>
) => {
  const errorMsg = error?.data?.error
  switch (error?.status) {
    case 400:
      errorMsg && void message.error(errorMsg)
      break
    case 401:
      void message.error('登录已过期，请重新登录')
      navigate.toLoginPage()
      break
    case 403:
      errorMsg && void message.error(errorMsg)
      navigate.toLoginPage()
      break
  }
}
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
  const navigate = useMyNavigate()
  return useMutation<R, ErrorRes, P>({
    mutationFn: (values: P) => {
      return requestService(url, values, requestConfig)
    },
    onError: (error) => {
      errorHandle(error, message, navigate)
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
  const navigate = useMyNavigate()
  const { keys, params, options, requestConfig } = config || {}
  const myQuery = useQuery<R, ErrorRes>({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: keys ? [url, ...keys] : [url],
    queryFn: () => {
      return requestService(url, params, requestConfig)
    },
    retry: (failureCount, error) => {
      return error?.status !== 401 && failureCount < 2
    },
    ...options
  })

  useEffect(() => {
    if (myQuery.isError) {
      errorHandle(myQuery.error, message, navigate)
    }
  }, [myQuery.isError])

  return myQuery
}
