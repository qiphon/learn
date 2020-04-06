# es9

- 异步迭代器 asyncchronous Iterator
- 异步执行语句 for... await ... of
- Async generator

```js

const createIterator = (items) => {
    const keys = Object(items);
    const len = keys.length;
    let pointer = 0;
    return {
        next(){
            const done = pointer >= len
            const value = !done ? items[keys[pointer++]] : undefined
            return {
                value, done
            }
        }
    }
}


```