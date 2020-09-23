//const getUserName = (user) => user.name
interface User1 {
  name?: string
  //name: string
  age: number
  //isMale: boolean
  readonly isMale: boolean
}

const getUserName = (user: User1) => user.name

//这个接口 User 描述了参数 user 的结构，当然接口不回去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以。