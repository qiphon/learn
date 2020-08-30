import { GET, route } from 'awilix-koa';
import * as Router from 'koa-router';
import { Context } from '../interface/IKoa';
@route('/')
class IndexController {
  @route('/')
  @GET()
  async actionList(ctx: Context, next: () => Promise<any>): Promise<any> {
    // ctx.render()
    // ctx.body = {
    //   data: '京程一灯',
    // };
    ctx.body = await ctx.render('index');
  }
}
export default IndexController;
