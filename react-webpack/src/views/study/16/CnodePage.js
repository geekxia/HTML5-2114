import React, { useEffect, useState } from 'react'

import { inject, observer } from 'mobx-react'

const CnodeTab = ({value, onChange}) => {
  const tabs = [
    { id: 0, tab: '', label: '全部' },
    { id: 1, tab: 'ask', label: '问答' },
    { id: 2, tab: 'share', label: '分享' },
    { id: 3, tab: 'job', label: '招聘' },
    { id: 4, tab: 'good', label: '精华' }
  ]
  return (
    <div className='cnode_tab'>
    {
      tabs.map(ele=>(
        <span
          key={ele.id}
          className={value===ele.tab?'on':''}
          onClick={()=>onChange(ele.tab)}
        >{ ele.label }</span>
      ))
    }
    </div>
  )
}

export default inject('cnode')(
  observer(
    ({ cnode }) => {

      const [tab, setTab] = useState('')

      useEffect(()=>{
        // 触发mobx的action方法调接口
        cnode.getList({page:1,limit:8,tab})
      }, [tab])

      return (
        <div>
          <h1>体验Mobx数据流</h1>
          <CnodeTab value={tab} onChange={ev=>setTab(ev)} />
          {
            cnode.list.map(ele=>(
              <div
                key={ele.id}
                style={{padding:'10px', borderBottom:'1px solid #ccc'}}
              >
                { ele.title }
              </div>
            ))
          }
        </div>
      )
    }
  )
)
