<template>
  <window ref="win" title="转让审核">
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
            <td class="bgColor">转让学生名字</td>
            <td><span class="am-text-danger">{{extra.destName}}</span></td>
            <td class="bgColor">转让学生学号</td>
            <td><span class="am-text-danger">{{extra.destStudentNo}}</span></td>
          </tr>
          <tr>
            <td class="bgColor">转让金额</td>
            <td><span class="am-text-danger">￥{{transferDetail.amount}}</span></td>
            <td colspan="2"></td>
          </tr>
          <tr>
            <td class="bgColor">转让原因备注</td>
            <td><span class="am-text-danger">{{transferDetail.reasonRemark}}</span></td>
            <td colspan="2"></td>
          </tr>
          <tr>
            <td class="bgColor">申请人</td>
            <td><span class="am-text-danger">{{transferDetail.operatorName}}</span></td>
            <td class="bgColor">申请时间</td>
            <td><span class="am-text-danger">{{transferDetail.createTime | formatDate}}</span></td>
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
        transferDetail: {},
        auditRemark: '',
        balanceTransferId:'',
        extra:'',
        balanceAmount:'',
      }
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    methods: {
      loadTableData: function (balanceTransferId) {
        var _this = this
        if (balanceTransferId) {
          io.post(io.transferDetail, {balanceTransferId: balanceTransferId},
            function (ret) {
              if (ret.success) {
                _this.transferDetail = ret.data
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
        this.loadTableData(this.balanceTransferId)
      },
      handleBy() {
        var _this = this
        if(!this.auditRemark) {
          this.$alert('请输入审核备注')
          return
        }
        io.post(io.auditTransfer, {
            auditRemark: this.auditRemark,
            balanceTransferId: this.balanceTransferId,
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
        io.post(io.auditTransfer, {
            auditRemark: this.auditRemark,
            balanceTransferId: this.balanceTransferId,
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
