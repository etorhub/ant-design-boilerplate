const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

const config = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'eval-cheap-module-source-map' : 'source-map',
  entry: [
    './main.js',
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true,
  },
  context: path.resolve(__dirname, 'app'),

  devServer: {
    hot: true,
    static: {
      directory: path.resolve(__dirname, 'build'),
      publicPath: '/',
    },
    historyApiFallback: true,
    port: 8080,
    open: true,
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: isDevelopment },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: isDevelopment },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: 'asset',
        parser: { dataUrlCondition: { maxSize: 8192 } },
        generator: { filename: 'images/[name][ext]' },
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        type: 'asset/resource',
        generator: { filename: 'fonts/[name][ext]' },
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        type: 'asset',
        parser: { dataUrlCondition: { maxSize: 8192 } },
        generator: { filename: 'fonts/[name][ext]' },
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        type: 'asset',
        parser: { dataUrlCondition: { maxSize: 8192 } },
        generator: { filename: 'fonts/[name][ext]' },
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset',
        parser: { dataUrlCondition: { maxSize: 8192 } },
        generator: { filename: 'images/[name][ext]' },
      },
    ],
  },

  plugins: [
    new ESLintPlugin({
      context: path.resolve(__dirname, 'app'),
      extensions: ['js', 'jsx'],
      overrideConfigFile: path.resolve(__dirname, '.eslintrc.cjs'),
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app', 'index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: './styles/style.css',
      ignoreOrder: true,
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'vendors', to: 'vendors', noErrorOnMissing: true }],
    }),
    new webpack.HotModuleReplacementPlugin(),
    ...(isDevelopment ? [new ReactRefreshWebpackPlugin()] : []),
  ],
};

module.exports = config;
