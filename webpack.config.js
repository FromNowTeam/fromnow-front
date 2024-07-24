const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
require('dotenv').config();
const webpack = require('webpack');
const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.resolve(__dirname, './public/index.html'),
  filename: 'index.html',
  inject: 'body',
});
// tsx 파일 로더
const tsxLoader = {
  test: /\.(js|ts|tsx)$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-react'],
    },
  },
};
// 이미지 파일 로더
const imgLoader = {
  test: /\.(gif|jpe?g|png)$/,
  use: {
    loader: 'url-loader',
    options: {
      useRelativePath: false,
      name: '[sha512:hash:base62:5].[ext]',
      limit: 4096,
      outputPath: 'img/',
      publicPath: '/',
    },
  },
};
// svg 파일 로더
const svgLoader = {
  test: /\.svg$/,
  use: {
    loader: 'file-loader',
    options: {
      useRelativePath: false,
      name: '[sha512:hash:base62:5].[ext]',
      outputPath: 'img/',
      publicPath: '/',
    },
  },
};
// css 파일 로더
const cssLoader = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader', 'postcss-loader'],
  include: path.resolve(__dirname, 'src'),
};
// 환경 변수
const DefinePlugin = new webpack.DefinePlugin({
  'process.env': {
    ANDROID_WEB_CLIENT_ID: JSON.stringify(process.env.ANDROID_WEB_CLIENT_ID),
    IOS_WED_CLIENT_ID: JSON.stringify(process.env.IOS_WED_CLIENT_ID),
    IOS_CLIENT_ID: JSON.stringify(process.env.IOS_CLIENT_ID),
    KAKAO_NATIVE_APP_KEY: JSON.stringify(process.env.KAKAO_NATIVE_APP_KEY),
    KAKAO_NATIVE_JS_KEY: JSON.stringify(process.env.KAKAO_NATIVE_JS_KEY),
    KAKAO_NATIVE_API_KEY: JSON.stringify(process.env.KAKAO_NATIVE_API_KEY),
    CLIENT_URL: JSON.stringify(process.env.CLIENT_URL),
  },
});
module.exports = {
  entry: path.join(__dirname, 'index.web.js'),
  output: {
    filename: 'bundle.web.js',
    path: path.join(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
    },
    extensions: ['.web.js', '.js', '.ts', '.tsx', 'json', '.css'],
  },
  module: {
    rules: [tsxLoader, imgLoader, svgLoader, cssLoader],
  },
  plugins: [HTMLWebpackPluginConfig, DefinePlugin],
  devServer: {
    open: true,
    historyApiFallback: true,
    hot: true,
    port: 3000,
  },
};
