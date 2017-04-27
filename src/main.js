
require('amazeui/dist/css/amazeui.css')
require('amazeui')
require('./assets/css/app.css')
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import io from './lib/io'
import storage from './lib/storage'

import VueUI from './components/base/VueUI'


const Main = resolve => require(['./components/Main'], resolve)
const NotFound = resolve => require(['./components/error/NotFound'], resolve)
const Login = resolve => require(['./components/login/Login'], resolve)
const Enroll = resolve => require(['./components/login/Enroll'], resolve)

const UserProfile = resolve => require(['./components/sysmanager/UserProfile'], resolve)
const UserList = resolve => require(['./components/sysmanager/UserList'], resolve)
const UserForm = resolve => require(['./components/sysmanager/UserForm'], resolve)
const UserRoles = resolve => require(['./components/sysmanager/UserRoles'], resolve)
const RoleList = resolve => require(['./components/sysmanager/RoleList'], resolve)
const RoleForm = resolve => require(['./components/sysmanager/RoleForm'], resolve)
const RoleUsers = resolve => require(['./components/sysmanager/RoleUsers'], resolve)
const RoleOptPermission = resolve => require(['./components/sysmanager/RoleOptPermission'], resolve)
const AreaTeamList = resolve => require(['./components/sysmanager/AreaTeamList'], resolve)
const AreaTeamForm = resolve => require(['./components/sysmanager/AreaTeamForm'], resolve)
const BusTeamList = resolve => require(['./components/sysmanager/BusTeamList'], resolve)
const BusTeamForm = resolve => require(['./components/sysmanager/BusTeamForm'], resolve)
const PeriodList = resolve => require(['./components/sysmanager/PeriodList'], resolve)
const PeriodForm = resolve => require(['./components/sysmanager/PeriodForm'], resolve)


const TeacherList = resolve => require(['./components/teachingresource/TeacherList'], resolve)
const TeacherForm = resolve => require(['./components/teachingresource/TeacherForm'], resolve)

const CampusList = resolve => require(['./components/teachingresource/CampusList'], resolve)
const CampusForm = resolve => require(['./components/teachingresource/CampusForm'], resolve)

const RoomList = resolve => require(['./components/teachingresource/RoomList'], resolve)
const RoomForm = resolve => require(['./components/teachingresource/RoomForm'], resolve)

const CourseList = resolve => require(['./components/course/CourseList'], resolve)
const CourseForm = resolve => require(['./components/course/CourseForm'], resolve)
const ProductList = resolve => require(['./components/course/ProductList'], resolve)
const ProductForm = resolve => require(['./components/course/ProductForm'], resolve)
const ClassList = resolve => require(['./components/course/ClassList'], resolve)
const ClassForm = resolve => require(['./components/course/ClassForm'], resolve)
const ClassTimeList = resolve => require(['./components/course/ClassTimeList'], resolve)
const ClassRecommendList = resolve => require(['./components/course/ClassRecommendList'], resolve)




const SearchStudentList = resolve => require([ './components/enroll/SearchStudentList'], resolve)
const StudentForm = resolve => require([ './components/enroll/StudenForm'], resolve)
const StudentReg = resolve => require([ './components/enroll/StudentReg'], resolve)
const ClassHistoryList = resolve => require([ './components/enroll/ClassHistoryList'], resolve)
const StudentRefundList = resolve => require([ './components/enroll/StudentRefundList'], resolve)
const TurnClass = resolve => require([ './components/enroll/TurnClassStepOne'], resolve)
const StudentRegList = resolve => require(['./components/enroll/StudentRegList'], resolve)
const CourseClassList = resolve => require(['./components/enroll/CourseClassList.vue'], resolve)

