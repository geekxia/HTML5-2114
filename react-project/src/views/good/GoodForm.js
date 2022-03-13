import { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Form, Input, Button, InputNumber, Switch, message } from 'antd'
import CateSelect from './components/CateSelect'
import GoodUpload from './components/GoodUpload'

import { submitGood, getInfo } from '@/store/actions'

const { TextArea } = Input
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  }
}

export default () => {

  // 获取Form组件的实例对象
  const [form] = Form.useForm()

  const dispatch = useDispatch()
  const history = useHistory()

  // const done = useSelector(state=>state.good.done)
  // const info = useSelector(state=>state.good.info)
  const { done, info } = useSelector(state=>state.good)

  // 从动态路由中取出路由参数
  const { id } = useParams()

  // 功能：当用户编辑商品，走redux流程获取商品数据
  useEffect(()=>{
    // 只有在编辑时，派发调接口
    console.log('页面ID', id)
    if (id) dispatch(getInfo(id))
    return ()=>{
      // 当组件销毁时，派发信号到store中去，重置info
      dispatch({type:'good/reset',payload:null})
    }
  }, [])

  // 功能：使用redux中商品数据填充表单
  useEffect(()=>{
    if (info) form.setFieldsValue(info)
  }, [info])

  // 功能：新增或编辑调接口成功，弹框提示用户，并返回上一页
  useEffect(()=>{
    if (done===1) {
      message.success(`${id?'修改':'添加'}成功`, 1, ()=>{
        history.goBack()
      })
    }
    return () => {
      dispatch({type:'good/done',payload:0})
    }
  }, [done])

  // 功能：点击提交（新增或编辑）
  const onFinish = (values) => {
    console.log('提交', values)
    // 触发调接口，提交商品信息，到数据库
    // 数据校验、数据处理。。。。
    if (id) {
      values['id'] = id
      dispatch(submitGood(values))
    } else {
      dispatch(submitGood(values))
    }
  }

  // 视图结构
  return (
    <div className='qf-goofform'>
      {/*
        initialValues 用于给表单添加“默认初始值”，相当于H5中defaultValue
        所以，大家不要用它来填充表单，因为填充表单的数据是异步的。
        在这里，使用接口数据填充表单，只能form.setFieldsValue()来填充表单。
      */}
      <Form
        form={form}
        name="time_related_controls"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 8 }}
        validateTrigger='onBlur'
        onFinish={onFinish}
        initialValues={{
          name: '',
          cate: '',
          price: 0,
          desc: '',
          hot: false,
          img: ''
        }}
      >
        <Form.Item
          name="name"
          label="商品名称"
          rules={[
            { required: true, message: '商品名称是必填字段' },
            { max: 10, min: 2, message: '商品名称在2~10字符之间' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="cate"
          label="商品品类"
          rules={[
            { required: true, message: '商品品类是必填字段' }
          ]}
        >
          <CateSelect />
        </Form.Item>

        <Form.Item
          name="price"
          label="商品价格"
          rules={[
            { required: true, message: '商品名称是必填字段' }
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          name="desc"
          label="商品描述"
          rules={[
            { required: true, message: '商品名称是必填字段' }
          ]}
        >
          <TextArea />
        </Form.Item>

        {/* 被 Form.Item 包裹的表单组件，相当于默认给了它 value属性、onChange事件 */}
        {/* valuePropName 用于修改使用什么属性来受控 */}
        <Form.Item
          name="hot"
          label="是否热销"
          valuePropName='checked'
        >
          <Switch />
        </Form.Item>

        <Form.Item
          name="img"
          label="商品图片"
        >
          <GoodUpload />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 8, offset: 4
          }}
        >
          <Button type="primary" htmlType="submit">
            { id ? '修改' : '添加' }
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
