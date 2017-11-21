<template>
  <window ref="win" title="提现审核">
    <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id" onsubmit="return false ">
      <div class="am-u-sm-12 am-scrollable-horizontal">
        <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
          <thead class="bg-color">
          <tr>
            <th>学生姓名</th>
            <th>学生学号</th>
            <th>电话</th>
            <th>剩余余额</th>
            <th>年级</th>
            <th>就读学校</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td><span>{{extra.name}}</span></td>
            <td><span>{{extra.studentNo}}</span></td>
            <td><span>{{extra.phoneNo}}</span></td>
            <td><span>{{balanceAmount}}</span></td>
            <td><span>{{extra.gradeName}}</span></td>
            <td><span>{{extra.school}}</span></td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="am-u-sm-12 am-scrollable-horizontal">
        <table width="100%" class="am-table am-table-bordered am-table-compact">
          <tbody>
          <tr>
            <td class="bgColor">提现金额</td>
            <td><span class="am-text-danger">￥{{withdrawalDetail.amount}}</span></td>
            <td colspan="2"></td>
          </tr>
          <tr>
            <td class="bgColor">提现原因备注</td>
            <td><span class="am-text-danger">{{withdrawalDetail.reasonRemark}}</span></td>
            <td colspan="2"></td>
          </tr>
          <tr>
            <td class="bgColor">申请人</td>
            <td><span class="am-text-danger">{{withdrawalDetail.operatorName}}</span></td>
            <td class="bgColor">申请时间</td>
            <td><span class="am-text-danger">{{withdrawalDetail.createTime | formatDate}}</span></td>
          </tr>
          <tr>
            <td class="bgColor">审核原因备注</td>
            <td><input type="text" min="1" class="am-input-sm"  v-model="auditRemark"/></td>
            <td colspan="4"></td>
          </tr>


          </tbody>
        </table>
      </div>


      <div class="am-u-sm-12 am-text-center am-margin-top-lg">
        <button type="button" class="am-btn am-btn-primary" @click="handleBy">通过</button>
        <button type="button" class="am-btn am-btn-primary" @click="handleOverrule">驳回</button>
      </div>

    </form>
  </window>

</template>

<style scoped>

  .am-table>tbody>tr>td, .am-table>tbody>tr>th{
    text-align: left;
  }
  .bgColor {
    background-color: #eee;
    text-align: center!important;
  }
</style>


<script>
  import io from '../../lib/io'
  import conf from '../../lib/conf'
  import util from '../../lib/util'
  import storage from '../../lib/storage'
  export default{
    data: function () {
      return {
        withdrawalDetail: {},
        auditRemark: '',
        balanceWithdrawalId:'',
        extra:'',
        balanceAmount:'',
      }
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    methods: {
      loadTableData: function (balanceWithdrawalId) {
        var _this = this
        if (balanceWithdrawalId) {
          io.post(io.withdrawalDetail, {balanceWithdrawalId: balanceWithdrawalId},
            function (ret) {
              if (ret.success) {
                _this.withdrawalDetail = ret.data
                _this.balanceAmount = ret.data.remainAmount
                _this.extra = JSON.parse(ret.data.extra)
              } else {
                _this.$alert(ret.desc)
              }
            })
        }
      },
      show:function(){
        this.$refs.win.show(
          {width:1000}
        )
        this.loadTableData(this.balanceWithdrawalId)
      },
      handleBy() {
        var _this = this
        if(!this.auditRemark) {
          this.$alert('请输入审核备注')
          return
        }
        io.post(io.auditWithdrawal, {
            auditRemark: this.auditRemark,
            balanceWithdrawalId: this.balanceWithdrawalId,
            status: 1,
          },
          function (ret) {
            if (ret.success) {
              _this.$toast('通过成功')
              _this.$emit('completed')
              _this.handleCancel()
            } else {
              _this.$alert(ret.desc)
            }
          })
      },
      handleOverrule() {
        var _this = this
        if(!this.auditRemark) {
          this.$alert('请输入审核备注')
          return
        }
        io.post(io.auditWithdrawal, {
            auditRemark: this.auditRemark,
            balanceWithdrawalId: this.balanceWithdrawalId,
            status: 2,
          },
          function (ret) {
            if (ret.success) {
              _this.$toast('驳回成功')
              _this.$emit('completed')
              _this.handleCancel()
            } else {
              _this.$alert(ret.desc)
            }
          })
      },
      handleCancel() {
        this.$refs.win.close()
      },
    },

  }


</script>
