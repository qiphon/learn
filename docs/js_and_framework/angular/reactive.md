# angular 响应式数据的实现

## 响应模式api

- [signal 声明响应式数据](#signal)
- [effect 监听响应数据](#effect-监听响应数据)
- [resources 异步响应数据](#resources)

### signal

使用 signal 创建响应数据

```ts
import { Component, computed, signal } from '@angular/core'

@Component({
  templateUrl: './firstSignal.comp.html',
  styleUrl: './firstSignal.comp.less',
  selector: 'use_signal',
})
export class FirstSignal {
  count = signal(1)
  computedValue = computed(() => this.count() * 4)

  updateCount() {
    this.count.update(val => ++val)
  }
}
```

```html
<h1>use_signal</h1>

<h3 (click)="updateCount()">red color use_signal value is: {{this.count()}}</h3>
<button (click)="this.updateCount()" [disabled]="this.count() > 5">
  disabled when value > 5
</button>
<section>computed value is {{this.computedValue()}}</section>
```

HTML 使用自定义属性

```html
<button [attr.role]="'ssss'" [disabled]="this.count() > 5">
  disabled when value > 5
</button>
```

#### signal 自定义重复渲染条件

signal 默认使用 `Object.is` 来判断前后 2 值是否相等

computed 和 signal 相同，都可以使用 equal 函数来判断前后 2 值是否相同

```ts
export class FirstSignal {
  sameValTest = signal(['1'], { equal: (a, b) => Object.is(a[0], b[0]) })
  sameValNotEqualFn = signal(['1'])

  setEqualValue() {
    console.log('set equal value')
    this.sameValNotEqualFn.set(['1'])
    this.sameValTest.set(['1'])
  }

  private equalEffect = effect(() => {
    console.log(
      '----------equalEffect , set same value will not rerender ---------',
    )
    console.log(this.sameValTest())
  })
  private notEqualEffect = effect(() => {
    console.log('----------not equalEffect---------')
    console.log(this.sameValNotEqualFn())
  })
//   .....
```

#### signal 高级用法

signal 可以实现 computed 相同的功能

```ts
import { Component, computed, linkedSignal, signal } from '@angular/core'

@Component({
  templateUrl: './index.comp.html',
  styleUrl: './index.comp.less',
  selector: 'link-signal',
})
export class LinkSignalComp {
  counter = signal([1])
  counter2 = signal([2])
  linkCounter = linkedSignal(
    () => this.counter().slice(-1)[0] + this.counter2().slice(-1)[0],
  )
  computedCounter = computed(
    () => this.counter().slice(-1)[0] + this.counter2().slice(-1)[0],
  )

  changeCounterArr() {
    const dateStr = +new Date() + ''
    console.log({ dateStr })
    this.counter.set([...this.counter(), +dateStr[11]])
  }
}
```

signal 可以实现获取之前状态值的功能

```ts
import { Component, computed, linkedSignal, signal } from '@angular/core'

@Component({
  templateUrl: './index.comp.html',
  styleUrl: './index.comp.less',
  selector: 'link-signal',
})
export class LinkSignalComp {
  counter = signal([1])
  counter2 = signal([2])
  linkCounter = linkedSignal(
    () => this.counter().slice(-1)[0] + this.counter2().slice(-1)[0],
  )
  computedCounter = computed(
    () => this.counter().slice(-1)[0] + this.counter2().slice(-1)[0],
  )
  // 使用单个状态值
  linkCounter2 = linkedSignal({
    source: this.counter,
    computation(source, previous) {
      console.log(source, { previous })
      return previous?.source ? previous.source.slice(-1) : '<no previous>'
    },
  })
  // 使用 2 个状态值
  linkCounter3 = linkedSignal({
    source: () => [this.counter(), this.counter2()],
    computation(source, previous) {
      console.log('---------linkCounter3------------')
      console.log(source, { previous })
      return previous?.value ? JSON.stringify(previous.source) : '<no previous>'
    },
  })

  changeCounterArr() {
    const dateStr = +new Date() + ''
    console.log({ dateStr })
    this.counter.set([...this.counter(), +dateStr[11]])
  }
}
```

同样的 signal 也有 equal 功能，可以手动判断是不是要重新计算值。

### effect 监听响应数据

angular 的 effect 和 vue 很像

```ts
export class FirstSignal {
  count = signal(1)
  countString = signal('0')
  computedValue = computed(() => this.count() * 4)
  arr = [1, 2, 3, 4]

  constructor() {
    const destroyCountEffect = effect(() => {
      console.log('count change')
      console.log(this.count())
    })

    effect(oncleanup => {
      console.log('count string change')
      console.log(this.countString())

      // 每次 count string 变化都会执行
      oncleanup(() => {
        console.log('count string cleanup')
        // 手动销毁 effect
        destroyCountEffect.destroy()
      })
    })
  }

  updateCountStr() {
    this.countString.set(this.countString() + this.count())
  }

  updateCount() {
    this.count.update(val => ++val)
  }
}
```

#### 可以赋值给私有函数

effect 配合 injector 还没有 demo

```ts
export class FirstSignal {
  count = signal(1)
  countString = signal('0')
  computedValue = computed(() => this.count() * 4)
  arr = [1, 2, 3, 4]

  constructor() {
    const destroyCountEffect = effect(() => {
      console.log('count change')
      console.log(this.count())

      if (this.count() > 5) {
        this.logCountEffect.destroy()
      }
    })

    effect(oncleanup => {
      console.log('count string change')
      console.log(this.countString())

      oncleanup(() => {
        console.log('count string cleanup')
        // 手动销毁 effect
        destroyCountEffect.destroy()
      })
    })
  }
  // effec 给到私有函数
  private logCountEffect = effect(() => {
    console.log('private log effect , not in constructor')
    console.log(this.computedValue())
  })
  // need pass injector in constuctor
  // private logCountStringEffect() {
  //   return effect(() => {
  //     console.log('log string effect')
  //     console.log(this.countString())
  //   }, {injector: this.injector})
  // }

  updateCountStr() {
    this.countString.set(this.countString() + this.count())
  }

  updateCount() {
    this.count.update(val => ++val)
  }
}
```

#### untracked 不跟踪指定数据变化

```ts
export class FirstSignal {
  count = signal(1)
  sameValNotEqualFn = signal(['1'])

  private notEqualEffectAddUntrack = effect(() => {
    console.log(
      '----------not notEqualEffectAddUntrack--- count change will not log ------',
    )
    console.log(this.sameValNotEqualFn(), untracked(this.count))
  })


  setEqualValue() {
    console.log('set equal value')
    this.sameValNotEqualFn.set(['1'])
  }
  updateCount() {
    this.count.update(val => ++val)
  }
  // ....
```

untrack 内部属性

```ts
effect(() => {
  const user = currentUser()
  untracked(() => {
    // If the `loggingService` reads signals, they won't be counted as
    // dependencies of this effect.
    // loggingService 不会被当做 effect 依赖
    this.loggingService.log(`User set to ${user}`)
  })
})
```

### resources

使用 resources 可以获取异步数据，通过变化 resources 的 request 返回值来实现重新获取

```ts
import { Component, effect, resource, signal } from '@angular/core'
import { getSyncStr } from './utils'

@Component({
  templateUrl: './index.comp.html',
  styleUrl: './index.comp.less',
  selector: 'sync_resources',
})
export class SyncWithResources {
  counter = signal([1])
  // 返回值是个 ref
  // 每当 request 依赖变化都会重新执行 loader
  syncDataObj = resource({
    request: () => this.counter(),
    loader: ({ request }) => getSyncStr(request),
  })

  // effect 如果要监听，一定要使用 value
  logSyncData = effect(() => {
    console.log(this.syncDataObj)
    console.log(this.syncDataObj.value())
  })

  changeCounterArr() {
    const dateStr = +new Date() + ''
    console.log({ dateStr })
    this.counter.set([...this.counter(), +dateStr[11]])
  }
}
```

resources loader 的函数参数类型如下

```ts
export declare interface ResourceLoaderParams<R> {
  request: Exclude<NoInfer<R>, undefined>
  abortSignal: AbortSignal
  previous: {
    status: ResourceStatus
  }
}
```

resource 返回值可以用的其他方法如下

```ts
WritableResourceImpl {value: ƒ, status: ƒ, error: ƒ, rawSetValue: ƒ, isLoading: ƒ, …}
effectRef:EffectRefImpl {Symbol(SIGNAL): {…}}
error:() => {…}
isLoading:() => {…}
loaderFn:({ request }) => getSyncStr(request)
pendingController:AbortController {signal: AbortSignal}
pendingTasks:_PendingTasks {internalPendingTasks: _PendingTasksInternal, scheduler: _ChangeDetectionSchedulerImpl}
rawSetValue:(newValue) => signalSetFn(node, newValue)
request:() => {…}
resolvePendingTask:() => {…}
status:() => {…}
value:() => {…}
[[Prototype]]:BaseWritableResource
    abortInProgressLoad:ƒ abortInProgressLoad()
    constructor:class extends
    destroy:ƒ destroy()
    loadEffect:loadEffect() { return __async(this, null, function* () { const previousStatus = untracked(this.status); this.abortInProgressLoad(); const request = this.request(); if (request.request === void 0) { this.setValueState(ResourceStatus.Idle); return; } if (request.reload() === 0) { this.setValueState(ResourceStatus.Loading); } else { this.status.set(ResourceStatus.Reloading); } const resolvePendingTask = this.resolvePendingTask = this.pendingTasks.add(); const { signal: abortSignal } = this.pendingController = new AbortController(); try { const result = yield untracked(() => {…}
    onLocalValue:ƒ onLocalValue()
    reload:reload() { const status = untracked(this.status); if (status === ResourceStatus.Idle || status === ResourceStatus.Loading || status === ResourceStatus.Reloading) { return false; } untracked(this.request).reload.update((v) => {…}
    [[Prototype]]:Object
        asReadonly:ƒ asReadonly()
        constructor:class
        hasValue:ƒ hasValue()
        set:ƒ set(value)
        setErrorState:ƒ setErrorState(err)
        setValueState:ƒ setValueState(status, value = void 0)
        update:ƒ update(updater)
    ···
```

关于 resources status 可以看 [angular 官方的描述](https://angular.dev/guide/signals/resource#resource-status)
