// 加载所有构建。
var _ = require('lodash');

// 加载核心构建。
// var _ = require('lodash/core');

// -------------------------------------------- //

/**
 *   _.times(n, [iteratee=_.identity])
 * 调用 iteratee N 次，每次调用返回的结果存入到数组中。 iteratee 会传入 1 个参数：(index)。
 * 参数：
 *    1.n(number) 要调用 iteratee 的次数
 *    2.[iteratee=_.identity] (Function) 这个函数会处理每一个元素
 * 返回值(Array)：返回调用结果的数组
 */



console.log('------- javascript -------');
//js原生的循环方法
for (var i = 0; i < 5; i++) {
  console.log(i);
}
console.log('------- lodash -------');
//ladash的times方法
_.times(5, function (a) {
  console.log(a);
});

console.log(_.times(3, String));

console.log(_.times(4, _.constant(true)));