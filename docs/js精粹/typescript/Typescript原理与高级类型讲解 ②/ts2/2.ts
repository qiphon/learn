interface Info {
  username: string
}

type UserAction = {
  id: number
  action: 'delete'
  info: Info
} |
{
  action: 'create'
  info: Info
}
const UserReducer = (userAction: UserAction) => {
  switch (userAction.action) {
    case 'delete':
      console.log(userAction.id);

      break;
    default:

      break;
  }
}
// 我们上面提到了 userAction.action 就是辨识的关键, 被称为可辨识的标签, 我们发现上面这种模式要想实现必须要三个要素:

// 具有普通的单例类型属性—可辨识的特征, 上文中就是 delete 与 create 两个有唯一性的字符串字面量
// 一个类型别名包含联合类型
// 类型守卫的特性, 比如我们必须用 if switch 来判断 userAction.action 是属于哪个类型作用域即 delete 与 create

interface Person {
  name: string;
  age: number;
}
const person = {} as Person;
person.name = 'xiaomuzhu';
person.age = 20;
