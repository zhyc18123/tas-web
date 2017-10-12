<template>

    <div class="am-u-sm-12 am-scrollable-horizontal">
      <div class="am-u-sm-12 am-text-left am-margin-top-sm bold-font">第一步</div>
      <div class="am-u-sm-12 am-text-left am-margin-top-sm bold-font">原班信息</div>
      <table width="100%" class="am-table am-table-bordered am-table-compact ">
        <colgroup>
          <col width="100"/>
          <col width="100"/>
          <col width="100"/>
          <col width="100"/>
          <col width="100"/>
          <col width="100"/>
        </colgroup>
        <tbody>
        <tr>
          <td class="bgColor">期数：</td>
          <td>{{changeClass.srcClass.periodName}}</td>
          <td class="bgColor">业务组：</td>
          <td>{{changeClass.srcClass.busTeamName}}</td>
          <td class="bgColor">班级名称：</td>
          <td>{{changeClass.srcClass.className}}</td>
        </tr>
        <tr>
          <td class="bgColor">班级编号：</td>
          <td>{{changeClass.srcClass.classNo}}</td>
          <td class="bgColor">任课老师：</td>
          <td>{{changeClass.srcClass.teacherNames}}</td>
          <td class="bgColor">教室：</td>
          <td>{{changeClass.srcClass.roomName}}</td>
        </tr>
        <tr>
          <td class="bgColor">开课日期：</td>
          <td>{{changeClass.srcClass.startCourseTime | formatDate}}</td>
          <td class="bgColor">报读总讲次：</td>
          <td>{{changeClass.regLectureAmount}}</td>
          <td class="bgColor">已交金额：</td>
          <td>{{changeClass.srcStudentReg.payAmount}}</td>
        </tr>
        <tr>
          <td class="bgColor">已上讲次:</td>
          <td>
            <select v-model="changeClass.studyAmount">
            <option value="0">0</option>
            <option v-for="n in changeClass.regLectureAmount" :value="n">{{n}}</option>
          </select></td>
          <td class="bgColor">剩余金额：</td>
          <td colspan="3"><span class="am-text-danger">￥{{changeClass.remainingAmount}}</span></td>
        </tr>
        <tr>
          <td class="bgColor">转班原因:</td>
          <td colspan="5">
            <label class="am-radio-inline">
              <input type="radio" value="不开班" name="reason" v-model="changeClass.reason"> 不开班
            </label>
            <label class="am-checkbox-inline">
              <input type="radio" value="搬家或家庭原因" name="reason" v-model="changeClass.reason"> 搬家或家庭原因
            </label>
            <label class="am-checkbox-inline">
              <input type="radio" value="与原校时间冲突" name="reason" v-model="changeClass.reason"> 与原校时间冲突
            </label>
            <label class="am-checkbox-inline">
              <input type="radio" value="学生不愿上" name="reason" v-model="changeClass.reason"> 学生不愿上
            </label>
            <label class="am-checkbox-inline">
              <input type="radio" value="其他" name="reason" v-model="changeClass.reason"> 其他
            </label>
          </td>
        </tr>
        </tbody>
      </table>

      <div class="am-u-sm-12 am-text-center am-margin-top-lg">
        <button type="button" class="am-btn am-btn-primary" @click="nextStep">下一步</button>
        <a href="javascript: void(0)" data-am-modal-close>
          <button type="button" class="am-btn am-btn-primary">取消</button>
        </a>
      </div>

    </div>



</template>
<style>
  .bold-font {
    font-weight: bold;
  }

  .bgColor {
    background-color: #eee;
    text-align: center;
  }

</style>

<script>
  import io from '../../lib/io'
  import math from '../../lib/math'

  import Pagination from '../base/Pagination'

  export default{
    data: function () {
      return {
        changeClass:{
          srcClass: {},
          srcStudentReg : {},
          reason:'与原校时间冲突',
          studyAmount: 0,
          remainingAmount :0
        },
        amountOfEachLecture:0
      }
    },
    props: ['regId', 'args'],
    created:function(){
      if(this.regId){
        this.loadTableData(this.regId)
      }
    },
    watch: {
      regId: function (val) {
        if(val){
          this.loadTableData(val)
        }
      },
      'changeClass.studyAmount':function(){
          this.calRemainAmount()
      }
    },
    methods: {

      loadTableData: function (regId) {
        if (regId) {
          var _this = this
          io.post(io.apiAdminStudentRegDetail, {regId: regId},
            function (ret) {
              if (ret.success) {
                _this.changeClass.srcClass = ret.data.courseClass
                _this.changeClass.srcStudentReg = ret.data.studentReg
                _this.changeClass.regLectureAmount = ( ret.data.studentReg.endAmount - ret.data.studentReg.startAmount) + 1
                _this.amountOfEachLecture = math.div(ret.data.studentReg.totalAmount , _this.changeClass.regLectureAmount )
                _this.calRemainAmount()
              } else {
                _this.$alert(ret.desc)
              }
            })
        }
      },
      calRemainAmount :function(){
        this.changeClass.remainingAmount = math.round( math.sub( this.changeClass.srcStudentReg.totalAmount , math.mul( this.changeClass.studyAmount , this.amountOfEachLecture )), 2)
      },
      nextStep: function () {
        this.$emit('goStep', 'step-two', this.changeClass )
      }
    }
  }


</script>
