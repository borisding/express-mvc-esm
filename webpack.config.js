import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserJSPlugin from 'terser-webpack-plugin';
import NodemonPlugin from 'nodemon-webpack-plugin';
import RemoveEmptyScriptsPlugin from 'webpack-remove-empty-scripts';
import { WatchAssetFilesPlugin } from '#internal/WatchAssetFilesPlugin';
import { getDefinedDotEnv } from '#config';

const pathToScripts = `${$path.assets}/scripts`;
const pathToStyles = `${$path.assets}/styles`;
const pathToBuild = `${$path.public}/build`;

const watchedDirectories = [pathToScripts, pathToStyles];
const globPatterns = [
  `${pathToScripts}/**/*.js`,
  `${pathToStyles}/**/*.{scss,sass,css}`
];

const webpackConfig = {
  watch: $env.isDev,
  watchOptions: { poll: true, ignored: /node_modules/ },
  mode: $env.isDev ? 'development' : 'production',
  devtool: $env.isDev ? 'cheap-module-source-map' : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.scss', '.sass']
  },
  entry: WatchAssetFilesPlugin.getEntries(globPatterns, watchedDirectories),
  output: {
    publicPath: process.env.PUBLIC_PATH || '/',
    path: pathToBuild,
    filename: $env.isDev ? '[name].js' : '[name].[contenthash:8].js',
    chunkFilename: $env.isDev
      ? '[name].chunk.js'
      : '[name].chunk.[contenthash:8].js'
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
            cacheDirectory: !!$env.isDev,
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
              sourceMap: $env.isProd
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: $env.isProd
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: $env.isProd
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
    new webpack.DefinePlugin(getDefinedDotEnv().stringified),
    new WatchAssetFilesPlugin(),
    new RemoveEmptyScriptsPlugin(),
    new MiniCssExtractPlugin({
      filename: $env.isDev ? '[name].css' : '[name].[contenthash:8].css',
      chunkFilename: $env.isDev ? '[id].css' : '[id].chunk.[contenthash:8].css'
    }),
    new AssetsPlugin({
      filename: 'assets.js',
      prettyPrint: $env.isDev,
      path: pathToBuild,
      processOutput: assets => `export default ${JSON.stringify(assets)}`
    })
  ]
};

if ($env.isDev) {
  webpackConfig.plugins = [
    ...webpackConfig.plugins,
    new NodemonPlugin({
      ext: 'js',
      verbose: false,
      script: `${$path.root}/main.js`,
      ignore: ['node_modules', $path.storage, $path.assets],
      watch: [$path.app]
    })
  ];
}

export default webpackConfig;
