# [css grid](https://developer.mozilla.org/en-US/docs/Web/CSS/grid)

CSS Grid 网格布局

Grid 布局与 Flex 布局有一定的相似性，都可以指定容器内部多个项目的位置。但是，它们也存在重大区别。

Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是一维布局。Grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是二维布局。Grid 布局远比 Flex 布局强大。

## 容器属性

注意，设为网格布局以后，容器子元素（项目）的float、display: inline-block、display: table-cell、vertical-align和column-*等设置都将失效。

### grid-template-columns、grid-template-rows

设置grid 中元素的排列方式，先横向还是先纵向排列

```css
.grid {
    display: grid;
    display: inline-grid;  
}
/* 
    设置横向每个元素宽度 
    控制列的数量
*/
grid-template-columns
    单位，设定每一列的宽度
    100px 100px  // 有几列就写几个
    1fr   1fr    // fr 关键字 ：为了方便表示比例关系，网格布局提供了fr关键字（fraction 的缩写，意为"片段"）。如果两列的宽度分别为1fr和2fr，就表示后者是前者的两倍。
    50%   50%    和上面写法一样，表示一共有2列，每列宽位父级一半
    
    // minmax()函数产生一个长度范围，表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值
    100px minmax(20px, 1fr) 1em; 
    // auto关键字表示由浏览器自己决定长度。
    100px auto 1em; 


    grid-template-columns: repeat(5, 1fr);   使用repeat设置平均的5列
        repeat(重复次数 n，要重复的内容<可以多个>)；使要重复的内容重复 n 次
        repeat(4, [col-start] fit-content(200px) [col-end])
        repeat(4, 10px [col-start] 30% [col-middle] auto [col-end])

        // repeat(auto-fill, 重复的内容)  
            如果1个重复的内容超过一行，这些重复的内容会放在一行内
            如果1个重复的内容不超过1行，2个重复的内容超过1行，那么第一行只能放置一个重复的内容，第二个会到下一行显示
        [repeat更多使用方式](https://developer.mozilla.org/en-US/docs/Web/CSS/repeat)

/* 
    设置纵向每个元素宽度 
*/
grid-template-rows
    单位，设定每一列的高度,使用方式同上

gap: 10px; 设置行间距
    row-gap: 10px;
    column-gap: 10px;

grid-auto-flow （默认值 row）划分网格以后，容器的子元素会按照顺序，自动放置在每一个网格。默认的放置顺序是"先行后列"，即先填满第一行，再开始放入第二行。
    如果值为 column，表示先填行，后填列
    设为row dense，表示"先行后列"，并且尽可能紧密填满，尽量不出现空格。
    同理 column dense 
代码示例：https://codepen.io/qiphon/pen/OJNamJW?editors=1100

/* grid-template-areas: 'a b c' 'd e f' 'g h i'; */ 定义使用区域，如果区域不使用可以用 . 表示
            grid-template-areas: 'a b c' 'd e f' 'g h h';
            grid-template-areas: 'a b c' 'd e f' 'g . h';
代码示例 ： https://codepen.io/qiphon/pen/QWNzQRx
mdn ： https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas


```

### grid-auto-columns 属性，grid-auto-rows 属性

grid-auto-columns属性和grid-auto-rows属性用来设置，浏览器自动创建的多余网格的列宽和行高。它们的写法与grid-template-columns和grid-template-rows完全相同。如果不指定这两个属性，浏览器完全根据单元格内容的大小，决定新增网格的列宽和行高。

### justify-items align-items place-items

place-items 属性

    - justify-items属性设置单元格内容的水平位置（左中右），
    - align-items属性设置单元格内容的垂直位置（上中下）。

        如果设置了这两个属性，那么盒子的大小将受到影响，可以使用的值如下：

            - start：对齐单元格的起始边缘。
            - end：对齐单元格的结束边缘。
            - center：单元格内部居中。
            - stretch：拉伸，占满单元格的整个宽度（默认值）。

