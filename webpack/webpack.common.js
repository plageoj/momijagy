const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const srcDir = '../src/';

module.exports = {
  entry: {
    // popup: path.join(__dirname, srcDir + 'popup.ts'),
    // options: path.join(__dirname, srcDir + 'options.ts'),
    // background: path.join(__dirname, srcDir + 'background.ts'),
    main: path.join(__dirname, srcDir + 'main.ts'),
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
    clean: true,
  },
  optimization: {
    // splitChunks: {
    //     name: 'vendor',
    //     chunks: "initial"
    // }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
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
  ],
};
