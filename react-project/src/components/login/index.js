import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Form, Input, Button, Checkbox } from 'antd'
import './style.scss'

import { login } from '@/store/actions'

export default () => {

  const history = useHistory()
  const dispatch = useDispatch()

  const onFinish = (values) => {
    // 派发login这个“行为”
    dispatch(login(values))  // dispatch()派发的是一个fn
  }

  return (
    <div className='qf-login'>
      <div className='wrap'>
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密 码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入正确的密码!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 5,
              span: 16,
            }}
          >
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{ offset: 5, span: 16 }}
          >
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>

    </div>
  )
}