const AccountList = resolve => require(['./components/settlement/AccountList'], resolve)
const AccountReportDetail = resolve => require(['./components/settlement/AccountReportDetail'], resolve)
const AccountMainBodyOfFee = resolve => require(['./components/settlement/AccountMainBodyOfFee'], resolve)
const FeeList = resolve => require(['./components/settlement/FeeList'], resolve)
const FeeForm = resolve => require(['./components/settlement/FeeForm'], resolve)
const ProfitReportDetail = resolve => require(['./components/settlement/ProfitReportDetail'], resolve)
const AccountWithdrawalList = resolve => require(['./components/settlement/AccountWithdrawalList'], resolve)
const WithdrawalList = resolve => require(['./components/settlement/WithdrawalList'], resolve)
const ApplyWithdrawalForm = resolve => require(['./components/settlement/ApplyWithdrawalForm'], resolve)

const ServiceManagerList = resolve => require([ './components/tradingService/ServiceManagerList'], resolve)
const ServiceManagerForm = resolve => require([ './components/tradingService/ServiceManagerForm'], resolve)
const ServiceManagerEditForm = resolve => require([ './components/tradingService/ServiceManagerForm'], resolve)
const CategoryList = resolve => require([ './components/tradingService/CategoryList'], resolve)
const CategoryEditForm = resolve => require([ './components/tradingService/CategoryEditForm'], resolve)
const CategorySaveForm = resolve => require([ './components/tradingService/CategorySaveForm'], resolve)
const ProductTradingList = resolve => require([ './components/tradingService/ProductTradingList'], resolve)
const ProductRefundList = resolve => require([ './components/tradingService/ProductRefundList'], resolve)
const ProductRefundEditForm = resolve => require([ './components/tradingService/ProductRefundEditForm'], resolve)
const ProductTradingForm = resolve => require([ './components/tradingService/ProductTradingForm'], resolve)
const ServiceRentList = resolve => require([ './components/tradingService/ServiceRentList'], resolve)
const ServiceRentForm = resolve => require([ './components/tradingService/ServiceRentForm'], resolve)

const BuyServiceList = resolve => require(['./components/buyer/BuyServiceList'], resolve)
const BuyCommodityList = resolve => require(['./components/buyer/BuyCommodityList'], resolve)
const RentRecordList = resolve => require(['./components/buyer/RentRecordList'], resolve)
const RentRoomTimeList = resolve => require(['./components/buyer/RentRoomTimeList'], resolve)
const ProductComment = resolve => require(['./components/buyer/ProductComment'], resolve)
const ServiceComment = resolve => require(['./components/buyer/ServiceComment'], resolve)
const RentComment = resolve => require(['./components/buyer/RentComment'], resolve)
const ProductOrderItemDetail = resolve => require(['./components/buyer/ProductOrderItemDetail'], resolve)
const ServiceOrderItemDetail = resolve => require(['./components/buyer/ServiceOrderItemDetail'], resolve)
const RentDetail = resolve => require(['./components/buyer/RentDetail'], resolve)
const AddressList = resolve => require(['./components/buyer/AddressList'], resolve)
const AddressForm = resolve => require(['./components/buyer/AddressForm'], resolve)

const SoldProductOrderList = resolve => require(['./components/seller/SoldProductOrderList'], resolve)
const SoldServiceOrderList = resolve => require(['./components/seller/SoldServiceOrderList'], resolve)
const SellerProductDetail = resolve => require(['./components/seller/SellerProductDetail'], resolve)
const SellerServiceDetail = resolve => require(['./components/seller/SellerServiceDetail'], resolve)
const SellerLeaseOrderList = resolve => require(['./components/seller/SellerLeaseOrderList'], resolve)
const SellerLeaseDetail = resolve => require(['./components/seller/SellerLeaseDetail'], resolve)

const SellerRegisterList = resolve => require(['./components/platform/SellerRegisterList'], resolve)


const AttendanceCourseClassList = resolve => require(['./components/attendance/AttendanceCourseClassList'], resolve)
const AttendanceRecordList = resolve => require(['./components/attendance/AttendanceRecordList'], resolve)


Vue.use(VueRouter)
Vue.use(VueUI)
Vue.use(VueResource)

const Index = { template: '<div>Index YYYY</div>' }


