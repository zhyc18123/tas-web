<template>
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12" >
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">学生报名</div>
        <div class="widget-function am-fr">
          <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
        </div>
      </div>
      <div class="am-padding-sm">
        <table style="width: 100%">
          <tr>
            <td rowspan="2" class="am-text-middle">{{formData.name}}</td>
            <td>学号：{{formData.studentNo}}</td>
            <td>年级：{{formData.gradeName}}</td>
            <td>账户余额：{{mainAccount.balanceAmount | formatNumber(2)}}</td>
          </tr>
          <tr>
            <td>电话：{{formData.phoneNo}}</td>
            <td>就读学校：{{formData.school}}</td>
            <td>绑定学员：
              <el-tooltip placement="top">
                <div slot="content"><img class="bing-student-src-big" :src="src" alt=""></div>
                <img class="bing-student-src" :src="src" alt="">
              </el-tooltip>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <div class="btn-box">
                <el-button size="small" @click="handleWithdrawal" type="primary">提现</el-button>
                <el-button size="small" @click="handleTransfer" type="primary">转让</el-button>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <balance-withdrawals ref="withdrawals"></balance-withdrawals>
      <balance-transfer ref="transfer"></balance-transfer>
      <div class="widget-body am-fr">

        <div id="tabs"  class="am-tabs" data-am-tabs="{noSwipe: 1}" >
          <ul class="am-tabs-nav am-nav am-nav-tabs">
            <li class="am-active"><a href="javascript: void(0)">班级报名</a></li>
            <li><a href="javascript: void(0)" @click="tabIndex = 1">待缴费</a></li>
            <li><a href="javascript: void(0)" @click="tabIndex = 2">订单信息</a></li>
            <li><a href="javascript: void(0)" @click="tabIndex = 3">在读班级</a></li>
            <li><a href="javascript: void(0)" @click="tabIndex = 4">班级历史</a></li>
            <li><a href="javascript: void(0)" @click="tabIndex = 5">测评成绩</a></li>
            <li><a href="javascript: void(0)" @click="tabIndex = 6">学生信息</a></li>
          </ul>

          <div class="am-tabs-bd am-tabs-bd-ofv">
            <div class="am-tab-panel am-active">
              <student-apply :studentId="studentId"  ></student-apply>
            </div>
            <div class="am-tab-panel">
              <reg-class-list :studentId="studentId" ></reg-class-list>
            </div>
            <div class="am-tab-panel">
              <student-order-list :studentId="studentId" v-if="tabIndex == 2"></student-order-list>
            </div>
            <div class="am-tab-panel">
              <student-class-list :studentId="studentId" v-if="tabIndex == 3"></student-class-list>
            </div>
            <div class="am-tab-panel">
              <student-class-history-list :studentId="studentId" v-if="tabIndex == 4"></student-class-history-list>
            </div>
            <div class="am-tab-panel">
              <evaluation-score :studentId="studentId" v-if="tabIndex == 5"></evaluation-score>
            </div>
            <div class="am-tab-panel">
              <student-edit-from @saveCompleted="loadStudent" :studentId="studentId" v-if="tabIndex == 6"></student-edit-from>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<style>

  .widget table{
    background: #eee;
  }
  .am-u-sm-12 tr{
    text-align: left;
  }
  .am-text-middle{
    font-size: 45px;
    text-align: center !important;
  }
</style>
<style scoped>
  .am-nav-tabs {
    background-color: #eef1f6;
  }
  .am-tabs-bd {
    border-color: #dfe6ec;
  }
  .am-nav-tabs>li>a {
    color: #666;
    font-size: 14px;
  }
  .am-nav-tabs>li.am-active>a{
    color: #0e90d2;
  }
  .am-nav>li>a:hover{
    background-color: #eef1f6;
    color: #333333;
  }
  .am-nav-tabs>li.am-active>a:hover{
    background-color: #fff;
    color: #0e90d2;
  }
  .bing-student-src {
    width: 27px;
    cursor: pointer;
    border: 1px solid #02c8c2;
  }
  .bing-student-src:hover{
    border-color: #000;
  }
  .btn-box {
    background: #eee;
    overflow: hidden;
    padding-top: 5px;
    padding-bottom: 10px;
  }
</style>

<script>
  import io from '../../lib/io'
  import conf from '../../lib/conf'
  import util from '../../lib/util'
  import StudentEditForm from './StudentEditForm'
  import StudentApply from './StudentApply'
  import RegClassList from './RegClassList'
  import StudentOrderList from './StudentOrderList'
  import StudentClassList from './StudentClassList'
  import ClassHistoryList from './ClassHistoryList'
  import BalanceTransfer from './BalanceTransfer.vue'
  import BalanceWithdrawals from './BalanceWithdrawals.vue'
  import EvaluationScore from './EvaluationScore.vue'
  export default{
    data(){
      let url = conf.studentBasePath + '/bind-student?studentId=' + this.$params('studentId')
      return {
        studentId : this.$params('studentId') ,
        tabIndex : 0 ,
        src : conf.baseApiPath + '/api/qrcode/encode?content=' + encodeURIComponent(url),
        formData:[],
        mainAccount:{}
      }
    },
    components:{
      BalanceTransfer,
      BalanceWithdrawals,
      EvaluationScore,
      'student-edit-from': StudentEditForm,
      'student-apply': StudentApply,
      'reg-class-list': RegClassList,
      'student-order-list': StudentOrderList,
      'student-class-list': StudentClassList,
      'student-class-history-list': ClassHistoryList
    },
    created: function () {
      this.loadStudent()
      this.loadMainAccount()
      var _this  = this
      this.$root.$on('mainAccount:change',function(){
        _this.loadMainAccount()
      })
      //init tabs
      $('#tabs').tabs();
    },
    mounted: function () {

    },
    methods: {
      handleWithdrawal() {
        this.$refs.withdrawals.studentId = this.studentId
        this.$refs.withdrawals.balanceAmount = Number(this.mainAccount.balanceAmount).toFixed(2)
        this.$refs.withdrawals.show()
      },
      handleTransfer() {
        this.$refs.transfer.studentId = this.studentId
        this.$refs.transfer.balanceAmount = Number(this.mainAccount.balanceAmount).toFixed(2)
        this.$refs.transfer.show()
      },
      loadMainAccount:function(){
        var _this = this
        io.post(io.apiAdminStudentMainAccount,{
          studentId : _this.studentId
        },function(ret){
          if(ret.success){
            _this.mainAccount = ret.data || { balanceAmount : 0 }
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
      loadStudent:function(){
        var _this = this
        io.post(io.apiAdminStudentDetail, {studentId: _this.studentId},
          function (ret) {
            if (ret.success) {
              ret.data.student.birthday = util.formatDate(ret.data.student.birthday)
              _this.formData = ret.data.student
            }})
      }

    }
  }
</script>
