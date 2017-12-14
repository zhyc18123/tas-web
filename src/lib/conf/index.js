import prod from './index_prod'
import test from './index_test'

export default 'development' == process.env.NODE_ENV ? test : prod
