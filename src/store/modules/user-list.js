
import * as types from '../mutation-types'
import io from '../../lib/io'
import md5 from 'js-md5'


const state = {
  userList:[],
  form: {
    userId : "",
    username : "",
    name : "",
    roleName : "",
    optRoleId: "",
    password: "",
    phoneNo : "",
    idNo : "",
    teachGradeIds : [],
    teachSubjectIds : [],
    status : 1,
    jobStatus : 1,
    jobNature : 1,
    level : 1,
  },
  pageNo:1,
  userListTotal: 0,
  saveOrUpdateUserSuccess: false,
  deleteUserSuccess: false
}

const getters = {
  userList:state=>state.userList,
  form:state=>state.form,
  userListTotal:state=>state.userListTotal,
  saveOrUpdateUserSuccess:state=>state.saveOrUpdateUserSuccess,
  deleteUserSuccess:state=>state.deleteUserSuccess,
}

const mutations = {
  [types.GET_USER_LIST](state, data) {
    state.pageNo=data.pageIndex;
    data.list.push({add: true})
    state.userList = data.list;
    state.userListTotal = parseInt(data.total);
  },
  [types.GET_USER_DETAIL](state, data) {
    data.teachGradeIds = data.teachGradeIds === null || !data.teachGradeIds ?  [] : data.teachGradeIds.split(',')
    data.teachSubjectIds = data.teachSubjectIds === null || !data.teachSubjectIds ?  [] : data.teachSubjectIds.split(',')
    data.status = parseInt(data.status)
    data.jobStatus = parseInt(data.jobStatus)
    data.jobNature = parseInt(data.jobNature)
    data.level = parseInt(data.level)
    data.optRoleId = parseInt(data.optRoleId)
    state.form = data;
  },
  [types.CHANGE_INPUT](state,opt){
    state.form[opt.key] = opt.value;
  },
  [types.DELETE_USER](state,opt){
    state.deleteUserSuccess = true;
  },
  [types.RESET_FORM](state,opt){
    state.form = {
      userId : "",
      username : "",
      optRoleId: "",
      password: "",
      name : "",
      roleName : "",
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
  [types.SAVE_OR_UPDATE_USER](state, data) {
    state.saveOrUpdateUserSuccess = true
    state.form = {
      userId : "",
      username : "",
      name : "",
      roleName : "",
      optRoleId: "",
      password: "",
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
  getUserList({ commit },opt) {
    io.post(io.userList, opt, (data) => {
      commit(types.GET_USER_LIST, data)
    })
  },
  getUserDetail({ commit },opt) {
    io.post(io.userDetail, opt, (data) => {
      commit(types.GET_USER_DETAIL, data)
    })
  },
  saveOrUpdateUser({ commit },opt) {
    let data = Object.assign({}, opt)
    data.teachGradeIds = data.teachGradeIds.join(',')
    data.teachSubjectIds = data.teachSubjectIds.join(',')
    data.password = md5(data.password)
    io.post(io.saveOrUpdateUser, data, (data) => {
      commit(types.SAVE_OR_UPDATE_USER, data)
    })
  },
  deleteUser({dispatch,commit,state},opt) {
    io.post(io.delUser, opt, (data) => {
      commit(types.DELETE_USER, data)
      dispatch('getUserList',{pageSize:10,pageNo:state.pageNo})
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
