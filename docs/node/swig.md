
# swig api

swig.init({
    allowErrors: false,
    autoescape: true,
    cache: true,
    encoding: 'utf8',
    filters: {},
    root: '/',
    tags: {},
    extensions: {},
    tzOffset: 0
});

allowErrors: 默认值为 false。将所有模板解析和编译错误直接输出到模板。
             如果为 true，则将引发错误，抛出到 Node.js 进程中，可能会使您的应用程序崩溃。
autoescape: 默认true，强烈建议保持。字符转换表请参阅转义过滤器。
true:       HTML安全转义
false:     不转义，除非使用转义过滤器或者转义标签
'js':      js安全转义
cache:    更改为 false 将重新编译每个请求的模板的文件。
          正式环境建议保持true。
encoding: 模板文件编码
root:     需要搜索模板的目录。如果模板传递给 swig.compileFile 绝对路径(以/开头)，Swig不会在模板root中搜索。       如果传递一个数组，使用第一个匹配成功的数组项。
tzOffset: 设置默认时区偏移量。此设置会使转换日期过滤器会自动的修正相应时区偏移量。
filters:  自定义过滤器或者重写默认过滤器，参见自定义过滤器指南。
tags:     自定义标签或者重写默认标签，参见自定义标签指南。
extensions: 添加第三方库，可以在编译模板时使用，参见参见自定义标签指南。


```

- 变量

```HTML
{{ foo.bar }}
{{ foo['bar'] }}

```

- 模板继承

```HTML
<!-- layout.html -->
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>{% block title %}My Site{% endblock %}</title>
    {% block head %}
        <link rel="stylesheet" href="main.css">
    {% endblock %}
</head>
<body>
    {% block content %}{% endblock %}
</body>
</html>

<!-- index.html -->
<!-- 这里是继承 -->
{% extends 'layout.html' %}
<!-- 重写模板中的块 -->
{% block title %}My Page{% endblock %}
{% block head %}
{% parent %}
    <link rel="stylesheet" href="custom.css">
{% endblock %}
{% block content %}
    <p>This is just an awesome page.</p>
{% endblock %}

