import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { parseHeaders } from './helpers/headers'
import { createError } from './helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    // 请求时间超时
    if (timeout) {
      request.timeout = timeout
    }

    request.open(method.toUpperCase(), url, true) // true -> 同步还是异步

    // ajax 的知识
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      // 处理非 200 状态码
      if (request.status === 0) {
        return
      }

      // 对 headers 进行一层解析 parseHeaders -> 变成对象
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData =
        responseType && responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      // resolve(response)
      handleResponse(response)
    }

    request.onerror = function handleError() {
      reject(createError('Network Error!', config, null, request))
    }

    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
    }

    Object.keys(headers).forEach(name => {
      // 多加一层判断: 假设 data 为 null, 不设置 content-type
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)

    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `请求失败: status code is ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
