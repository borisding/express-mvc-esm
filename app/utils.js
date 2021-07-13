import path from 'path';

export const isDev = process.env.NODE_ENV === 'development';

export const paths = {
  controlles: path.resolve('controlles'),
  middleware: path.resolve('middleware'),
  models: path.resolve('models'),
  routers: path.resolve('routers'),
  views: path.resolve('views')
};
