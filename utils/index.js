import path from 'path';

const root = path.resolve(process.cwd());
export const paths = {
  root,
  app: `${root}/app`,
  assets: `${root}/assets`,
  config: `${root}/config`,
  public: `${root}/public`,
  storage: `${root}/storage`,
  utils: `${root}/utils`
};

export const isDev = process.env.NODE_ENV === 'development';
export const isProd = process.env.NODE_ENV === 'production';
