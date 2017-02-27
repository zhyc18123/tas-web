

window.UEDITOR_HOME_URL = '/static/ueditor/'

export default {

  baseApiPath : 'development' == process.env.NODE_ENV ? 'http://localhost:8080' : 'http://localhost:8080',
  qiniuCDN : 'http://7xwcmb.com1.z0.glb.clouddn.com/',
  qiniuUploadTokenApi: 'http://demo.cc.zy.com/ykt-api/api/qiniu/upload/token'

}
