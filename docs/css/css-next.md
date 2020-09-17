# [css next](http://preset-env.cssdb.org/features)

[详细内容参考w3c 草案](https://drafts.csswg.org/)

https://github.com/csstools/postcss-preset-env#usage

一下css为css-preset-env 可以转换的属性

```css
.all-initial {
    /* 
    // 清除掉所有的附加样式，谨慎使用，
        script上使用后，这个script就会变成文本显示
        在选择器为 * 的情况下，所有标签中的内容都会显示出来
    */
    all: initial;  
}

/* 
伪类
A pseudo-class for matching anchor elements independent of whether they have been visited
匹配所有的 a 标签
*/
:any-link {
    color: red;
}

/* 
A pseudo-class for matching form elements when they are empty
表单元素使用 如 textarea、input
暂不支持
*/
:blank {
    background: red;
}

/* 
匹配，暂不支持
*/
div:matches(.img-set) {
    margin-top: 1em;
}

/* 暂不支持 */
p:not(:first-child, .special) {
  margin-top: 1em;
}


/* 
N/A
Properties for defining the break behavior between and within boxes
https://developer.mozilla.org/zh-CN/docs/Web/CSS/break-inside
*/

.break {
    break-inside: avoid;
    break-before: avoid-column;
    break-after: always;
}

/* 文字超过指定区域后的样式 
正常会溢出，如果是一个长单词
*/
p {
  width: 120px;
  overflow-wrap: break-word;
}

/**
使用属性值查找元素
*/
[class='break'] {
    border: 1px solid #000;
}


[class='break a'] div:first-child {
    border: 1px solid #000;
}

/* 
hwb 实例 （目前hwb还不被支持）
https://www.jc2182.com/runcode.html?filename=trycolors_hwb&type=1&module=color

颜色值之间可以用 空格 逗号分隔 未来还可以使用 /
*/

div {
    background-color: hsl(120deg 100% 25%);
    /* 目前尚不支持 */
    box-shadow: 0 0 0 10px hwb(120deg 100% 25% / 80%);
    color: rgb(0 255 0);
    border: 1px solid rgb(1, 2, 4)
}

/* 
媒体查询变量支持
*/
@custom-media --narrow-window (max-width: 300px);

/* @media (max-width: 300px) { */

@media (--narrow-window) {
    body {
        background-color: aquamarine;
    }
}

/* 
媒体查询，区间范围，暂不支持
*/
@media (width < 480px) {
    body {
        background-color: bisque;
    }
}

@media (480px <=width < 768px) {
    body {
        background-color: red;
    }
}

@media (width >=768px) {
    body {
        background-color: adf;
    }
}

/* 
    css 变量
*/
:root {
    --color: red;
    --head-color: #adf;
}
div {
    background: var(--color);
}
@custom-selector :--heading h1,
h2,
h3,
h4,
h5,
h6;
:--head {
    border: 1px solid var(--head-color);
}

/* 
元素:dir(文字书写方向) { style properties } 文字书写方向为ltr或rtl
*/

div:dir(rtl) {
    margin-left: 10px;
    color: red;
}

/* 
多段背景
https://developer.mozilla.org/zh-CN/docs/Web/CSS/conic-gradient
*/
div {
    /* background-image: conic-gradient(yellowgreen 40%, gold 0deg 75%, #f06 0deg); */
    background: conic-gradient( 
        red 6deg, orange 6deg 18deg, yellow 18deg 45deg, 
        green 45deg 110deg, blue 110deg 200deg, purple 200deg);
}

/* 
使用全局变量
*/
@media (max-width: env(--brand-small)) {
  body {
    padding: env(--brand-spacing);
  }
}

/* 
表单新增 
*/
/* 还不支持 */
input:focus-visible {
    outline: 5px solid bisque;
    color: red;
}
/* 内部表单元素聚焦时触发 */
div:focus-within {
    outline: 5px solid bisque;
    color: red;
}

/* 
字体相关

*/
/* https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant */
div {
    font-variant: small-caps;
    /* 
        discretionary-ligatures 字母横向变小
        no-contextual  字母连写样式 （默认）
        no-common-ligatures  没有连写
    */
    font-variant-ligatures: unset;
    /* 
        small-caps   首字母数字正常大写，其它字母小型大写字母
        all-small-caps  所有变小
        unicase   // 数字变小，如下标
    */
    font-variant-caps: unset;
    /* 
        normal
        slashed-zero;  数字0中间有一条连接线
        tabular-nums;  数字变宽
        oldstyle-nums; 数字纵向变化
    */
    font-variant-numeric: unset;
    /* 
        对日语和汉语的特别支持
        simplified   简体
        traditional  繁体
        full-width  英文扩大间距
    */
    font-variant-east-asian: unset;
}


/* 控制grid 的间距 */
.grid {
    display: grid;
    border: 1px solid #ccc;
    gap: 20px;
    /* column-gap: 40px;
    row-gap: 20px; */
}

/* 对齐方式 */
.grid {
    place-items: center stretch;
        /* align-items: center;
        justify-items: stretch; */
}

/* 
gray() = gray( <number>  [ / <alpha-value> ]? ) 
第一个参数指定灰度的阴影，等于 CIE 亮度，而第二个可选参数指定灰度的 alpha 通道。
*/
p {
    /* 浏览器不支持 */
  color: gray(50);
}

/* 
hex color支持透明度，hex 由6位扩展到8位
*/
p{
    color: #ccc;
    /* 透明背景 */
    background: #abaaccd1;  
}

/* 
hwb 颜色方案 ， 浏览器还不支持
*/
p {
  color: hwb(120 44% 50%);
}
/* 
https://www.w3.org/TR/css-color-4/#funcdef-lab

lab() = lab( <percentage> <number> <number> [ / <alpha-value> ]? )
lch() = lch( <percentage> <number> <hue> [ / <alpha-value> ]? )
*/


/* 
根据网络条件不同加载不同的图片，目前还不支持
*/
.img-set {
    background-image: image-set( "./dog.jpg" 1x, "foo-2x.png" 2x, "foo-print.png" 600dpi);
}

/* 
特殊的属性和值的写法
*/
span:first-child {
  float: inline-start;
  margin-inline-start: 10px;
}

/* 
根据系统的色调，改变样式
*/
@media (prefers-color-scheme: dark) {
    body {
        background-color: #dfdfdf;
        color: white;
    }
}


/* 
嵌套语法支持， 暂不支持
*/
div {
    & input {
        background-color: #333;
    }
}

/* 使用系统的主题字体 */
body {
  font-family: system-ui;
}
```