import { isPlainObject } from './util'

function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }
  // 做一次转换, 将 content-type 小写的改为首字母大写的
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  // 1.先做一次首字母大写的转换
  normalizeHeaderName(headers, 'Content-Type')
  // 2.判断 data 是否为普通对象
  if (isPlainObject(data)) {
    // 由于 headers Content-Type 大小写的原因, 需要做一层规范化
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers // 没有返回
}
