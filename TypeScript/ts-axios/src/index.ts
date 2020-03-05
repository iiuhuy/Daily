import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'

function axios(config: AxiosRequestConfig): void {
  // TODO
  processConfig(config) // ①.首先处理 config
  xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  // 处理 url
  config.url = transformURL(config)
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

export default axios