const router = new VueRouter({
  routes:[{
    path: '/main',
    component: Main,
    children:[
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
      {path: 'sys/period/list' , component: PeriodList },
      {path: 'sys/period/add' , component: PeriodForm },
      {path: 'sys/period/edit/:periodId' , component: PeriodForm },
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

      {path: 'course/class/recommend/list' , component: ClassRecommendList },


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



      {path: 'settlement/account/list' , component: AccountList },
      {path: 'settlement/account/report/detail/:subject/:mainAccountId' , component: AccountReportDetail },
      {path: 'settlement/fee/accountmainbody' , component: AccountMainBodyOfFee },
      {path: 'settlement/fee/list/:mainAccountId' , component: FeeList },
      {path: 'settlement/fee/add/:mainAccountId' , component: FeeForm },
      {path: 'settlement/account/report/profit/:mainAccountId' , component: ProfitReportDetail },
      {path: 'settlement/account/withdrawal/list/:mainAccountId' , component: AccountWithdrawalList },
      {path: 'settlement/account/withdrawal/apply/:mainAccountId' , component: ApplyWithdrawalForm },
      {path: 'settlement/withdrawal/list' , component: WithdrawalList },

      {path: 'tradingService/service/list' , component: ServiceManagerList },
      {path: 'tradingService/service/add' , component: ServiceManagerEditForm},
      {path: 'tradingService/service/edit/:productId' , component: ServiceManagerForm },
      {path: 'tradingService/category/list' , component: CategoryList },
      {path: 'tradingService/category/add' , component: CategorySaveForm},
      {path: 'tradingService/category/edit/:categoryId' , component: CategoryEditForm },
      {path: 'tradingService/product/list' , component: ProductTradingList },
      {path: 'tradingService/product/add' , component: ProductTradingForm},
      {path: 'tradingService/product/edit/:productId' , component: ProductTradingForm },
      {path: 'tradingService/productRefund/list' , component: ProductRefundList },
      {path: 'tradingService/productRefund/edit' , component: ProductRefundEditForm },
      {path: 'tradingService/rent/list' , component: ServiceRentList },
      {path: 'tradingService/rent/add' , component: ServiceRentForm},
      {path: 'tradingService/rent/edit/:productId' , component: ServiceRentForm},

      {path: 'buyer/buyCommodity/list', component:BuyCommodityList},
      {path: 'buyer/buyService/list', component:BuyServiceList},
      {path: 'buyer/rentRecord/list', component:RentRecordList},
      {path: 'buyer/rentRoomTime/list', component:RentRoomTimeList},
      {path: 'buyer/productOrderItem/detail/:orderId', component:ProductOrderItemDetail},
      {path: 'buyer/ServiceOrderItem/detail/:orderId', component:ServiceOrderItemDetail},
      {path: 'buyer/rent/detail/:orderId', component:RentDetail},
      {path: 'buyer/productOrderItem/comment/:orderItemId', component:ProductComment},
      {path: 'buyer/ServiceOrderItem/comment/:orderItemId', component:ServiceComment},
      {path: 'buyer/rent/comment/:orderItemId', component:RentComment},
      {path: 'buyer/address/list/', component:AddressList},
      {path: 'buyer/address/add/', component:AddressForm},

      {path: 'seller/soldProductOrder/list', component:SoldProductOrderList},
      {path: 'seller/soldServiceOrder/list', component:SoldServiceOrderList},
      {path: 'seller/sellerProduct/detail/:orderItemId', component:SellerProductDetail},
      {path: 'seller/sellerService/detail/:orderId', component:SellerServiceDetail},
      {path: 'seller/leaseRecord/list/', component:SellerLeaseOrderList},
      {path: 'seller/leaseRecord/detail/:orderItemId', component:SellerLeaseDetail},

      {path: 'platform/sellerRegister/list', component:SellerRegisterList},

      {path: 'attendance/attendance/list', component:AttendanceCourseClassList },
      {path: 'attendance/attendance/record/:classId', component:AttendanceRecordList }
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


