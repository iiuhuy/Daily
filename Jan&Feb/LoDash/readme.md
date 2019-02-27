# Lodash 相关

网站：

- https://lodash.com/
- https://www.lodashjs.com/
- [JS 函数式编程指南](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/)

首先要明白的是 lodash 的所有函数都不会在原有的数据上进行操作，而是复制出一个新的数据而不改变原有数据。类似 `immutable.js` 的理念去处理。内部封装了很多字符串、数组、对象等常见数据类型的处理函数。

lodash 使用了很简单的符号 `_`，就像 jQuery 的 `$` 一样，还有很多类似的，就不多解释了，遇到了就要学。

支持大部分浏览器，在 Lodash 中，函数的实现非常严谨、高效、兼容性强，以及具有一定的前瞻性，强力建议去撸源码 ...

## 安装

浏览器：

```html
<!-- 直接下载食用 -->
<script src="lodash.js"></script>
```

通过 npm：

```zsh
$ npm i -g npm
$ npm i --save lodash
```

Node.js：

```js
// Load the full build.
var _ = require("lodash");
// Load the core build.
var _ = require("lodash/core");
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require("lodash/fp");

// Load method categories.
var array = require("lodash/array");
var object = require("lodash/fp/object");

// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
var at = require("lodash/at");
var curryN = require("lodash/fp/curryN");
```

注意：

Install [n\_](https://www.npmjs.com/package/n_) for Lodash use in the Node.js < 6 REPL.

## 其他链接

- https://zouzeir.xyz/2017/04/21/Lodash-%E5%AD%A6%E4%B9%A0-%E5%85%A5%E9%97%A8/
- [Lodash 源码中的那些迷人细节](https://zhuanlan.zhihu.com/p/32823459)
- https://mrhuang87.github.io/2017/11/26/node-learning-lodash-util/
- 源码学习：https://github.com/giscafer/lodash-sourcecode-study


## 常用的方法

- 1.`_.times(_.times(number,function))`
- 2.`_.filter(array,fucntion(item){return // 判断条件})`
- 3.`_.reject(array,function(item){return // 判断条件})`
- 4.`_.remove(array,function(item){return // 判断条件})`
- 5.`_.omit(obj,arr)`
- 6.`_.pick(obg,function(item){})`
- 7.`_.random(min,max,floating)`
- 8.`_.map(Collection,functoion||string)`
- 9.`_.each(Collection,function(value,(key)){})`