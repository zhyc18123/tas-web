

window.UEDITOR_HOME_URL = '/static/ueditor/'

/*export default {

  baseApiPath : 'development' == process.env.NODE_ENV ? 'http://localhost:8080' : 'http://localhost:8080',
  basePath : 'development' == process.env.NODE_ENV ? 'http://dev.yuyou100.com:7070' : 'http://localhost:7070',
  qiniuCDN : 'http://onb2fl9k5.bkt.clouddn.com/',
  qiniuUploadTokenApi: 'http://test.yuyou100.com/yyfn-api/api/qiniu/upload/token'

}*/

export default {

  baseApiPath : 'development' == process.env.NODE_ENV ? 'http://test.yuyou100.com/yyfn-api' : 'http://test.yuyou100.com/yyfn-api',
  basePath : 'development' == process.env.NODE_ENV ? 'http://dev.yuyou100.com:7070' : 'http://test.yuyou100.com',
  qiniuCDN : 'http://onb2fl9k5.bkt.clouddn.com/',
  qiniuUploadTokenApi: 'http://test.yuyou100.com/yyfn-api/api/qiniu/upload/token'

}