```

- 变量过滤器

    - 过滤器的使用

    ```html
    {{ name|title }} was born on {{ birthday|date('F jS, Y') }}
    and has {{ bikes|length|default("zero") }} bikes.

    <!-- 也可以使用块处理 -->
    {% filter upper %}oh hi, paul{% endfilter %}

    ```

    - 内置过滤器
    
        - addslashes    反斜杠-转义字符串。

            ```html
            <p>{{ 'quoted string\"'|addslashes }}</p>
            // => quoted string\\\"

            ```
        - capitalize 大写的第一个字母输入，小写的其余。

            ```js
            {{ "i like Burritos"|capitalize }}
            // I like burritos
            ```
        - date(format, offset, abbr)  设置日期或日期兼容字符串的格式。

            ```js
            <p>{{ Date.now() |date('Y-m-d') }}</p>
            // 2020-05-04
            ```
        - default  如果输入为“ undefined”、“ null”或“ false” ，则可以指定默认返回值。

            ```js
            {{ null_value|default('Tacos') }}
            Tacos
            ```
        - escape  强制转义变量的输出。 可以选择使用‘ e’作为快捷筛选器名称。 如果打开自动转义，此筛选器将默认应用。

            ```js
                <p>{{ "<blah>"|escape }}</p>
                <p>{{ "<blah>"|e }}</p>
                <blah>
                <blah>

                <p>{{ "<blah>"|e('js') }}</p>
                \u003Cblah\u003E
            ```
        - first 返回第一个值

            ```js
            <p>{{ ['a','my_arr']|first }}</p>
            a
            ```

        - groupBy  
            
            ```js
            // [{ age: 23, name: 'Paul' }, { age: 26, name: 'Jane' }, { age: 23, name: 'Jim' }] 
            <div>
                {% for agegroup in people|groupBy('age') %}
                <h2>{{ loop.key }}</h2>
                <ul>
                    {% for person in agegroup %}
                    <li>{{ person.name }}</li>
                    {% endfor %}
                </ul>
                {% endfor %}
            </div>

            // 23
            //     Paul
            //     Jim
            // 26
            //     Jane

            ```
        - join  用一个字符串连接输入。
            
            ```js
            {{ ['foo', 'bar', 'baz']|join('-') }}
            // foo-bar-baz
            ```
        - json(indent)  返回 JavaScript 对象的字符串表示形式。

            ```js
            {{ {val: 123}|json }}
            {"val":123}
            ```
        - last 获取字符串中数组或字符中的最后一项。 所有其他对象将尝试返回最后一个可用的值。
            ```js

            // my_arr = ['a', 'b', 'c']
            {{ my_arr|last }}
            // => c
            ```
        - length 获取数组、字符串或对象中的项数。

            ```js
            // my_arr = ['a', 'b', 'c']
            {{ my_arr|length }}
            // => 3
            ```
        - lower  返回所有小写字母的输入。
            ```js
            {{ "FOOBAR"|lower }}
            // => foobar
            ```
        - raw  为安全起见不赞成使用。
        - replace(search, replacement, flags) 返回一个新字符串，其中匹配的搜索模式被给定的替换字符串所替换。
            ```js
            search 搜索	string  从输入中替换的字符串或模式
            replacement 置换	string	字符串来替换匹配的模式
            flags 旗帜	string	正则表达式标志。“ g” : 全局匹配，“ i” : 忽略大小写，“ m” : 多行匹配

             {{'foot' | replace('o', 'e', 'g') }}
             // feet
             {{ 'a1b2c3'|replace('\D', '0', 'g') }}
             // 010203
            ```
        - reverse   反向排序输入。这是{{ input | sort (true)}}的别名。
            ```js

            // val = [1, 2, 3];
            {{ val|reverse }}
            // => 3,2,1
            ```
        - safe  强制输入不自动转义。 仅在您知道可以安全地呈现在页面上的内容上使用此选项。
                测试失败！！！

            ```js
            // 理想的例子
            // my_var = "<p>Stuff</p>";
            {{ my_var|safe }}
            // => <p>Stuff</p>
            ```
        - sort(reverse)  
            - 按升序排序输入。
            - 如果给定一个对象，将以排序数组的形式返回键。
            - 如果给定一个字符串，每个字符将被单独排序。

            ```js
            <p>{{ [4, 6, 2]|sort }}</p>
            <p>{{ 'afd'|sort }}</p>
            <p>{{ {c:3, b: 1}|sort }}</p>
            ```
        - striptags 去标签

            ```js
            {{ '<span>foobar</span>'|striptags }}
            // foobar
            ```
        - title  每个给定的单词都首字母大写，其他字母都小写。

            ```js
            {{ 'this is soMe text'|title }}
            // This Is Some Text
             {{ ['hi', 'this', 'is', 'an', 'array'] |title|join(' ') }}
             // Hi This Is An Array
            ```
        - uniq  从数组中删除所有重复项。

            ```js
            {{ [1, 2, 3, 4, 4, 3, 2, 1]|uniq|join(',') }}
            // 1,2,3,4
            ```
        - upper  将输入转换为所有大写字母。如果提供了一个对象或数组，所有值将使用大写字母
            
            ```js
            // my_arr = ['tacos', 'burritos'];
            {{ my_arr|upper|join(' & ') }}
            // => TACOS & BURRITOS
            ```
        - url_encode  编码一个字符串。如果一个对象或数组被传递，所有的值将被 url 编码。
            
            ```js
            // my_str = 'param=1&anotherParam=2';
            {{ my_str|url_encode }}
            // => param%3D1%26anotherParam%3D2
            ```

        - url_decode  对字符串进行解码。如果传递了一个对象或数组，所有值都将被解码。

            ```js
            // my_str = 'param%3D1%26anotherParam%3D2';
            {{ my_str|url_decode }}
            // => param=1&anotherParam=2
            ```
    - 自定义过滤器
        
        ```js
        // 创建一个 myfilter.js 然后引入到 Swig 的初始化函数中
        swig.setFilter(
            "reverseStr",
            require('./utils/myfilters').myfilter
        )

        // myfilters.js
        exports.reverseStr = function (input) {
            return input.toString().split('').reverse().join('');
        };
        // html
        <h2>{{ title | reverseStr }}</h2>

        ```