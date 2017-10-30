<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">期数列表</div>
        </div>
        <div class="widget-body  am-fr">

          <div class="am-u-sm-12 am-form ">
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2  v-model="query.areaTeamId" :options="areaTeams">
                </select2>
              </div>
            </div>
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-u-end">
              <div class="am-form-group">
                <button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="search" ><span class="am-icon-search"></span>查询
                </button>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
              <div class="am-form-group am-btn-group-xs">
                <button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="$router.push('/main/sys/period/add')" v-if="hasPermission('add')"><span
                  class="am-icon-plus"></span>新增
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
                width="300">
                <template scope="scope">
                  <el-button v-if="hasPermission('edit')" size="small" @click.native="$router.push('/main/sys/period/edit/'+scope.row.periodId)">编辑
                      </el-button>
                  <el-button :disabled="scope.row.isCurrent == 1" v-if="hasPermission('setup_current')" size="small"
                             @click.native="setupCurrent(scope.row.periodId ,0)">设置为当前期
                  </el-button>
                  <el-button size="small" @click.native="$router.push('/main/sys/period/continueApplySet/'+scope.row.periodId +
                              '?areaTeamId=' + query.areaTeamId)">续报设置
                  </el-button>
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

  import Pagination from '../base/Pagination'

  import io from '../../lib/io'

  export default{
    data: function () {
      return {
        tableData: [],
        total: 0,
        pageSize: 10,
        pageNo: 1,
        query: {
          areaTeamId : window.config.areaTeams[0] && window.config.areaTeams[0].areaTeamId || '' ,
        },
        searchConfig: {}
      }
    },
    components: {
      Pagination
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    computed: {
      areaTeams: function () {
        var options = ( this.$root.config.areaTeams || [] )
          .map(function (item) {
            return {value: item.areaTeamId, text: item.name}
          })
        return options
      }
    },
    created: function () {
      this.loadTableData(this.pageNo);
    },
    methods: {
      search:function(){
        this.loadTableData(1)
      },
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
