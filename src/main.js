
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
const DataPermission = resolve => require(['./components/sysmanager/DataPermission'], resolve)
const AreaTeamList = resolve => require(['./components/sysmanager/AreaTeamList'], resolve)
const AreaTeamForm = resolve => require(['./components/sysmanager/AreaTeamForm'], resolve)
const BusTeamList = resolve => require(['./components/sysmanager/BusTeamList'], resolve)
const BusTeamForm = resolve => require(['./components/sysmanager/BusTeamForm'], resolve)
const PeriodList = resolve => require(['./components/sysmanager/PeriodList'], resolve)
const PeriodForm = resolve => require(['./components/sysmanager/PeriodForm'], resolve)
const StudentSchoolList = resolve => require(['./components/sysmanager/StudentSchoolList'], resolve)
const StudentSchoolForm = resolve => require(['./components/sysmanager/StudentSchoolForm'], resolve)
const ClassRemunerationList = resolve => require(['./components/sysmanager/ClassRemunerationList'], resolve)
const ClassRemunerationForm = resolve => require(['./components/sysmanager/ClassRemunerationForm'], resolve)
const CusIdList = resolve => require(['./components/sysmanager/CusIdList'], resolve)
const CusIdForm = resolve => require(['./components/sysmanager/CusIdForm'], resolve)
const SummerWinter = resolve => require(['./components/sysmanager/SummerWinter'], resolve)
const SummerWinterForm = resolve => require(['./components/sysmanager/SummerWinterForm'], resolve)


const TeacherList = resolve => require(['./components/teachingresource/TeacherList'], resolve)
const TeacherForm = resolve => require(['./components/teachingresource/TeacherForm'], resolve)

const CampusList = resolve => require(['./components/teachingresource/CampusList'], resolve)
const CampusForm = resolve => require(['./components/teachingresource/CampusForm'], resolve)

const CampusEditForm = resolve => require(['./components/teachingresource/CampusEditForm'], resolve)
const CampusAuditList = resolve => require(['./components/teachingresource/CampusAuditList'], resolve)





const RoomList = resolve => require(['./components/teachingresource/RoomList'], resolve)
const RoomForm = resolve => require(['./components/teachingresource/RoomForm'], resolve)

const RoomNewList = resolve => require(['./components/teachingresource/RoomNewList'], resolve)
const RoomNewForm = resolve => require(['./components/teachingresource/RoomNewForm'], resolve)

const CrowdfundingClassList = resolve => require(['./components/crowdfunding/CrowdfundingClassList'], resolve)
const CrowdfundingClassDetail = resolve => require(['./components/crowdfunding/CrowdfundingClassDetail'], resolve)
const CrowdfundingRegList = resolve => require(['./components/crowdfunding/CrowdfundingRegList'], resolve)


const CourseList = resolve => require(['./components/course/CourseList'], resolve)
const CourseForm = resolve => require(['./components/course/CourseForm'], resolve)
const CourseTypeList = resolve => require(['./components/course/CourseTypeList'], resolve)
const CourseTypeForm = resolve => require(['./components/course/CourseTypeForm'], resolve)
const ProductList = resolve => require(['./components/course/ProductList'], resolve)
const ProductForm = resolve => require(['./components/course/ProductForm'], resolve)
const ClassList = resolve => require(['./components/course/ClassList'], resolve)
const ClassForm = resolve => require(['./components/course/ClassForm'], resolve)
const ClassTimeList = resolve => require(['./components/course/ClassTimeList'], resolve)
const ClassRecommendList = resolve => require(['./components/course/ClassRecommendList'], resolve)
const TeacherSchedule = resolve => require(['./components/course/TeacherSchedule'], resolve)
const CampusSchedule = resolve => require(['./components/course/CampusSchedule'], resolve)




const SearchStudentList = resolve => require([ './components/enroll/SearchStudentList'], resolve)
const StudentForm = resolve => require([ './components/enroll/StudenForm'], resolve)
const StudentReg = resolve => require([ './components/enroll/StudentReg'], resolve)
const ClassHistoryList = resolve => require([ './components/enroll/ClassHistoryList'], resolve)
const StudentRefundList = resolve => require([ './components/enroll/StudentRefundList'], resolve)
const TurnClass = resolve => require([ './components/enroll/TurnClassStepOne'], resolve)
const StudentRegList = resolve => require(['./components/enroll/StudentRegList'], resolve)
//const CourseClassList = resolve => require(['./components/enroll/CourseClassList.vue'], resolve)



