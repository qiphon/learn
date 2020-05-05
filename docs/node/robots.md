# 爬虫系统及 robot 协议

> 爬虫，是一种自动获取网页内容的程序。是搜索引擎的重要组成部分，因此搜索引擎优化很大程度上就是针对爬虫而做的优化

> robot.txt 是一个文本文件， robot.txt 是一个协议，不是命令。 robot.txt 是爬虫第一个要查看的文件。 robots.txt 文件告诉爬虫在服务器上什么文件是可以被查看的，搜索机器人就会按照该文件中的内容来确定访问的范围。

## node 爬虫

node爬虫实现主要依靠 [cheerio](https://cheerio.js.org/) 这样的工具，和 request 请求，request 拿回 HTML数据，
cheerio用类jQuery的方式，讲 HTML 处理，之后就可以拿到数据了

```js
const express = require('express')
const app = express()
const request = require('request')
const cheerio = require('cheerio')

app.get('/', (req, res)=>{
    request('https://www.yidengxuetang.com', (err, response, body)=>{
        if(!err && response.statusCode == 200){
            // console.log(body)
            $ = cheerio.load(body)
            res.json({
                title: $('title').text(),
                nav: $('.nav .c-5').text(),
                href: $('.nav .c-5').attr("href"),
            })
        }
    })
})

app.listen(3000)
console.log('server start at 3000')

```