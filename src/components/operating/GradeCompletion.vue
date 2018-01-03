<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title am-fl">校区续读率统计（营运指标）</div>
        </div>
        <div class="widget-body  am-fr">
          <multiple-toolbar ref="toolbar"  class="toolbar" @search="handleFind" :needInitSearch="false" needGradeSearch
                            areaTeam busTeam period grade
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
                prop="gradeName"
                min-width="160"
                label="年级">
              </el-table-column>
              <el-table-column
                prop="realNewStudentNum"
                min-width="160"
                label="实际新生科数">
              </el-table-column>
              <el-table-column
                prop="targetNewStudentNum"
                min-width="160"
                label="目标新生科数">
              </el-table-column>
              <el-table-column
                min-width="160"
                label="新生科数完成率">
                <template scope="scope">
                  <div>{{scope.row.realNewStudentNum ==null || scope.row.targetNewStudentNum ==null || scope.row.targetNewStudentNum == '0' ? '0%' :
                    (parseInt(scope.row.realNewStudentNum)/ parseInt(scope.row.targetNewStudentNum))*100 | formatNumber(2)}}%</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="realOldStudentNum"
                min-width="160"
                label="实际老生科数">
              </el-table-column>
              <el-table-column
                prop="targetOldSudentNum"
                min-width="160"
                label="目标老生科数">
              </el-table-column>
              <el-table-column
                min-width="160"
                label="老生科数完成率">
                <template scope="scope">
                  <div>{{scope.row.realOldStudentNum ==null || scope.row.targetOldSudentNum ==null || scope.row.targetOldSudentNum == '0' ? '0%' :
                    (parseInt(scope.row.realOldStudentNum)/ parseInt(scope.row.targetOldSudentNum))*100 | formatNumber(2)}}%</div>
                </template>
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
                min-width="160"
                label="顺期续读率">
                <template scope="scope">
                  <div>{{scope.row.nowPeriodNum ==null || scope.row.sequentialNum==null || scope.row.nowPeriodNum == '0' ? '0%' :
                    (parseInt(scope.row.sequentialNum)/ parseInt(scope.row.nowPeriodNum))*100 | formatNumber(2)}}%</div>
                </template>
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
                min-width="160"
                label="跨期续读率">
                <template scope="scope">
                  <div>{{scope.row.nowPeriodNum ==null || scope.row.stepNum==null || scope.row.nowPeriodNum == '0' ? '0%' :
                    (parseInt(scope.row.stepNum)/ parseInt(scope.row.nowPeriodNum))*100 | formatNumber(2)}}%</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="targetStepNum"
                min-width="160"
                label="目标跨期续读率">
              </el-table-column>

            </el-table>
          </div>
        </div>
        <consultant-detail ref="consultantDetail"></consultant-detail>
        <div class="am-u-lg-12 am-cf">
          <div class="am-fr">
            <pagination v-bind:total="total" v-bind:pageNo="pageNo" v-bind:pageSize="pageSize"
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
  import ConsultantDetail from './ConsultantDetail.vue'
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
      MultipleToolbar, Pagination, ConsultantDetail
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
        this.loadTableData()
      },
      handleDetail(counselorRegDetailList) {
        this.$refs.consultantDetail.show()
        this.$refs.consultantDetail.tableData = counselorRegDetailList || []
      },
      handleExport() {
        var _this = this

        io.downloadFile(io.exportGradeCompletionRate, this.formatData(), function (ret) {
          if (ret.success) {
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1

        this.$showLoading()
        io.post(io.findGradeCompletionVoList, Object.assign({}, {
          pageNo: _this.pageNo,
          pageSize: _this.pageSize
        }, this.formatData()), function (ret) {
          _this.$hiddenLoading()
          if (ret.success) {
            _this.total = ret.data.total
            _this.tableData = ret.data
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
          busTeamIds: busTeamIds.join(','),
          periodIds: periodIds.join(','),
          gradeIds: gradeIds.join(','),
        }
      }
    }
  }
</script>
<style lang="less" scoped>
</style>
