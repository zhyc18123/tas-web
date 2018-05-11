
import * as types from '../mutation-types'
  import io from '../../lib/io'


const state = {
    tiaojian:'',
    shibie:'',
    suanfa:'',
    juece:''
}

// getters
const getters = {
   tiaojian:state=>state.tiaojian,
   shibie: state => state.shibie,
   suanfa:state=>state.suanfa,
   juece:state=>state.juece,
}

// actions
const actions = {
  changeWrite ({ commit },opt) {
      console.log('change',opt)
      commit(types.CHANGE_WRITE,opt)
   }
}
// mutations
const mutations = {
   [types.CHANGE_WRITE] (state, opt) {
        state[opt.type]=opt.text;
   },

}

export default {
  state,
  getters,
  actions,
  mutations
}