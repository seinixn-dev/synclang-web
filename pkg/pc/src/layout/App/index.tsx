import { Link, Outlet, useMatches } from 'react-router-dom'
import styles from './index.module.less'
import { useEffect, useRef } from 'react'
import { HomeOutlined } from '@ant-design/icons'
import { routerMetaMap } from '@/router'
import useAppStore from '@/store/app.tsx'

const App = () => {
  const { menuItemsMap, setMenuSelectedKeys, setBreadcrumbItems } = useAppStore()
  const matches = useMatches()
  const matchesCache = useRef<Record<string, string>[]>([])

  useEffect(() => {
    if (
      matchesCache.current.length === matches.length &&
      matchesCache.current.every((item, index) => item.id === matches[index].id)
    ) {
      return
    }
    matchesCache.current = matches.map((item) => ({ id: item.id }))
    const lastIndex = matches.length - 1
    const currentLocation = matches[lastIndex]
    if (routerMetaMap.has(currentLocation.id)) {
      // 设置页面标题
      const _title = routerMetaMap.get(currentLocation.id)?.title
      document.title = _title ? `${_title} | Synclang` : 'Synclang'
    }

    // 设置面包屑
    const breadcrumbItems = []
    for (let i = 0; i < matches.length; i++) {
      const item = matches[i]
      const _meta = routerMetaMap.get(item.id)
      if (_meta?.title && _meta?.title !== '首页') {
        const title = _meta?.title
        breadcrumbItems.push({
          title: i === lastIndex ? title : <Link to={item.pathname}>{title}</Link>
        })
      }
    }
    if (breadcrumbItems.length > 0) {
      // 面包屑添加首页，只有首页时，面包屑不显示
      breadcrumbItems.unshift({
        title: (
          <Link to={'/'}>
            <HomeOutlined />
          </Link>
        )
      })
    }
    setBreadcrumbItems(breadcrumbItems)
  }, [matches])

  useEffect(() => {
    // 设置菜单选中项
    if (Object.keys(menuItemsMap)?.length === 0) return

    for (const item of matches.reverse()) {
      if (menuItemsMap[item.pathname]) {
        setMenuSelectedKeys([item.pathname])
        break
      }
    }
  }, [matches, menuItemsMap])

  return (
    <>
      <div className={styles.app}>
        <Outlet />
      </div>
    </>
  )
}

export default App
