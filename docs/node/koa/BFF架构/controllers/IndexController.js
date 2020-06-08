

class IndexController {
    constructor(){

    }
    async actionIndex(ctx, next){
        // ctx.body = '<h1>home'
        ctx.body = await ctx.render('index', {
            body: 123
        })
    }

    async actionVue(ctx){
        ctx.body = await ctx.render('vue', {
            title: '模板引擎渲染的数据'
        })
    }

    async actionSpa(ctx){
        ctx.body = await ctx.render('spa')
    }
}

module.exports = IndexController