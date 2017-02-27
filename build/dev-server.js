require('./check-versions')()
var config = require('../config')
if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var opn = require('opn')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')


// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()


var users = [
  {
    userId: 0 ,
    name : '攻城狮1',
    location:'云浮',
    birthday:'1999-09-09',
    age:28,
    sex:1,
    hobby:['香蕉','苹果'],
    phoneNo:'18312421977',
    avatar:'',
    intro:'呵呵,我是地球最闷骚的程序员'
  },
  {
    userId: 1 ,
    name : '攻城狮2',
    location:'云浮',
    birthday:'1999-09-09',
    age:28,
    sex:1,
    hobby:['香蕉','苹果'],
    phoneNo:'18312421977',
    avatar:'',
    intro:'呵呵,我是地球最闷骚的程序员'
  },
  {
    userId: 2 ,
    name : '攻城狮3',
    location:'云浮',
    birthday:'1999-09-09',
    age:28,
    sex:1,
    hobby:['香蕉','苹果'],
    phoneNo:'18312421977',
    avatar:'',
    intro:'呵呵,我是地球最闷骚的程序员'
  },
  {
    userId: 3 ,
    name : '攻城狮4',
    location:'云浮',
    birthday:'1999-09-09',
    age:28,
    sex:1,
    hobby:['香蕉','苹果'],
    phoneNo:'18312421977',
    avatar:'',
    intro:'呵呵,我是地球最闷骚的程序员'
  }

]

app.use('/api', function (req, res) {

  var method  = req.query.method

  console.log(method)


  if(method == 'getUser'){
    var id = req.query.userId ;
    res.jsonp({
      success : true ,
      data : users[id]
    })
  }else if(method == 'saveUser'){
    var u = req.query
    delete u.method
    if(u.userId ){
      users[u.userId]= u ;
    }else{
      u.userId = users.length
      users.push(u)
    }

    res.jsonp({
      success : true
    })
  }else if(method == 'userList'){
    var pageSize = req.query.pageSize
    var pageNo = req.query.pageNo

    var startIndex  = ( (pageNo -1 ) *pageSize )
    var endIndex  = Math.min( pageNo*pageSize, users.length )

    res.jsonp({
      success : true,
      data :{
        total : users.length ,
        pageNo : pageNo,
        pageSize : pageSize ,
        list : users.slice(startIndex,endIndex)
      }
    })
  }else if(method == "login" ){
    var username = req.query.username;
    var password = req.query.password;
    if(username == 'admin' && password == 'e10adc3949ba59abbe56e057f20f883e' /*123456*/){
      res.jsonp({
        success : true
      })
    }else{
      res.jsonp({
        success : false,
        msg :'登录失败'
      })
    }
  }
})

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))



var uri = 'http://localhost:' + port

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
})

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }

  // when env is testing, don't need open it
  if (process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
