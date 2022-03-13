import React, { PureComponent } from 'react'

// 学习目标：熟练掌握表单的用法，比如绑值、取值，以及一些表单操作的普遍技巧；还要知道什么是受控表单、非受控表单。

// 1、常用的表单有哪些？文本框、多行文本框、拾色器、下拉框、单选按钮组、多选按钮组等。

// 2、什么是受控表单？表单的value/checked属性由state声明式变量所控制的表单，就是受控表单；反之就是非受控表单。

// - 结论：虽然在React中可以通过dom或ref的方式来操作表单(取值)，但React官方不推荐这种“非受控表单”的使用。React官方推荐使用“受控表单”，除input[type=file]外。

// - 用人话描述一下受控表单的用法：用一个声明式变量控制表单的value或checked属性(一旦被控制，只有当声明式变量变化时，表单视图才会更新)，为了避免出现“read-only”表单，我们需要给这个表单绑定onChange事件(在事件处理器中，使用事件对象取出表单的最新值，并修改到声明式变量上去)，当声明式变量发生变化了，表单视图就更新了。

// 3、对单选按钮组、多选按钮组来讲，要使用checked属性来受控。

export default class TestForm extends PureComponent {

  constructor (props) {
    super(props)
    this.state = {
      name: '',
      age: 18,
      desc: '',
      lucky: '#000000',
      level: '',
      gender: 'man', // 'woman' 'unknow'
      fav: ['running', 'basketball', 'football'],  // 因为是多选，所以这个受控的变量要用数组类型
    }
  }

  submit1 () {
    // ref属性，可以帮助我们快捷地访问到DOM对象
    // 给JSX元素添加ref属性，在this.refs上就可以访问这些ref对象了
    const data = {
      name: document.getElementById('name').value,
      age: this.refs.age.value
    }
    console.log('提交表单', data)
  }

  submit2 () {
    console.log('提交表单', this.state)
  }

  formChange (k, ev) {
    // console.log('k', k)
    // 在JSON中，如果key名是一个变量，要用 [] 包起来。
    this.setState({ [k]: ev.target.value })
  }

  // getGender (ev) {
  //   console.log('性别变化了', ev.target.checked, ev.target.value)
  //   this.setState({gender: ev.target.value})
  // }

  getFav (ev) {
    console.log('爱好', ev.target.checked, ev.target.value)
    const { checked, value } = ev.target
    // 当checked=true，表示你正在勾选，就得把value追加到fav数组中去
    // 当checked=false，表示你正在取消，就得把value从fav数组中删掉
    this.setState(_=>({
      fav: checked ? [..._.fav, value] : _.fav.filter(ele=>ele!==value)
    }))
  }

  render () {
    const { name, age, desc, lucky, level, gender, fav } = this.state
    const levelArr = [
      { id: 1, value:'gaozhong', label: '高中' },
      { id: 2, value:'dazhuang', label: '大专' },
      { id: 3, value:'benke', label: '本科' },
      { id: 4, value:'shuoshi', label: '硕士' },
      { id: 5, value:'boshi', label: '博士' }
    ]
    const genderArr = [
      { id: 1, value: 'man', label: '男' },
      { id: 2, value: 'woman', label: '女' },
      { id: 3, value: 'unknow', label: '保密' }
    ]
    const favArr = [
      { id: 1, value: 'basketball', label: '篮球' },
      { id: 2, value: 'football', label: '足球' },
      { id: 3, value: 'youyong', label: '游泳' },
      { id: 4, value: 'running', label: '跑步' },
      { id: 5, value: 'pingpang', label: '乒乓球' }
    ]
    return (
      <div>
        <h1>学习表单绑定</h1>
        <hr/>
        <h3>演示非受控表单</h3>
        用户名：<input id='name' type="text" /><br/>
        年龄：<input ref='age' type="number" /><br/>
        上传头像：<input type="file" /><br/>
        <button onClick={()=>this.submit1()}>提交表单</button>
        <hr/>

        <h3>演示受控表单</h3>
        用户名：
        <input
          type="text"
          value={name}
          onChange={ev=>this.formChange('name', ev)}
        />
        <br/>年龄：
        <input
          type="number"
          value={age}
          onChange={ev=>this.formChange('age', ev)}
        />
        <br/>个人简介：
        <textarea
          cols="30"
          rows="3"
          value={desc}
          onChange={ev=>this.formChange('desc', ev)}
        />
        <br/>幸运色：
        <input
          type="color"
          value={lucky}
          onChange={ev=>this.formChange('lucky', ev)}
        />
        <br/>学历：
        <select
          value={level}
          onChange={ev=>this.formChange('level', ev)}
        >
        {
          levelArr.map(ele=>(
            <option key={ele.id} value={ele.value}>{ele.label}</option>
          ))
        }
        </select>
        <br/>性别：
        {
          genderArr.map(ele=>(
            <span key={ele.id}>
              <input
                type="radio"
                value={ele.value}
                checked={gender===ele.value}
                onChange={ev=>this.formChange('gender', ev)}
              />
              { ele.label }
            </span>
          ))
        }
        <br/>选择爱好：
        {
          favArr.map(ele=>(
            <span key={ele.id}>
              <input
                type="checkbox"
                value={ele.value}
                checked={fav.includes(ele.value)}
                onChange={ev=>this.getFav(ev)}
              />
              { ele.label }
            </span>
          ))
        }
        <br/>
        <button onClick={()=>this.submit2()}>提交表单</button>
      </div>
    )
  }
}
