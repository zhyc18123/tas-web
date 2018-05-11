
import * as types from '../mutation-types'
import io from '../../lib/io'


const state = {
    formData: {
        no: '',
        questionTypeId: '',
        originArea: '',
        originYear: '',
        originName: [],
        body: '',
        answer: '',
        editStatus: '',
        lastModifier: '',
        editRemark: ''
    },
    questionSource:{},
    sppList:[],
    ability:{},
    afterAbility:[],
    selectedAbility:{},
    selectedKnowledge:{pre:[],master:[],slave:[]}
    
}

// getters
const getters = {
    formData: state => state.formData,
    questionSource: state => state.questionSource,
    sppList:state=>state.sppList,
    selectedKnowledge:state=>state.selectedKnowledge,
    ability:state=>state.ability,
    afterAbility:state=>state.afterAbility
}

// mutations
const mutations = {
    [types.GET_QUESTION_SOURCE](state, data) {
        state.questionSource = data;
    },
    [types.GET_SPP_LIST](state, data) {
        state.sppList = data;
    },
    [types.GET_ABILITY](state, data) {
        state.ability = data;
    },
    [types.DEAL_ABILITY](state, data) {
        state.afterAbility=[];
        state.afterAbility.push(...data);
    },
    changeSelectKnowledges(state,opt){
        state.selectedKnowledge[opt.key].push(opt.val);
        // state.selectedKnowledge[opt.key]=opt.val[opt.key];
    },
    changeSelectedAbility(state,opt){

    }
    // changeAbility(state,index,iI){
    //     state.ability[index].abilities[0].tags[iI]
    // }
}

// actions
const actions = {
     questionOriginConfig({ commit },opt) {
         io.post(io.questionOriginConfig, opt, (data) => {
                 commit(types.GET_QUESTION_SOURCE, data)
         })
     },
     sppConfigOfSubject({ commit },opt) {
         io.post(io.sppConfigOfSubject, opt, (data) => {
                 commit(types.GET_SPP_LIST, data)
         })
     },
     abilityConfigOfSubject({ commit },opt) {
         io.post(io.abilityConfigOfSubject, opt, (data) => {
                 commit(types.GET_ABILITY, data)

            let ab = state.ability;
            if (ab.length) {
                ab.map((item) => {
                    let tags = [];
                    let tagI = 0;
                    item.abilities.map((itemA) => {
                        itemA.tags.map((itemT) => {
                            tags.push({ score: itemA.score, name: itemT,checked:false });
                        })
                    });
                    let result = [];
                    for (var i = 0, len = tags.length; i < len; i += 4) {
                        result.push(tags.slice(i, i + 4));
                    };
                    item.tags = result;
                });
            }
            commit(types.DEAL_ABILITY,ab);
         })
     },
    dealAbility({commit},opt){
        commit(types.DEAL_ABILITY,opt);
    },
    saveQuestion({commit,state}){
         io.post(io.saveQuestion, {...state.formData}, (data) => {
         })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}