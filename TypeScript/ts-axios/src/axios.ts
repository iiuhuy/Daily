import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'

// 工厂函数
function createInstance(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)

  // 拷贝到 instance
  extend(instance, context)

  // 需要强制断言为 AxiosInstance
  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
