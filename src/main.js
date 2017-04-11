
require('amazeui/dist/css/amazeui.css')
require('amazeui')
require('./assets/css/app.css')
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

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


import TeacherList from './components/teachingresource/TeacherList'
import TeacherForm from './components/teachingresource/TeacherForm'

import CampusList from './components/teachingresource/CampusList'
import CampusForm from './components/teachingresource/CampusForm'

import RoomList from './components/sysmanager/RoomList'
import RoomForm from './components/sysmanager/RoomForm'


import CourseList from './components/course/CourseList'
import CourseForm from './components/course/CourseForm'
import ProductList from './components/course/ProductList'
import ProductForm from './components/course/ProductForm'
import ClassList from './components/course/ClassList'
import ClassForm from './components/course/ClassForm'
import ClassTimeList from './components/course/ClassTimeList'



import SearchStudentList from  './components/enroll/SearchStudentList'
import StudentForm from  './components/enroll/StudenForm'
import StudentReg from  './components/enroll/StudentReg'
import ClassHistoryList from  './components/enroll/ClassHistoryList'
import StudentRefundList from  './components/enroll/StudentRefundList'
import TurnClass from  './components/enroll/TurnClassStepOne'
import StudentRegList from './components/enroll/StudentRegList'
import CourseClassList from './components/enroll/CourseClassList.vue'

import AccountReport from './components/settlement/AccountReport'
import AccountReportDetail from './components/settlement/AccountReportDetail'
import AccountMainBodyOfFee from './components/settlement/AccountMainBodyOfFee'
import FeeList from './components/settlement/FeeList'
import FeeForm from './components/settlement/FeeForm'
import ProfitReportDetail from './components/settlement/ProfitReportDetail'

import ServiceManagerList from './components/tradingService/ServiceManagerList'
import ServiceManagerForm from './components/tradingService/ServiceManagerForm'
import ServiceManagerEditForm from './components/tradingService/ServiceManagerEditForm'
import CategoryList from './components/tradingService/CategoryList'
import CategorySaveForm from './components/tradingService/CategorySaveForm'
import CategoryEditForm from './components/tradingService/CategoryEditForm'
import ProductTradingList from './components/tradingService/ProductTradingList'
import ProductTradingForm from './components/tradingService/ProductTradingForm'
import ProductRefundList from './components/tradingService/ProductRefundList'
import ProductRefundEditForm from './components/tradingService/ProductRefundEditForm'
import ProductTradingEditForm from './components/tradingService/ProductTradingEditForm'
import CampusManageForm from './components/tradingService/CampusManageForm'
import CampusManageList from './components/tradingService/CampusManageList'
import ClassRoomProtectList from './components/tradingService/ClassRoomProtectList'
import ClassRoomProtectForm from './components/tradingService/ClassRoomProtectForm'
import BuyServiceList from './components/buyer/BuyServiceList'
import BuyCommodityList from './components/buyer/BuyCommodityList'

import SoldProductOrderList from './components/seller/SoldProductOrderList'
import SoldServiceOrderList from './components/seller/SoldServiceOrderList'

import SellerRegisterList from './components/platform/SellerRegisterList'

Vue.use(VueRouter)
Vue.use(VueUI)
Vue.use(VueResource)

const Index = { template: '<div>Index YYYY</div>' }
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
      {path: 'product/product/add' , component: ProductForm },
      {path: 'product/product/edit/:productId' , component: ProductForm },

      {path: 'course/class/list' , component: ClassList },
      {path: 'course/class/add' , component: ClassForm},
      {path: 'course/class/edit/:classId' , component: ClassForm },
      {path: 'course/class/time/:classId' , component: ClassTimeList },


      {path: 'enroll/student/search' , component: SearchStudentList },
      {path: 'enroll/student/reg' , component: StudentReg },
      {path: 'enroll/student/add' , component: StudentForm },
      {path: 'enroll/student/edit/:studentId' , component: StudentForm },
      {path: 'enroll/student/reg/:studentId' , component: StudentReg },

      {path: 'enroll/class/list' , component: CourseClassList },
      {path: 'enroll/class/reg/:classId' , component: StudentRegList },

      {path: 'enroll/ClassHistoryList', component:ClassHistoryList},
      {path: 'enroll/student/studentRefundList', component:StudentRefundList},
      {path: 'enroll/student/turnClass', component:TurnClass},



      {path: 'settlement/account/report' , component: AccountReport },
      {path: 'settlement/account/report/detail/:subject/:mainAccountId' , component: AccountReportDetail },
      {path: 'settlement/fee/accountmainbody' , component: AccountMainBodyOfFee },
      {path: 'settlement/fee/list/:mainAccountId' , component: FeeList },
      {path: 'settlement/fee/add/:mainAccountId' , component: FeeForm },
      {path: 'settlement/account/report/profit/:mainAccountId' , component: ProfitReportDetail },

      {path: 'tradingService/service/list' , component: ServiceManagerList },
      {path: 'tradingService/service/add' , component: ServiceManagerForm},
      {path: 'tradingService/service/edit/:productId' , component: ServiceManagerEditForm },
      {path: 'tradingService/category/list' , component: CategoryList },
      {path: 'tradingService/category/add' , component: CategorySaveForm},
      {path: 'tradingService/category/edit/:categoryId' , component: CategoryEditForm },
      {path: 'tradingService/product/list' , component: ProductTradingList },
      {path: 'tradingService/product/add' , component: ProductTradingForm},
      {path: 'tradingService/productRefund/list' , component: ProductRefundList },
      {path: 'tradingService/productRefund/edit' , component: ProductRefundEditForm },
      {path: 'tradingService/product/edit/:productId' , component: ProductTradingEditForm },
      {path: 'tradingService/rent/list', component:CampusManageList},
      {path: 'tradingService/campusManage/add', component:CampusManageForm},
      {path: 'tradingService/campusManage/edit/:productId', component:CampusManageForm},
      {path: 'tradingService/rent/list', component:ClassRoomProtectList},
      {path: 'tradingService/classRoomProtect/add', component:ClassRoomProtectForm},
      {path: 'tradingService/classRoomProtect/edit/:productId', component:ClassRoomProtectForm},

      {path: 'buyer/buyCommodity/list', component:BuyCommodityList},
      {path: 'buyer/buyService/list', component:BuyServiceList},

      {path: 'seller/soldProductOrder/list', component:SoldProductOrderList},
      {path: 'seller/soldServiceOrder/list', component:SoldServiceOrderList},

      {path: 'platform/sellerRegister/list', component:SellerRegisterList},
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
  data:{ config: {menus:[],permission:{},groupBusTeams:{},areaTeams:[],grades:[],subjects:[],periods:[]} , courseShoppingCart:[], teacherName:[]},
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


