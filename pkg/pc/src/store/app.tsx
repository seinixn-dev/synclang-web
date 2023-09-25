import { create } from 'zustand'
import { MenuProps } from 'antd'
import { BreadcrumbProps } from 'antd/es/breadcrumb/Breadcrumb'
import { MeRes } from '@/api/type.ts'
import { ReactNode } from 'react'

type MenuItem = Required<MenuProps>['items'][number]
type BreadcrumbItems = BreadcrumbProps['items']
interface Props {
  // key 为 pathname, 对应路由参数
  menuItems: MenuItem[]
  menuItemsMap: Record<string, MenuItem>
  setMenuItems: (menuItems: MenuItem[]) => void
  asideCollapsed: boolean
  setAsideCollapsed: (asideCollapsed: boolean) => void
  toggleAsideCollapsed: () => void
  breadcrumbItems: BreadcrumbItems
  setBreadcrumbItems: (breadcrumbItems: BreadcrumbItems) => void
  menuSelectedKeys: string[]
  setMenuSelectedKeys: (menuSelectedKeys: string[]) => void
  // 当前登录用户
  currentUser: MeRes
  setCurrentUser: (currentUser: MeRes) => void
  pageTitle: string
  setPageTitle: (pageTitle: string) => void
  headerExtra: ReactNode[]
  setHeaderExtra: (headerExtra: ReactNode[]) => void
  isShowHeader: boolean
  setIsShowHeader: (isShowHeader: boolean) => void
}

const useAppStore = create<Props>((set) => ({
  menuItems: [],
  menuItemsMap: {},
  setMenuItems: (menuItems) =>
    set({
      menuItems: menuItems,
      menuItemsMap: menuItems.reduce((map: Record<string, MenuItem>, item) => {
        const key = item?.key as string
        map[key] = item
        return map
      }, {})
    }),
  asideCollapsed: window.localStorage.getItem('asideCollapsed') === 'true',
  setAsideCollapsed: (asideCollapsed) => {
    window.localStorage.setItem('asideCollapsed', String(asideCollapsed))
    set({ asideCollapsed })
  },
  toggleAsideCollapsed: () => set((state) => ({ asideCollapsed: !state.asideCollapsed })),
  breadcrumbItems: [],
  setBreadcrumbItems: (breadcrumbItems) => set({ breadcrumbItems: breadcrumbItems }),
  menuSelectedKeys: [],
  setMenuSelectedKeys: (menuSelectedKeys) => set({ menuSelectedKeys }),
  currentUser: { id: 0 },
  setCurrentUser: (currentUser) => set({ currentUser }),
  pageTitle: '',
  setPageTitle: (pageTitle) => set({ pageTitle }),
  headerExtra: [],
  setHeaderExtra: (headerExtra) => set({ headerExtra }),
  isShowHeader: true,
  setIsShowHeader: (isShowHeader) => set({ isShowHeader })
}))

export default useAppStore
