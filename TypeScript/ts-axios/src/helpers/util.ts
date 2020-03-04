// 缓存一下方法, 方便调用
const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  // 判断类型
  // return Object.prototype.toString.call(val) === '[object Date]'
  return toString.call(val) === '[object Date]'
}

// 判断 Object
export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}
