import { ApiPath } from '@/api/path.ts'
import { LoginReq } from '@/api/type.ts'
import { App, Button, Form, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import styles from './index.module.less'
import { useEffect } from 'react'
import { useMyMutation } from '@/hooks/api.tsx'
import { useMyNavigate } from '@/hooks/navigate.tsx'

const Login = () => {
  const { toHomePage } = useMyNavigate()
  const { message } = App.useApp()

  const loginMutation = useMyMutation(ApiPath.login)

  const toLogin = (values: LoginReq) => {
    loginMutation.mutate(values)
  }

  useEffect(() => {
    if (loginMutation.isSuccess) {
      message.success('登录成功')
      window.localStorage.setItem('token', loginMutation.data?.token || '')
      toHomePage()
    }
  }, [loginMutation.isSuccess])

  return (
    <div className={styles.login}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Synclang</h1>
        <p className={styles.desc}>一个多语言管理平台</p>
        <Form size={'large'} onFinish={toLogin}>
          <Form.Item
            name={'username'}
            rules={[{ required: true, message: '请输入用户名', whitespace: true }]}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name={'password'}
            rules={[{ required: true, message: '请输入密码', whitespace: true }]}
          >
            <Input.Password prefix={<LockOutlined />} type="password" placeholder="密码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loginMutation.isLoading}>
              登录
            </Button>
            <p style={{ marginTop: '6px' }}>
              没有账号？ <Link to="/register">立即注册!</Link>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
