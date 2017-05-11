<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">期数列表</div>
        </div>
        <div class="widget-body  am-fr">

          <div class="am-u-sm-12 am-u-md-6 am-u-lg-6">
            <div class="am-form-group">
              <div class="am-btn-toolbar">
                <div class="am-btn-group am-btn-group-xs">
                  <button type="button" class="am-btn am-btn-default am-btn-success"
                          @click="$router.push('/main/sys/period/add')" v-if="hasPermission('add')"><span
                    class="am-icon-plus"></span>新增
                  </button>
                </div>
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
                prop="periodNo"
                label="期次"
                min-width="50">
              </el-table-column>
              <el-table-column
                prop="periodName"
                label="期名"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="segments"
                label="段数"
                min-width="50">
              </el-table-column>
              <el-table-column
                label="时间段"
                min-width="200">
                <template scope="scope">
                  {{scope.row.startDate | formatDate }} ~ {{scope.row.endDate | formatDate }}
                </template>
              </el-table-column>

              <el-table-column
                label="是否当前期"
                min-width="100">
                <template scope="scope">
                  {{ scope.row.isCurrent == 0 ? '否' : '是' }}
                </template>
              </el-table-column>

              <el-table-column
                label="操作"
                width="200">
                <template scope="scope">
                  <el-button v-if="hasPermission('edit')" size="small" @click.native="$router.push('/main/sys/period/edit/'+scope.row.periodId)">编辑
                      </el-button>
                  <el-button :disabled="scope.row.isCurrent == 1" v-if="hasPermission('setup_current')" size="small" @click.native="setupCurrent(scope.row.periodId ,0)">设置为当前期</el-button>
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

  import Pagination from '../base/Pagination'

  import io from '../../lib/io'

  export default{
    data: function () {
      return {
        tableData: [],
        total: 0,
        pageSize: 5,
        pageNo: 1,
        query: {},
        searchConfig: {}
      }
    },
    components: {
      Pagination
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.loadTableData(this.pageNo);
    },
    methods: {
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminPeriodList, $.extend({
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
      setupCurrent:function(periodId){
        var _this = this
        io.post(io.apiAdminUpdateCurrentPeriod,{
            periodId
        }, function (ret) {
          if (ret.success) {
            _this.$toast('OK')
            _this.loadTableData()
          } else {
            _this.$alert(ret.desc)
          }
        })
      }
    }
  }
</script>
