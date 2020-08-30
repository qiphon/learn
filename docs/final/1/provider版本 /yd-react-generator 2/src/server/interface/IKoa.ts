import * as Koa from 'koa';
import * as render from 'koa-swig';
export interface Context extends Koa.Context {
  render: typeof render;
}
