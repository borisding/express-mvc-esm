const js = require('@eslint/js');
const globals = require('globals');
const babelParser = require('@babel/eslint-parser');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const prettierConfig = require('./prettier.config.cjs');

module.exports = [
  js.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      parser: babelParser,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        $env: 'readonly',
        $path: 'readonly'
      }
    },
    rules: {
      'no-console': 'off',
      'no-global-assign': 'off',
      'prettier/prettier': ['error', prettierConfig]
    },
    ignores: ['build/**/*', 'coverage/**/*']
  }
];
