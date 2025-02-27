# component

## component

### 开发模式

angular 组件有 2 种模式，字符串模式和模板模式

字符串模式

```ts
// user-profile.ts
@Component({
  selector: 'user-profile', // 组件使用的时候的名字
  template: `
    <h1>User profile</h1>
    <p>This is the user profile page</p>
  `,
  styles: '',
})
export class UserProfile {
  /* Your component code goes here */
}
```

模板模式

```ts
// user-profile.ts
@Component({
  selector: 'user-profile',
  templateUrl: 'user-profile.html',
  styleUrl: 'user-profile.css',
})
export class UserProfile {
  // Component behavior is defined in here
}
```

### 使用子组件

直接在 imports 种加入要使用的组件，template html 文件中就可以直接使用了

```ts
import { Component } from '@angular/core'
import { FirstComponent } from '../firstComponent/firstComponent.comp'
import { Desc } from './components/desc/desc.comp'

@Component({
  templateUrl: './useSubComp.comp.html',
  styleUrl: './useSubComp.comp.less',
  selector: 'use_sub_comp',
  imports: [FirstComponent, Desc],
})
export class UseSubComp {}
```

### if & for

```html
<section>
  use if
  <div>
    if value > 3 show span @if (this.count() > 3) {
    <span>when value > 3 ,you can see me</span>
    } @else {
    <span> value < 3 </span>
    }
  </div>

  @for (item of this.arr; track $index) {
  <div>{{item}} -- {{$index}}</div>
  }
</section>
```

## selector

selector 是将要展示在 HTML 的标签名，并且这个 selector 名称要在整个项目中唯一。 eg.

```
如果 selector 类名为 desc-a 那么使用的时候就是 <desc-a /> 写法完全一致
```

selector 可以使用多个值，用 **逗号** 隔开即可

```ts
import { Component } from '@angular/core'

@Component({
  template: `
    <h1>FirstComponent h1</h1>
    <p>this is the first time on it</p>
  `,
  styles: `
    h1 {
      color: red;
    }
  `,
  selector: 'first-comp, aaa',
})
export class FirstComponent {}

// 使用时，以下 2 种均可
// <first-comp />
// <aaa />
```

自定义 html 标签的命名规范： https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name

为了防止 selector 重名，不同的业务团队可以选择不同的 标签前缀 来保证不冲突。

## style

angular 支持 css 预处理器，如 less、sass、stylus

### css 作用域

angular 中的 css 作用域可以使用 encapsulation 属性修改

```ts
export declare enum ViewEncapsulation {
  /**
   * Emulates a native Shadow DOM encapsulation behavior by adding a specific attribute to the
   * component's host element and applying the same attribute to all the CSS selectors provided
   * via {@link Component#styles styles} or {@link Component#styleUrls styleUrls}.
   *
   * This is the default option.
   * 默认值，component 级作用域（生成的 html 标签如 <tag-a _ngcontent-ng-c324328102 />）
   */
  Emulated = 0,
  /**
   * Doesn't provide any sort of CSS style encapsulation, meaning that all the styles provided
   * via {@link Component#styles styles} or {@link Component#styleUrls styleUrls} are applicable
   * to any HTML element of the application regardless of their host Component.
   * 不使用模块作用域
   */
  None = 2,
  /**
   * Uses the browser's native Shadow DOM API to encapsulate CSS styles, meaning that it creates
   * a ShadowRoot for the component's host element which is then used to encapsulate
   * all the Component's styling.
   * 使用 浏览器自带的 shadowDom 模式
   */
  ShadowDom = 3,
}
```

shadowDom 模式会有可能出现报错 `This element does not support attachShadow`，目前还没有找到解决方案

Emulated 模式下，修改全局样式可以使用 `::ng-deep` eg.

```css
/** css 全局模式 */
::ng-deep span {
  color: yellowgreen;
}
```

`<style>` 标签也可以写在 component 的模板内

## props 组件属性

### prop 声明要使用 input 函数

- input 可以被 effect、computed 监听

```ts
import { Component, input } from '@angular/core'

@Component({
  template: `<h3>{{ title() }}</h3>
    <h4>desc comp <span>desc span</span></h4>`,
  selector: 'descA',
})
export class Desc {
  // input 中写入默认的值
  //   input 声明的 props 大小写敏感
  title = input<string>('no prop added')
  //   通过 required 将 props 变成必填参数
  title2 = input.required<string>('no prop added')
}
```

使用 props 值

```jsx
<descA title="add props" />
```

#### `@Input` 代替 input 写法

```ts
export declare interface Input {
  /**
   * The name of the DOM property to which the input property is bound.
   */
  alias?: string
  /**
   * Whether the input is required for the directive to function.
   */
  required?: boolean
  /**
   * Function with which to transform the input value before assigning it to the directive instance.
   */
  transform?: (value: any) => any
}
```

```ts
 // title3 = input<string>('not prop transfered')
  @Input() title3 = 'not props transfered'
```

