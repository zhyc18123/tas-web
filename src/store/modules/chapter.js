
import * as types from '../mutation-types'
import io from '../../lib/io'
import storage from '../../lib/storage'


const state = {
    chapterObj:{},
    chapterDetail:{}
}

// getters
const getters = {
    // courseObj:state=>state.courseObj
}

// mutations
const mutations = {
    [types.GET_CHAPTER](state,data){
        state.chapterObj=data
    },
    [types.GET_CHAPTER_DETAIL](state,data){
        state.chapterDetail=data
    },
}

// actions
const actions = {
    // 讲次列表
  async findBaseChapterPage({ dispatch, commit }, opt) {
    let { data } = await io.post6(io.findBaseChapterPage, opt)
    if (data.success) {
      commit(types.GET_CHAPTER,data.data)
    }
  },
  async getBaseChapter({ dispatch, commit }, opt) {
    let { data } = await io.post6(io.getBaseChapter, opt)
    if (data.success) {
      commit(types.GET_CHAPTER_DETAIL,data.data)
    }
  },
  
  
}

export default {
  state,
  getters,
  actions,
  mutations
}
