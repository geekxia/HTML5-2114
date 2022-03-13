import { useEffect } from 'react'

// 举例说明：我们自己封装一个用于改变文档title的Hooks
const useTitle = title => {
  // 在自定义Hooks的内部，你可以使用React官方提供的Hooks或者第三方Hooks库
  useEffect(()=>{
    document.title = title || '2114'
  }, [])
}

export {
  useTitle
}
