
import * as types from '../mutation-types'
import io from '../../lib/io'
import storage from '../../lib/storage'


const state = {
    gradeObj:{},
    subjectList:[],
    termObj:{},
    levelObj:{},
    yearList:[],
    materList:[]
}

// getters
const getters = {
}

// mutations
const mutations = {
    [types.GET_LEVEL](state,data){
        state.levelObj=data
    },
    [types.GET_GRADE](state,data){
        state.gradeObj=data
    },
    [types.GET_SUBJECT](state,data){
        state.subjectList=data
    },
    [types.GET_TERM](state,data){
        state.termObj=data
    },
    [types.GET_YEAR](state,data){
        state.yearList=data
    },
    [types.GET_MATER](state,data){
        state.materList=data
    }
}

// actions
const actions = {
    // 教材版本
  async findMaterialData({ dispatch, commit }, opt) {
    let { data } = await io.post6(io.findMaterialData, opt)
    if (data.success) {
      commit(types.GET_MATER,data.data)
    }
  },
    // 年份
  async findYearsData({ dispatch, commit }, opt) {
    let { data } = await io.post6(io.findYearsData, opt)
    if (data.success) {
      commit(types.GET_YEAR,data.data)
    }
  },
    // 层级
  async findBaseLevelPage({ dispatch, commit }, opt) {
    let { data } = await io.post6(io.findBaseLevelPage, opt)
    if (data.success) {
      commit(types.GET_LEVEL,data.data)
    }
  },
    
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
