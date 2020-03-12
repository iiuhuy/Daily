// 缓存一下方法, 方便调用
const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  // 判断类型
  // return Object.prototype.toString.call(val) === '[object Date]'
  return toString.call(val) === '[object Date]'
}

// 判断 Object
// export function isObject(val: any): val is Object {
//   return val !== null && typeof val === 'object'
// }

// 判断普通对象: 很多开源库里也有
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

// 辅助函数做拷贝用-实现混合对象
// 涉及 TS 基础知识 交叉类型
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
