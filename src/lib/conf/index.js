

window.UEDITOR_HOME_URL = '/static/ueditor/'


export default {


  baseApiPath : 'development' == process.env.NODE_ENV ? 'http://test.yuyou100.com/yyfn-api' : 'http://test.yuyou100.com/yyfn-api',

  // baseApiPath : 'development' == process.env.NODE_ENV ? 'http://localhost:8080/yyfn-api' : 'http://118.89.53.121/yyfn-api',

  basePath : 'development' == process.env.NODE_ENV ? 'http://dev.yuyou100.com:7070' : 'http://test.yuyou100.com',
  qiniuCDN : 'http://static.yuyou100.com/',
  qiniuUploadTokenApi: 'http://test.yuyou100.com/yyfn-api/api/qiniu/upload/token'

}


/**


//prod

export default {
  baseApiPath : 'http://119.29.5.64/yyfn-api',
  basePath : 'http://b.yuyou100.com',
  qiniuCDN : 'http://static.yuyou100.com/',
  qiniuUploadTokenApi: 'http://119.29.5.64/yyfn-api/api/qiniu/upload/token'
}
 */

/*
export default {

  baseApiPath : 'development' == process.env.NODE_ENV ? 'http://test.yuyou100.com/yyfn-api' : 'http://test.yuyou100.com/yyfn-api',
  basePath : 'development' == process.env.NODE_ENV ? 'http://dev.yuyou100.com:7070' : 'http://test.yuyou100.com',
  qiniuCDN : 'http://static.yuyou100.com/',
  qiniuUploadTokenApi: 'http://test.yuyou100.com/yyfn-api/api/qiniu/upload/token'

}*/
