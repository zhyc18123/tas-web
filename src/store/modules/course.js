
import * as types from '../mutation-types'
import io from '../../lib/io'
import storage from '../../lib/storage'


const state = {
    courseObj:{},
    courseDetail:{},
    courseChapterObj:{}
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
    [types.GET_COURSE_DETAIL](state,data){
        state.courseDetail=data
    },
    [types.GET_COURSE_CHAPTER](state,data){
        state.courseChapterObj=data
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
  async detailLesson({ dispatch, commit }, opt) {
    let { data } = await io.post6(io.detailLesson, opt)
    if (data.success) {
      commit(types.GET_COURSE_DETAIL,data.data)
    }
  },
  async findLesChapterPage({ dispatch, commit }, opt) {
    let { data } = await io.post6(io.findLesChapterPage, opt)
    if (data.success) {
      commit(types.GET_COURSE_CHAPTER,data.data)
    }
  },
  
}

export default {
  state,
  getters,
  actions,
  mutations
}
