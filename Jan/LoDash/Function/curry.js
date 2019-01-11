// 在《JS 函数式编程指南》中的柯里化（curry）中使用到了curry 方法

// 加载所有构建。
var _ = require('lodash');

// 加载核心构建。
// var _ = require('lodash/core');

// -------------------------------------------- //

/**
 *   _.curry(func, [arity=func.length])
 * 创建一个函数，该函数接收一个或多个 func 的参数。 当该函数被调用时, 如果 func 所需要传递的所有参数都被提供，则直接返回 func 所执行的结果。 否则继续返回该函数并等待接收剩余的参数。 可以使用 func.length 强制需要累积的参数个数。 
 * 参数：
 *    1.fun(Function)，需要 curry 的参数数量
 *    2.[arity=func.length](number)，需要提供给 func 的参数
 * 返回值(Function)：返回 curry 后的函数
 */

// demo
var abc = function (a, b, c) {
  return [a, b, c]
}

var curried = _.curry(abc)
console.log(curried);

// curried(1)(2)(3);
console.log(curried(1)(2)(3));

// curried(1, 2)(3);
console.log(curried(1, 2)(3));

// curried(1, 2, 3);
console.log(curried(1, 2, 3));

// 使用了占位符 curried(1)(_, 3)(2);
console.log(curried(1)(_, 3)(2));