```jsx
// <!-- 父组件 -->
<descA
    {/* input 方式的 props */}
  title2="must fill props"
  title="{{' model value is ' + input2()}}"
  {/* 使用 model */}
  [(value)]="input2"
    // 使用 @Input 写法
  [title3]="'title3 use @Input decorator ' + input2()"
/>
{/* <!-- 子组件 --> */}
<span>optional prop {{ title3 }}</span>
```

#### input getter & setter

当 transform 能满足使用条件的时候，应该尽量使用 transform 而不是使用 getter & setter

当代码逻辑复杂或者有一些影响性能的操作的时候，请避免使用 getter&setter ，angular 可能会 **多次执行** setter，造成不必要的性能损耗。

```ts
class GG {
  @Input()
  get testGet() {
    return this._testGet
  }
  set testGet(val: string) {
    this._testGet = val + '_testGet_'
  }
  _testGet = 'testGet'
}
```

### alias

input 为了方便辨识，我们可以使用 alias 生成别名

```ts
// 子组件
value = input('alias value', { alias: 'step' })

// HTML 使用时
<slide  step="5" />
```

### props 传递 & 使用 model

父子组件共同维护的变量要使用 model

model 特点

- model 不支持 tansform 功能
- model 支持数据双向绑定(父子组件都可以修改)
- model 也有 required 的功能

```ts
// parent
import { Component, signal } from '@angular/core'
import { FirstComponent } from '../firstComponent/firstComponent.comp'
import { Desc } from './components/desc/desc.comp'

@Component({
  templateUrl: './index.comp.html',
  styleUrl: './index.comp.less',
  selector: 'use-props',
  imports: [FirstComponent, Desc],
})
export class UseProps {
  inputVal = signal('')
  input2 = signal('default model value')

  changeProp() {
    this.inputVal.set(this.inputVal() + 1)
  }

  changeModelVal() {
    this.input2.update(v => v + 2)
  }
}
```

```jsx
<descA title2="must fill props" title="{{' model value is ' + input2()}}"
// model 值要这么传递
[(value)]="input2" />
<hr>
{/* 正常传递 props */}
<descA title="add props" title2="{{inputVal()}} " />
```

child

```ts
import { Component, input, model } from '@angular/core'

@Component({
  template: `<h3>{{ title() }}</h3>
    <h4>
      desc comp <span>desc required prop {{ title2() }}</span> <br />
      <span>optional prop {{ title3() }}</span>
      <button (click)="updateVal()">update model value</button>
    </h4>`,
  selector: 'descA',
})
export class Desc {
  title = input('no prop added', { transform: (str?: string) => str?.trim() })
  title2 = input.required<string, string>({ transform: str => str.trim() })
  title3 = input<string>('not prop transfered')

  value = model('0')

  updateVal() {
    this.value.update(v => v + 1)
  }
}
```

model 也可以直接使用静态属性，如果父组件不需要监控这个值变化的时候, 当属性值变化的时候父组件展示的值也会同步修改。

```ts
// 父组件
export class UseProps {
  protected input3 = 'input3'
  ...

//子组件同上
```

## output 自定义事件

- angular 自定义事件不会冒泡传递
- 区分大小写，命名时尽量使用驼峰，同时避免使用和 dom 标签相同的事件名
- 也可以使用 alias
- html 中使用 `$event` 来接收参数

```ts
import { Component, signal } from '@angular/core'
import { Desc } from './components/desc/desc.comp'

@Component({
  templateUrl: './index.comp.html',
  styleUrl: './index.comp.less',
  selector: 'use-events',
  imports: [Desc],
})
export class UseEvents {
  inputVal = signal('')
  showModal = signal(false)

  changeProp() {
    this.inputVal.set(this.inputVal() + 1)
  }

  closeProps(val: boolean) {
    this.showModal.set(val)
  }

  toggleModal(ev: MouseEvent) {
    console.log('toggleModal', ev)
    this.showModal.set(!this.showModal())
  }
}

// html
<div>
  <button (click)="toggleModal($event)">parent modal button</button>
  <dialog [open]="showModal()">
    <div>dialog content
      <descA title2="{{inputVal()}}" (closeFn)="closeProps($event)" />
    </div>
  </dialog>
</div>
```

```ts
import { Component, input, output } from '@angular/core'

@Component({
  template: `
    <h4>
      desc comp <span>desc required prop {{ title2() }}</span>
    </h4>
    <div>
      child
      <button (click)="close()">close modal button</button>
      <button (click)="this.closeFn.emit(false)">close modal button2</button>
    </div>
  `,
  selector: 'descA',
})
export class Desc {
  title2 = input.required<string, string>({ transform: str => str.trim() })

  closeFn = output<boolean>()

  close() {
    this.closeFn.emit(false)
  }
}
```

动态创建的组件，可以直接使用**组件 ref**来取消事件函数。

https://angular.dev/guide/components/outputs#subscribing-to-outputs-programmatically

### [`@Output`](https://angular.dev/guide/components/outputs#declaring-outputs-with-the-output-decorator)

output 和 `@Output` 方法相同，使用上类似 `@Input` 但是官方不推荐使用。

```ts
@Component({
  /*...*/
})
export class CustomSlider {
  @Output('valueChanged') changed = new EventEmitter<number>()
}
```

