<template>
  <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
    <div class="am-u-sm-12 am-scrollable-horizontal">
      <div class="am-u-sm-12 am-text-left am-margin-top-sm bold-font">转班确认</div>
      <table width="100%" class="am-table am-table-bordered am-table-compact ">
        <tbody>
        <tr>
          <td class="bgColor">期数：</td>
          <td>{{this.newClass.periodName}}</td>
          <td class="bgColor">业务组：</td>
          <td>{{this.newClass.busTeamName}}</td>
          <td class="bgColor">班级名称：</td>
          <td>{{this.newClass.className}}</td>
        </tr>
        <tr>
          <td class="bgColor">学科：</td>
          <td>{{this.newClass.subjectName}}</td>
          <td class="bgColor">教室：</td>
          <td>{{this.newClass.roomName}}</td>
          <td class="bgColor">教师：</td>
          <td>{{this.newClass.teacherNames}}</td>
        </tr>
        <tr>
          <td class="bgColor">已上讲次：</td>
          <td>{{this.newClass.completedLectureAmount}}/{{this.newClass.lectureAmount}}</td>
          <td class="bgColor">启报讲次：</td>
          <td>{{this.newClass.startAmount}}</td>
          <td class="bgColor">截止讲次：</td>
          <td>{{this.newClass.endAmount}}</td>
        </tr>
        </tbody>
      </table>

      <div class="am-u-sm-12 am-text-left am-margin-top-sm red">
        <label class="bold-font">
          转班差额:
        </label>
        <label class="am-radio-inline">
          <span>{{formData.balanceAmount}}</span>
        </label>
      </div>
    </div>

    <div class="am-u-sm-12 am-text-center am-margin-top-lg">
      <button type="button" class="am-btn am-btn-primary" @click="back">上一步</button>
      <button type="button" class="am-btn am-btn-primary" @click="confirm()">确定</button>
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

  .red {
    color: red;
  }
</style>

<script>
  import io from '../../lib/io'
  import math from '../../lib/math'

  import Pagination from '../base/Pagination'
  import ChooseClass from  './TurnClassStepTwo'

  export default{
    data: function () {
      return {
        newClass :{} ,
        refundClass : {},
        formData: {},
      }
    },
    props: ['args','regId'],
    created: function () {
      this.newClass  = this.args.newClass
      this.refundClass  = this.args.refundClass
      this.formData.regId = this.regId
      this.formData.balanceAmount = math.round( this.refundClass.remainingAmount - math.mul( ( this.newClass.endAmount - this.newClass.startAmount + 1) , math.div(this.newClass.studyingFee , this.newClass.lectureAmount)),2)
      this.formData.oldClassId = this.refundClass.classId
      this.formData.startAmount = this.newClass.startAmount
      this.formData.endAmount = this.newClass.endAmount
      this.formData.classId = this.newClass.classId
      this.formData.studyAmount = this.refundClass.studyAmount
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    methods: {
      confirm: function () {
        var _this = this
        _this.$showLoading()
        io.post(io.apiAdminTurnClass, $.extend({},_this.formData),
          function (ret) {
            _this.$hiddenLoading()
            if (ret.success) {
              _this.$toast('OK')
              _this.$emit("completed")
              //通过实践通知订单组件重新加载数据
              _this.$root.$emit('order:new')
              _this.$root.$emit('class:new')
            } else {
              _this.$alert(ret.desc)
            }
          })
      },
      back: function () {
        this.$emit('goStep', 'step-two',this.args)
      }
    }
  }


</script>
