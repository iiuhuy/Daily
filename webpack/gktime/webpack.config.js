"use strict";

const path = require("path");

module.exports = {
  // entry: "./src/index.js", // 单入口
  entry: {
    index: "./src/index.js",
    search: "./src/search.js"
  },
  output: {
    path: path.join(__dirname, "dist"),
    // filename: "bundle.js" // 单入口 output 的 filename 是写死的, 多入口需使用占位符进行区分
    filename: "[name].js"
  },
  mode: "production"
};
