# 学习计划

「前端一起学」2 月制定的学习计划：

- 极客时间「重学前端」专栏，持续学习；
- CSS 练习，也算是日常积累的练习了；
- js 书籍 & 小程序踩坑笔记。

## 极客时间「重学前端专栏」

笔记参考: [「重学前端」笔记](https://github.com/AlvinMi/2019-Daily/blob/master/Jan%26Feb/%E6%9E%81%E5%AE%A2%E6%97%B6%E9%97%B4-%E9%87%8D%E5%AD%A6%E5%89%8D%E7%AB%AF/%E9%87%8D%E5%AD%A6%E5%89%8D%E7%AB%AF%E7%AE%80%E4%BB%8B.md)

整理出了课程中提到的概念，和一些自己不知道的概念，还有一些问答题。

## CSS 练习，也算是日常积累的练习了

目前写了基础的几篇。

创建了 [「CSS-Track」](https://alvinmi.github.io/CSS-Track/#/)。以后平时积累的例子可以放在这里。方便查询和复习。

在学习过程中发现了 [Yuan Chuan](https://yuanchuan.name/)，写的样式还挺好看的。

## js 书籍 & 小程序踩坑笔记

- 书籍 「你不知道道 JS」，算看到一半吧，看书时候没做笔记；(后面继续完成)。
- 小程序踩坑。

### 小程序踩坑

注册账号 -> 去往开发设置开发者 ID(AppID、AppSecret)，服务器域名(一个月只能修改 5 次)。

下载微信开发者工具就能上手开发：

- 小程序开发者工具：https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
- Linux 下：[微信开发者工具 (微信小程序) linux 完美支持](https://github.com/cytle/wechat_web_devtools)
- VSCode 小程序开发插件：小程序助手、微信小程序 wxml 格式化以及高亮

使用原生写的，暂未使用框架，小程序开发基础：

配置 HTTPS 服务器，需要服务器、域名、SSL 证书，自己动手配置的话，要学习一下 nginx 怎么配置。

由于小程序发起的是 https 请求，必须配置 https 服务器，获取证书，证书安装可以查看(https://cloud.tencent.com/document/product/400/4143)。

#### 数据驱动

微信小程序是数据驱动模型，页面加载时，data 将会以 JSON 字符串的形式由逻辑层传至渲染层，因此 data 中的数据必须是可以转成 JSON 的类型：字符串，数字，布尔值，对象，数组。

> 注意：小程序不支持复杂的表达式，目前支持简单的三元、加减和逻辑判断。

生命周期回调函数：

```js
// pages/test.js
Page({
  // 页面的初始数据
  data: {},

  // 生命周期函数--监听页面加载
  onLoad: function(options) {},

  // 生命周期函数--监听页面初次渲染完成
  onReady: function() {},

  // 生命周期函数--监听页面显示
  onShow: function() {},

  // 生命周期函数--监听页面隐藏
  onHide: function() {},

  // 生命周期函数--监听页面卸载
  onUnload: function() {},

  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function() {},

  // 页面上拉触底事件的处理函数
  onReachBottom: function() {},

  // 用户点击右上角分享
  onShareAppMessage: function() {}
});
```

#### 坑点

- 问题：小程序包大小限制最大 8M
- 解决方法：小程序支持分包加载，整个小程序所有分包大小不超过 8M，单个分包 / 主包大小不能超过 2M。对于 8M 以上的需求，可以考虑将部分功能使用 H5 实现，使用 webview 进行加载，或者上传到 CDN，例如免费的 七牛 CDN。

- 问题：在某些 android 机型上 1rpx 无法显示
- 解决：小程序布局自适应像素单位 rpx，对于 1rpx 显示问题可以使用 1px 替换 1rpx 进行显示。

参考：[微信小程序踩坑集合](http://wechat.twindy.org/)。

### 小程序支付

需要注意微信支付的概念：

- 第一点。所有支付的第一步都是请求统一下单，统一下单，统一下单(官网已经说明**都需要先获取到 Openid，调用相同的 API**)。配合官网的微信支付接口签名校验工具，检测调用 **微信支付接口 API** 时发送的请求参数中生成的签名是否正确，提交相关信息后可获得签名校验结果。签名正确了就 OK 了。

- 第二点。微信支付普通商户一共 6 种支付方式，[请查看开发文档](https://pay.weixin.qq.com/wiki/doc/api/index.html)。可以看到境内普通商户 6 种支付方式分别为付款码支付、JSAPI 支付、Native 支付、APP 支付、H5 支付、小程序支付。

小程序如何调起微信支付？

小程序调起微信支付，用的是小程序微信支付接口 `requestPayment`，该接口详细描述可以查看[小程序的微信支付 API](https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_3&index=1)。

这个接口中的 `package` 和 `timeStamp` 参数是从开发者的第三方服务器返回的，package 是第三方服务器从统一下单接口回复中获得。

参考：微信支付部门人的专栏——从零接入小程序支付：https://zhuanlan.zhihu.com/p/23594164

- 微信小程序开发资料：[awesome-wechat-weapp](https://github.com/justjavac/awesome-wechat-weapp)

> 最后，小伙伴的们的学习计划也是不错。找个时间看看大家的笔记、学习方法、奇技淫巧。