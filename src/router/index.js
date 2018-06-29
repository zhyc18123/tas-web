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

// 教研
const Course = resolve => require(['../components/teachResearch/course/Course'], resolve) 
const CourseDetail = resolve => require(['../components/teachResearch/course/CourseDetail'], resolve) 
const ViewLecture = resolve => require(['../components/teachResearch/course/ViewLecture'], resolve)
// const PreLecture = resolve => require(['../components/teachResearch/course/preview/Lecture'], resolve)  
// const PreCourseWare = resolve => require(['../components/teachResearch/course/preview/Preview'], resolve)
const EditLecture = resolve => require(['../components/teachResearch/course/EditLecture'], resolve) 
const Sheet = resolve => require(['../components/teachResearch/course/Sheet'], resolve) 
const AddSheet = resolve => require(['../components/teachResearch/course/AddSheet'], resolve)  
const Lecture = resolve => require(['../components/teachResearch/lecture/Lecture'], resolve)
const LectureDetail = resolve => require(['../components/teachResearch/lecture/LectureDetail'], resolve)
const Data = resolve => require(['../components/teachResearch/data/Data'], resolve)
const DataDetail = resolve => require(['../components/teachResearch/data/DataDetail'], resolve)
//  系统管理
const System = resolve => require(['../components/view/System'], resolve)
const BasisSetContainer = resolve => require(['../components/system/BasisSetContainer'], resolve)
const SchoolSetting = resolve => require(['../components/system/basis/SchoolSetting'], resolve)
const OrganizationContainer = resolve => require(['../components/system/OrganizationContainer'], resolve)
const PersonalOperateContainer = resolve => require(['../components/system/PersonalOperateContainer'], resolve)
const PersonalOperateList = resolve => require(['../components/system/organization/PersonalOperateList'], resolve)
const PersonalOperateDetail = resolve => require(['../components/system/organization/PersonalOperateDetail'], resolve)
const OrganizationList = resolve => require(['../components/system/organization/OrganizationList'], resolve)
const OrganizationDetail = resolve => require(['../components/system/organization/OrganizationDetail'], resolve)
// const TopicOrigin = resolve => require(['../components/system/basis/TopicOrigin'], resolve)
// const SetTag = resolve => require(['../components/system/basis/SetTag'], resolve)
// const ProvinceSetting = resolve => require(['../components/system/basis/ProvinceSetting'], resolve)
// const TopicCategory = resolve => require(['../components/system/basis/TopicCategory'], resolve)
// const FamousSchool = resolve => require(['../components/system/basis/FamousSchool'], resolve)
// const AbilityRadar = resolve => require(['../components/system/basis/AbilityRadar'], resolve)
// const ParadigmList = resolve => require(['../components/system/basis/ParadigmList'], resolve)
// const BasisSetContainer = resolve => require(['../components/system/BasisSetContainer'], resolve)
const UserListContainer = resolve => require(['../components/system/UserListContainer'], resolve)
const UserList = resolve => require(['../components/system/user/UserList'], resolve)
const UserAdd = resolve => require(['../components/system/user/UserAdd'], resolve)
const UserDetail = resolve => require(['../components/system/user/UserDetail'], resolve)
const CharacterList = resolve => require(['../components/system/character/CharacterList'], resolve)
const CharacterAdd = resolve => require(['../components/system/character/CharacterAdd'], resolve)
const ParadigmSetting = resolve => require(['../components/system/character/ParadigmSetting'], resolve)
const PermissionSetting = resolve => require(['../components/system/character/PermissionSetting'], resolve)
const CharacterListContainer = resolve => require(['../components/system/CharacterListContainer'], resolve)
//  班级管理
const ClassListContainer = resolve => require(['../components/system/ClassListContainer'], resolve)
const ClassList = resolve => require(['../components/system/class/ClassList'], resolve)
const AddClass = resolve => require(['../components/system/class/AddClass'], resolve)
const ClassDetails = resolve => require(['../components/system/class/ClassDetails'], resolve)
//  const CreateQuestion = resolve => require(['../components/question_bank/CreateQuestion'], resolve)
// const CreateSpecialTree = resolve => require(['../components/knowledge_tree/CreateSpecialTree'], resolve)
// // 报表管理
// const Report = resolve => require(['../components/view/Report'], resolve)
// const KnowledgeQuestion = resolve => require(['../components/report/KnowledgeQuestion'], resolve)
// const Progress = resolve => require(['../components/report/Progress'], resolve)
// const Efficient = resolve => require(['../components/report/Efficient'], resolve)

