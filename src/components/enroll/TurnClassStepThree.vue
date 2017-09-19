<template>
  <div>
    <div class="am-u-sm-12 am-scrollable-horizontal">
      <div class="am-u-sm-12 am-text-left am-margin-top-sm bold-font">转班确认</div>
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
          <td>{{newClass.periodName}}</td>
          <td class="bgColor">业务组：</td>
          <td>{{newClass.busTeamName}}</td>
          <td class="bgColor">班级名称：</td>
          <td>{{newClass.className}}</td>
        </tr>
        <tr>
          <td class="bgColor">学科：</td>
          <td>{{newClass.subjectName}}</td>
          <td class="bgColor">教室：</td>
          <td>{{newClass.roomName}}</td>
          <td class="bgColor">教师：</td>
          <td>{{newClass.teacherNames}}</td>
        </tr>
        <tr>
          <td class="bgColor">已上讲次：</td>
          <td>{{newClass.completedLectureAmount}}/{{newClass.lectureAmount}}</td>
          <td class="bgColor">启报讲次：</td>
          <td>{{newClass.startAmount}}</td>
          <td class="bgColor">截止讲次：</td>
          <td>{{newClass.endAmount}}</td>
        </tr>
        <tr>
          <td class="bgColor">转班差额：</td>
          <td colspan="5"><span class="am-text-danger">{{formData.balanceAmount}}</span></td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="am-u-sm-12 am-text-center am-margin-top-lg">
      <button type="button" class="am-btn am-btn-primary" @click="back">上一步</button>
      <button type="button" class="am-btn am-btn-primary" @click="confirm()">确定</button>
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
  import ChooseClass from  './TurnClassStepTwo'

  export default{
    data: function () {
      return {
        newClass :{} ,
        changeClass :{} ,
        formData: {},
      }
    },
    props: ['args','regId'],
    created: function () {
      this.newClass  = this.args['step-two']
      this.changeClass = this.args['step-one']
      this.formData.regId = this.regId
      this.formData.balanceAmount = math.round( this.changeClass.remainingAmount - math.mul( ( this.newClass.endAmount - this.newClass.startAmount + 1) , math.div(this.newClass.studyingFee , this.newClass.lectureAmount)),2)
      this.formData.oldClassId = this.changeClass.srcClass.classId
      this.formData.startAmount = this.newClass.startAmount
      this.formData.endAmount = this.newClass.endAmount
      this.formData.classId = this.newClass.classId
      this.formData.studyAmount = this.changeClass.studyAmount
    },
    methods: {
      confirm: function () {
        var _this = this
        _this.$showLoading()
        io.post(io.apiAdminTurnClass, $.extend({},_this.formData),
          function (ret) {
            _this.$hiddenLoading()
            if (ret.success) {
              _this.$emit("completed")
              if(_this.balanceAmount){
                _this.$alert("转班成功,请补缴差额(订单信息)")
              }else{
                _this.$alert("转班成功")
              }
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
