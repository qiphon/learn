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