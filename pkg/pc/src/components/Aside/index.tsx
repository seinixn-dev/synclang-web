import { Layout } from 'antd'
import styles from './index.module.less'
import { FC, ReactNode } from 'react'
import useAppStore from '@/store/app.tsx'

interface Props {
  children: ReactNode
}

const Aside: FC<Props> = ({ children }) => {
  const { asideCollapsed, setAsideCollapsed } = useAppStore()
  return (
    <Layout.Sider collapsible collapsed={asideCollapsed} onCollapse={setAsideCollapsed}>
      <div className={styles.logoContainer}>
        <h1 className={styles.title}>{asideCollapsed ? 'S' : 'Synclang'}</h1>
      </div>
      {children}
    </Layout.Sider>
  )
}

export default Aside
