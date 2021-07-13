import path from 'path';

export const isDev = process.env.NODE_ENV === 'development';

export const paths = {
  middleware: path.resolve('app/middleware'),
  models: path.resolve('app/models'),
  routers: path.resolve('app/routers'),
  views: path.resolve('app/views')
};
