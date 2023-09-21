import { ReactNode } from 'react'
import { createBrowserRouter, RouteObject } from 'react-router-dom'
import Auth from '@/layout/Auth'
import App from '@/layout/App'
import Inner from '@/layout/Inner'

interface RouteObj {
  id?: string
  path: string
  element?: ReactNode | null
  errorElement?: ReactNode | null
  children?: RouteObj[]
  lazy?: RouteObject['lazy']
  loader?: RouteObject['loader']
  meta?: {
    title: string
  }
}

const routes: RouteObj[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Auth />,
        children: [
          {
            path: '/',
            element: <Inner />,
            children: [
              {
                path: '/',
                async lazy() {
                  const { default: Component } = await import('@/pages/home')
                  return { Component }
                },
                meta: {
                  title: '首页'
                }
              },
              {
                path: '/project',
                async lazy() {
                  const { default: Component } = await import('@/pages/project/list')
                  return { Component }
                },
                meta: {
                  title: '项目列表'
                }
              },
              {
                path: '/project',
                meta: {
                  title: '项目列表'
                },
                children: [
                  {
                    path: ':projectId',
                    async lazy() {
                      const { default: Component } = await import('@/pages/project/detail')
                      return { Component }
                    },
                    meta: {
                      title: '项目详情'
                    }
                  },
                  {
                    path: 'create',
                    async lazy() {
                      const { default: Component } = await import('@/pages/project/edit')
                      return { Component }
                    },
                    meta: {
                      title: '新建项目'
                    }
                  },
                  {
                    path: 'edit/:projectId',
                    async lazy() {
                      const { default: Component } = await import('@/pages/project/edit')
                      return { Component }
                    },
                    meta: {
                      title: '编辑项目'
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]

export const routerMetaMap = new Map<string, RouteObj['meta']>()
function addId(routes: RouteObj[]) {
  routes.forEach((route) => {
    route.id = Math.random().toString(36).slice(2)
    if (route.meta) {
      routerMetaMap.set(route.id, route.meta)
    }
    if (route.children) {
      addId(route.children)
    }
  })
}

addId(routes)

const router = createBrowserRouter(routes)

export default router
