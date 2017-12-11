<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">发票财务主体</div>
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
                <select2  v-model="query.campusId" :options="campuses">
                  <option value="">请选择校区</option>
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
                <button v-if="hasPermission('add')" type="button" class="am-btn am-btn-default am-btn-success"
                        @click="$router.push('/main/sys/invoice/invoiceMainPartForm')"><span
                  class="am-icon-plus"></span>新建财务主体
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
                prop="financeSubjectName"
                label="财务主体"
                min-width="150">
              </el-table-column>
              <el-table-column
                prop="areaTeamName"
                label="区域"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="campusNames"
                label="校区"
                min-width="150">
              </el-table-column>

              <el-table-column
                label="操作"
                width="240">
                <template scope="scope">
                  <el-button v-if="hasPermission('edit')" size="small" @click.native="$router.push('/main/sys/invoice/invoiceMainPartForm?financeSubjectId='+scope.row.financeSubjectId)">编辑
                  </el-button>
                  <el-button v-if="hasPermission('edit')" @click="handleStop(scope.row.financeSubjectId)" size="small">停用
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
        campuses: [],
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
      this.loadTableData()
      this.loadCampusData()
    },
    watch: {
      'query.areaTeamId'() {
        this.loadCampusData()
      }
    },
    methods: {
      handleSettingWhitelist(row) {
        this.$router.push('/main/sys/measure/measureWhitelist?financeSubjectId='+row.financeSubjectId)
      },
      handleStop(financeSubjectId) {
        var _this = this
        io.post(io.deleteMeasurement, {
          financeSubjectIdStr : financeSubjectId
        }, function (ret) {
          if (ret.success) {
            _this.$toast('删除成功！')
            _this.loadTableData(1)

          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      loadCampusData:function(){
        var _this  = this
        if (!this.query.areaTeamId) {
          return
        }
        io.post(io.apiAdminCampusOfAreaTeam, {
          areaTeamId : _this.query.areaTeamId
        }, function (ret) {
          if (ret.success) {
            _this.campuses = ret.data.map(function (item) {
              return {value: item.campusId, text: item.campusName }
            })
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
        io.post(io.financeSubjectList, {
          areaTeamId: _this.query.areaTeamId,
          campusId: _this.query.campusId,
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
