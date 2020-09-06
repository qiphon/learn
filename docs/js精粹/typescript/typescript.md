# typescript

静态性语言，防止发生低级的错误

## 基本类型

- boolean

- number

- string

- void 空值

- null 、 undefined

- symbol

- bigint

- any 任何类型，通常在不得已的情况下使用

- unknown 与any 不同之处，虽然都可以当作任何类型,但是当 unknown 类型被确定是某个类型之前，它不能执行任何操作

    ```typescript
    let val: any;

    val = true  // ok
    val = 1     // ok
    val = 'hello'  // ok
    val = Symbol('aa')  // ok
    val = {}  // ok
    val = []  // ok
    val.foo.bar  // ok
    val()  // ok
    new val()  // ok
    val[0][1]  // ok


    let val: unknown;

    val = true  // ok
    val = 1     // ok
    val = 'hello'  // ok
    val = Symbol('aa')  // ok
    val = {}  // ok
    val = []  // ok
    val.foo.bar  // error
    val()  // error
    new val()  // error
    val[0][1]  // error

    ```

- never 永远不存在的值

    ```ts
    function err(msg: string): never {
        throw new Error(msg)
    }

    // 永远是空值的数组
    let empty: never[] = []
    ```

- tuple 元祖

### 书写方式

```typescript
let a: string = '123'

type hello = (p: string) => string

interface Greeter {
    (p: string): string
}

function hello(p){
    return p
}

// tuple 
let tuple: [number, string] = [12, 'adddf']

```