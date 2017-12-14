<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title am-fl">发票管理</div>
          <div class="widget-function am-fr">
            <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
          </div>
        </div>
        <div class="widget-body  am-fr">

          <div class="am-u-sm-12 am-form ">
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
              <div class="am-form-group am-btn-group-xs">
                <button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="handleShowInvoiceForm('open')"><span
                  class="am-icon-plus"></span>开票
                </button>
              </div>
            </div>

          </div>
          <div class="am-u-sm-12">
            <el-table
              :data="tableData"
              border
              stripe
              style="min-width: 100%">
              <el-table-column
                prop="invoiceId"
                label="发票流水号"
                min-width="140">
              </el-table-column>
              <el-table-column
                prop="buyerName"
                label="购货方名称"
                min-width="120">
              </el-table-column>
              <el-table-column
                prop="invoiceProject"
                label="主要开票项目"
                min-width="130">
              </el-table-column>
              <el-table-column
                prop="taxTotalAmount"
                label="价税合计金额"
                min-width="120">
              </el-table-column>
              <el-table-column
                prop="invoiceMember"
                label="开票员"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="status"
                label="开票类型"
                min-width="100">
                <template scope="scope">
                  <div>
                    {{scope.row.invoiceType === '1' ? '正票': '红票'}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="操作代码"
                min-width="130">
                <template scope="scope">
                  <div>{{{'10': '正票正常开具','11': '正票错票重开','20': '退货折让红票',
                    '21': '错票重开红票', '22' : '换票冲红'}[scope.row.operationCode]}}</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="createTime"
                label="开票时间"
                min-width="140">
                <template scope="scope">
                  <div>
                    {{scope.row.createTime | formatTime}}
                  </div>
                </template>
              </el-table-column>

              <el-table-column
                label="操作"
                width="260">
                <template scope="scope">
                  <el-button size="small" @click.native="handleShowInvoiceForm('look',scope.row.invoiceId)">查看
                  </el-button>
                  <el-button :disabled="scope.row.status === '0' || scope.row.invoiceType === '2'" @click.native="handleShowInvoiceForm('rush',scope.row.invoiceId)" size="small">红冲发票
                  </el-button>
                  <el-button :disabled="scope.row.status === '0' || scope.row.invoiceType === '2'" @click.native="handleShowInvoiceForm('reOpen',scope.row.invoiceId)" size="small">错票重开
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <invoice-form @completed="loadTableData()" :regId = "regId" ref="InvoiceForm"></invoice-form>
      </div>
    </div>

  </div>
</template>

<script>
  import io from '../../lib/io'
  import InvoiceForm from './InvoiceForm.vue'

  export default{
    data: function () {
      return {
        tableData: [],
        regId: '',
      }
    },
    components: {
      InvoiceForm
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.regId = this.$route.query.regId
      this.loadTableData()
    },
    methods: {
      handleShowInvoiceForm(type, invoiceId) {
        if (type === 'open') {
          let hasNormalInvoice = false
          for(let i =0,length = this.tableData.length; i < length; i++) {
            if (this.tableData[i].status === '1' && this.tableData[i].operationCode === '10') {
              hasNormalInvoice = true
              break
            }
          }
          if (hasNormalInvoice) {
            this.$alert('请先红冲当前订单发票记录或者选择错票重开!')
            return
          }
        }
        this.$refs.InvoiceForm.type = type
        this.$refs.InvoiceForm.invoiceId = invoiceId
        this.$refs.InvoiceForm.show()
      },
      loadTableData: function () {
        var _this = this
        this.$showLoading()
        io.post(io.invoiceList, {
          regId: this.regId
        }, function (ret) {
          _this.$hiddenLoading()
          if (ret.success) {
            _this.tableData = ret.data
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
    }
  }
</script>
