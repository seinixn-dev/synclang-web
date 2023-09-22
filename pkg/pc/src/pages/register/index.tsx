import styles from './index.module.less'
import { Button, Form, Input } from 'antd'
import { Link } from 'react-router-dom'
import { ApiPath } from '@/api/path.ts'
import { RegisterReq } from '@/api/type.ts'
import { useMyMutation } from '@/hooks/api.tsx'

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 }
}

const tailFormItemLayout = {
  wrapperCol: {
    span: 19,
    offset: 5
  }
}

const Register = () => {
  const registerMutation = useMyMutation(ApiPath.register)

  const toSignup = (values: RegisterReq) => {
    registerMutation.mutate(values)
  }

  return (
    <div className={styles.register}>
      <div className={styles.registerBox}>
        <Form size={'large'} onFinish={toSignup} {...formItemLayout}>
          <Form.Item
            label={'用户名'}
            name={'username'}
            rules={[{ required: true, message: '请输入用户名', whitespace: true }]}
          >
            <Input placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name={'nickname'}
            label={'昵称'}
            tooltip={'你想让别人怎么称呼你？'}
            rules={[{ required: false, message: '请输入昵称', whitespace: true }]}
          >
            <Input placeholder={'昵称'} />
          </Form.Item>
          <Form.Item
            label={'密码'}
            name={'password'}
            rules={[{ required: true, message: '请输入密码', whitespace: true }]}
            hasFeedback
          >
            <Input.Password type="password" placeholder="密码" />
          </Form.Item>
          <Form.Item
            label={'确认密码'}
            name={'passwordConfirm'}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入确认密码',
                whitespace: true
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('密码不一致'))
                }
              })
            ]}
          >
            <Input.Password type="password" placeholder="确认密码" />
          </Form.Item>
          <Form.Item
            label={'邮箱'}
            name="email"
            rules={[
              {
                type: 'email',
                message: '邮箱格式不正确'
              },
              {
                required: true,
                message: '请输入邮箱',
                whitespace: true
              }
            ]}
          >
            <Input placeholder={'邮箱'} />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" block loading={registerMutation.isLoading}>
              注册
            </Button>
            <p style={{ marginTop: '6px' }}>
              已有账号？ <Link to="/login">去登录!</Link>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Register
