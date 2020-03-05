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

router.get('/simple/get', function(req, res) {
  res.json({
    msg: 'Hello Express'
  })
})

// 处理参数 demo 接口
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

app.use(router)

const port = process.env.PORT || 8084
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})
