
import * as types from '../mutation-types'
import io from '../../lib/io'
import storage from '../../lib/storage'


const state = {
    dataObj:{},
    dataDetail:{}
}

// getters
const getters = {
    // courseObj:state=>state.courseObj
}

// mutations
const mutations = {
    [types.GET_DATA](state,data){
        state.dataObj=data
    },
    [types.GET_DATA_DETAIL](state,data){
        state.dataDetail=data
    },
}

// actions
const actions = {
    // 讲次列表
  async findBaseMaterial({ dispatch, commit }, opt) {
    let { data } = await io.post6(io.findBaseMaterial, opt)
    if (data.success) {
      commit(types.GET_DATA,data.data)
    }
  },
  async getBaseMaterial({ dispatch, commit }, opt) {
    let { data } = await io.post6(io.getBaseMaterial, opt)
    if (data.success) {
      commit(types.GET_DATA_DETAIL,data.data)
    }
  },
  
  
}

export default {
  state,
  getters,
  actions,
  mutations
}
