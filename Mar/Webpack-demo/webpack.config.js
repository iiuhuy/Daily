const path = require('path');


// 语法
module.exports = {
  mode: "development",
  // mode: "production",
  // 打包入口文件
  entry: './src/index.js',
  module: {
    rules: [{
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            // placehoder 占位符
            name: '[name]_[hash].[ext]',
            // 输出到 images 文件夹
            outputPath: 'images/',
            // 做一个限制 1kb = 1024
            limit: 204800
          }
        }
      },
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  // 输出文件 & 路径
  output: {
    filename: 'bundle.js',
    // 不能直接写路径，需要引入 path 核心模块。调用 resolve 方法
    path: path.resolve(__dirname, 'bundle')
  }
}