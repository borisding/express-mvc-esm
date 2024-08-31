import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserJSPlugin from 'terser-webpack-plugin';
import NodemonPlugin from 'nodemon-webpack-plugin';
import RemoveEmptyScriptsPlugin from 'webpack-remove-empty-scripts';
import { paths, isDev, isProd } from './utils/index.js';
import { getDefinedVars } from './utils/config.js';

const pathToScripts = `${paths.assets}/scripts`;
const pathToStyles = `${paths.assets}/styles`;
const pathToBuild = `${paths.static}/build`;
const watchedDirectories = [pathToScripts, pathToStyles];

class WatchAssetFilesPlugin {
  static getEntries() {
    return function () {
      const entryFiles = {};

      // list files to exclude, if any
      const excludeScripts = [];
      const excludeStyles = [];

      // check javascript file for pages
      fs.readdirSync(pathToScripts).forEach(file => {
        const { name, ext } = path.parse(file);
        if (ext === '.js' && !excludeScripts.includes(name)) {
          entryFiles[name] = [`${pathToScripts}/${file}`];
        }
      });

      // check if companion module has .s?css file as well
      const styleExtensions = ['.scss', '.sass', '.css'];
      fs.readdirSync(pathToStyles).forEach(file => {
        const { name, ext } = path.parse(file);
        const moduleStyle = `${pathToStyles}/${name}${ext}`;
        if (styleExtensions.includes(ext) && !excludeStyles.includes(name)) {
          if (Array.isArray(entryFiles[name])) {
            entryFiles[name].push(moduleStyle);
          } else {
            entryFiles[name] = [moduleStyle];
          }
        }
      });

      return entryFiles;
    };
  }

  apply(compiler) {
    compiler.hooks.afterCompile.tapAsync(
      this.constructor.name,
      this.afterCompile.bind(this)
    );
  }

  afterCompile(compilation, callback) {
    for (const directory of watchedDirectories) {
      compilation.contextDependencies.add(path.normalize(directory));
    }
    callback();
  }
}

const webpackConfig = {
  watch: isDev,
  watchOptions: { poll: true, ignored: /node_modules/ },
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'cheap-module-source-map' : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.scss', '.sass']
  },
  entry: WatchAssetFilesPlugin.getEntries(),
  output: {
    publicPath: process.env.PUBLIC_PATH || '/',
    path: pathToBuild,
    filename: isDev ? '[name].js' : '[name].[contenthash:8].js',
    chunkFilename: isDev ? '[name].chunk.js' : '[name].chunk.[contenthash:8].js'
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
            options: {
              importLoaders: 2,
              sourceMap: !!isProd
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: !!isProd
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !!isProd
            }
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
    new WatchAssetFilesPlugin(),
    new RemoveEmptyScriptsPlugin(),
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
