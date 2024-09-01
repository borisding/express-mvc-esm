import js from '@eslint/js';
import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import prettierConfig from './prettier.config.js';

export default [
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
    ignores: ['build', 'coverage']
  }
];
