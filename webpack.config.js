const path = require('path');

module.exports = {
  entry: './src/index.js', // 入口文件路径
  output: {
    path: path.resolve(__dirname, 'dist'), // 输出目录
    filename: 'bundle.js', // 输出文件名
  },
  resolve: {
    fallback: {
      "url": require.resolve("url/"),
    }
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    compress: true,
    allowedHosts: 'all',
    port: 3001,
  },
};
