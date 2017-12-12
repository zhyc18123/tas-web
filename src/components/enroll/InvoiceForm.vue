<template>
  <window ref="win" :title="title">
    <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id" onsubmit="return false ">
      <div class="am-u-sm-12 am-scrollable-horizontal">
        <table width="100%" class="am-table am-table-bordered am-table-compact ">
          <colgroup>
            <col width="100"/>
            <col width="100"/>
            <col width="100"/>
            <col width="100"/>
          </colgroup>
          <tbody>
          <tr>
            <td class="bgColor">发票流水号：</td>
            <td>{{tableData.invoiceId}}</td>
            <td class="bgColor">发票订单号：</td>
            <td>{{tableData.orderId}}</td>
          </tr>
          <tr>
            <td class="bgColor">主要开票项目：</td>
            <td>{{tableData.invoiceProject}}</td>
            <td class="bgColor">价税合计金额：</td>
            <td>{{tableData.taxTotalAmount}}</td>
          </tr>
          <tr>
            <td class="bgColor">开票员：</td>
            <td>{{tableData.invoiceMember}}</td>
            <td class="bgColor">购货方姓名 ：</td>
            <td>{{tableData.buyerName}}</td>
          </tr>
          <tr>
            <td class="bgColor">购货方手机：</td>
            <td>
              <input type="Number" max="11"  class="am-input-sm refundWidth" v-if="type!== 'look'"  v-model="tableData.buyerPhone">
              <div v-else>{{tableData.buyerPhone}}</div>
            </td>
            <td class="bgColor">购货方邮箱：</td>
            <td>
              <input type="text"  class="am-input-sm refundWidth" v-if="type!== 'look'"  v-model="tableData.buyerEmail">
              <div v-else>{{tableData.buyerEmail}}</div>
            </td>
          </tr>
          <tr v-if="type === 'open'||type === 'reOpen'||type === 'look'">
            <td class="bgColor">开票备注：</td>
            <td colspan="3">
              <input type="text"  class="am-input-sm refundWidth" v-if="type!== 'look'"  v-model="tableData.remark">
              <div v-else>{{tableData.remark}}</div>
            </td>
          </tr>
          <tr v-if="type === 'rush' || type === 'look'">
            <td class="bgColor">红冲原因：</td>
            <td colspan="3">
              <input type="text"  class="am-input-sm refundWidth" v-if="type!== 'look'"  v-model="tableData.rushRedReason">
              <div v-else>{{tableData.rushRedReason}}</div>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="footer" v-if="type=== 'look'">
          <a :href="QRCode" target="_blank" download="二维码下载">二维码下载</a>
          <el-tooltip placement="top">
            <div slot="content"><img class="bing-student-src-big" :src="QRCode" alt=""></div>
            <img class="qrCode-img" :src="QRCode" alt="">
          </el-tooltip>
          <a href="javascript:void(0)" @click="type= 'reSendMail'">重发邮件</a>
          <a :href="tableData.pdfUrl">电子发票下载</a>
        </div>
      </div>
      <div class="am-u-sm-12 am-text-center am-margin-top-lg">
        <button type="button" class="am-btn am-btn-primary" @click="handleSave()">保存</button>
        <a href="javascript:void(0)" data-am-modal-close>
          <button class="am-btn am-btn-primary">取消</button>
        </a>
      </div>
    </form>
  </window>

</template>
<style scoped>
  .footer a {
    margin-right: 15px;
  }
  .footer .qrCode-img {
    width: 25px;
    margin-left: -18px;
    margin-right: 15px;
    margin-bottom: 2px;
    cursor: pointer;
    border: 1px solid #02c8c2;
  }
</style>

<script>
  import io from '../../lib/io'

  export default{
    data: function () {
      return {
        type: '',
        invoiceId: '',
        QRCode: '',
        invoiceSrc: '',
        tableData: {},
      }
    },
    props: ['regId'],
    computed: {
      title() {
        if (this.type === 'open') {
          return '开票申请'
        } else if (this.type === 'reOpen') {
          return '错票重发'
        } else if (this.type === 'rush') {
          return '红冲发票'
        }else if (this.type === 'look') {
          return '查看发票'
        }
      },
    },
    create() {
    },
    methods: {
      handleSave() {
        let email = this.tableData.buyerEmail,
          phone = this.tableData.buyerPhone,
          remark = this.tableData.remark,
          rushRedReason = this.tableData.rushRedReason;

        if (this.type === 'rush') {
          if (!this.check(email, phone,rushRedReason)) {
            return
          }
          this.saveRushInvoice()
        } else if (this.type === 'open') {
          if (!this.check(email, phone,remark)) {
            return
          }
          this.saveInvoice()
        } else if (this.type === 'reOpen') {
          if (!this.check(email, phone,remark)) {
            return
          }
          this.rushInvoiceCreateNew()
        } else if (this.type === 'reSendMail') {
          if (!this.check(email, phone)) {
            return
          }
          this.resendMail()
        }
      },
      check(email, phone, remark) {
        if (!this.validatePhone(phone)) {
          this.$alert('请输入正确电话！')
          return false
        }
        if (!this.validateEmail(email)) {
          this.$alert('请输入正确邮箱！')
          return false
        }
        if(remark !== undefined && !remark) {
          this.$alert('请输入备注原因！')
          return false
        }
        return true
      },
      validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      },
      validatePhone(phone) {
        var re = /^1\d{10}$/;
        return re.test(phone)
      },
      saveInvoice() {
        var _this = this
        io.post(io.saveInvoice, this.tableData, function (ret) {
          if (ret.success) {
            _this.$toast('开票成功')
            _this.close()
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      saveRushInvoice() {
        var _this = this
        io.post(io.saveRushInvoice, this.tableData, function (ret) {
          if (ret.success) {
            _this.$toast('红冲发票成功')
            _this.close()
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      rushInvoiceCreateNew() {
        var _this = this
        io.post(io.rushInvoiceCreateNew, this.tableData, function (ret) {
          if (ret.success) {
            _this.$toast('错票重开成功')
            _this.close()
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      resendMail() {
        var _this = this
        io.post(io.resendMail, this.tableData, function (ret) {
          if (ret.success) {
            _this.$toast('重发邮件成功')
            _this.close()
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      openInvoice: function () {
        var _this = this
        io.post(io.openInvoice, {
          regId: this.regId
        }, function (ret) {
          if (ret.success) {
            _this.tableData = ret.data
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      rushInvoice: function () {
        var _this = this
        io.post(io.rushInvoice, {
          invoiceId: this.invoiceId
        }, function (ret) {
          if (ret.success) {
            _this.tableData = ret.data
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      invoiceDetail: function () {
        var _this = this
        io.post(io.invoiceDetail, {
          invoiceId: this.invoiceId
        }, function (ret) {
          if (ret.success) {
            _this.tableData = ret.data
            _this.QRCode = io.apiQrcodeEncode + '?content=' + encodeURIComponent(ret.data.pdfUrl)
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      close() {
        this.$refs.win.close()
        this.$emit('completed')
      },
      show:function(){
        this.$refs.win.show({
          width: 1000
        })
        if (this.type === 'open') {
          this.openInvoice()
        } else if (this.type === 'rush' || this.type === 'reOpen') {
          this.rushInvoice()
        }else if (this.type === 'look') {
          this.invoiceDetail()
        }
      }
    }
  }


</script>
