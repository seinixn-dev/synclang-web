import { Outlet } from 'react-router-dom'
import { ApiPath } from '@/api/path.ts'
import { useMyQuery } from '@/hooks/api.tsx'
import { Spin } from 'antd'
import styles from './index.module.less'
import { useEffect, useState } from 'react'

const PageLoading = () => {
  return (
    <div className={styles.pageLoading}>
      <Spin size={'large'} />
      <p className={styles.tip}>加载中</p>
    </div>
  )
}

const Auth = () => {
  const meQuery = useMyQuery(ApiPath.me)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setVisible(true)
    }, 800)
  }, [])
  return (
    <>
      {(meQuery.isLoading || !visible) && <PageLoading />}
      {
        <div
          className={styles.auth}
          style={{ visibility: visible && meQuery.isSuccess ? 'visible' : 'hidden' }}
        >
          <Outlet />
        </div>
      }
    </>
  )
}

export default Auth
