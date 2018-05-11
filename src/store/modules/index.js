
import * as types from '../mutation-types'
  import io from '../../lib/io'


const state = {
      goodsList: [],
      indexPicture: [],
      serviceLeaseProductList: [],
}

// getters
const getters = {
   goodsList:state=>state.goodsList,
   indexPicture: state => state.indexPicture,
   serviceLeaseProductList:state=>state.serviceLeaseProductList
}

// actions
const actions = {
  getIndexData ({ commit }) {
        io.get(io.indexData,{}, (data)=> {
              commit(types.GET_INDEX,data)
        })
  }
}
// mutations
const mutations = {
  [types.GET_INDEX] (state, data ) {
     state.goodsList = data.goodsList;
     state.indexPicture=data.indexPicture;
     state.serviceLeaseProductList=data.serviceLeaseProductList
  },

//   [types.ADD_TO_CART] (state, { id }) {
//     state.all.find(p => p.id === id).inventory--
//   }
}

export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations
}