//教学
const TeachResearch = resolve => require(['../components/view/TeachResearch'], resolve)
const AttendClass = resolve => require(['../components/view/AttendClass'], resolve)
// 备课
const PrepareLessons = resolve => require(['../components/view/PrepareLessons'], resolve)
const CourseWare = resolve => require(['../components/prepareLessons/CourseWare'], resolve)
// 上课
const AttendContent = resolve => require(['../components/attend-class/AttendContent'], resolve)
// 登陆
const Login = resolve => require(['../components/login/Login'], resolve)
//个人信息
const Personal = resolve => require(['../components/personal/Personal'], resolve)
const UserInfo = resolve => require(['../components/personal/UserInfo'], resolve)
const ChangePassword = resolve => require(['../components/personal/ChangePassword'], resolve)

Vue.use(Router)

const router= new Router({
  mode: process.env.NODE_ENV === 'production' ? 'hash' : 'hash',
  routes: [
    {
      path: '/main',
      component: Main,
      children: [
        {
          path: "teach-research",
          component: TeachResearch,
          children: [{
            path: 'course',
            component: Course,
            meta:{keepAlive:true}
          },{
            path: 'course/:id',
            component: CourseDetail
          },{
            path: 'course/edit-lecture/:id',
            component: EditLecture
          },{
            path: 'course/view-lecture/:sourceType/:courseId/:chapterId',
            component: ViewLecture,
            // children:[{
            //   path: ':courseId/:id',
            //   component: PreCourseWare,
            // },
          // ]
          },
          {
            path: 'course/sheet/:id',
            component: Sheet
          },
          {
            path: 'course/add-sheet/:id',
            component: AddSheet
          },
           {
            path: 'lecture',
            component: Lecture,
            meta:{keepAlive:true}
          }, {
            path: 'lecture/:id',
            component: LectureDetail
          }, {
            path: 'data',
            component: Data,
            meta:{keepAlive:true}
          }, {
            path: 'data/:id',
            component: DataDetail
          }]
        },
        {
          path: "attend-class",
          component: AttendClass,
          meta:{keepAlive:true}
        },
        {
          path: "attend-content/:lessonId/:id",
          component: AttendContent,
        },
        {
          path: "prepare-lessons",
          component: PrepareLessons,
        },
        {
          path: "prepare-lessons/:id/:sourceType/:optType",
          component: CourseWare
        }, {
          path: 'system',
          component: System,
          children: [{
          path: 'basisSetting',
          component: BasisSetContainer,
          children: [{
            path: 'schoolSetting',
            component: SchoolSetting
          }
          ]
        },{
            path: 'userList',
            component: UserListContainer,
            children: [{
              path: 'list',
              component: UserList
            }, {
              path: 'userAdd',
              component: UserAdd
            },{
              path: 'userDetail',
              component: UserDetail
            }
          ]
          }, {
            path: 'characterList',
            component: CharacterListContainer,
            children: [{
              path: 'list',
              component: CharacterList
            }, {
              path: 'paradigmSetting',
              component: ParadigmSetting
            }, {
              path: 'permissionSetting',
              component: PermissionSetting
            }, {
              path: 'add',
              component: CharacterAdd
            }]
          }, {
            path: 'organization',
            component: OrganizationContainer,
            children: [{
              path: 'list',
              component: OrganizationList
            }, {
              path: 'list/:type',
              component: OrganizationDetail
            }]
          }, {
            path: 'personal',
            component: PersonalOperateContainer,
            children: [{
              path: 'list',
              component: PersonalOperateList
            }, {
              path: 'list/:type',
              component: PersonalOperateDetail
            }]
          },{
           path:'class',
           component:ClassListContainer,
           children:[
            {
              path:'list',
              component:ClassList
            },
            {
              path:"details",
              component:ClassDetails,
            },
            {
              path:":id",
              component:AddClass,
            },
           ]
          }
          ]
        }
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
      //  }

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
      // redirect:'/main/teach-research/course'
    }, {
      path: '/index',
      component: Index
      // redirect:'/main/teach-research/course'
    }, {
      path: '/login',
      component: Login
    },
    {
      path: '/personal',
      component: Personal,
      children:[
        {
          path: 'user-info',
          component: UserInfo
        },
        {
          path: 'change-password',
          component: ChangePassword
        }
      ]
    },
  ]
})
router.beforeEach((to,from,next)=>{
  let token=storage.getAccessToken()
  if(!token&&to.path.indexOf('/login')===-1){
    next({path:'/login',query:{backUrl:from.fullPath}})
  }else{
    next()
  }
})
export default router