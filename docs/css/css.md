---
layout: default
title: css

---
# css 

css3d 模型

```
transform-style: preserve-3d;
transform: perspective(850px);

```

##### 陀螺仪

度计的，他的测量物理量是偏转、倾斜时转动角度。在手机上，仅用加速度计没办法测量或重构出完整的3D动作，只能检测轴向的线性动作。但陀螺仪可以对转动、偏转的动作做很好的测量，这样就能很好的分析使用者的实际动作。

1. deviceorientation 设备的物理方向信息，表示为一系列本地坐标系的旋角

2. devicemotion 提供设备的加速信息

3. compassneedscalibration 用于通知web站点使用罗盘信息校准上述事件

```js

window.addEventListener('deviceorientation', function(ev){
    // 处理 ev.alpha (Y) \  ev.beta （X）  \ ev.gamma （Z）
},true)


// z 轴为轴，alpha 的作用域为 0-360
// x 为轴， beta 作用域为 -180 -- 180
// y 为轴， gamma 的作用域为 -90 -- 90

// 罗盘校准

window.addEventListener('compassneedscalibration', function(ev){
    console.log("罗盘需要校准")
    ev.preventDefault()
},true)

// 获取重力加速度
window.addEventListener('devicemotion', function(ev){
    // 处理 ev.acceleration

    // x(y,z): 设备在x（y，z）方向上的移动加速度值
    // ev.accelerationIncludingGravity
    // 考虑了重力加速度后设备在x、y、z
    // ev.rotationRate
    // alpha,bate,gamma: 设备绕x，y，z轴旋转的角度



},true)



// 摇一摇代码

var speed = 40
var x=y=z=lastx=lasty=lastz = 0

function deviceMotion(ev){
    var acceleration = ev.accelerationIncludingGravity;
    x = acceleration.x
    y = acceleration.y
    z = acceleration.z
    if(Math.abs(x-lastx) > speed || Math.abs(y-lasty) > speed || Math.abs(z-lastz) > speed ){
        // 触发摇一摇
    }
}




```

### css 高级技巧

1. 双飞翼布局

> 


### IE 6 经典 bug

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
4. display 为 inline-block / table-cell / table-caption / flex / inline-flex
5. overflow不为visible
