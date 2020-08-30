import { GET, route } from 'awilix-koa';
import * as Router from 'koa-router';
import { IApi } from '../interface/IApi';
@route('/api')
class ApiController {
  private apiService: IApi;
  constructor({ apiService }) {
    this.apiService = apiService;
  }
  @route('/list')
  @GET()
  async actionList(
    ctx: Router.IRouterContext,
    next: () => Promise<any>
  ): Promise<any> {
    const data = await this.apiService.getInfo();
    ctx.body = {
      data,
    };
  }
}
export default ApiController;
