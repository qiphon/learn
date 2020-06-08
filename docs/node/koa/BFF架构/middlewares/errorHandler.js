const errorHandler = {
    error(app, logger) {
        app.use(async (ctx, next)=>{
            // 处理代码错误
            try {
                await next()
            }catch (err){
                let stack = err.stack.split('\n')
                let error = stack[0] + '\n' + stack[1]
                // console.log(err.stack.split('\n'))
                logger.error(error)
                ctx.status = ctx.status || 500;
                ctx.body = '服务器 500 啦 ！！！'
                return;
            }

            // 对 404 路由处理
            if(404 !== ctx.status){
                return
            }
            ctx.status = 404
            ctx.body = `<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>`
        })
    }
}

module.exports = errorHandler