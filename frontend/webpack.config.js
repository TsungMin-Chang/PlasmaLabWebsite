const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const appPath = p => path.join(__dirname, p);
const entries = ['src'];

const mode = 'production';
process.env.NODE_ENV = mode;
module.exports = {
  mode: mode,
  target: 'web',
  entry: appPath('src/main.tsx'),
  output: {
    filename: 'index.[hash].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      "@lib": "../lib",
      '@': appPath('src')
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/react']
            },
          },
          'ts-loader'
        ],
        exclude: [appPath('node_modules')]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: appPath('index.html'),
      filename: 'index.html'
    }),
    {
      apply(compiler) {
        compiler.hooks.compilation.tap('HtmlFixAssetPathPlugin', compilation => {
          HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
            'HtmlFixAssetPathPlugin',
            (data, cb) => {
              const baseDir = path.dirname(data.outputName);
              const fixPath = name => path.relative(baseDir, path.join(baseDir, name));
              data.assets.js = data.assets.js.map(fixPath);
              data.assets.css = data.assets.css.map(fixPath);
              cb(null, data);
            },
          );
        });
      },
    },
  ],
};