
import * as types from '../mutation-types'
import io from '../../lib/io'
import storage from '../../lib/storage'


const state = {
    questionData: {},
    editStatus:{},
    form:{
        editStatus:'',
        no:'',
        questionTypeId:'',
        lastModifier:'',
        updateTimeStart:'',
        updateTimeEnd:'',
        pageNo:1,
        pageSize:10
    },
    questionTypeOfSubjectList:{}
}

// getters
const getters = {
    questionData: state => state.questionData,
    editStatus:state=>state.editStatus,
    form:state=>state.form,
    questionTypeOfSubjectList:state=>state.questionTypeOfSubjectList
}

// mutations
const mutations = {
    [types.GET_QUESTION](state, data) {
        console.log(data)
        state.questionData = data;
    },
    [types.GET_QUESTION_STATUS](state,data){
        state.editStatus=data;
    },
    [types.GET_QUESTION_TYPE](state,data){
        state.questionTypeOfSubjectList=data;
    },
    [types.CHANGE_PAGE](state,pageNo){
        state.form.pageNo=pageNo;
    },
    [types.CHANGE_INPUT](state,opt){
        console.log('arr',opt.value)
        if(Array.isArray(opt.value)){
            console.log(opt.module)
            opt.module[opt.key]=[];
            opt.module[opt.key].push(...opt.value);
            // opt.module=opt.module;
            console.log(opt.module[opt.key])
        }else{
        opt.module[opt.key]=opt.value;
        }
    },
    // changeArr(state,opt){
    //     opt.module[opt.key]=opt.value;
    //     console.log('arr',opt.value)
    //     if(Array.isArray(opt.value)){
    //         console.log(opt.module)
    //         // opt.module[opt.key]=[];
    //         opt.module[opt.key].push(...opt.value);
    //         console.log(opt.module[opt.key])
    //     }else{
    //     opt.module[opt.key]=opt.value;
    //     }
    // },
}

// actions
const actions = {
    questionList({ commit }) {
        io.post(io.questionList, {...state.form,subjectId:storage.getSubjectId()}, (data) => {
                commit(types.GET_QUESTION, data)
        })
    },
    editStatus({ commit }, opt) {
        console.log(opt)
        io.post(io.editStatus, opt, (data) => {
                commit(types.GET_QUESTION_STATUS, data)
        })
    },
    questionTypeOfSubjectList({ commit }, opt) {
        console.log(opt)
        io.post(io.questionTypeOfSubjectList, opt, (data) => {
                commit(types.GET_QUESTION_TYPE, data)
        })
    },
    handlePage({dispatch,commit},opt){
        commit(types.CHANGE_PAGE,opt);
        dispatch('questionList');
    },
    search({dispatch,commit}){
        dispatch('handlePage',1)
        dispatch('questionList');
    },
    inputChange({dispatch,commit},opt){
        console.log('opt',opt)
        commit(types.CHANGE_INPUT,opt)
    },
    // selectChange({commit},opt){
    //     console.log('key',opt)
    //     commit(types.CHANGE_INPUT,opt)
    // }
}

export default {
    state,
    getters,
    actions,
    mutations
}