
import * as types from '../mutation-types'
import io from '../../lib/io'


const state = {
  characterList:[],
  form: {
    userId : "",
    username : "",
    name : "",
    phoneNo : "",
    idNo : "",
    teachGradeIds : [],
    teachSubjectIds : [],
    status : 1,
    jobStatus : 1,
    jobNature : 1,
    level : 1,
  },
  characterListTotal: 0,
  saveOrUpdateCharacterSuccess: false,
  deleteCharacterSuccess: false,
  character:{}
}

const getters = {
  characterList:state=>state.characterList,
  form:state=>state.form,
  characterListTotal:state=>state.characterListTotal,
  saveOrUpdateCharacterSuccess:state=>state.saveOrUpdateCharacterSuccess,
  deleteCharacterSuccess:state=>state.deleteCharacterSuccess,
  character:state=>state.character
}

const mutations = {
  [types.GET_CHARACTER_LIST](state, data) {
    data.list.push({add: true})
    state.characterList = data.list;
    state.characterListTotal = parseInt(data.total);
    state.character=data;
  },
  [types.GET_CHARACTER_DETAIL](state, data) {
    data.teachGradeIds = data.teachGradeIds === null || !data.teachGradeIds ?  [] : data.teachGradeIds.split(',')
    data.teachSubjectIds = data.teachSubjectIds === null || !data.teachSubjectIds ?  [] : data.teachSubjectIds.split(',')
    data.status = parseInt(data.status)
    data.jobStatus = parseInt(data.jobStatus)
    data.jobNature = parseInt(data.jobNature)
    data.level = parseInt(data.level)
    state.form = data;
  },
  [types.CHANGE_INPUT](state,opt){
    state.form[opt.key] = opt.value;
  },
  [types.DELETE_CHARACTER](state,opt){
    state.deleteCharacterSuccess = true;
  },
  [types.RESET_FORM](state,opt){
    state.form = {
      userId : "",
      username : "",
      name : "",
      phoneNo : "",
      idNo : "",
      teachGradeIds : [],
      teachSubjectIds : [],
      status : 1,
      jobStatus : 1,
      jobNature : 1,
      level : 1,
    }
  },
  [types.SAVE_OR_UPDATE_CHARACTER](state, data) {
    state.saveOrUpdateCharacterSuccess = true
    state.form = {
      userId : "",
      username : "",
      name : "",
      phoneNo : "",
      idNo : "",
      teachGradeIds : [],
      teachSubjectIds : [],
      status : 1,
      jobStatus : 1,
      jobNature : 1,
      level : 1,
    }
  },
}

const actions = {
  getCharacterList({ commit },opt) {
    io.post(io.userRoleList, opt, (data) => {
      commit(types.GET_CHARACTER_LIST, data)
    })
  },
  getCharacterDetail({ commit },opt) {
    io.post(io.userDetail, opt, (data) => {
      commit(types.GET_CHARACTER_DETAIL, data)
    })
  },
  saveOrUpdateCharacter({ commit },opt) {
    let data = Object.assign({}, opt)
    data.teachGradeIds = data.teachGradeIds.join(',')
    data.teachSubjectIds = data.teachSubjectIds.join(',')
    io.post(io.saveOrUpdateCharacter, data, (data) => {
      commit(types.SAVE_OR_UPDATE_CHARACTER, data)
    })
  },
  deleteCharacter({dispatch,commit},opt) {
    io.post(io.delCharacter, opt, (data) => {
      commit(types.DELETE_CHARACTER, data)
      dispatch('getCharacterList')
    })
  },
  inputChange({dispatch,commit},opt){
    commit(types.CHANGE_INPUT,opt)
  },
  resetForm({dispatch,commit},opt){
    commit(types.RESET_FORM,opt)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
