
import * as types from '../mutation-types'
import io from '../../lib/io'
import storage from '../../lib/storage'


const state = {
    schoolObj:{}
}

// getters
const getters = {
    // courseObj:state=>state.courseObj
}

// mutations
const mutations = {
    [types.GET_SCHOOL](state,data){
        state.schoolObj=data
    },
}

// actions
const actions = {
    // 课程列表
  async findBaseSchoolPage({ dispatch, commit }, opt) {
    let { data } = await io.post6(io.findBaseSchoolPage, opt)
    if (data.success) {
      commit(types.GET_SCHOOL,data.data)
    }
  },
  
}

export default {
  state,
  getters,
  actions,
  mutations
}
