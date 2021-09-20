const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index_bundle.js',
  },
  devServer: {
    static: path.join(__dirname, '/dist'),
    compress: true,
    port: 8081,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: {
        files: './src/**/*',
      },
    }),
  ],

};
