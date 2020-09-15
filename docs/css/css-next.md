# [css next](http://preset-env.cssdb.org/features)

[详细内容参考w3c 草案](https://drafts.csswg.org/)

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
Properties for defining the break behavior between and within boxes
*/
.break {
    
}
```