# [css grid](https://developer.mozilla.org/en-US/docs/Web/CSS/grid)

CSS Grid 网格布局

Grid 布局与 Flex 布局有一定的相似性，都可以指定容器内部多个项目的位置。但是，它们也存在重大区别。

Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是一维布局。Grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是二维布局。Grid 布局远比 Flex 布局强大。

## 容器属性

注意，设为网格布局以后，容器子元素（项目）的float、display: inline-block、display: table-cell、vertical-align和column-*等设置都将失效。

```css
display: grid;
display: inline-grid;  

grid-template-columns
    单位，设定每一列的宽度
    100px 100px  有几列就写几个
    1fr   1fr
    50%   50%    和上面写法一样，表示一共有2列，每列宽位父级一半
    grid-template-columns: repeat(5, 1fr);   使用repeat设置平均的5列
    [repeat更多使用方式](https://developer.mozilla.org/en-US/docs/Web/CSS/repeat)
grid-template-rows
    单位，设定每一列的高度

```