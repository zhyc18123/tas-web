<template>

  <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
    <div class="am-u-sm-12 am-scrollable-horizontal">
      <div class="am-u-sm-12 am-text-left am-margin-top-sm bold-font">第一步</div>
      <div class="am-u-sm-12 am-text-left am-margin-top-sm bold-font">原班信息</div>
      <table width="100%" class="am-table am-table-bordered am-table-compact ">
        <tbody>
        <tr>
          <td class="bgColor">期数：</td>
          <td>{{tableData.periodName}}</td>
          <td class="bgColor">业务组：</td>
          <td>{{tableData.busTeamName}}</td>
          <td class="bgColor">班级名称：</td>
          <td>{{tableData.className}}</td>
        </tr>
        <tr>
          <td class="bgColor">班级编号：</td>
          <td>{{tableData.classId}}</td>
          <td class="bgColor">任课老师：</td>
          <td>{{tableData.teacherNames}}</td>
          <td class="bgColor">教室：</td>
          <td>{{tableData.roomName}}</td>
        </tr>
        <tr>
          <td class="bgColor">开课日期：</td>
          <td>{{tableData.startCourseTime | formatDate}}</td>
          <td class="bgColor">报读总讲次：</td>
          <td>{{tableData.sum}}</td>
          <td class="bgColor">已交金额：</td>
          <td>{{tableData.payAmount}}</td>
        </tr>
        </tbody>
      </table>

      <div class="am-u-sm-12 am-text-left am-margin-top-sm">
        <label class="bold-font">
          以上讲次:
        </label>
        <label class="am-radio-inline">
          <!--<input type="text" v-model="formData.studyAmount"/>-->
          <select v-model="formData.studyAmount">
            <option>0</option>
            <option v-for="n in tableData.sum">{{n}}</option>
          </select>
        </label>
        <label class="bold-font">
          剩余金额：￥
        </label>
        <label class="am-radio-inline font-color bold-font">
          <span v-model="formData.remainingAmount">{{remaining>=0?remaining:tableData.payAmount}}</span>
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
      <button type="submit" class="am-btn am-btn-primary" @click="nextStep">下一步</button>
      <a href="javascript: void(0)" data-am-modal-close>
        <button type="submit" class="am-btn am-btn-primary">取消</button>
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

  import Pagination from '../base/Pagination'

  export default{
    data: function () {
      return {
        tableData: [],
        formData: {
          studyAmount: 0
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
        this.loadTableData(val)
      }
    },
    computed:{
      remaining:function () {
        this.formData.remainingAmount = (this.tableData.payAmount) - (this.formData.studyAmount * this.tableData.per)
        return (this.tableData.payAmount) - (this.formData.studyAmount * this.tableData.per)
      }
    },
    methods: {

      loadTableData: function (regId) {
        if (regId != null) {
          var _this = this
          io.post(io.apiAdminShowOldClassDetail, {regId: regId},
            function (ret) {
              if (ret.success) {
                _this.tableData = ret.data
                _this.tableData.sum = (ret.data.endAmount - ret.data.startAmount) + 1
                _this.tableData.per = (ret.data.totalAmount / _this.tableData.sum)
                _this.remaining = (ret.data.payAmount) - (_this.formData.studyAmount * _this.tableData.per)
                //_this.tableData.remainingAmount = (ret.data.payAmount) - (_this.formData.studyAmount * _this.tableData.per)
                _this.formData.reason = '与原校时间冲突'
                _this.formData.regId = ret.data.regId
                _this.formData.classId = ret.data.classId
                _this.formData.studyingFee = ret.data.studyingFee
                _this.formData.endAmount = ret.data.endAmount
                _this.formData.counts = ret.data.lectureAmount
              } else {
                _this.$alert(ret.desc)
              }
            })
        }
      },
      nextStep: function () {
        this.$emit('goStep', 'step-two', {regId: this.regId, formData: this.formData})
      }
    }
  }


</script>
