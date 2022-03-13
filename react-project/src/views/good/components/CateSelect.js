import { Select } from 'antd'
const { Option } = Select

const cates = [
  { id: 1, label: '男装女装', value: 'clothe' },
  { id: 2, label: '汽车生活', value: 'car' },
  { id: 3, label: '办公用品', value: 'office' }
]

export default ({value, onChange}) => {
  return (
    <Select
      style={{ width:'100%'}}
      placeholder='全部'
      value={value}
      onChange={onChange}
    >
      {
        cates.map(ele=>(
          <Option key={ele.id} value={ele.value}>{ele.label}</Option>
        ))
      }
    </Select>
  )
}