## slot `<ng-content />`

- 插槽没有被使用时，会默认使用插槽中的内容

父组件

```ts
import { Component, signal } from '@angular/core'
import { Desc } from './components/desc/desc.comp'
import { Wrapper } from './components/wrapper/desc.comp'

@Component({
  templateUrl: './index.comp.html',
  styleUrl: './index.comp.less',
  selector: 'use-events',
  imports: [Desc, Wrapper],
})
export class NGSlot {}

// HTML 中使用 slot
<div>
  没有使用 nav slot
  <wrapper>
    <div>我是插入到主要内容区域的 div
      <descA />
    </div>
    <div wrapper-foot>
      <div> 我是底部插槽</div>
    </div>
  </wrapper>
</div>

```

插槽组件

```ts
import { Component } from '@angular/core'

@Component({
  template: `
    <div class="wrapper">
      <nav>component wrapper</nav>
      <section>
        slot start
        <hr />
        <ng-content select="[wrapper-nav]"
          >没有使用这个插槽时我就会显示</ng-content
        >
        <hr />
        <main>
          main content
          <ng-content></ng-content>
        </main>

        <div>下面是插槽别名</div>
        <ng-content select="[wrapper-foot]">我是 footer 插槽</ng-content>
        <hr />
        slot end
      </section>
    </div>
  `,
  styles: `
    section {
      border: 10px solid red;
    }
    main {
      padding: 10px;
      background: #f0f0f0;
    }
  `,
  selector: 'wrapper',
})
export class Wrapper {}
```

## host element

每个声明的 ng 组件都是一个 host element，它里面渲染了组件 template 中的 HTML

```jsx
<!-- Using the component -->
<h3>Your profile photo</h3>
<profile-photo />
<button>Upload a new profile photo</button>
```

上面这个示例中，`<profile-photo />` 就是 host element

### host 元素属性

可以通过 `@component` 中的 host 字段向元素上挂载任何属性

```jsx
import { Component, signal } from '@angular/core'
import { Wrapper } from './components/wrapper/index.comp'

@Component({
  templateUrl: './index.comp.html',
  styleUrl: './index.comp.less',
  selector: 'el-host',
  imports: [Wrapper],
  host: {
    role: 'host',
    class: 'host-el',
    // 如果 isActive 函数为 true，el-host 就会多一个 active 的类名
    '[class.active]': 'isActive()',
    '(mouseenter)': 'toggleActive()',
  },
})
export class HostElement {
  isActive = signal(false)

  toggleActive() {
    this.isActive.set(!this.isActive())
  }
}

// 生成的结果如下
<el-host role="host" class="host-el" _nghost-ng-c1110366634="">

```

### host 样式

host 元素也可以设置样式，但是需要在父级组件上设置，或者在全局样式中设置。scope 模式下无法设置自身样式，除非使用 `::ng-deep`。

```jsx
import { Component } from '@angular/core'

@Component({
  template: ` <div class="wrapper">sdfsdf</div> `,
  styles: `
    ::ng-deep .active {
      font-size: 20px;
    }
  `,
  selector: 'wrapper',
  host: {
    class: 'wrapper active',
  },
})
export class Wrapper {}
```

#### `@HostBinding` & `@HostListener`

推荐开发时使用 class 内部的装饰器这种写法

```jsx
import {
  Component,
  effect,
  HostBinding,
  HostListener,
  signal,
} from '@angular/core'

@Component({
  template: `
    <div class="wrapper" (click)="updateDisabled()">
      host binding click change disabled {{ disabled() }}
    </div>
  `,
  styles: `.wrapper {margin-bottom: 40px;};`,
  selector: 'host-binding',
  host: {
    // style 冲突写法，参考下面说的冲突机制
    style: 'color: blue;',
    // 如果类名不冲突会合并
    class: 'host-binding-test',
    // 和下面写法的效果一样
    // '[attr.tabindex]': 'disabled() ? -1 : 1',
    // '[attr.disabled]': 'disabled() ',
  },
})
export class HostBindingComp {
  disabled = signal(false)

  @HostBinding('[attr.disabled]') getDisabled() {
    return this.disabled()
  }
  @HostBinding('class.active') clsActive: string = ''
  @HostBinding('style') style = 'color: pink;'
  @HostBinding('attr.tabindex') tabindex = -1

  @HostListener('click', ['$event']) click(event: KeyboardEvent) {
    console.log('click', event)
  }

// 状态变化，动态修改值
  listenChange = effect(() => {
    if (this.disabled()) {
      this.clsActive = ''
      this.tabindex = -1
    } else {
      this.tabindex = 3
      this.clsActive = 'active'
    }
  })

  updateDisabled() {
    this.disabled.set(!this.disabled())
  }
}

```

#### host 冲突处理机制

因为 `@component` 和 `class` 中都能设置 binding 属性，那么如果遇到冲突，由以下规则决定

- 如果一个是静态值，另一个是动态值，使用动态值
- 如果都是静态值，那么使用 class 中的定义值
- 如果都是动态属性，那么使用 component 中定义的值
