
import * as types from '../mutation-types'
import io from '../../lib/io'
import storage from '../../lib/storage'


const state = {
    token:'',
}

// getters
const getters = {
    // courseObj:state=>state.courseObj
}

// mutations
const mutations = {
    [types.GET_TOKEN](state,data){
        state.token=data
    },
}

// actions
const actions = {
    // 课程列表
  async view({ dispatch, commit }, opt) {
    let { data } = await io.post6(io.view, opt)
    if (data.success) {
      commit(types.GET_TOKEN,data.data.token)
    }
  },
  async edit({ dispatch, commit }, opt) {
    let { data } = await io.post6(io.edit, opt)
    if (data.success) {
      commit(types.GET_TOKEN,data.data.token)
    }
  },
  async download({ dispatch, commit }, opt) {
    let { data } = await io.post6(io.download, opt)
    if (data.success) {
      commit(types.GET_TOKEN,data.data.token)
    }
  },
  async del({ dispatch, commit }, opt) {
    let { data } = await io.post6(io.del, opt)
    if (data.success) {
      commit(types.GET_TOKEN,data.data.token)
    }
  },
  
}

export default {
  state,
  getters,
  actions,
  mutations
}