const AccountList = resolve => require(['./components/settlement/AccountList'], resolve)
const AccountReportDetail = resolve => require(['./components/settlement/AccountReportDetail'], resolve)
const AccountMainBodyOfFee = resolve => require(['./components/settlement/AccountMainBodyOfFee'], resolve)
const FeeList = resolve => require(['./components/settlement/FeeList'], resolve)
const FeeForm = resolve => require(['./components/settlement/FeeForm'], resolve)
const ProfitReportDetail = resolve => require(['./components/settlement/ProfitReportDetail'], resolve)
const AccountWithdrawalList = resolve => require(['./components/settlement/AccountWithdrawalList'], resolve)
const WithdrawalList = resolve => require(['./components/settlement/WithdrawalList'], resolve)
const ApplyWithdrawalForm = resolve => require(['./components/settlement/ApplyWithdrawalForm'], resolve)
const FeeCategoryList = resolve => require(['./components/settlement/FeeCategoryList'], resolve)
const FeeCategoryForm = resolve => require(['./components/settlement/FeeCategoryForm'], resolve)
const IncomeCategoryList = resolve => require(['./components/settlement/IncomeCategoryList'], resolve)
const IncomeCategoryForm = resolve => require(['./components/settlement/IncomeCategoryForm'], resolve)










const SellerRegisterList = resolve => require(['./components/servicemanager/SellerRegisterList'], resolve)
const GoodsManagerList = resolve => require(['./components/servicemanager/GoodsManagerList'], resolve)
const LeaseManagerList = resolve => require(['./components/servicemanager/LeaseManagerList'], resolve)
const DemandManagerList = resolve => require(['./components/servicemanager/DemandManagerList'], resolve)
const OrderManagerList = resolve => require(['./components/servicemanager/OrderManagerList'], resolve)

const CategoryList = resolve => require([ './components/servicemanager/CategoryList'], resolve)
const CategoryEditForm = resolve => require([ './components/servicemanager/CategoryEditForm'], resolve)
const CategorySaveForm = resolve => require([ './components/servicemanager/CategorySaveForm'], resolve)



/*const SoldProductOrderList = resolve => require(['./components/seller/SoldProductOrderList'], resolve)
const SoldServiceOrderList = resolve => require(['./components/seller/SoldServiceOrderList'], resolve)
const SellerProductDetail = resolve => require(['./components/seller/SellerProductDetail'], resolve)
const SellerServiceDetail = resolve => require(['./components/seller/SellerServiceDetail'], resolve)
const SellerLeaseOrderList = resolve => require(['./components/seller/SellerLeaseOrderList'], resolve)
const SellerLeaseDetail = resolve => require(['./components/seller/SellerLeaseDetail'], resolve)*/

/*const SellerRegisterList = resolve => require(['./components/platform/SellerRegisterList'], resolve)*/


const AttendanceCourseClassList = resolve => require(['./components/attendance/AttendanceCourseClassList'], resolve)
const AttendanceRecordList = resolve => require(['./components/attendance/AttendanceRecordList'], resolve)

const ChargeList = resolve => require(['./components/report/ChargeList'], resolve)
const AggregationConsumeList = resolve => require(['./components/report/AggregationConsumeList'], resolve)

const DiscountCategoryList = resolve => require(['./components/discount/DiscountCategoryList'], resolve)
const DiscountCategoryForm = resolve => require(['./components/discount/DiscountCategoryForm'], resolve)
const DiscountRuleList = resolve => require(['./components/discount/DiscountRuleList'], resolve)
const DiscountRuleForm = resolve => require(['./components/discount/DiscountRuleForm'], resolve)
const DiscountList = resolve => require(['./components/discount/DiscountList'], resolve)
const DiscountForm = resolve => require(['./components/discount/DiscountForm'], resolve)
const DiscountRuleTest = resolve => require(['./components/discount/DiscountRuleTest'], resolve)

const BusinessStatisticsList = resolve => require(['./components/operating/BusinessStatisticsList'], resolve)
const BusinessCostIncomeList = resolve => require(['./components/operating/BusinessCostIncomeList'], resolve)
const BusinessCostDetail = resolve => require(['./components/operating/BusinessCostDetail'], resolve)
const SubDetail = resolve => require(['./components/operating/SubDetail'], resolve)
const BusinessIncomeDetail = resolve => require(['./components/operating/BusinessIncomeDetail'], resolve)
const ProductCostIncomeList = resolve => require(['./components/operating/ProductCostIncomeList'], resolve)
const ProductCostDetail = resolve => require(['./components/operating/ProductCostDetail'], resolve)
const ProductIncomeDetail = resolve => require(['./components/operating/ProductIncomeDetail'], resolve)
const TeachReward = resolve => require(['./components/operating/TeachReward'], resolve)
const ProductStatisticsList = resolve => require(['./components/operating/ProductStatisticsList'], resolve)
const BasicData = resolve => require(['./components/operating/BasicData'], resolve)
const ProblemWarning = resolve => require(['./components/operating/ProblemWarning'], resolve)
const FullClassRate = resolve => require(['./components/operating/FullClassRate'], resolve)
const DataAnalysisList = resolve => require(['./components/operating/DataAnalysisList'], resolve)
const TargetSetList = resolve => require(['./components/operating/TargetSetList'], resolve)
const InputMainIncome = resolve => require(['./components/operating/InputMainIncome'], resolve)
const InputProductIncome = resolve => require(['./components/operating/InputProductIncome'], resolve)

