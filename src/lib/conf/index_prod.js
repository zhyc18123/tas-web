
window.UEDITOR_HOME_URL = '/static/ueditor/'



window.UEDITOR_HOME_URL = '/static/ueditor/'
export default {

  baseApiPath : 'http://work.yuyou100.com/tas-gateway',
  basePath : 'http://work.yuyou100.com',
  qiniuCDN: 'http://static.yuyou100.com/',
  qiniuBaseUrl: 'http://upload-z2.qiniup.com/',
  qiniuVideoUrl: 'development' == process.env.NODE_ENV ?'http://test.yuyou100.com/yyfn-api/api/qiniu/upload/video/token' : 'http://b.yuyou100.com/yyfn-api/api/qiniu/upload/video/token',
  qiniuUploadTokenApi:'development' == process.env.NODE_ENV ?
  'http://test.yuyou100.com/yyfn-api/api/qiniu/upload/token':'http://b.yuyou100.com/yyfn-api/api/qiniu/upload/token',
  ofsUrl:'http://ofs.yuyou100.com/',

  hostName: 'development' == process.env.NODE_ENV ? 'http://s.test.yuyou100.com/':'http://s.y.yuyou100.com/',
}





