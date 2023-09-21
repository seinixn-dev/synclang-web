import { Outlet } from 'react-router-dom'
import { Breadcrumb, Layout } from 'antd'
import Aside from '@/components/Aside'
import styles from './index.module.less'
import Header from '@/components/Header'
import Menu from '@/components/Menu'
import useAppStore from '@/store/app.tsx'

const Inner = () => {
  const { breadcrumbItems } = useAppStore()
  return (
    <Layout className={styles.inner}>
      <Aside>
        <Menu />
      </Aside>
      <Layout>
        <Header />
        <Layout.Content className={styles.content}>
          <div className={styles.contentInner}>
            {/*面包屑*/}
            <Breadcrumb items={breadcrumbItems} />
            <Outlet />
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default Inner
