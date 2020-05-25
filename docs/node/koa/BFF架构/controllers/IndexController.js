

class IndexController {
    constructor(){

    }
    async actionIndex(ctx, next){
        ctx.body = '<h1>home'
    }
}

module.exports = IndexController