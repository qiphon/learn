interface Phone {
  [name: string]: string
}

interface User {
  name: string
  age?: number
  readonly isMale: boolean
  say: () => string
  phone: Phone
}

let xiaozhang: User = {
  name: 'xiaozhang',
  age: 18,
  isMale: false,
  say: () => { return 'xiaozhang' },
  phone: {
    NetEase: 'xiaozhang@163.com',
    qq: '1845751425@qq.com',
  }
}
let xiaoming: User = {
  name: 'xiaoming',
  age: 16,
  isMale: true,
  say: () => { return 'xiaoming' },
  phone: {
    NetEase: 'xiaoming@163.com',
    qq: '784536325@qq.com',
    sina: 'abc784536325@sina.com',
  }
}