<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title am-fl">班主任续读（营运指标）</div>
        </div>
        <div class="widget-body  am-fr">
          <multiple-toolbar ref="toolbar"  class="toolbar" @search="handleFind" teacherNamePlaceholder="班主任名称"
                            areaTeam busTeam  period  teacherName
          ></multiple-toolbar>
          <div class="am-u-sm-12 am-form-group">
            <el-button size="small" type="success" @click="handleExport">
              <span class="am-icon-download"></span>&nbsp;&nbsp;导出</el-button>
          </div>
          <div class="am-u-sm-12">
            <el-table
              :data="tableData"
              border
              maxHeight="600"
              empty-text="暂无数据"
              stripe
              style="min-width: 100%">
              <el-table-column
                prop="busTeamName"
                min-width="160"
                label="业务组">
              </el-table-column>
              <el-table-column
                prop="periodName"
                min-width="160"
                label="期数">
              </el-table-column>
              <el-table-column
                prop="teacherName"
                min-width="160"
                label="班主任">
              </el-table-column>
              <el-table-column
                prop="realPersonNum"
                min-width="160"
                label="本期人数">
              </el-table-column>
              <el-table-column
                prop="nowPeriodNum"
                min-width="160"
                label="本期科数">
              </el-table-column>
              <el-table-column
                prop="sequentialNum"
                min-width="160"
                label="顺期科数">
              </el-table-column>
              <el-table-column
                prop="sequentialRate"
                min-width="160"
                label="顺期续读率">
              </el-table-column>
              <el-table-column
                prop="targetSequentialNum"
                min-width="160"
                label="目标顺期续读率">
              </el-table-column>
              <el-table-column
                prop="stepNum"
                min-width="160"
                label="跨期科数">
              </el-table-column>
              <el-table-column
                prop="stepRate"
                min-width="160"
                label="跨期续读率">
              </el-table-column>
              <el-table-column
                prop="targetStepNum"
                min-width="160"
                label="目标跨期续读率">
              </el-table-column>
              <el-table-column
                align="center"
                fixed="right"
                label="操作"
                width="120">
                <template scope="scope">
                  <el-button size="small" @click="handleDetail(scope.row.seniorRegDetailVoList)">查看明细</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <senior-comletion-rate-detail ref="seniorComletionRateDetail"></senior-comletion-rate-detail>
        <div class="am-u-lg-12 am-cf">
          <div class="am-fr">
            <pagination :isShowTotal="false" v-bind:total="total" v-bind:pageNo="pageNo" v-bind:pageSize="pageSize"
                        @paging="loadTableData"/>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import io from '../../lib/io'
  import MultipleToolbar from './MultipleToolbar.vue'
  import SeniorComletionRateDetail from './SeniorComletionRateDetail.vue'
  import Pagination from '../base/Pagination.vue'
  import moment from 'moment'

  export default{
    data:function(){
      return {
        total: 0,
        pageSize: 10,
        pageNo: 1,
        tableData: [],
      }
    },
    components: {
      MultipleToolbar, Pagination, SeniorComletionRateDetail
    },
    watch: {

    },
    computed: {

    },
    mounted :function(){
      $(window).smoothScroll()
//      this.loadTableData()
    },
    methods:{
      handleFind() {
        this.loadTableData(1)
      },
      handleDetail(seniorRegDetailVoList) {
        this.$refs.seniorComletionRateDetail.show()
        this.$refs.seniorComletionRateDetail.tableData = seniorRegDetailVoList || []
      },
      handleExport() {
        var _this = this

        io.downloadFile(io.exportSeniorComletionRate, this.formatData(), function (ret) {
          if (ret.success) {
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1

        io.post(io.findSeniorComletionRateVoPage, Object.assign({}, {
          pageNo: _this.pageNo,
          pageSize: _this.pageSize
        }, this.formatData()), function (ret) {
          if (ret.success) {
            _this.total = ret.data.total
            _this.tableData = ret.data.list
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      formatData() {
        let toolbar = this.$refs.toolbar
        let busTeamIds = [],periodIds = [], gradeIds = []
        if(toolbar.formData.busTeamIds.length === 0) {
          toolbar.busTeams.map(val => {
            busTeamIds.push(val.busTeamId)
          })
        } else {
          busTeamIds = toolbar.formData.busTeamIds
        }
        if(toolbar.formData.periodIds.length === 0) {
          toolbar.periods.map(val => {
            periodIds.push(val.periodId)
          })
        } else {
          periodIds = toolbar.formData.periodIds
        }
        if(toolbar.formData.gradeIds.length === 0) {
          toolbar.grades.map(val => {
            if (val.value) {
              gradeIds.push(val.value)
            }
          })
        } else {
          gradeIds = toolbar.formData.gradeIds
        }
        return {
          areaTeamId: toolbar.formData.areaTeamId,
          teacherName: toolbar.formData.teacherName,
          busTeamIds: busTeamIds.join(','),
          periodIds: periodIds.join(','),
        }
      }
    }
  }
</script>
<style lang="less" scoped>
</style>
