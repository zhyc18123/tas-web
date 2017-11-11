<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">支付流水</div>
        </div>
        <div class="widget-body  am-fr">
          <div class="am-u-sm-12 am-form ">
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2  v-model="query.payWay">
                  <option value="">支付类型</option>
                  <option value="0">现金</option>
                  <option value="1">pos机</option>
                  <option value="2">转账</option>
                  <option value="3">账户</option>
                  <option value="4">在线支付</option>
                </select2>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <input type="text" v-model="query.courseOrderId" placeholder="课程订单号"/>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <input type="text" v-model="query.payOrderId" placeholder="支付订单号"/>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <input type="text" v-model="query.operator" placeholder="操作人"/>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <input type="text" v-model="query.operator" placeholder="操作人"/>
              </div>
            </div>


            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <date-picker v-model="query.startDate" >
                  <input type="text" placeholder="请选择开始日期" data-am-datepicker readonly required >
                </date-picker>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <date-picker v-model="query.endDate" >
                  <input type="text" placeholder="请选择结束日期" data-am-datepicker readonly required >
                </date-picker>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-u-end">
              <div class="am-form-group">
                <button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="search" ><span class="am-icon-search"></span>查询
                </button>
                <button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="exportExcel" v-if="hasPermission('export_pay_record_list')"><span class="am-icon-download"></span>导出excel
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
                prop="courseOrderId"
                label="课程订单号"
                min-width="200">
              </el-table-column>
              <el-table-column
                label="支付订单号"
                min-width="200">
                <template scope="scope">
                  {{scope.row.payInfoExt.bizseq}}
                </template>
              </el-table-column>
              <el-table-column
                label="pos流水号"
                min-width="200">
                <template scope="scope">
                  {{scope.row.payInfoExt.traceNo}}
                </template>
              </el-table-column>
              <el-table-column
                label="支付状态"
                min-width="100">
                <template scope="scope">
                  支付成功
                </template>
              </el-table-column>

              <el-table-column
                label="支付类型"
                min-width="100">
                <template scope="scope">
                  {{ {'0':'现金','1':'刷卡','2':'转账','3':'账户','4':'在线支付','5':'预付金'}[scope.row.payWay] }}
                </template>
              </el-table-column>

              <el-table-column
                label="支付方式"
                min-width="100">
                <template scope="scope">
                  {{ {'VSP001':'银行卡','VSP501':'微信支付','VSP511':'支付宝支付'}[scope.row.payInfoExt.trxCode] || scope.row.payInfoExt.trxCode  }}
                </template>
              </el-table-column>

              <el-table-column
                prop="amount"
                label="支付金额"
                min-width="150">
              </el-table-column>
              <el-table-column
                prop="studentGradeName"
                label="支付时间"
                min-width="200">
                <template scope="scope">
                  {{ scope.row.createTime | formatTime }}
                </template>
              </el-table-column>

              <el-table-column
                label="商户号"
                min-width="200">
                <template scope="scope">
                  {{ scope.row.payInfoExt.cusId  }}
                </template>
              </el-table-column>

              <el-table-column
                label="POS终端号"
                min-width="200">
                <template scope="scope">
                  {{ scope.row.payInfoExt.termId  }}
                </template>
              </el-table-column>
              <el-table-column
                prop="campusName"
                label="收费校区"
                min-width="200">
              </el-table-column>
              <el-table-column
                prop="operator"
                label="操作人"
                min-width="100">
              </el-table-column>

            </el-table>
          </div>

          <div class="am-u-lg-12 am-cf">

            <div class="am-fr">
              <pagination v-bind:total="total" v-bind:pageNo="pageNo" v-bind:pageSize="pageSize"
                          @paging="loadTableData"/>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import io from '../../lib/io'
  import util from '../../lib/util'
  import Pagination from '../base/Pagination'

  export default{
    data: function () {
      return {
        tableData: [],
        total: 0,
        pageSize: 10,
        pageNo: 1,
        query: {
          startDate : util.formatDate( util.firstDayOfMonth() ),
          endDate : util.formatDate( util.endDayOfMonth() )
        },
      }
    },
    components: {
      Pagination
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.loadTableData(this.pageNo)
    },
    methods: {
      search: function () {
        this.loadTableData(1)
      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        _this.$showLoading()
        io.post(io.apiAdminReportPayRecordList, $.extend({
          pageNo: _this.pageNo,
          pageSize: _this.pageSize
        }, _this.query), function (ret) {
          _this.$hiddenLoading()
          if (ret.success) {
            _this.total = ret.data.total
            _this.tableData = ret.data.list.map( (item ) => {
              item.payInfoExt  = item.payInfoExt ? JSON.parse(item.payInfoExt) : {}
              return item
            })
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      exportExcel:function(){
        io.downloadFile(io.apiAdminReportExportPayRecordList,this.query)
      }
    }
  }
</script>
