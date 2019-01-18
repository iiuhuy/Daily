var _ = require('lodash');

/**
 *    `_.throttle(func, [wait=0], [options])`
 * 创建一个节流函数。 http://lodash.think2011.net/throttle
 * 参数：
 *    1.`func (Function)`,要节流的函数
 *    2.`[wait=0] (number)`,需要节流的毫秒
 *    3.`[options] (Object)`,选项对象
 *    4.`[options.leading=true] (boolean)`,指定调用在节流开始前
 *    6.`[options.trailing=true] (boolean)`,指定调用在节流结束后
 * 返回值(Function)：返回 节流 的函数
 */

// 避免在滚动时过分的更新定位
jQuery(window).on('scroll', _.throttle(updatePosition, 100));

// 点击后就调用 `renewToken`，但5分钟内超过1次。
var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
jQuery(element).on('click', throttled);

// 取消一个 trailing 的节流调用
jQuery(window).on('popstate', throttled.cancel);