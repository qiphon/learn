# recoil utils 

### [atomFamily(options)](https://recoiljs.org/zh-hans/docs/api-reference/utils/atomFamily)

返回一个返回可写的 RecoilState atom 函数。

atomFamily 本质上提供了一个从参数到 atom 的映射。你只需要为 atomFamily 提供一个 key，它将为每个底层 atom 生成一个唯一的 key。这些 atom 的 key 可用于持久化，因此必须在不同的应用执行中保持稳定。参数也可能在不同的调用站生成，我们希望同等的参数使用相同的底层 atom。因此，对于 atomFamily 参数，我们使用值等价法而不是引用等价法。这对可用于参数的类型进行了限制。atomFamily 接受原始类型，或数组或对象，它们可以包含数组、对象或原始类型。

```tsx 
// type
function atomFamily<T, Parameter>({
  key: string,

  default:
    | RecoilValue<T>
    | Promise<T>
    | T
    | (Parameter => T | RecoilValue<T> | Promise<T>),

  effects_UNSTABLE?:
    | $ReadOnlyArray<AtomEffect<T>>
    | (P => $ReadOnlyArray<AtomEffect<T>>),

  dangerouslyAllowMutability?: boolean,
}): Parameter => RecoilState<T>

// -   ---------------

const elementPositionStateFamily = atomFamily({
  key: 'ElementPosition',
  default: [0, 0],
});

function ElementListItem({elementID}) {
  const position = useRecoilValue(elementPositionStateFamily(elementID));
  return (
    <div>
      Element: {elementID}
      Position: {position}
    </div>
  );
}

```
selectorFamily(options) 在 atomFamily 的基础上添加了 getter、setter

### [constSelector(constant)](https://recoiljs.org/zh-hans/docs/api-reference/utils/constSelector)

### [noWait(state)](https://recoiljs.org/zh-hans/docs/api-reference/utils/noWait)

返回state 状态

```tsx 
const myQuery = selector({
  key: 'MyQuery',
  get: ({get}) => {
    const loadable = get(noWait(dbQuerySelector));

    return {
      hasValue: {data: loadable.contents},
      hasError: {error: loadable.contents},
      loading: {data: 'placeholder while loading'},
    }[loadable.state];
  }
})

```

### waitForAll(dependencies)

```tsx 
function FriendsInfo() {
  const [friendA, friendB] = useRecoilValue(
    waitForAll([friendAState, friendBState])
  );
  return (
    <div>
      Friend A Name: {friendA.name}
      Friend B Name: {friendB.name}
    </div>
  );
}

const customerInfoQuery = selectorFamily({
  key: 'CustomerInfoQuery',
  get: id => ({get}) => {
    const {info, invoices, payments} = get(waitForAll({
      info: customerInfoQuery(id),
      invoices: invoicesQuery(id),
      payments: paymentsQuery(id),
    }));

    return {
      name: info.name,
      transactions: [
        ...invoices,
        ...payments,
      ],
    };
  },
});
```

### [waitForNone(dependencies)](https://recoiljs.org/zh-hans/docs/api-reference/utils/waitForNone)

waitForNone() 类似于 waitForAll()，只是它会立即为每个依赖项返回一个 Loadable，而不是直接返回值。它类似于 noWait()，只是它允许同时请求多个依赖项。

```tsx 
function MyChart({layerQueries}: {layerQueries: Array<RecoilValue<Layer>>}) {
  const layerLoadables = useRecoilValue(waitForNone(layerQueries));

  return (
    <Chart>
      {layerLoadables.map((layerLoadable, i) => {
        switch (layerLoadable.state) {
          case 'hasValue':
            return <Layer key={i} data={layerLoadable.contents} />;
          case 'hasError':
            return <LayerErrorBadge key={i} error={layerLoadable.contents} />;
          case 'loading':
            return <LayerWithSpinner key={i} />;
        }
      })}
    </Chart>
  );
}

```

waitForAny() 类似于 waitForNone()，只是它要等到至少有一个依赖项具有可用的值 (或错误) ，而不是立即返回。

### [useRecoilCallback](https://recoiljs.org/zh-hans/docs/api-reference/core/useRecoilCallback)

```tsx 
import {atom, useRecoilCallback} from 'recoil';

const itemsInCart = atom({
  key: 'itemsInCart',
  default: 0,
});

function CartInfoDebug() {
  const logCartItems = useRecoilCallback(({snapshot}) => async () => {
    const numItemsInCart = await snapshot.getPromise(itemsInCart);
    console.log('购物车中内容：', numItemsInCart);
  });

  return (
    <div>
      <button onClick={logCartItems}>记录购物车内容</button>
    </div>
  );
}
```

### useRecoilSnapshot()

用于同步获取 recoil 快照，异步获取使用 useRecoilCallback()

### useGotoRecoilSnapshot(snapshot)

```tsx 
// 重要提示: 此示例效率并不高，因为它将订阅该组件的所有状态改变以便重新渲染。

function TransactionButton(): React.Node {
  const snapshot = useRecoilSnapshot(); // 订阅所有状态改变
  const modifiedSnapshot = snapshot.map(({set}) => {
    set(atomA, x => x + 1);
    set(atomB, x => x * 2);
  });
  const gotoSnapshot = useGotoRecoilSnapshot();
  return <button onClick={() => gotoSnapshot(modifiedSnapshot)}>执行交易</button>;
}
```