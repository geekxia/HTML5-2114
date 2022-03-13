import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, Input, DatePicker, Table, Tag, Space, Button, Modal, message } from 'antd'
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import './style.scss'
import CateSelect from './components/CateSelect'

import { getList } from '@/store/actions'
import { fetchGoodDel } from '@/api'
import moment from 'moment'

const { RangePicker } = DatePicker
const align = { textAlign:'right', paddingRight:'5px' }

export default () => {

  const history = useHistory()
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(2)
  const [count, setCount] = useState(0)

  // 访问store中的状态数据
  // const total = useSelector(state=>state.good.total)
  // const list = useSelector(state=>state.good.list)
  const { total, list } = useSelector(state=>state.good)

  // 功能：列表查询
  useEffect(()=>{
    // 因为我们走redux数据流程，所以不在这里直接调接口
    // 而是dispatch派发一个调接口的行为，交互redux-thunk来触发调接口
    dispatch(getList({name,size,page}))
    return undefined
  }, [count, page, size])

  const nameChange = ev => {
    setName(ev.target.value)
    if (ev.target.value==='') setCount(count+1)
  }

  const paginationChange = (page, size) => {
    setPage(page)
    setSize(size)
  }

  const skipToEdit = row => {
    console.log('将要修改的行', row._id)
    // 把当前row的id传到编辑页面中去，再编辑页使用id调接口、填充表单
    // 动态路由传参
    history.push(`/good/edit/${row._id}`)
  }

  const rowRemove = row => {
    Modal.confirm({
      title: '删除提醒',
      icon: <ExclamationCircleOutlined />,
      content: `你确定要删除 ${row.name} 吗？`,
      onOk () {
        // 入参用的是 ids 这个属性
        fetchGoodDel({ids:row._id}).then(()=>{
          // 删除成功后，刷新列表
          message.success('删除成功', 1, ()=>setCount(count+1))
        })
      }
    })
  }

  // 定义Table表格的列（数据处理）
  const columns = [
    {
      title: '商品',
      dataIndex: 'name',
      align: 'center',
      key: 'name',
      render: (text,row) => (
        <div className='good'>
          <img src={'http://localhost:9999'+row.img} alt="qf"/>
          <div>{ row.name }</div>
        </div>
      )
    },
    {
      title: '品类',
      align: 'center',
      dataIndex: 'cate',
      key: 'cate',
      render: text => <div>{text}</div>
    },
    {
      title: '价格',
      align: 'center',
      dataIndex: 'price',
      key: 'price',
      render: price => ('￥'+price.toFixed(2))
    },
    {
      title: '是否热销',
      align: 'center',
      dataIndex: 'hot',
      key: 'hot',
      render: hot => (hot ? '是' : '否')
    },
    {
      title: '排名',
      align: 'center',
      dataIndex: 'rank',
      key: 'rank',
    },
    {
      title: '状态',
      align: 'center',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        status===1 ? '正常' : '已下架'
      )
    },
    {
      title: '发布时间',
      align: 'center',
      dataIndex: 'create_time',
      key: 'create_time',
      render: time => (
        <>
          <div>{moment(time).format('MM月DD日')}</div>
          <div>{moment(time).format('HH时mm分')}</div>
        </>
      )
    },
    {
      title: '操作',
      align: 'center',
      key: 'tags',
      dataIndex: 'tags',
      render: (text,row) => (
        <>
          <Button
            size='small'
            danger
            onClick={()=>rowRemove(row)}
          >删除</Button>
          <Button
            style={{marginLeft:'5px'}}
            size='small'
            type='primary'
            onClick={()=>skipToEdit(row)}
          >
            编辑
          </Button>
        </>
      ),
    }
  ]

  return (
    <div className='qf-goodlist'>

      {/* 筛选面板 */}
      <div className='qf-filter'>
        <Row align='middle'>
          <Col span={3} style={align}>商品名称：</Col>
          <Col span={4}>
            <Input
              placeholder="名称搜索"
              value={name}
              allowClear
              onChange={nameChange}
              onPressEnter={()=>setCount(count+1)}
            />
          </Col>

          <Col span={3} style={align}>品类搜索：</Col>
          <Col span={3}>
            <CateSelect />
          </Col>

          <Col span={3} style={align}>日期搜索：</Col>
          <Col span={6}>
            <RangePicker />
          </Col>
        </Row>
      </div>

      {/* 表格 */}
      <div className='qf-table'>
        <Table
          rowKey='_id'
          columns={columns}
          dataSource={list}
          title={
            ()=>(
              <Row>
                <Col span={4}>查询表格</Col>
                <Col offset={18} span={2} style={{textAlign:'right'}}>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={()=>history.push('/good/add')}
                  >新建</Button>
                </Col>
              </Row>
            )
          }
          pagination={{
            total: total,
            defaultPageSize: 2,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => (
              <div>第 {range[0]}-{range[1]} 条/总共 {total} 条</div>
            ),
            size: 'small',
            onChange: paginationChange,
            pageSizeOptions: [2,4,6,8,10]
          }}
          rowSelection={{
            type: 'checkbox'
          }}
        />
      </div>
    </div>
  )
}
