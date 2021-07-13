const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

const env = {
  isDev,
  isProd
};

export default env;
