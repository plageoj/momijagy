const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const srcDir = '../src/';

module.exports = {
  entry: {
    style: path.join(__dirname, srcDir + 'scss/style.scss'),
    main: path.join(__dirname, srcDir + 'content.ts'),
    background: path.join(__dirname, srcDir + 'background.ts'),
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
    clean: true,
  },
  optimization: {},
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 2 },
          },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: '.', to: '.', context: 'public' }],
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
};
