import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/headers'

function axios(config: AxiosRequestConfig): AxiosPromise {
  // TODO
  processConfig(config) // ①.首先处理 config
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  // 处理 url
  config.url = transformURL(config)
  // 先处理 headers
  config.headers = transformHeaders(config) // 因为 data 会转换成字符串, 那么之后就不是普通对象
  // 处理 data
  config.data = transformRequestData(config)
}

// ②.使用 transformURL 方法处理. 内部调用工具方法
function transformURL(config: AxiosRequestConfig): string {
  // 通过结构赋值拿到 url 和 params
  const { url, params } = config
  return buildURL(url, params)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig): string {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

// 响应 data 处理函数
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
export default axios
