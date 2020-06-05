# html

1. 利用image 测速、上报数据

```js

// 测试网速
var s = new Date();
var img = new Image()
img.crossOrigin = 'anonymous'
img.src = "http://www.qiphon.site/qiphon.png";   // 1kb
img.onload = function(){
    var e = Date.now()
    var w = 1 /( e - s) 
}

// 上报数据
var img = new Image()
img.crossOrigin = 'anonymous'
img.src = "http://www.qiphon.site/qiphon.png";   //1*1 3kb


```
2. xss 远程攻击

```
<style>
        /* xss */
    body{
        background-image: url('javascript:window.alert(xss)');
        color: expression(alert("111"));
    }
    body::after{
        content: url('javascript:window.alert(123)');
        
    }
</style>

```

3. 能少写dom就少些

> dom 是cpu 计算出来的

4. iframe 对远程localstorage 扩容

```html
<iframe src="a.com/b.html" frameborder="0"></iframe>
<script>
    // iframe 通信
    window.frames[0].postMessage("qiphon","111")


    // 另一个域
    window.addEventListener('message',function(e){
        if(e.source !== window.parent){
            return;
        }
        localStorage.setItem(e.data.key, e.data.value)
    } )
</script>

```

5. html 语义化的重要性

