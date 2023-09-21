import { Avatar, Layout, Space } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import styles from './index.module.less'

const Header = () => {
  return (
    <Layout.Header className={styles.header}>
      <div></div>
      <Space>
        <Avatar size={32} icon={<UserOutlined />} />
      </Space>
    </Layout.Header>
  )
}

export default Header