### justify-content 属性，align-content 属性，place-content 属性

用于设置当前grid 容器内元素的对齐方式

place-content 属性 设置内容的展示方式

    - align-content属性是整个内容区域的垂直位置
    - justify-content属性是整个内容区域在容器里面的水平位置（左中右），

    可以使用的值： 
        - start 对齐容器的起始边框。
        - end  对齐容器的结束边框。
        - center 居中
        - stretch 项目大小没有指定时，拉伸占据整个网格容器。
        - space-around 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与容器边框的间隔大一倍。
        - space-between 项目与项目的间隔相等，项目与容器边框之间没有间隔。
        - space-evenly 项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔。

### grid-template 属性，grid 属性

grid-template属性是grid-template-columns、grid-template-rows和grid-template-areas这三个属性的合并简写形式。

grid属性是grid-template-rows、grid-template-columns、grid-template-areas、 grid-auto-rows、grid-auto-columns、grid-auto-flow这六个属性的合并简写形式。


## grid 盒子中的元素属性

### grid-column-start 、grid-column-end 、grid-row-start 、grid-row-end 、

这些属性用于定义子节点的 *宽度和位置*，这个位置根据grid的边线确定，如果 grid 是 2*2 的（即为一个2行2列的grid），那么这个grid 的边线就是 3*3 条，他们分别为 1、2、3，如果要设定一个grid内的元素横向沾满2个格子，
`grid-column-start: 1; grid-column-end: 3;` 可以不设置 row，因为默认会占据一个格子

[实例](https://codepen.io/qiphon/pen/gOrZeLo)

- grid-column-start属性：左边框所在的垂直网格线
- grid-column-end属性：右边框所在的垂直网格线
- grid-row-start属性：上边框所在的水平网格线
- grid-row-end属性：下边框所在的水平网格线

    这四个属性可以使用的值
        1. 数字（默认网格线从1开始）
        2. 可以使用span关键字，表示"跨越"，即左右边框（上下边框）之间跨越多少个网格。
        3. 可以使用网格线的别名. 声明网格名的方法 `grid-template-columns: [c1] 1fr [c2] 1fr [c3] 1fr [c4];` 使用网格名 `grid-column-start: c1;`

### grid-area 、grid-column 属性，grid-row 属性

`grid-area:  
    <grid-row-start>
    <grid-column-start>
    <grid-row-end>
    <grid-column-end>
` [实例](https://codepen.io/qiphon/pen/QWNzQRx?editors=1100)

    grid-column属性是grid-column-start和grid-column-end的合并简写形式，

    grid-row属性是grid-row-start属性和grid-row-end的合并简写形式。

```css
.item {
    grid-column: c1 / c3;
    grid-column: span 2 / 4;
  grid-column: <start-line> / <end-line>;
  grid-row: <start-line> / <end-line>;
}

/* grid-area 使用 */
.a {
    // grid-area: e ;
    grid-row: d / f;
    grid-column: d / f;
    grid-area: d / d/ f/ f;
    grid-area: 1 / 1 / 3 / 3;
}

```

### place-self 、justify-self 、align-self  

`place-self: <align-self> <justify-self>;`

justify-self属性设置单元格内容的水平位置（左中右），跟justify-items属性的用法完全一致，但只作用于单个项目。

align-self属性设置单元格内容的垂直位置（上中下），跟align-items属性的用法完全一致，也是只作用于单个项目。

start：对齐单元格的起始边缘。
end：对齐单元格的结束边缘。
center：单元格内部居中。
stretch：拉伸，占满单元格的整个宽度（默认值）。

```css
.item {
  justify-self: start | end | center | stretch;
  align-self: start | end | center | stretch;
}
```

[scrmba](https://scrimba.com/learn/R8PTE)
[mdn](https://developer.mozilla.org/en-US/docs/Web/css/reference)
[阮一峰博客](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)