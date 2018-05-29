
import * as types from '../mutation-types'
import io from '../../lib/io'
import storage from '../../lib/storage'


const state = {
    courseObj:{}
}

// getters
const getters = {
    // courseObj:state=>state.courseObj
}

// mutations
const mutations = {
    [types.GET_COURSE](state,data){
        state.courseObj=data
    },
}

// actions
const actions = {
    // 课程列表
  async findLessonPage({ dispatch, commit }, opt) {
    let { data } = await io.post6(io.findLessonPage, opt)
    if (data.success) {
      commit(types.GET_COURSE,data.data)
    }
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
