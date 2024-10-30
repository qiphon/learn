import { useEffect } from 'react'
import style from './registerProperty_transition.module.less'

export const RegisterWithTransition = () => {
  const defaultRegistProperty = {
    name: '--registered',
    inherits: false,
    initialValue: 'blue',
    syntax: '<color>',
  }
  // 方法二
  useEffect(() => {
    window.CSS.registerProperty(defaultRegistProperty)
  }, [])
  return (
    <div className={style.wrapper}>
      <button className={style.register}>regist background on hover</button>
      <button className={style.unregister}> unregist </button>
    </div>
  )
}
