const prettierConfig = require('./prettier.config.cjs');

module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true
  },
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    'no-console': 0,
    'no-global-assign': 0,
    'prettier/prettier': ['error', prettierConfig]
  }
};
