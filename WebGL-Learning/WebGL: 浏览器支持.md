# WebGL 浏览器支持

> 译自： https://www.soft8soft.com/webgl-supported-browsers-and-troubleshooting/

这里维护了支持 WebGL 的浏览器列表，并给出建议解决常见的技术问题。

## That is WebGL？

WebGL(Web 图形库) 是一种用于浏览器中渲染交互式 3D 图形的技术。它最突出的特点是可以开箱即用，无需下载和安装任何第三方插件。它应该是可以直接运行的，如果不是这样，请进一步阅读。

<img src="https://raw.githubusercontent.com/AlvinMi/2019-Pic/master/2019/20190624221804.png"/>

在 2011 年，WebGL 技术由 Khronos 联盟标准化，是 3D 图形的领先者， 在主流的浏览器默认启用。

## 浏览器支持

这个时候，并不所有的浏览器都支持。在过去，WebGL 仅由两家浏览器供应商提供，就是 Mozilla 和 Google， 而其他供应商当时不愿意实施最前沿的技术。后来在 Apple 和 Microsoft 加入 3D Web Club 之后才发生巨大的改变，现在几乎所有互联网流量都通过支持 WebGL 的客户端软件，这使得这项技术成为向 40 多亿用户提供交互式 3D 内容的强大而广泛的基础。

<img src="https://raw.githubusercontent.com/AlvinMi/2019-Pic/master/2019/20190624223407.png"/>

对支持 WebGL 的桌面和移动浏览器如下所示。

- Google Chrome: 是第一个在 2011 年引入 3D 支持的浏览器。作为最流行的用户代理，它提供了最先进和快速的 WebGL 实现,更喜欢使用它来获得 3D Web 应用程序的最佳体验。
- Google Chrome Mobile: 在 Android 设备上广泛使用, 也提供了良好的 WebGL 实现，但是与 iOS 版本的 Chrome，仅限于使用与 iOS 默认 Safari 相同的功能，所有装了也什么意义。
- Firefox: 在 Firefox 运行也比较好，只是移动版本由于技术的各种问题，不是那么友好。
- Safari: 苹果电脑默认的浏览器。从 2014 年发布的 OS X Yosemite 开始支持 WebGL。如果使用老的系统，考虑升级系统或者换 Chrome 或者 Firefox。
- Safari iOS: 预装在 iPhone 和 iPad 上。在 2014 年 iOS 8 发布后，对 3D 友好, 然而还是有的功能存在不足，没有选择，升级到最新的 iOS 吧。(逃:)
- Microsoft Edge: 是一款只附带在 Windows 10+ 的新浏览器。最新版的 Edge 支持友好。
- Internet Explorer: 现在被认为是一个遗留的程序，尽管如此，在一些地方仍然存在。只有 version 11 提供了一些实验性的 WebGL 支持，这是相当有限且容易出错的。我们强烈建议不要使用 IE 运行 3D 应用程序。
- UC Browser: 在中国受欢迎， 基于 Chromium， 所有不用太担心。
- Samsung Internet: 预装在三星手机和平板电脑上，也是基于 Chromium。

## WebGL troubleshooting

好了， 现在期待一个 3D 实时渲染时候， 可能会遇到这样的现象 **Your graphics card does not seem to support WebGL**， 显卡看起来不支持 WebGL， 也访问了 [get.webgl.org](https://get.webgl.org/), 但是没有看到旋转的立方体... 尴尬了，WAT!

<img src="https://raw.githubusercontent.com/AlvinMi/2019-Pic/master/2019/20190624231855.png"/>

系统无法处理 WebGL 内容的可能原因包括浏览器、图形驱动程序、操作系统和视频卡的问题。

### 选择一个合适的浏览器

首先，使用支持的浏览器列表中的软件。 确保安装了最新版本。 摆脱 IE11 和类似的垃圾。

### 下载最新的 GPU 驱动(显卡驱动)

喜欢玩游戏的应该知道它是什么，以及为什么要保持更新。任何 WebGL 应用程序也都类似于 3D 游戏的应用程序，所以必须找到显卡供应商(Nvidia, AMD, Intel)并从官网下载安装最新的驱动。

### 更新操作系统

允许操作系统安装最新更新始终是个好主意。 这不仅可以确保您的安全，还可以提供最新的软件和实用功能。 即使现代浏览器在过时的操作系统上启动时也不喜欢。 例如，WebGL 很可能无法在 Windows XP 上运行

### 升级硬件

这是一个更加激进和昂贵的方式来提高您的 3D web 功能。通常，专用显卡(如 GeForce 或 Radeon)比集成显卡(如 Intel)更强大。在移动端，与低端设备相比，排名靠前的手机或平板电脑通常提供更多的性能和功能。

### 覆盖软件渲染列表(只适用于 Chrome 浏览器)

在某些少数的情况下，您的硬件可能会被列入黑名单，并在默认情况下被所谓的软件呈现列表禁用。要将你的 GPU 从这个列表中排除，你可以执行以下步骤：

- 1.在浏览器地址栏输入 `chrome://flags`
- 2.找到 `Override software rendering` 列表选择 `Enabled`
- 3.点击 `Relaunch Now` 按钮，重启浏览器

如下图：

<img src="https://raw.githubusercontent.com/AlvinMi/2019-Pic/master/2019/20190624233140.png"/>

WebGL 2.0 查看: https://www.khronos.org/blog/webgl-2.0-arrives 。访问[该链接 http://toji.github.io/webgl2-particles-2/](http://toji.github.io/webgl2-particles-2/) 就能查看 WebGL 2.

<img src="https://raw.githubusercontent.com/AlvinMi/2019-Pic/master/2019/20190624233402.png"/>

当然可以参考 MDN 官网查询兼容性，还有 Caniuse 查询兼容性。

> https://developer.mozilla.org/en-US/search
> https://caniuse.com/