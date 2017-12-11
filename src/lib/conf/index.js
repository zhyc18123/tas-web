import prod from './index_prod'
import test from './index_test'
window.UEDITOR_HOME_URL = '/static/ueditor/'

export default 'development' == process.env.NODE_ENV ? test : prod