const GradeSubjectStatisticsList = resolve => require(['./components/operating/GradeSubjectStatisticsList'], resolve)
const GradeSubjectCostIncomeList = resolve => require(['./components/operating/GradeSubjectCostIncomeList'], resolve)
const GradeSubjectCostDetail = resolve => require(['./components/operating/GradeSubjectCostDetail'], resolve)
const GradeSubjectIncomeDetail = resolve => require(['./components/operating/GradeSubjectIncomeDetail'], resolve)


Vue.use(VueRouter)
Vue.use(VueUI)
Vue.use(VueResource)

const Index = { template: '<div>欢迎来到誉优综合业务管理平台</div>' }


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
      {path: 'sys/role/dataPermission/:userId' , component: DataPermission },
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

      {path: 'sys/audit/campus/list' , component: CampusAuditList },
      {path: 'sys/edit/campus/:campusId' , component: CampusEditForm },
      {path: 'sys/campus/new/add' , component: CampusEditForm },

      {path: 'sys/campus/add' , component: CampusForm },
      {path: 'sys/campus/edit/:campusId' , component: CampusForm },
      {path: 'sys/room/list' , component: RoomList },
      {path: 'sys/room/add' , component: RoomForm },
      {path: 'sys/room/edit/:roomId' , component: RoomForm },

      {path: 'sys/room/new/list' , component: RoomNewList },
      {path: 'sys/room/new/add' , component: RoomNewForm },
      {path: 'sys/room/new/edit/:roomId' , component: RoomNewForm },

      {path: 'sys/cusId/list' , component: CusIdList },
      {path: 'sys/cusId/edit/:campusId' , component: CusIdForm },

      {path: 'sys/student/school/list' , component: StudentSchoolList },
      {path: 'sys/student/school/add' , component: StudentSchoolForm },
      {path: 'sys/student/school/edit/:studentSchoolId' , component: StudentSchoolForm },
      {path: 'sys/class/remuneration/list' , component: ClassRemunerationList },
      {path: 'sys/class/remuneration/add' , component: ClassRemunerationForm },
      {path: 'sys/class/remuneration/edit/:classRemunerationId' , component: ClassRemunerationForm },
      {path: 'sys/vacation/setting' , component: SummerWinter },
      {path: 'sys/vacation/add' , component: SummerWinterForm },

      {path: 'crowdfunding/list', component: CrowdfundingClassList },
      {path: 'crowdfunding/edit/:classId' , component: CrowdfundingClassDetail},

      {path: 'course/course/list' , component: CourseList },
      {path: 'course/course/add' , component: CourseForm },
      {path: 'course/course/edit/:courseId' , component: CourseForm },
      {path: 'course/courseType/list' , component: CourseTypeList },
      {path: 'course/courseType/add' , component: CourseTypeForm },
      {path: 'course/courseType/edit/:courseTypeId/:name', component:CourseTypeForm },
      {path: 'course/product/list',  component:  ProductList},
      {path: 'product/product/add' , component: ProductForm },
      {path: 'product/product/edit/:productId' , component: ProductForm },
      {path: 'course/teacher/schedule' , component: TeacherSchedule },
      {path: 'course/campus/schedule' , component: CampusSchedule },

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

      {path: 'enroll/student/reg/query/list' , component: StudentRegList },

      {path: 'enroll/crowdfunding/reg/:classId' , component: CrowdfundingRegList },

      {path: 'enroll/ClassHistoryList', component:ClassHistoryList},
      {path: 'enroll/student/studentRefundList', component:StudentRefundList},
      {path: 'enroll/student/turnClass', component:TurnClass},



      {path: 'settlement/account/list' , component: AccountList },
      {path: 'settlement/account/report/detail/:subject/:mainAccountId' , component: AccountReportDetail },
      {path: 'settlement/fee/accountmainbody' , component: AccountMainBodyOfFee },
      {path: 'settlement/fee/list/:mainAccountId' , component: FeeList },
      {path: 'settlement/fee/add/:mainAccountId' , component: FeeForm },
      {path: 'settlement/fee/edit/:mainAccountId/:feeId' , component: FeeForm },
      {path: 'settlement/account/report/profit/:mainAccountId' , component: ProfitReportDetail },
      {path: 'settlement/account/withdrawal/list/:mainAccountId' , component: AccountWithdrawalList },
      {path: 'settlement/account/withdrawal/apply/:mainAccountId' , component: ApplyWithdrawalForm },
      {path: 'settlement/withdrawal/list' , component: WithdrawalList },
      {path: 'settlement/feeCategory/list',  component:  FeeCategoryList},
      {path: 'settlement/feeCategory/add' , component: FeeCategoryForm },
      {path: 'settlement/feeCategory/edit/:feeCategoryId' , component: FeeCategoryForm },
      {path: 'settlement/incomeCategory/list',  component:  IncomeCategoryList},
      {path: 'settlement/incomeCategory/add' , component: IncomeCategoryForm },
      {path: 'settlement/incomeCategory/edit/:incomeCategoryId' , component: IncomeCategoryForm },


      {path: 'serviceManager/category/list' , component: CategoryList },
      {path: 'serviceManager/category/add' , component: CategorySaveForm},
      {path: 'serviceManager/category/edit/:categoryId' , component: CategoryEditForm },

      {path: 'serviceManager/goods/list', component:GoodsManagerList},
      {path: 'serviceManager/lease/list', component:LeaseManagerList},
      {path: 'serviceManager/demand/list', component:DemandManagerList},
      {path: 'serviceManager/order/list', component:OrderManagerList},
      {path: 'serviceManager/sellerRegister/list', component:SellerRegisterList},

      {path: 'attendance/attendance/list', component:AttendanceCourseClassList },
      {path: 'attendance/attendance/record/:classId', component:AttendanceRecordList },

      {path: 'report/charge/list', component:ChargeList },
      {path: 'report/consumeAggregation/list', component:AggregationConsumeList },

      {path: 'discount/category/list' , component: DiscountCategoryList },
      {path: 'discount/category/add' , component: DiscountCategoryForm},
      {path: 'discount/category/edit/:discountCategoryId' , component: DiscountCategoryForm},

      {path: 'discount/rule/list' , component: DiscountRuleList },
      {path: 'discount/rule/add' , component: DiscountRuleForm},
      {path: 'discount/rule/edit/:discountRuleId' , component: DiscountRuleForm},
      {path: 'discount/rule/test/:discountRuleId' , component: DiscountRuleTest},

      {path: 'discount/discount/list' , component: DiscountList },
      {path: 'discount/discount/add' , component: DiscountForm},
      {path: 'discount/discount/edit/:discountId' , component: DiscountForm},

      {path: 'operating/businessStatistics/list' , component: BusinessStatisticsList},
      {path: 'operating/businessStatistics/costIncomeList' , component: BusinessCostIncomeList},
      {path: 'operating/businessStatistics/costDetail' , component: BusinessCostDetail},
      {path: 'operating/businessStatistics/subDetail' , component: SubDetail},
      {path: 'operating/businessStatistics/incomeDetail' , component: BusinessIncomeDetail},
      {path: 'operating/businessStatistics/teachReward' , component: TeachReward},
      {path: 'operating/productStatistics/list' , component: ProductStatisticsList},
      {path: 'operating/productStatistics/costIncomeList' , component: ProductCostIncomeList},
      {path: 'operating/productStatistics/costDetail' , component: ProductCostDetail},
      {path: 'operating/productStatistics/incomeDetail' , component: ProductIncomeDetail},
      {path: 'operating/gradeSubjectStatistics/list' , component: GradeSubjectStatisticsList},
      {path: 'operating/gradeSubjectStatistics/costIncomeList' , component: GradeSubjectCostIncomeList},
      {path: 'operating/gradeSubjectStatistics/costDetail' , component: GradeSubjectCostDetail},
      {path: 'operating/gradeSubjectStatistics/incomeDetail' , component: GradeSubjectIncomeDetail},
      {path: 'operating/gradeSubjectStatistics/subDetail' , component: SubDetail},
      {
        path: 'operating/dataAnalysis/list' ,
        component: DataAnalysisList,
        children: [
          {path: 'basicData' , component: BasicData},
          {path: 'problemWarning' , component: ProblemWarning},
          {path: 'fullClassRate' , component: FullClassRate},
        ]
      },
      {path: 'operating/targetSet/list' , component: TargetSetList},
      {path: 'operating/targetSet/inputMainIncome' , component: InputMainIncome},
      {path: 'operating/targetSet/inputProductIncome' , component: InputProductIncome},


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

})


