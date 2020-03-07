import { isPlainObject } from './util'

// 转换函数
export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

// 将字符串自动转换为对象
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    // 不一定是字符串, try catch
    try {
      data = JSON.parse(data)
    } catch (error) {
      console.log(error)
    }
  }
  return data
}
