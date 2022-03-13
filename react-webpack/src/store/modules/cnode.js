
import { makeAutoObservable } from 'mobx'
import { fetchCnode } from '@/api'

export default class Cnode {
  constructor () {
    makeAutoObservable(this)
  }
  list = []
  getList (params) {
    // 在这里调接口，拿到后端数据，放在mobx容器中
    fetchCnode(params).then(list=>{
      this.list = list
    })
  }
}
