import Vue from 'vue'
import Vuex from 'vuex'

 import course from './modules/course'
import chapter from './modules/chapter'
import office from './modules/office'
import data from './modules/data'
import global from './modules/global'
import condition from './modules/condition'
import createLogger from '../lib/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    course,
    chapter,
    office,
    data,
    global,
    condition
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
