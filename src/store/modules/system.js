
import * as types from '../mutation-types'
import io from '../../lib/io'
import storage from '../../lib/storage'

const state = {
    organList:{},
    organPerson:{},
    
}

// getters
const getters = {
    // courseObj:state=>state.courseObj
}

// mutations
const mutations = {
    [types.GET_ORGAN](state,data){
        state.organList=data
    },
    [types.GET_ORGAN_PERSON](state,data){
        state.organPerson=data
    },
}

// actions
const actions = {
    // 讲次列表
  async findAuthOrgan({ dispatch, commit }, opt) {
    let { data } = await io.post6(io.findAuthOrgan, opt)
    if (data.success) {
      commit(types.GET_ORGAN,data.data)
    }
  },
  async findAuthOrganPerson({ dispatch, commit }, opt) {
    let { data } = await io.post6(io.findAuthOrganPerson, opt)
    console.log(data.data)
    if (data.success) {
      commit(types.GET_ORGAN_PERSON,data.data)
    }
  },
  
  
}

export default {
  state,
  getters,
  actions,
  mutations
}
