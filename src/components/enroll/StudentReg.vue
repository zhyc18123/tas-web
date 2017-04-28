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
        </tr>
        <tr>
          <td>电话：{{formData.phoneNo}}</td>
          <td>就读小学：{{formData.school}}</td>
        </tr>
      </table>
      </div>
      <div class="widget-body am-fr">

        <div id="tabs"  class="am-tabs" data-am-tabs="{noSwipe: 1}" >
          <ul class="am-tabs-nav am-nav am-nav-tabs">
            <li class="am-active"><a href="javascript: void(0)">班级报名</a></li>
            <li><a href="javascript: void(0)" @click="tabIndex = 1">待缴费</a></li>
            <li><a href="javascript: void(0)" @click="tabIndex = 2">订单信息</a></li>
            <li><a href="javascript: void(0)" @click="tabIndex = 3">在读班级</a></li>
            <li><a href="javascript: void(0)" @click="tabIndex = 4">班级历史</a></li>
            <li><a href="javascript: void(0)" @click="tabIndex = 5">学生信息</a></li>
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
              <student-edit-from :studentId="studentId" v-if="tabIndex == 5"></student-edit-from>
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

<script>
  import io from '../../lib/io'
  import util from '../../lib/util'
  import StudentEditForm from './StudentEditForm'
  import StudentApply from './StudentApply'
  import RegClassList from './RegClassList'
  import StudentOrderList from './StudentOrderList'
  import StudentClassList from './StudentClassList'
  import ClassHistoryList from './ClassHistoryList'
  export default{
    data(){
      return {
        studentId : '',
        tabIndex : 0 ,
        formData:[]
      }
    },
    components:{
      'student-edit-from': StudentEditForm,
      'student-apply': StudentApply,
      'reg-class-list': RegClassList,
      'student-order-list': StudentOrderList,
      'student-class-list': StudentClassList,
      'student-class-history-list': ClassHistoryList
    },
    created: function () {
      var studentId = this.$params('studentId')
      if (studentId) {
        this.studentId = studentId
        var _this = this
        io.get(io.apiAdminStudentDetail, {studentId: studentId},
          function (ret) {
            if (ret.success) {
              ret.data.student.birthday = util.formatDate(ret.data.student.birthday)
              _this.formData = ret.data.student
            }
          },
          function () {
            _this.$alert('请求服务器失败')
          })
      }
    },
    mounted: function () {

    },
    methods: {

    }
  }
</script>
