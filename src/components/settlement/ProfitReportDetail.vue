<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">利润</div>
          <div class="widget-function am-fr">
            <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
          </div>
        </div>
        <div class="widget-body  am-fr">

          <div class="am-u-sm-12 am-form">
            <div class="am-u-sm-12 am-u-md-6 am-u-lg-3">
              <div class="am-form-group">
                <date-picker v-model="query.startDate">
                  <input type="text" class="am-form-field" placeholder="开始日期" data-am-datepicker
                         :value="query.startDate">
                </date-picker>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-6 am-u-lg-3">
              <div class="am-form-group">
                <date-picker v-model="query.endDate">
                  <input type="text" class="am-form-field" placeholder="结束日期" data-am-datepicker :value="query.endDate">
                </date-picker>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group am-cf">
                <button class="am-btn  am-btn-default am-btn-success am-btn-sm am-icon-search am-fr" type="button"
                        @click="search">查询
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

              <el-table-column type="expand">
                <template scope="props">
                  <h5>收入明细</h5>
                  <el-table
                    :data="props.row.realIncomeRecordList"
                    border
                    stripe
                    style="min-width: 100%">
                    <el-table-column
                      prop="remark"
                      label="备注"
                      min-width="100">
                    </el-table-column>
                    <el-table-column
                      label="金额"
                      min-width="100">
                      <template scope="scope">
                        {{scope.row.amount < 0 ? '' : '+'}}{{ scope.row.amount | formatNumber(2) }}

                      </template>
                    </el-table-column>
                    <el-table-column
                      label="时间"
                      min-width="100">
                      <template scope="scope">
                        {{scope.row.createTime | formatTime }}

                      </template>
                    </el-table-column>
                  </el-table>
                  <h5>成本明细</h5>
                  <el-table
                    :data="props.row.costRecordList"
                    border
                    stripe
                    style="min-width: 100%">
                    <el-table-column
                      prop="remark"
                      label="备注"
                      min-width="100">
                    </el-table-column>
                    <el-table-column
                      label="金额"
                      min-width="100">
                      <template scope="scope">
                        {{scope.row.amount < 0 ? '' : '+'}}{{ scope.row.amount | formatNumber(2) }}

                      </template>
                    </el-table-column>
                    <el-table-column
                      label="时间"
                      min-width="100">
                      <template scope="scope">
                        {{scope.row.createTime | formatTime }}

                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column
                label="开始时间"
                min-width="100">
                <template scope="scope">
                  {{scope.row.startDate | formatDate }}

                </template>
              </el-table-column>
              <el-table-column
                label="结束时间"
                min-width="100">
                <template scope="scope">
                  {{scope.row.endDate | formatDate }}

                </template>
              </el-table-column>
              <el-table-column
                label="收入"
                min-width="100">
                <template scope="scope">
                  {{scope.row.realIncomeAmount | formatNumber(2)}}
                </template>
              </el-table-column>
              <el-table-column
                label="成本"
                min-width="100">
                <template scope="scope">
                  {{scope.row.costAmount | formatNumber(2)}}
                </template>
              </el-table-column>
              <el-table-column
                label="利润"
                min-width="100">
                <template scope="scope">
                  {{scope.row.profitAmount | formatNumber(2)}}
                </template>
              </el-table-column>
            </el-table>
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
        query: {
          startDate: util.formatDate(util.firstDayOfMonth()),
          endDate: util.formatDate(util.endDayOfMonth())
        },
        searchConfig: {},
      }
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.query.mainAccountId = this.$params('mainAccountId')
      this.loadTableData();
    },
    methods: {
      search: function () {
        this.loadTableData()
      },
      loadTableData: function () {
        var _this = this
        io.post(io.apiAdminSettlementProfitDetaile, _this.query, function (ret) {
          if (ret.success) {
            _this.total = ret.data.total
            _this.tableData = [ret.data]
          } else {
            _this.$alert(ret.desc)
          }
        })
      }
    }
  }
</script>
