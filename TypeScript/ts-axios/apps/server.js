const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(WebpackConfig)

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: '/__build__/',
    stats: {
      colors: true,
      chunks: false
    }
  })
)

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json()) // 解析发送过来的 request body
app.use(bodyParser.urlencoded({ extended: true }))

// 请求发送
const router = express.Router()

// --- 针对性的做函数封装 --- //
registerSimpleRouter()

registerBaseRouter()

registerErrorRouter()

registerExtendRouter()

registerInterceptorRouter()

// router.get('/simple/get', function(req, res) {
//   res.json({
//     msg: 'Hello Express'
//   })
// })

// // 处理参数 demo 接口
// router.get('/base/get', function(req, res) {
//   res.json(req.query)
// })

// // ----- body ----- //
// router.post('/base/post', function(req, res) {
//   res.json(req.body)
//   // console.log(res.json(req.body))
// })
// router.post('/base/buffer', function(req, res) {
//   let msg = []
//   req.on('data', chunks => {
//     if (chunks) {
//       msg.push(chunks)
//     }
//   })
//   req.on('end', () => {
//     let buf = Buffer.concat(msg)
//     res.json(buf.toJSON())
//   })
//   // console.log(res.json(req.body))
// })

// router.get('/error/get', function(req, res) {
//   if (Math.random() > 0.5) {
//     res.json({
//       msg: `hello world`
//     })
//   } else {
//     res.status(500)
//     res.end()
//   }
// })

// router.get('/error/timeout', function(req, res) {
//   setTimeout(() => {
//     res.json({
//       msg: `hello world`
//     })
//   }, 3000)
// })

app.use(router)

const port = process.env.PORT || 8084
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})

function registerSimpleRouter() {
  router.get('/simple/get', function(req, res) {
    res.json({
      msg: 'Hello ExpregisterBaseRouterress'
    })
  })
}

function registerBaseRouter() {
  router.get('/base/get', function(req, res) {
    res.json(req.query)
  })

  // ----- body ----- //
  router.post('/base/post', function(req, res) {
    res.json(req.body)
    // console.log(res.json(req.body))
  })
  router.post('/base/buffer', function(req, res) {
    let msg = []
    req.on('data', chunks => {
      if (chunks) {
        msg.push(chunks)
      }
    })
    req.on('end', () => {
      let buf = Buffer.concat(msg)
      res.json(buf.toJSON())
    })
    // console.log(res.json(req.body))
  })
}

function registerErrorRouter() {
  router.get('/error/get', function(req, res) {
    if (Math.random() > 0.5) {
      res.json({
        msg: `hello world`
      })
    } else {
      res.status(500)
      res.end()
    }
  })

  router.get('/error/timeout', function(req, res) {
    setTimeout(() => {
      res.json({
        msg: `hello world`
      })
    }, 3000)
  })
}

function registerExtendRouter() {
  router.get('/extend/get', function(req, res) {
    res.json({
      msg: 'Hello Express'
    })
  })

  router.options('/extend/options', function(req, res) {
    res.end()
  })

  router.delete('/extend/delete', function(req, res) {
    res.end()
  })

  router.head('/extend/head', function(req, res) {
    res.end()
  })

  router.post('/extend/post', function(req, res) {
    res.json(req.body)
  })

  router.put('/extend/put', function(req, res) {
    res.json(req.body)
  })

  router.patch('/extend/patch', function(req, res) {
    res.json(req.body)
  })

  router.get('/extend/user', function(req, res) {
    res.json({
      code: 0,
      message: 'ok',
      result: {
        name: 'jack',
        age: 18
      }
    })
  })
}

// 注册拦截器的接口
function registerInterceptorRouter() {
  router.get('/interceptor/get', function(req, res) {
    res.end('hello interceptor...')
  })
}
