import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import Aside from '@/components/Aside'
import Header from '@/components/Header'
import Menu from '@/components/Menu'
import styles from './index.module.less'
import PageHeader from '@/components/pageHeader'
import useAppStore from '@/store/app.tsx'

const Inner = () => {
  const { isShowHeader } = useAppStore()
  return (
    <Layout className={styles.inner}>
      <Aside>
        <Menu />
      </Aside>
      <Layout>
        <Header />
        <Layout.Content className={styles.content}>
          <div className={styles.contentInner}>
            {isShowHeader && <PageHeader />}
            <section className={styles.mainContext}>
              <Outlet />
            </section>
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default Inner
