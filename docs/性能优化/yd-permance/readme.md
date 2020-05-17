1.  请求多 合并一个文件 文件变大 30kb
    请求少 合并三个文件 请求多 5 个 并发限制的

2.离线缓存
localStorage 同步读取 5M 2.5M IE 6 7 8

```JavaScript
<script id="main" src="${_version}"></script>
 const lists = {
        'main.js': 'main.xx55.js',
        'common:widget/apiext/custommarker.js':
          '/mobile/simple/static/common/widget/apiext/custommarker_a64e734.js',
      };
      //启动脚本 main.js
      function addScript(key, src) {
        if (document.getElementById('main')) {
          return;
        } else {
          //顶部追加 script
        }
      }
      let _version = localStorage['main.js'];
      //本地是否有缓存
      if (_version) {
        // eval + addScript
        if (lists['main.js'] == _version) {
          addScript();
        } else {
          localStorage.remove(localStorage['main.js']);
          localStorage.remove(localStorage[lists['main.js']]);
        }
      } else {
        _version = lists['main.js'];
        //开始执行缓存
        fetch(_version).then((data) => {
          localStorage['main.js'] = lists['main.js'];
          localStorage[lists['main.js']] = data;
        });
      }
```

3.  -> 分析模板
    -> 虚拟 dom
    -> dom diff
    -> 操作 dom
    \$("#xxx").html()

4.分析一下
CSR Vue
缺点：vue.min.js -> main.js -> rouer -> view + 组件 -> ajax -> view -> diff
优点：切页 spa 只切换变化的部分

SSR Node+swig+jquery/vue
缺点：

1.加载时长 用户访问过来的时间特别长 -》 后端渲染完毕 ajax

2.资源的重复加载 a/b => c/d

优点： 1.可见即可得 2.直出 节省了 JS 请求

架构：

1.可见即可得 SSR 直接刷新 造成首页的 HTML 巨大 -> bigpipe
------------------------->
----->|------>|------->|---

2.切页的 CSR a/b -> c/d 路由 后端请求头 ctx.render -》 ctx.json({
html:"",
css:"",
js:""
})

3.页面操作按钮都是 a 连接。 a/b -》a-b.js
