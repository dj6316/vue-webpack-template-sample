'use strict';

const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlPlugin = require('html-webpack-plugin');
const path = require('path');

const webpackConfig = {
  mode: 'development',
  entry: {
    polyfill: '@babel/polyfill',
    main: './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js',
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue',
      '@': __dirname,
    },
    fallback: {
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: false,
      buffer: false,
      v8: false,
      dns: false,
      util: false,
      os: false,
      buffer: false,
      assert: false,
      module: false,
      process: false,
      worker_threads: false,
      querystring: false,
      child_process: false,
      readline: false,
      tty: false,
      perf_hooks: false,
      url: false,
      http2: false,
      fsevents: false,
      // "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        // exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
      resource.request = resource.request.replace(/^node:/, '');
    }),
    new VueLoaderPlugin(),
    new HtmlPlugin({ template: 'index.html' }),
  ],
  devServer: {
    devMiddleware: {
      publicPath: '/',
    },
    static: {
      directory: path.resolve(__dirname, './dist'),
    },
    compress: true,
    historyApiFallback: true,
    hot: true,
    open: true,
    port: 8000,
  },
};

module.exports = webpackConfig;
