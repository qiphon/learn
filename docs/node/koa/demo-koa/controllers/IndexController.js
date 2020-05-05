class IndexController {
    constructor(){

    }
    async actionIndex(ctx, next){
        // ctx.body = await ctx.render('index')
        ctx.body = await ctx.render('react')
    }
}

module.exports = IndexController