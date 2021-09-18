import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserJSPlugin from 'terser-webpack-plugin';
import NodemonPlugin from 'nodemon-webpack-plugin';

import { env, paths } from './utils/index.js';
import { getDefinedVars } from './env.loader.js';

const { isDev, isProd } = env;
const sourceMap = isProd;

const pathToScripts = `${paths.assets}/scripts`;
const pathToStyles = `${paths.assets}/styles`;
const pathToBuild = `${paths.public}/build`;

// populate respective module JS and SCSS files as entry points
const getModuleEntry = () => {
  const entryFiles = {};

  // check javascript file for pages, if any
  const scriptsDirectory = `${paths.assets}/scripts`;
  const excludeScriptFiles = [];
  fs.readdirSync(scriptsDirectory).filter(file => {
    const { name, ext } = path.parse(file);
    if (ext === '.js' && !excludeScriptFiles.includes(name)) {
      entryFiles[name] = [`${pathToScripts}/${file}`];
    }
  });

  // check if companion module has .scss file as well
  const stylesDirectory = `${paths.assets}/styles`;
  const excludeStyleFiles = [];
  fs.readdirSync(stylesDirectory).filter(file => {
    const { name, ext } = path.parse(file);
    const moduleScss = `${pathToStyles}/${name}.scss`;
    if (ext === '.scss' && !excludeStyleFiles.includes(name)) {
      if (Array.isArray(entryFiles[name])) {
        entryFiles[name].push(moduleScss);
      } else {
        entryFiles[name] = [moduleScss];
      }
    }
  });

  return entryFiles;
};

const webpackConfig = {
  watch: isDev,
  watchOptions: { poll: true, ignored: /node_modules/ },
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'cheap-module-source-map' : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.scss']
  },
  entry: {
    main: `${pathToStyles}/main.scss`,
    ...getModuleEntry()
  },
  output: {
    publicPath: process.env.PUBLIC_PATH || '/',
    path: pathToBuild,
    filename: isDev ? '[name].js' : '[id].[contenthash:8].js',
    chunkFilename: isDev ? '[name].chunk.js' : '[id].chunk.[contenthash:8].js'
  },
  optimization: {
    // @see: https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
    // @see: https://webpack.js.org/plugins/css-minimizer-webpack-plugin/#options
    minimizer: [new TerserJSPlugin(), new CssMinimizerPlugin()],
    splitChunks: {
      cacheGroups: {
        vendor: {
          reuseExistingChunk: true,
          test: /node_modules/,
          chunks: 'all',
          name: 'vendor'
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: !!isDev,
            configFile: true
          }
        }
      },
      {
        test: /\.(sass|scss|css)$/,
        exclude: ['/node_modules/'],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 2, sourceMap }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap }
          }
        ]
      },
      {
        test: /\.(svg|png|jpe?g|gif)(\?.*)?$/i,
        type: 'asset',
        generator: {
          emit: true
        }
      },
      {
        test: /\.(eot|ttf|woff2?)(\?.*)?$/i,
        type: 'asset',
        generator: {
          emit: true
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(getDefinedVars().stringified),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[contenthash:8].css',
      chunkFilename: isDev ? '[id].css' : '[id].chunk.[contenthash:8].css'
    }),
    new AssetsPlugin({
      filename: 'assets.js',
      prettyPrint: isDev,
      path: pathToBuild,
      processOutput: assets => `export default ${JSON.stringify(assets)}`
    })
  ]
};

if (isDev) {
  webpackConfig.plugins = [
    ...webpackConfig.plugins,
    new NodemonPlugin({
      ext: 'js',
      verbose: false,
      script: `${paths.root}/index.js`,
      ignore: ['node_modules', paths.storage, paths.assets],
      watch: [paths.app, paths.utils]
    })
  ];
}

export default webpackConfig;
