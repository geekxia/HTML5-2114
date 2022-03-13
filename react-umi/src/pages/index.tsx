import styles from './index.less';

import { Button } from 'antd'
import { useDispatch, useSelector } from 'umi'

export default () => {
  const dispatch = useDispatch()
  const { token } = useSelector(state=>state.user)
  console.log('page token', token)
  const click = () => {
    dispatch({type:'user/login', payload:{username:'张三',password:'1'}})
  }
  return (
    <div>
      <h1 className={styles.title}>首页Token: {token}</h1>
      <Button type='primary' onClick={click}>登录</Button>
    </div>
  );
}
