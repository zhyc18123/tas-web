<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">成本录入列表</div>
          <div class="widget-function am-fr">
            <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
          </div>
        </div>
        <div class="widget-body  am-fr">

          <div class="am-u-sm-12 am-form">
            <div class="am-u-sm-12 am-u-md-6 am-u-lg-3">
              <div class="am-form-group">
                <date-picker v-model="query.startDate">
                  <input type="text" class="am-form-field" placeholder="开始日期" data-am-datepicker>
                </date-picker>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-6 am-u-lg-3">
              <div class="am-form-group">
                <date-picker v-model="query.endDate">
                  <input type="text" class="am-form-field" placeholder="结束日期" data-am-datepicker>
                </date-picker>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-u-end">
              <div class="am-form-group">
                <button class="am-btn  am-btn-default am-btn-success am-btn-sm am-icon-search " type="button"
                        @click="search">查询
                </button>
                <button class="am-btn  am-btn-default am-btn-success am-btn-sm" type="button"
                        @click="$router.push('/main/settlement/fee/add/'+query.mainAccountId )">录入
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
                prop="remark"
                label="备注"
                min-width="100">
              </el-table-column>
              <el-table-column
                label="金额"
                min-width="100">
                <template scope="scope">
                  {{scope.row.amount }}

                </template>
              </el-table-column>
              <el-table-column
                label="时间"
                min-width="100">
                <template scope="scope">
                  {{scope.row.createTime | formatTime }}

                </template>
              </el-table-column>

              <el-table-column
                prop="receiverMainAccountName"
                label="收款主体"
                min-width="200">
              </el-table-column>


              <el-table-column
                label="状态"
                min-width="100">
                <template scope="scope">
                  {{scope.row.status == 0 ? '未审核' : ( scope.row.status == 1 ? '审核通过' : '审核失败' ) }}

                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="120">
                <template scope="scope">
                  <el-dropdown v-if="scope.row.status == 0">
                    <span class="el-dropdown-link">
                      操作菜单<i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="auditing(scope.row.feeId, 1 )">审核通过</el-dropdown-item>
                      <el-dropdown-item @click.native="auditing(scope.row.feeId , 2)">审核失败</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
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
          mainAccountId: this.$params('mainAccountId'),
          startDate: util.formatDate(util.firstDayOfMonth()),
          endDate: util.formatDate(util.endDayOfMonth())
        },
        searchConfig: {}
      }
    },
    components: {
      Pagination
    },
    mounted: function () {
      $(window).smoothScroll()
      $('[data-am-dropdown]', this.$el).dropdown();

    },
    created: function () {
      this.loadTableData(this.pageNo);
    },
    methods: {
      search: function () {
        this.loadTableData()
      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminSettlementFeelList, $.extend({
          pageNo: _this.pageNo,
          pageSize: _this.pageSize
        }, _this.query), function (ret) {
          if (ret.success) {
            _this.total = ret.data.total
            _this.tableData = ret.data.list
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      auditing: function (feeId, status) {
        var _this = this
        io.post(io.apiAdminSettlementAuditingFee, {
          feeId: feeId,
          status: status
        }, function (ret) {
          if (ret.success) {
            _this.loadTableData()
          } else {
            _this.$alert(ret.desc)
          }
        })
      }
    }
  }
</script>
