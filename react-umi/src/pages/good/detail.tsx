// import styles from './index.less';

import { useParams } from 'umi'
import { useEffect } from 'react'

export default function() {
  const { id } = useParams()
  return (
    <div>
      <h1>商品详情页 { id }</h1>
    </div>
  );
}
