import React from 'react'

const ThemeToggle = props => {
  const { value, onChange } = props
  const change = (key, ev) => {
    // console.log(key, '变化了', ev.target.value)
    // const newTheme = {...value, [key]: ev.target.value}
    // 把最新的theme主题色回传给父组件
    onChange({...value, [key]: ev.target.value})
  }
  return (
    <div>
      前景色：
      <input
        type="color"
        value={value.color}
        onChange={(ev)=>change('color',ev)}
      />
      背景色：
      <input
        type="color"
        value={value.background}
        onChange={ev=>change('background',ev)}
      />
    </div>
  )
}

export default ThemeToggle
