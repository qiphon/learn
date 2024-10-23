# css 

- css 高级技巧

1. 双飞翼布局

>  最早在国外使用起来的一种布局（圣杯布局），这种布局有限渲染版心的HTML内容，让2侧的辅助内容后置显示，后台淘宝经过修改，修改HTML 结构实现了另一种写法，改名双飞翼布局

- css 重置

> 由于浏览器之间的差异性，各个浏览器给每个元素都添加了不同的样式，为了能让我们的代码在多端都有统一的表现，css重置由此而生。

常见的css重置有 

```css
/* 1. 不推荐使用的写法 */
× {
    margin： 0;
    padding: 0;
    /* ... */
}
/* 2. reset.css */
/* 3. normalize.css */
/* 4. neat.css */

/* 
    *, *:before, *:after {
        box-sizing: border-box;
    }
*/

```
- [css 图片](https://cssicon.space/#/) css 实现的图标显示的最快

- [css HINT](https://webhint.io/)

1. 不要使用多个 class 选择器， 如 a.foo.boo ， 这在IE6 及以下不能正常解析
2. 移除空的css 规则或者没有用到的 css规则
3. 正确使用css属性， 如 display: inline 不要和 height, float, margin, padding同时使用，display: inline-block 不要和 float 同时使用
4. 避免过多的浮动，当浮动超过10次时会显示警告
5. 避免过多使用字号，当字号超过10种的时候显示警告
6. 避免使用id 作为样式选择器
7. 避免使用过多web字体，字体超过 5种显示警告
8. 标题元素只定义一次
9. 使用width： 100% 时要小心
10. 属性值为 0 时，不要使用单位
11. 各个浏览器专属的 css 属性要有规范
12. 避免使用看起来像正则表达式的 css 选择器
13. 遵守盒模型规则

- IE 6 经典 bug

1. ie6 怪异解析之，padding与 border 算入宽高

- 原因：未加文档声明造成非盒模型解析

- 解决方法： 加入文档声明 <!doctype html>

2. ie6 在块元素、左右浮动、设定margin时造成margin 双倍（双边距）

- 解决方法： display： inline

3. 一下三种其实时一种bug，举个例子： 父标签高度20，子标签高度11，垂直居中， 20 - 11 = 9 ，9 要分给上下2面，怎么分？ie6 与其他不同，所以尽量避免

-3.1 字体大小为奇数之边框高度少1px

解决方法： 字体大小设置为偶数或line-height为偶数

-3.2 line-height,文字居中差1px

解决：padding-top代替line-height居中，或line-height 加1 或 减一

-3.3 与父标签的宽度的奇偶不同的居中造成 1px 的偏离

解决办法：如果父标签时奇数宽度，则子标签也用奇数宽度；否则都为偶数宽度

4. 内部盒子模型超出父级的时候，父级被撑大

解决： 父标签 overflow：hidden

5. line-height 默认行高bug

解决： line-height 设置值

6. 行内标签之间会有一段小空白

解决：float 或 解构并排

7. 标签高度无法小于19px

解决： overflow：hidden

8. 左浮元素margin-bottom 失效

解决：显示设置高度 或 父标签设置padding-bottom 代替子标签的margin-bottom 或者 在放一个标签，让父标签浮动，子标签margin-bottom，（即 margin-bottom与float 不同时作用于一个标签）

9. img 于块元素中，底边多出空白

解决：父级设置overflow：hidden； 或img{display：block} 或margin：- 5px

10. li之间会有间距

解决 ： float： left

11. 块元素中有文字和有浮动的行元素，行元素换行

解决： 将行元素置于块元素内的文字前

12. position 下的left， bottom 错位

解决：父级设置宽高或 添加 *zoom：1

13. 子级中设有position，则父级overflow失效

解决：父级设置 position：relative

### css 高级技巧

border && border-radius 造就千万种可能

box-shadow \ :after \ :before  减少dom 数

> 矩形的四条border，不一定永远是长方形，他们在正常情况下是一个梯形的形状，在我们改变这条边相邻的另外2条边的参数时，他的形状会相应的改变。

当我们在2条边的顶点加一些border-radius 圆角值的时候，这个形状会有更奇异不可预知的形变。

我们可以通过这2个性质，探索出很多意想不到的形状

### BFC 、 IFC 、 GFC  、FFC

1. BFC

- BOX ： css 布局的基本单位
BOX 是css 布局的对象和基本单位，直观点来说，就是一个页面是由很多的BOX组成的。 元素的类型和display 属性决定了这个box的类型。 不同类型的box 会参与不同的Formatting Context （一个决定如何渲染文档的容器）。因此box 内的元素会以不同的方式渲染。

- block-level （display：block/list-item/table的元素）并参与 block formatting context

- inline-level （display：inline/inline-block/inline-table的元素）并参与inline formatting context

- Formatting context 是 W3C css2.1 规范中的一个概念。他是页面中的一块渲染区域，并有一套渲染规则，他决定其子元素如何定位，以及和其他元素的关系和相互作用。最常见的Formatting context 有 block formatting context （简称BFC）和 inline formatting context （简称IFC）

flex formatting context （FFC flex盒布局）
grid formatting context （GFC 格栅布局）

BFC 是最常见的问题

> BFC 最关键的一点就是形成隔离，没有别的盒子会对其产生影响

下面是会生成BFC 的元素应该有的

1. 根元素 
2. float 属性不为none
3. position 为 absolute/fixed
4. display 为 inline-block / table-cell / table-caption / flex / inline-flex / grid /flow-root
5. overflow不为visible
