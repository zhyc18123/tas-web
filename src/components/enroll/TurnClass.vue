<template>
  <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
    <div class="am-u-sm-12 am-scrollable-horizontal">
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
          <td>{{tableData.lectureAmount}}</td>
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
          <input type="text"  v-model="formData.studyAmount" value="0"/>
        </label>
        <label class="bold-font">
          剩余金额：
        </label>
        <label class="am-radio-inline">
          <span v-model="formData.remainingAmount">22</span>
        </label>
      </div>

      <div class="am-u-sm-12 am-text-left am-margin-top-sm bold-font">
        转班原因
      </div>

      <div class="am-u-sm-12 am-text-left am-margin-top-sm">
        <label class="am-radio-inline">
          <input type="radio" value="不开班" name="reason"  v-model="formData.reason"> 不开班
        </label>
        <label class="am-checkbox-inline">
          <input type="radio" value="搬家或家庭原因" name="reason"  v-model="formData.reason"> 搬家或家庭原因
        </label>
        <label class="am-checkbox-inline">
          <input type="radio" value="与原校时间冲突" name="reason"  v-model="formData.reason"> 与原校时间冲突
        </label>
        <label class="am-checkbox-inline">
          <input type="radio" value="学生不愿上" name="reason"  v-model="formData.reason"> 学生不愿上
        </label>
        <label class="am-checkbox-inline">
          <input type="radio" value="其他" name="reason"  v-model="formData.reason"> 其他
        </label>
      </div>
    </div>

    <window ref="second" title="转班-第二步">
      <choose-class  @second="$refs.second.close()"></choose-class>
    </window>

    <div class="am-u-sm-12 am-text-center am-margin-top-lg">
      <button type="submit" class="am-btn am-btn-primary" @click="nextStep">下一步</button>
      <button type="submit" class="am-btn am-btn-primary" @click="cancel">取消</button>
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
</style>

<script>
  import io from '../../lib/io'

  import Pagination from '../base/Pagination'
  import ChooseClass from  './ChooseClass'

  export default{
    data: function () {
      return {
        tableData: [],
        formData:{
        }
      }
    },
    components:{
      'choose-class':ChooseClass
    },

    props: ['regId'],
    created: function () {
      if (this.regId) {
        this.loadTableData(this.regId)
      }
    },
    watch: {
      regId: function (val) {
       this.loadTableData(val)
       }
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    methods: {
      /*check:function(){

       if(this.formData.payAmount <= 0 || this.formData.payAmount > ( this.courseOrder.payableAmount - this.courseOrder.paidAmount )){
       this.formData.payAmount = this.courseOrder.payableAmount - this.courseOrder.paidAmount
       }*/


      loadTableData: function (regId) {
        var _this = this
        if (regId != null) {
          io.post(io.apiAdminShowOldClassDetail, {regId: regId},
            function (ret) {
              if (ret.success) {
                _this.tableData = ret.data,
                _this.formData.regId = ret.data.regId
                _this.formData.classId = ret.data.classId
              } else {
                _this.$alert(ret.desc)
              }
            })
        }
      },
      nextStep: function () {
        var _this = this
        _this.$refs.second.show({
          width:1000,
          height:600
        })
        _this.$emit('first')
      },
      cancel:function () {
        var _this = this
        _this.$emit('first')
      }
    }
  }


</script>
