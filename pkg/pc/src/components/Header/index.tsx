import { Avatar, Dropdown, Layout, MenuProps, Space } from 'antd'
import useAppStore from '@/store/app.tsx'
import styles from './index.module.less'
import { useMyNavigate } from '@/hooks/navigate.tsx'
import { clearAuthToken } from '@/utils/auth.ts'

const Header = () => {
  const { currentUser } = useAppStore()
  const { toLoginPage } = useMyNavigate()
  const dropdownItems: MenuProps['items'] = [
    {
      key: 'logout',
      label: '退出登录',
      onClick: () => {
        clearAuthToken()
        toLoginPage()
      }
    }
  ]

  return (
    <Layout.Header className={styles.header}>
      <div></div>
      <Space>
        <Dropdown menu={{ items: dropdownItems }} placement="bottom">
          <Space className={styles.avatarContainer}>
            <Avatar size={30} style={{ backgroundColor: '#87d068' }}>
              {currentUser?.username?.slice(0, 1)?.toUpperCase()}
            </Avatar>
            <span>{currentUser?.username}</span>
          </Space>
        </Dropdown>
      </Space>
    </Layout.Header>
  )
}

export default Header
