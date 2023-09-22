import styles from './index.module.less'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
const NotFound = () => {
  const navigate = useNavigate()
  const goBack = () => {
    navigate('/')
  }
  return (
    <div className={styles.notFound}>
      <h3 className={styles.errCode}>404</h3>
      <h4 className={styles.tip}>页面未找到</h4>
      <Button type={'link'} className={styles.goBack} onClick={goBack}>
        返回首页
      </Button>
    </div>
  )
}

export default NotFound
