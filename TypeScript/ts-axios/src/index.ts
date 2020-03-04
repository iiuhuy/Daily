import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'

function axios(config: AxiosRequestConfig): void {
  // TODO
  processConfig(config) // ①.首先处理 config
  xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
}

// ②.使用 transformURL 方法处理. 内部调用工具方法
function transformURL(config: AxiosRequestConfig): string {
  // 通过结构赋值拿到 url 和 params
  const { url, params } = config
  return buildURL(url, params)
}
export default axios
