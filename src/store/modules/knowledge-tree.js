
import * as types from '../mutation-types'
import io from '../../lib/io'


const state = {
    tree:[],
    treeList:[],
    treeListDetail:[],
    // treeDetail:{tags:[]},
}

// getters
const getters = {
    tree:state=>state.tree,
    treeList:state=>state.treeList,
    // treeDetail:state=>state.treeDetail,
}

// mutations
const mutations = {
    [types.GET_TREE](state, data) {
        state.tree = data;
    },
    [types.GET_TREE_LIST](state, data) {
        state.treeList = data;
    },
}

// actions
const actions = {
     allNodeOfKnowledgeTree({ commit },opt) {
         io.post(io.allNodeOfKnowledgeTree, opt, (data) => {
                 commit(types.GET_TREE, data)
         })
     },
     knowledgeTreeList({dispatch, commit },opt) {
         io.post(io.knowledgeTreeList, opt, (data) => {
                 commit(types.GET_TREE_LIST, data)
         })
     },
}

export default {
    state,
    getters,
    actions,
    mutations
}