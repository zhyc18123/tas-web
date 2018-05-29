import Vue from 'vue'
import Vuex from 'vuex'

 import course from './modules/course'
// import writeAnswer from './modules/write-answer'
// import questionBank from './modules/question-bank'
// import createQuestion from './modules/create-question'
// import knowledgeTree from './modules/knowledge-tree'
// import userList from './modules/user-list'
// import characterList from './modules/character-list'
import global from './modules/global'
import condition from './modules/condition'
import createLogger from '../lib/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    course,
    // writeAnswer,
    // questionBank,
    // createQuestion,
    // knowledgeTree,
    // userList,
    // characterList,
    global,
    condition
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
