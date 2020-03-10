import axios, { AxiosError } from '../../src/index'

// 故意请求错误的: 会报错 404
axios({
  method: 'get',
  url: '/error/get1'
})
  .then(res => {
    console.log(res)
  })
  .catch(e => {
    console.log(e)
  })

axios({
  method: 'get',
  url: '/error/get'
})
  .then(res => {
    console.log(res)
  })
  .catch(e => {
    console.log(e)
  })

// 延时请求,可以验证 offline 时候的网络情况
setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get'
  })
    .then(res => {
      console.log(res)
    })
    .catch(e => {
      console.log(e)
    })
}, 5000)

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
})
  .then(res => {
    console.log(res)
  })
  .catch(e => {
    console.log('message:', e.message)
    console.log('config:', e.config)
    console.log('code', e.code)
    console.log('request:', e.request)
    console.log('response:', e.response)
  })
