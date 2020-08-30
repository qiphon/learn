import * as Koa from 'koa';
import { createContainer, Lifetime } from 'awilix';
import { scopePerRequest, loadControllers } from 'awilix-koa';
import render from 'koa-swig';
import * as serve from 'koa-static';
import { join } from 'path';
import co from 'co';
import { historyApiFallback } from 'koa2-connect-history-api-fallback';
const app = new Koa();

app.context.render = co.wrap(
  render({
    root: join(__dirname, 'views'),
    autoescape: true,
    cache: 'memory',
    writeBody: false,
    ext: 'html',
  })
);
app.use(serve(__dirname + '/assets'));
const container = createContainer();
container.loadModules([__dirname + '/services/*.ts'], {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: Lifetime.SCOPED,
  },
});
app.use(scopePerRequest(container));
//掌握框架原理
app.use(historyApiFallback({ index: '/', whiteList: ['/api'] }));
app.use(loadControllers(__dirname + '/routers/*.ts'));
app.listen(3000, () => {
  console.log('京程一灯Server BFF启动成功');
});
