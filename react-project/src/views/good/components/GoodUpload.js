import { useState, useEffect } from 'react'
import { Upload } from 'antd'
import ImgCrop from 'antd-img-crop'

// value, onChange 是Form.Item给的
export default ({value, onChange}) => {

  // 这个value就是那个被 Form.Item 双向绑定的 img属性
  // 每次 value，当前这个组件都会重新运行。
  // console.log('----value change', value)

  // 解决编辑时，填充表单的问题
  const [fileList, setFileList] = useState([])

  useEffect(()=>{
    if (value) {
      setFileList([
        {
          thumbUrl: 'http://localhost:9999'+value,
          name: Date.now()
        }
      ])
    }
  }, [value])

  useEffect(()=>{
    // 解决Form.Item的双向绑定问题
    if (fileList.length>0) {
      const file = fileList[0]
      // 当图片真正上传成功后，把图片的可访问地址返回给父组件
      if (file.response && file.response.data) {
        // console.log('file', file)
        // 把fileList中img回传给父组件进行双向绑定
        onChange(file.response.data.img)
      }
    }
  }, [fileList])

  // 问题：当Upload被fileList受控后，onChange只能打印一次。
  // 解决方案参考链接：https://github.com/ant-design/ant-design/issues/2423
  const imgChange = ev => {
    // console.log('ev fileList', ev.fileList)
    setFileList([...ev.fileList])
  }

  // 当点击图片删除时，向父组件回传一个空字符串
  const imgRemove = () => {
    onChange('')
  }

  return (
    <ImgCrop rotate>
      <Upload
        name='good'
        action="http://localhost:8080/apix/v1/upload/img"
        listType="picture-card"
        onChange={imgChange}
        onRemove={imgRemove}
        maxCount={1}
        fileList={fileList}
      >
        { fileList.length > 0 ? '' : '+ Upload' }
      </Upload>
    </ImgCrop>
  )
}
