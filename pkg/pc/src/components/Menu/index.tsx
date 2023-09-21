import { Menu as AntdMenu } from 'antd'
import useAppStore from '@/store/app.tsx'
import { useEffect } from 'react'
import { HomeOutlined, ProjectOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
const Menu = () => {
  const navigate = useNavigate()
  const { menuItems, setMenuItems, menuSelectedKeys, setMenuSelectedKeys } = useAppStore()
  const menuClick = ({ key }: { key?: string }) => {
    if (!key) return
    navigate(key)
    setMenuSelectedKeys([key])
  }
  useEffect(() => {
    // mock 手动设置或从接口获取
    setMenuItems([
      {
        key: '/',
        icon: <HomeOutlined />,
        label: '首页'
      },
      {
        key: '/project',
        icon: <ProjectOutlined />,
        label: '项目'
      }
    ])
  }, [])

  return (
    <AntdMenu
      theme="dark"
      mode="inline"
      items={menuItems}
      onClick={menuClick}
      selectedKeys={menuSelectedKeys}
    />
  )
}

export default Menu
