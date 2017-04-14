<template>
  <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
    <div class="am-u-sm-12 am-scrollable-horizontal">
      <div class="am-u-sm-12 am-text-left am-margin-top-sm bold-font">退费信息</div>
      <table width="100%" class="am-table am-table-bordered am-table-compact ">
        <tbody>
        <tr>
          <td class="bgColor">学生姓名：</td>
          <td>{{tableData.studentName}}</td>
          <td class="bgColor">班级名称：</td>
          <td>{{tableData.className}}</td>
        </tr>
        <tr>
          <td class="bgColor">退讲数：</td>
          <td>{{tableData.refundLecture}}</td>
          <td class="bgColor">退费原因：</td>
          <td>{{tableData.description}}</td>
        </tr>
        <tr>
          <td class="bgColor">退费金额：</td>
          <td>{{tableData.amount}}</td>
          <td class="bgColor">操作人：</td>
          <td>{{tableData.createUserName}}</td>
        </tr>
        </tbody>
      </table>

    </div>

    <div class="am-u-sm-12 am-text-left am-margin-top-sm bold-font">
      退费方式:
        <span class="red" v-if="tableData.refundWay==2">现金</span>
        <span class="red"v-if="tableData.refundWay==3">余额账户</span>
        <span class="red" v-if="tableData.refundWay==4">银行卡转账</span>
    </div>

    <div class="am-u-sm-12 am-text-left am-margin-top-sm" v-if="tableData.refundWay==4">
      <label class="am-radio-inline">
        转账银行<input type="text" v-model="tableData.bankName">
      </label>
      <label class="am-checkbox-inline">
        银行开户城市<input type="text" v-model="tableData.bankCity">
      </label>
      <label class="am-checkbox-inline">
        姓名<input type="text" v-model="tableData.cardUser">
      </label>
      <label class="am-checkbox-inline">
        转账账号<input type="text" v-model="tableData.cardNo">
      </label>
    </div>

    <div class="am-u-sm-12 am-text-left am-margin-top-sm bold-font">审批状态</div>
    <div class="am-u-sm-12 am-text-left am-margin-top-sm">
      <label class="am-checkbox-inline">
        同意<input type="radio" v-model="formData.status" value="1" name="status">
      </label>
      <label class="am-checkbox-inline">
        拒绝<input type="radio" v-model="formData.status" value="2" name="status">
      </label>
    </div>

    <div class="am-u-sm-12 am-text-left am-margin-top-sm bold-font">
        <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>审批详情
    </div>
    <textarea required v-model="formData.returnResult"></textarea>

    <div class="am-u-sm-12 am-text-center am-margin-top-lg">
      <button type="button" class="am-btn am-btn-primary" @click="confirmToRefund">确定</button>
      <a href="javascript:void(0)" data-am-modal-close>
        <button class="am-btn am-btn-primary">取消</button>
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
  .red{
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
        formData: {},
      }
    },
    components: {},
    props: ['studentRefundId'],
    created: function () {
      if (this.studentRefundId) {
        this.loadStudentRefudnDetailData(this.studentRefundId)
      }
    },
    watch: {
      studentRefundId: function (val) {
        this.loadStudentRefudnDetailData(val)
      }
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    computed: {},
    methods: {
      loadStudentRefudnDetailData: function (studentRefundId) {
        var _this = this
        if (studentRefundId != null) {
          io.post(io.apiAdminStudentRefundDetail, {studentRefundId: studentRefundId},
            function (ret) {
              if (ret.success) {
                if (ret.data.status == null) {
                  _this.formData.status = 0
                }else {
                  _this.formData.status = ret.data.status
                }
                _this.formData.studentRefundId = ret.data.studentRefundId
                _this.formData.studentName = ret.data.studentName
                _this.formData.classId = ret.data.classId
                _this.formData.className = ret.data.className
                _this.formData.studentId = ret.data.studentId
                _this.formData.returnResult = ret.data.returnResult
                _this.tableData = ret.data
              } else {
                _this.$alert(ret.desc)
              }
            })
        }
      },
      confirmToRefund: function () {
        var _this = this
        io.post(io.apiAdminChangeStudentRefundStatus, {
            studentRefundId : _this.formData.studentRefundId ,
            status : _this.formData.status,
            returnResult : _this.formData.returnResult
          },
          function (ret) {
            if (ret.success) {
              _this.$alert('审批成功')
              _this.$emit('changeStudentRefund')
              _this.$root.$emit('studentRefundList:new')
            } else {
              _this.$alert('审批失败')
            }
          })


      }
    }
  }


</script>
