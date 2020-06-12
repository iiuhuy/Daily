# Webpack

单入口： 字符串的形式，
多入口： 以对象键值对的形式，

输入：

- 单入口，写死输出文件
- 多入口，需使用占位符区分文件名

常见的 loaders ?

- babel-loader 
- css-loader
- less-loader 
- ts-loader 将 TS 转换成 JS
- file-loader 进行乳图片、字体等的打包
- raw-loader  将文件以字符串的形式导入
- thread-loader 多进程打包 js 和 css

常用的 Plugins ？

- CommonsChunkPlugin 将 chunks 相同的模块代码提取成公共 js
- CleaWebpackPlugin  清理构建目录
- ExtractTextWebpackPlugin 将 CSS 从 bundle 文件中提取成一个独立的 CSS 
- CopyWebpackPlugin  将文件或者文件夹拷贝到构建的输出目录
- HtmlWebpackPlugin 创建 HTML 文件去承载输出的 bundle 
- UglifyjsWebpackPlugin 压缩 JS
- ZipWebpackPlugin 将打包出的资源生成一个 Zip 包

Mode: webpack 中的新概念，用来指定当前的环境：production、development 或者 none

- development：设置 `process.env.NODE_ENV` 的值为 `development`。开启 `NamedChunksPlugin` 和 `NamedModulesPlugin`。
- production: 设置 `process.env.NODE_ENV` 的值为 `production`。开启 `FlagDependencyUsagePlugin`, `FloagIncludedChunksPlugin`,`ModuleConcatenationPlugin`,`NoEmitOnErrorsPlugin`,`OccurrenceOrderPlugin`,`SideEffectsFlagPlugin` 和 `TerserPlugin`。
- none: 不开启任何设置