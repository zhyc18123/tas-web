
window.UEDITOR_HOME_URL = '/static/ueditor/'
export default {

    // baseApiPath : 'development' == process.env.NODE_ENV ? 'http://172.20.22.137:8080' : 'http://s.yuyou100.com/yyfn-api',
     baseApiPath : 'development' == process.env.NODE_ENV ? 'http://tas.test.yuyou100.com/tas-gateway' : 'http://test.yuyou100.com/trp-api',

  // basePath: 'development' == process.env.NODE_ENV ?
  //  'http://dev.yuyou100.com:7070' : 'http://s.yuyou100.com',

  qiniuCDN: 'http://static.yuyou100.com/',

  qiniuBaseUrl: 'http://upload-z2.qiniup.com/',
  qiniuVideoUrl: 'development' == process.env.NODE_ENV ?'http://test.yuyou100.com/yyfn-api/api/qiniu/upload/video/token' : 'http://b.yuyou100.com/yyfn-api/api/qiniu/upload/video/token',
  qiniuUploadTokenApi:'development' == process.env.NODE_ENV ?
  'http://test.yuyou100.com/yyfn-api/api/qiniu/upload/token':'http://b.yuyou100.com/yyfn-api/api/qiniu/upload/token',
  ofsUrl:'http://ofs.yuyou100.com/',

  hostName: 'development' == process.env.NODE_ENV ? 'http://s.test.yuyou100.com/':'http://s.y.yuyou100.com/',
}



