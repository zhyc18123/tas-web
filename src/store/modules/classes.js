
import * as types from '../mutation-types'
import io from '../../lib/io'
import storage from '../../lib/storage'


const state = {
    classObj:{},
    classDetail:{},
    classChapterList:[]
}

// getters
const getters = {
    // courseObj:state=>state.courseObj
}

// mutations
const mutations = {
    [types.GET_CLASS](state,data){
        state.classObj=data
    },
    [types.GET_CLASS_DETAIL](state,data){
        state.classDetail=data
    },
    [types.GET_CLASS_CHAPTER](state,data){
        state.classChapterList=data
    },
}

// actions
const actions = {
    // 班级列表
  async findClassPage({ dispatch, commit }, opt) {
    let { data } = await io.post6(io.findClassPage, opt)
    if (data.success) {
      commit(types.GET_CLASS,data.data)
    }
  },
  async classDetail({ dispatch, commit }, opt) {
    let { data } = await io.post6(io.classDetail, opt)
    if (data.success) {
      commit(types.GET_CLASS_DETAIL,data.data)
    }
  },
  async lessonClassPlanChapterList({ dispatch, commit }, opt) {
    let { data } = await io.post6(io.lessonClassPlanChapterList, opt)
    if (data.success) {
      commit(types.GET_CLASS_CHAPTER,data.data)
    }
  },
  
}

export default {
  state,
  getters,
  actions,
  mutations
}
