<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">测评设置</div>
        </div>
        <div class="widget-body  am-fr">

          <div class="am-u-sm-12 am-form ">
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2  v-model="query.areaTeamId" :options="areaTeams">
                </select2>
              </div>
            </div>
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2  v-model="query.periodId" :options="periods">
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
                        @click="$router.push('/main/measurement/test/add')"><span
                  class="am-icon-plus"></span>新建测评
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
                prop="areaTeamName"
                label="区域"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="periodName"
                label="期数"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="gradeName"
                label="年级"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="subjectName"
                label="科目"
                min-width="100">
              </el-table-column>
              <el-table-column
                label="班型"
                min-width="100">
                <template scope="scope">
                  <div>{{{'1': '不区分','2': '尖端','3': '状元','4': '尖子','5': '提高','6': '竞赛','7': '集训队'}[scope.row.level]}}</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="passingScore"
                label="及格分数"
                min-width="100">
              </el-table-column>
              <el-table-column
                label="适用校区"
                min-width="150">
                <template scope="scope">
                  <div>
                    <el-tooltip  effect="light" placement="top">
                      <div class="content-tooltip" slot="content">{{scope.row.campusNames.replace(/,/g, '\n')}}</div>
                      <a>查看</a>
                    </el-tooltip>
                  </div>
                </template>
              </el-table-column>

              <el-table-column
                label="操作"
                width="240">
                <template scope="scope">
                  <el-button size="small" @click.native="handleSettingWhitelist(scope.row)">设置白名单
                  </el-button>
                  <el-button v-if="hasPermission('edit')" size="small" @click.native="$router.push('/main/measurement/test/add?measurementId='+scope.row.measurementId)">编辑
                  </el-button>
                  <el-button v-if="hasPermission('del')" @click="handleDelete(scope.row.measurementId)" size="small">删除
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
        periods: [],
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
      this.loadPeriodData();
    },
    watch: {
      'query.areaTeamId'() {
        this.loadPeriodData()
      }
    },
    methods: {
      handleSettingWhitelist(row) {
        this.$router.push('/main/measurement/test/measureWhitelist?measurementId='+row.measurementId)
      },
      handleDelete(measurementId) {
        var _this = this
        io.post(io.deleteMeasurement, {
          measurementIdStr : measurementId
        }, function (ret) {
          if (ret.success) {
            _this.$toast('删除成功！')
            _this.loadTableData(1)

          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      loadPeriodData: function () {
        var _this = this
        if (!this.query.areaTeamId) {
          return
        }
        io.post(io.apiAdminPeriodListForAreaTeam, {
          areaTeamId : this.query.areaTeamId
        }, function (ret) {
          if (ret.success) {
            _this.periods = ret.data.map(function (item) {
              return {value: item.periodId, text: item.periodName }
            })
            _this.query.periodId = _this.query.periodId ? _this.query.periodId: ret.data.filter(item => item.isCurrent == 1 )[0].periodId
            _this.loadTableData(_this.pageNo);
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      search:function(){
        this.loadTableData(1)
      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.measurementList, {
          areaTeamId: _this.query.areaTeamId,
          periodId: _this.query.periodId,
          pageNo: _this.pageNo,
          pageSize: _this.pageSize,
        }, function (ret) {
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
<style scoped lang="less">
  .content-tooltip {
    unicode-bidi: embed;
    white-space: pre;
    font-size: 14px;
    line-height: 1.5;
  }
</style>
