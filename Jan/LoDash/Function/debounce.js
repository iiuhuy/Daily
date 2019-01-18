var _ = require('lodash');

/**
 *    `_.debounce(func, [wait=0], [options])`
 * 创建一个防抖动函数。 http://lodash.think2011.net/debounce
 * 参数：
 *    1.`func (Function)`,要防抖动的函数
 *    2.`[wait=0] (number)`,需要延迟的毫秒数
 *    3.`[options] (Object)`,选项对象
 *    4.`[options.leading=false] (boolean)`,设置 func 允许被延迟的最大值
 *    5.`[options.maxWait] (number)`,设置 func 允许被延迟的最大值
 *    6.`[options.trailing=true] (boolean)`,指定调用在延迟结束后
 * 返回值(Function)：返回具有防抖动功能的函数
 */

// 避免窗口在变动时出现昂贵的计算开销。
jQuery(window).on('resize', _.debounce(calculateLayout, 150));

// 当点击时 `sendMail` 随后就被调用。
jQuery(element).on('click', _.debounce(sendMail, 300, {
  'leading': true,
  'trailing': false
}));

// 确保 `batchLog` 调用1次之后，1秒内会被触发。
var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
var source = new EventSource('/stream');
jQuery(source).on('message', debounced);

// 取消一个 trailing 的防抖动调用
jQuery(window).on('popstate', debounced.cancel);
