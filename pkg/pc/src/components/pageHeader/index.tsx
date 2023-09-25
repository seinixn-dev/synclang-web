import { Breadcrumb, Space } from 'antd'
import useAppStore from '@/store/app.tsx'
import styles from './index.module.less'

const PageHeader = () => {
  const { breadcrumbItems, pageTitle, headerExtra } = useAppStore()
  return (
    <section className={styles.pageHeader}>
      {breadcrumbItems && breadcrumbItems?.length > 0 && (
        <nav>
          <Breadcrumb items={breadcrumbItems} />
        </nav>
      )}

      <div className={styles.titleContainer}>
        <h2 className={styles.title}>{pageTitle}</h2>
        <Space>{headerExtra}</Space>
      </div>
    </section>
  )
}

export default PageHeader
