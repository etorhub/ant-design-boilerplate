const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  mode: 'production',
  devtool: 'source-map',
  entry: ['./main.js'],
  context: path.resolve(__dirname, 'app'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    clean: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') },
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
  ],
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
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: false } },
          { loader: 'sass-loader', options: { sourceMap: false } },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: 'asset',
        parser: { dataUrlCondition: { maxSize: 8192 } },
        generator: { filename: 'images/[name][ext]' },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
};

module.exports = config;
