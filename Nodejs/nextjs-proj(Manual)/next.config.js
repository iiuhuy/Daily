// 修改 next 里面的默认配置

const withCSS = require("@zeit/next-css");

if (typeof require !== undefined) {
  // if require 存在
  require.extensions[".css"] = file => {};
}

module.exports = withCSS({
  /* config options here */
});
