
import * as types from '../mutation-types'
import io from '../../lib/io'
import storage from '../../lib/storage'


const state = {
    gradeObj:{},
    subjectList:[],
    termObj:{}
}

// getters
const getters = {
}

// mutations
const mutations = {
    [types.GET_GRADE](state,data){
        state.gradeObj=data
    },
    [types.GET_SUBJECT](state,data){
        state.subjectList=data
    },
    [types.GET_TERM](state,data){
        state.termObj=data
    }
}

// actions
const actions = {
    // 年级
  async findBaseSectionPage({ dispatch, commit }, opt) {
    let { data } = await io.post6(io.findBaseSectionPage, opt)
    if (data.success) {
      commit(types.GET_GRADE,data.data)
    }
  },
//   科目
  async findSubjectsData({ dispatch, commit }, opt) {
    let { data } = await io.post6(io.findSubjectsData, opt)
    if (data.success) {
      commit(types.GET_SUBJECT,data.data)
    }
  },
//   学期
  async findBaseTermPage({ dispatch, commit }, opt) {
    let { data } = await io.post6(io.findBaseTermPage, opt)
    if (data.success) {
      commit(types.GET_TERM,data.data)
    }
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
