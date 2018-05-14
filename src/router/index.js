import Vue from 'vue'
import Router from 'vue-router'
import storage from '../lib/storage'
import {
  MessageBox
} from 'element-ui'

const Main = resolve => require(['../components/Main'], resolve)
const Index = resolve => require(['../components/view/Index'], resolve)
// const QuestionBank = resolve => require(['../components/view/QuestionBank'], resolve)
// const KnowledgeTree = resolve => require(['../components/view/KnowledgeTree'], resolve)
// const Production = resolve => require(['../components/view/Production'], resolve)
// const EditTeaching = resolve => require(['../components/production/EditTeaching'], resolve)
// const EditKnowledge = resolve => require(['../components/production/EditKnowledge'],resolve)
// const EditQuestion = resolve => require(['../components/production/EditQuestion'],resolve)
// const SelectQuestion = resolve => require(['../components/production/SelectQuestion'],resolve)
// const System = resolve => require(['../components/view/System'], resolve)
// const TopicOrigin = resolve => require(['../components/system/basis/TopicOrigin'], resolve)
// const SetTag = resolve => require(['../components/system/basis/SetTag'], resolve)
// const ProvinceSetting = resolve => require(['../components/system/basis/ProvinceSetting'], resolve)
// const TopicCategory = resolve => require(['../components/system/basis/TopicCategory'], resolve)
// const FamousSchool = resolve => require(['../components/system/basis/FamousSchool'], resolve)
// const AbilityRadar = resolve => require(['../components/system/basis/AbilityRadar'], resolve)
// const ParadigmList = resolve => require(['../components/system/basis/ParadigmList'], resolve)
// const BasisSetContainer = resolve => require(['../components/system/BasisSetContainer'], resolve)
// const UserListContainer = resolve => require(['../components/system/UserListContainer'], resolve)
// const UserList = resolve => require(['../components/system/user/UserList'], resolve)
// const UserAdd = resolve => require(['../components/system/user/UserAdd'], resolve)
// const CharacterList = resolve => require(['../components/system/character/CharacterList'], resolve)
// const CharacterAdd = resolve => require(['../components/system/character/CharacterAdd'], resolve)
// const ParadigmSetting = resolve => require(['../components/system/character/ParadigmSetting'], resolve)
// const PermissionSetting = resolve => require(['../components/system/character/PermissionSetting'], resolve)
// const CharacterListContainer = resolve => require(['../components/system/CharacterListContainer'], resolve)
// const CreateQuestion = resolve => require(['../components/question_bank/CreateQuestion'], resolve)
// const CreateSpecialTree = resolve => require(['../components/knowledge_tree/CreateSpecialTree'], resolve)
// // 报表管理
// const Report = resolve => require(['../components/view/Report'], resolve)
// const KnowledgeQuestion = resolve => require(['../components/report/KnowledgeQuestion'], resolve)
// const Progress = resolve => require(['../components/report/Progress'], resolve)
// const Efficient = resolve => require(['../components/report/Efficient'], resolve)

//教学
const Home = resolve => require(['../components/view/Home'],resolve)
const AttendClass = resolve => require(['../components/view/AttendClass'],resolve)
const PrepareLessons = resolve => require(['../components/view/PrepareLessons'],resolve)

Vue.use(Router)

export default new Router({
  mode: process.env.NODE_ENV === 'production' ? 'hash' : 'hash',
  routes: [
    {
      path: '/main',
      component: Main,
      beforeEnter(to, from, next) {
        let loginInfo = storage.getCurrentUserInfo()
        if (Object.keys(loginInfo).length === 0) {
          next('/index')
        } else {
          next()
        }
      },
      children:[
        {
          path:"home",
          component:Home
        },
        {
          path:"attend-class",
          component:AttendClass
        },
        {
          path:"prepare-lessons",
          component:PrepareLessons
        },
        
      ]
    //   children: [{
    //     path: 'question-bank/create-question',
    //     component: CreateQuestion,
    //   }, {
    //     path: 'question-bank',
    //     component: QuestionBank
    //   }, {
    //     path: 'knowledge-tree',
    //     component: KnowledgeTree
    //   }, {
    //     path: 'production',
    //     component: Production,
    //   },{
    //       path:'production/edit-teaching',
    //       component:EditTeaching
    //     },{
    //       path:'production/edit-knowledge',
    //       component:EditKnowledge
    //     },{
    //       path:'production/edit-question',
    //       component:EditQuestion
    //     },{
    //       path:'production/select-question',
    //       component:SelectQuestion
    //     }, {
    //     path: 'system',
    //     component: System,
    //     children: [{
    //       path: 'basisSetting',
    //       component: BasisSetContainer,
    //       children: [{
    //         path: 'topicOrigin',
    //         component: TopicOrigin
    //       },{
    //         path: 'set-tag',
    //         component: SetTag
    //       }, {
    //         path: 'famousSchool',
    //         component: FamousSchool
    //       }, {
    //         path: 'provinceSetting',
    //         component: ProvinceSetting
    //       }, {
    //         path: 'topicCategory',
    //         component: TopicCategory
    //       }, {
    //         path: 'abilityRadar',
    //         component: AbilityRadar
    //       }, {
    //         path: 'paradigmList',
    //         component: ParadigmList
    //       }
    //       ]
    //     }, {
    //       path: 'userList',
    //       component: UserListContainer,
    //       children: [{
    //         path: 'list',
    //         component: UserList
    //       }, {
    //         path: 'userAdd',
    //         component: UserAdd
    //       }]
    //     }, {
    //       path: 'characterList',
    //       component: CharacterListContainer,
    //       children: [{
    //         path: 'list',
    //         component: CharacterList
    //       }, {
    //         path: 'paradigmSetting',
    //         component: ParadigmSetting
    //       }, {
    //         path: 'permissionSetting',
    //         component: PermissionSetting
    //       }, {
    //         path: 'add',
    //         component: CharacterAdd
    //       }]
    //     }
    //     ]
    //   } ,{
    //   path: 'report',
    //   component: Report,
    //   children:[{
    //     path:'knowledge-question',
    //     component:KnowledgeQuestion
    //   },{
    //     path:'progress',
    //     component:Progress
    //   },{
    //     path:'efficient',
    //     component:Efficient
    //   }]
    // }
    //     , {
    //     path: 'knowledge-tree/create-special-tree',
    //     component: CreateSpecialTree
    //   }]
    },
    {
      path: '/',
      component: Index
    }, {
      path: '/index',
      component: Index
    }
  ]
})
