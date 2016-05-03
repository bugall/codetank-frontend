var express = require('express')
var bodyParser=require('body-parser')
var rewrite = require('express-urlrewrite')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var WebpackConfig = require('./webpack.config')

var app = express()

app.use(webpackDevMiddleware(webpack(WebpackConfig), {
  publicPath: '/_build_/',
  stats: {
    colors: true
  }
}))

var fs = require('fs')
var path = require('path')


app.use(express.static(__dirname))
app.use(rewrite('/index.html'))


app.listen(3000, function () {
  console.log('Server listening on http://localhost:3000, Ctrl+C to stop')
})
