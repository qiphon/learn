# css分层与面向对象

### 预处理器变革

- php
    ```php
    body {
        left: <%= left %> px;
    }
    ```

- 预处理器规范
    - 变量

- css 后处理器
    - css 压缩 clean-css
    - 自动添加浏览器前缀 autoPrefix
    - css 更加美观排序 CSScomb
    - Rework 取代 stylus 后处理器发热
    - 前后通吃 postCSS
        - postcss 、postcss-preset-env、mini-css-extract-plugin

### css in js

```js
import style from 'index.css'

<div class={ style.main }></div>

```

### js in css

```css
:root {
    --mainColor: red;
}
h1 {
    color: var(--mainColor);
}

```

### [新的css语法](http://preset-env.cssdb.org/features)

- `all: initial;` 重置所有的属性值， 有点像css reset，但是这个更狠！！！，谨慎使用，他会清除浏览器默认的样式，让其不生效
    ```css
    /* 
    * 千万不要这么使用，这样写会使 link、script 标签中的内容显示出来
    */
    *{
        all:initial;
    }
    ```

### css 优化工具

    - purifycss-webpack    css tree-shaking 
    - styletron     行内提取css
    - cssnano       剔除css
    - typed-css-modules-loader  css 原子命名


### css houdini



    




