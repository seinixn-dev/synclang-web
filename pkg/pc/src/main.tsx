import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { App, ConfigProvider } from 'antd'
import dayjs from 'dayjs'
import zhCN from 'antd/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import router from '@/router'
import './index.css'

dayjs.locale('zh-cn')

const queryClient = new QueryClient()

const theme = {
  components: {
    Layout: {
      headerHeight: 48,
      headerBg: '#fff',
      headerPadding: '0 24px'
    }
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider locale={zhCN} theme={theme}>
        <App style={{ width: '100%', height: '100%' }}>
          <RouterProvider router={router} />
        </App>
      </ConfigProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
