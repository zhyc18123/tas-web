<template>

  <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
    <div class="am-u-sm-12 am-scrollable-horizontal">
      <div class="am-u-sm-12 am-text-left am-margin-top-sm bold-font">第一步</div>
      <div class="am-u-sm-12 am-text-left am-margin-top-sm bold-font">原班信息</div>
      <table width="100%" class="am-table am-table-bordered am-table-compact ">
        <tbody>
        <tr>
          <td class="bgColor">期数：</td>
          <td>{{formData.periodName}}</td>
          <td class="bgColor">业务组：</td>
          <td>{{formData.busTeamName}}</td>
          <td class="bgColor">班级名称：</td>
          <td>{{formData.className}}</td>
        </tr>
        <tr>
          <td class="bgColor">班级编号：</td>
          <td>{{formData.classId}}</td>
          <td class="bgColor">任课老师：</td>
          <td>{{formData.teacherNames}}</td>
          <td class="bgColor">教室：</td>
          <td>{{formData.roomName}}</td>
        </tr>
        <tr>
          <td class="bgColor">开课日期：</td>
          <td>{{formData.startCourseTime | formatDate}}</td>
          <td class="bgColor">报读总讲次：</td>
          <td>{{formData.regLectureAmount}}</td>
          <td class="bgColor">已交金额：</td>
          <td>{{formData.payAmount}}</td>
        </tr>
        </tbody>
      </table>

      <div class="am-u-sm-12 am-text-left am-margin-top-sm">
        <label class="bold-font">
          已上讲次:
        </label>
        <label class="am-radio-inline" style="width: 70px;">
          <!--<input type="text" v-model="formData.studyAmount"/>-->
          <select v-model="formData.studyAmount">
            <option value="0">0</option>
            <option v-for="n in formData.regLectureAmount" :value="n">{{n}}</option>
          </select>
        </label>
        <label class="bold-font">
          &nbsp;剩余金额：
        </label>
        <label class="am-radio-inline font-color bold-font">
          <span>{{this.formData.remainingAmount}}￥</span>
        </label>
      </div>

      <div class="am-u-sm-12 am-text-left am-margin-top-sm bold-font">
        转班原因
      </div>

      <div class="am-u-sm-12 am-text-left am-margin-top-sm">
        <label class="am-radio-inline">
          <input type="radio" value="不开班" name="reason" v-model="formData.reason"> 不开班
        </label>
        <label class="am-checkbox-inline">
          <input type="radio" value="搬家或家庭原因" name="reason" v-model="formData.reason"> 搬家或家庭原因
        </label>
        <label class="am-checkbox-inline">
          <input type="radio" value="与原校时间冲突" name="reason" v-model="formData.reason"> 与原校时间冲突
        </label>
        <label class="am-checkbox-inline">
          <input type="radio" value="学生不愿上" name="reason" v-model="formData.reason"> 学生不愿上
        </label>
        <label class="am-checkbox-inline">
          <input type="radio" value="其他" name="reason" v-model="formData.reason"> 其他
        </label>
      </div>
    </div>

    <div class="am-u-sm-12 am-text-center am-margin-top-lg">
      <button type="button" class="am-btn am-btn-primary" @click="nextStep">下一步</button>
      <a href="javascript: void(0)" data-am-modal-close>
        <button type="button" class="am-btn am-btn-primary">取消</button>
      </a>
    </div>


  </form>

</template>
<style>
  .bold-font {
    font-weight: bold;
  }

  .bgColor {
    background-color: #eee;
    text-align: center;
  }
  .font-color{
    color: red;
  }
</style>

<script>
  import io from '../../lib/io'
  import math from '../../lib/math'

  import Pagination from '../base/Pagination'

  export default{
    data: function () {
      return {
        formData: {
          reason:'与原校时间冲突',
          studyAmount: 0,
          remainingAmount :0
        },
      }
    },

    props: ['regId', 'args'],

    created: function () {
      if (!this.regId) {
        this.loadTableData(this.args.regId2)
      } else {
        this.loadTableData(this.regId)
      }
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    watch: {
      regId: function (val) {
        if(val){
          this.loadTableData(val)
        }
      },
      'formData.studyAmount':function(){
          this.calRemainAmount()
      }
    },
    methods: {

      loadTableData: function (regId) {
        if (regId) {
          var _this = this
          io.post(io.apiAdminShowOldClassDetail, {regId: regId},
            function (ret) {
              if (ret.success) {
                _this.formData = $.extend({},_this.formData,ret.data)
                _this.formData.regLectureAmount = (ret.data.endAmount - ret.data.startAmount) + 1
                _this.formData.per = math.div(ret.data.totalAmount , _this.formData.regLectureAmount )
                _this.calRemainAmount()
              } else {
                _this.$alert(ret.desc)
              }
            })
        }
      },
      calRemainAmount :function(){
        this.formData.remainingAmount = math.round( math.sub( this.formData.totalAmount , math.mul( this.formData.studyAmount , this.formData.per )), 2)
      },
      nextStep: function () {
        this.$emit('goStep', 'step-two', {formData: this.formData})
      }
    }
  }


</script>
