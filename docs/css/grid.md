# [css grid](https://developer.mozilla.org/en-US/docs/Web/CSS/grid)

CSS Grid 网格布局

Grid 布局与 Flex 布局有一定的相似性，都可以指定容器内部多个项目的位置。但是，它们也存在重大区别。

Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是一维布局。Grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是二维布局。Grid 布局远比 Flex 布局强大。

## 容器属性

注意，设为网格布局以后，容器子元素（项目）的float、display: inline-block、display: table-cell、vertical-align和column-*等设置都将失效。

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


```

### justify-items align-items place-items

justify-items属性设置单元格内容的水平位置（左中右），
align-items属性设置单元格内容的垂直位置（上中下）。
place-items 属性