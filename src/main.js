require('./assets/css/app.css')
import Vue from 'vue'
import VueRouter from 'vue-router'

import io from './lib/io'
import storage from './lib/storage'

import VueUI from './components/base/VueUI'

import Main from './components/Main'
import NotFound from './components/error/NotFound'
import Login from './components/login/Login'
import Enroll from './components/login/Enroll'

import UserProfile from './components/sysmanager/UserProfile'
import UserList from './components/sysmanager/UserList'
import UserForm from './components/sysmanager/UserForm'
import UserRoles from './components/sysmanager/UserRoles'
import RoleList from './components/sysmanager/RoleList'
import RoleForm from './components/sysmanager/RoleForm'
import RoleUsers from './components/sysmanager/RoleUsers'
import RoleOptPermission from './components/sysmanager/RoleOptPermission'
import AreaTeamList from './components/sysmanager/AreaTeamList'
import AreaTeamForm from './components/sysmanager/AreaTeamForm'
import BusTeamList from './components/sysmanager/BusTeamList'
import BusTeamForm from './components/sysmanager/BusTeamForm'
import TeacherList from './components/sysmanager/TeacherList'
import TeacherForm from './components/sysmanager/TeacherForm'

import CampusList from './components/sysmanager/CampusList'
import CampusForm from './components/sysmanager/CampusForm'

import RoomList from './components/sysmanager/RoomList'
import RoomForm from './components/sysmanager/RoomForm'


import CourseList from './components/course/CourseList'
import CourseForm from './components/course/CourseForm'
import ProductList from './components/product/ProductList'
import AddProduct from './components/product/AddProduct'

import ClassList from './components/course/ClassList'
import ClassForm from './components/course/ClassForm'


import StudentList from  './components/enroll/StudentList'
// import StudentList from  './components/enroll/StuRegSearchList'
import StudentForm from  './components/enroll/StudenForm'
import StudentOne from  './components/enroll/StudentOne'
import StudentReg from  './components/enroll/StudentReg'


Vue.use(VueRouter)
Vue.use(VueUI)



const Index = { template: '<div>Index</div>' }
const Refresh = {
  beforeCreate:function(){
    this.$router.back()
  },
  render:function(){
    return '辅助刷新组件'
  }
}

const router = new VueRouter({
  routes:[{
    path: '/main',
    component: Main,
    children:[
      {path: 'r' , component: Refresh },
      {path: 'index' , component: Index },
      {path: 'sys/user/profile' , component: UserProfile },
      {path: 'sys/user/list' , component: UserList },
      {path: 'sys/user/add' , component: UserForm },
      {path: 'sys/user/edit/:userId' , component: UserForm },
      {path: 'sys/user/roles/:userId' , component: UserRoles },
      {path: 'sys/role/list' , component: RoleList },
      {path: 'sys/role/add' , component: RoleForm },
      {path: 'sys/role/edit/:roleId' , component: RoleForm },
      {path: 'sys/role/optPermission/:roleId' , component: RoleOptPermission },
      {path: 'sys/role/users/:roleId' , component: RoleUsers },
      {path: 'sys/areateam/list' , component: AreaTeamList },
      {path: 'sys/areateam/add' , component: AreaTeamForm },
      {path: 'sys/areateam/edit/:areaTeamId' , component: AreaTeamForm },
      {path: 'sys/busteam/list' , component: BusTeamList },
      {path: 'sys/busteam/add' , component: BusTeamForm },
      {path: 'sys/busteam/edit/:busTeamId' , component: BusTeamForm },
      {path: 'sys/teacher/list' , component: TeacherList },
      {path: 'sys/teacher/add' , component: TeacherForm },
      {path: 'sys/teacher/edit/:teacherId' , component: TeacherForm },
      {path: 'sys/campus/list' , component: CampusList },
      {path: 'sys/campus/add' , component: CampusForm },
      {path: 'sys/campus/edit/:campusId' , component: CampusForm },
      {path: 'sys/room/list' , component: RoomList },
      {path: 'sys/room/add' , component: RoomForm },
      {path: 'sys/room/edit/:roomId' , component: RoomForm },
      {path: 'course/course/list' , component: CourseList },
      {path: 'course/course/add' , component: CourseForm },
      {path: 'course/course/edit/:courseId' , component: CourseForm },
      {path: 'course/product/list',  component:  ProductList},
      {path: 'product/product/add' , component: AddProduct },
      {path: 'product/product/edit/:productId' , component: AddProduct },


      {path: 'course/class/list' , component: ClassList },
      {path: 'course/class/add' , component: ClassForm},
      {path: 'course/class/edit/:classId' , component: ClassForm },

      {path: 'enroll/student/list' , component: StudentList },
      {path: 'enroll/student/one' , component: StudentOne },
      {path: 'enroll/student/add' , component: StudentForm },
      {path: 'enroll/student/edit/:studentId' , component: StudentForm },
      {path: 'enroll/student/reg/:studentId' , component: StudentReg }
      // {path: 'enroll/student/edit/:classId' , component: ClassForm }
    ],
    beforeEnter:function(to, from, next){
      if(!storage.getLogin()){
        next('/login')
      }else{
        next()
      }

    }
  },{
    path: '/login',
    component: Login
  },{
    path: '/enroll',
    component: Enroll
  },{
    path:'/',
    redirect:'/login'
  },{
    path:'*',
    component:NotFound
  }]
})


var appVue = new Vue({
  el: '#app',
  router,
  template: '<div><router-view class="view"></router-view></div>',
  data:{ config: {menus:[],permission:{},groupBusTeams:{},areaTeams:[],grades:[],subjects:[],periods:[]} },
  created:function(){
    this.refreshUserInfo()
  },
  methods:{
    refreshUserInfo:function(){
      if(!storage.getLogin()){
        return
      }
      var _this = this
      io.post(io.apiAdminSysUserDetail,{
        userId : storage.getLogin().userId
      },function(ret){
        if(ret.success){
          storage.setCurrentUserInfo(ret.data)
          _this.$root.$emit('userInfoChange',ret.data)
        }
      })
    }
  }

})


