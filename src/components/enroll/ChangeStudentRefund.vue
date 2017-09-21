<template>
  <window ref="win" title="退费审批">
  <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
    <div class="am-u-sm-12 am-scrollable-horizontal">
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
        <tr>
          <td class="bgColor">退费方式:</td>
          <td colspan="3" class="am-text-danger">{{ {'2':'现金' ,'3':'余额账户','4':'银行卡转账'}[tableData.refundWay] || '未知' }}</td>
        </tr>
        <template v-if="tableData.refundWay==4">
          <tr>
            <td class="bgColor">转账银行:</td>
            <td>
              {{tableData.bankName}}
            </td>
            <td class="bgColor">银行开户城市:</td>
            <td>
              {{tableData.bankCity}}
            </td>
          </tr>
          <tr>
            <td class="bgColor">账号姓名:</td>
            <td>
              {{tableData.cardUser}}
            </td>
            <td class="bgColor">转账账号:</td>
            <td>
              {{tableData.cardNo}}
            </td>
          </tr>
        </template>

        <tr>
          <td class="bgColor">审批状态:</td>
          <td colspan="3">
            <label class="am-checkbox-inline">
              <input type="radio" v-model="formData.status" value="1" name="status">同意
            </label>
            <label class="am-checkbox-inline">
              <input type="radio" v-model="formData.status" value="2" name="status">拒绝
            </label>
          </td>
        </tr>
        <tr>
          <td class="bgColor">审批意见:</td>
          <td colspan="3">
            <textarea required v-model="formData.returnResult"></textarea>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="am-u-sm-12 am-text-center am-margin-top-lg">
      <button type="button" class="am-btn am-btn-primary" @click="confirmToRefund">确定</button>
      <a href="javascript:void(0)" data-am-modal-close>
        <button class="am-btn am-btn-primary">取消</button>
      </a>
    </div>

  </form>
  </window>

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

  .am-u-sm-12 tr{
    text-align: left;
  }

</style>

<script>
  import io from '../../lib/io'

  import Pagination from '../base/Pagination'

  export default{
    data: function () {
      return {
        tableData: [],
        formData: { studentRefundId : '' },
      }
    },
    methods: {
      loadStudentRefundDetailData: function () {
        var _this = this
        io.post(io.apiAdminStudentRefundDetail, {studentRefundId: _this.formData.studentRefundId},
          function (ret) {
            if (ret.success) {
              if (ret.data.status == null) {
                _this.formData.status = 0
              }else {
                _this.formData.status = ret.data.status
              }
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
      },
      confirmToRefund: function () {
        if(!this.formData.status || this.formData.status ==  0 ){
          this.$alert('请选择审批状态')
          return
        }
        var _this = this
        _this.$showLoading()
        io.post(io.apiAdminChangeStudentRefundStatus, {
            studentRefundId : _this.formData.studentRefundId ,
            status : _this.formData.status,
            returnResult : _this.formData.returnResult
          },
          function (ret) {
            _this.$hiddenLoading()
            if (ret.success) {
              _this.$toast('处理成功')
              _this.$emit('completed')
              _this.$refs.win.close()
            } else {
              _this.$alert('审批失败')
            }
          })


      },
      show:function(){
        this.$refs.win.show({
          width: 1000
        })
        this.loadStudentRefundDetailData()
      }
    }
  }


</script>
