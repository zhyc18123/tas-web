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
              :showSummary="true"
              :summaryMethod="summary"
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
        sum: [],
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
      summary() {
        let sum = []
        sum[0] = ''
        sum[1] = '总计'
        sum[2] = ''
        sum[3] = this.sum.realNewStudentNum
        sum[4] = this.sum.targetNewStudentNum
        sum[5] = this.$options.filters.formatNumber(this.sum.realOldStudentNum / this.sum.targetNewStudentNum, 2) + '%'
        sum[6] = this.sum.realOldStudentNum
        sum[7] = this.sum.targetOldSudentNum
        sum[8] = this.$options.filters.formatNumber(this.sum.realOldStudentNum / this.sum.targetOldSudentNum, 2) + '%'
        sum[9] = this.sum.nowPeriodNum
        sum[10] = this.sum.sequentialNum
        sum[11] = this.$options.filters.formatNumber(this.sum.sequentialNum / this.sum.nowPeriodNum, 2) + '%'
        sum[12] = ''
        sum[13] = this.sum.stepNum
        sum[14] = this.$options.filters.formatNumber(this.sum.stepNum / this.sum.nowPeriodNum, 2) + '%'
        sum[15] = this.sum.targetStepNum
        return sum
      },
      handleFind() {
        this.loadTableData(1)
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
            _this.groupingData(ret.data)
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      groupingData(data) {
        let obj = {},tableData = [],sumObj = {
          periodName: "总计",
          realNewStudentNum: 0,
          targetNewStudentNum: 0,
          realOldStudentNum: 0,
          targetOldSudentNum: 0,
          nowPeriodNum: 0,
          sequentialNum: 0,
          stepNum: 0,
          targetStepNum: 0,
        }
        debugger
        for (let i =0; i<data.length; i++) {
          if (!obj[data[i].busTeamId + data[i].periodId]) {
            obj[data[i].busTeamId + data[i].periodId] = [data[i]]
          } else {
            obj[data[i].busTeamId + data[i].periodId].push(data[i])
          }
        }
        Object.keys(obj).map(key => {
          let sum = {
            periodName: "小计",
            realNewStudentNum: 0,
            targetNewStudentNum: 0,
            realOldStudentNum: 0,
            targetOldSudentNum: 0,
            nowPeriodNum: 0,
            sequentialNum: 0,
            stepNum: 0,
            targetStepNum: 0,
          }
          obj[key].map(val => {
            sum.realNewStudentNum += Number(val.realNewStudentNum)
            sum.targetNewStudentNum += Number(val.targetNewStudentNum)
            sum.realOldStudentNum += Number(val.realOldStudentNum)
            sum.targetOldSudentNum += Number(val.targetOldSudentNum)
            sum.nowPeriodNum += Number(val.nowPeriodNum)
            sum.sequentialNum += Number(val.sequentialNum)
            sum.stepNum += Number(val.stepNum)
            sum.targetStepNum += Number(val.targetStepNum)
          })
          sum.realNewStudentNum = sum.realNewStudentNum.toFixed(2)
          sum.targetNewStudentNum = sum.targetNewStudentNum.toFixed(2)
          sum.realOldStudentNum = sum.realOldStudentNum.toFixed(2)
          sum.targetOldSudentNum = sum.targetOldSudentNum.toFixed(2)
          sum.nowPeriodNum = sum.nowPeriodNum.toFixed(2)
          sum.sequentialNum = sum.sequentialNum.toFixed(2)
          sum.stepNum = sum.stepNum.toFixed(2)
          sum.targetStepNum = sum.targetStepNum.toFixed(2)
          obj[key].push(sum)
          tableData = tableData.concat(obj[key])
        })
        tableData.map(val => {
          sumObj.realNewStudentNum += Number(val.realNewStudentNum)
          sumObj.targetNewStudentNum += Number(val.targetNewStudentNum)
          sumObj.realOldStudentNum += Number(val.realOldStudentNum)
          sumObj.targetOldSudentNum += Number(val.targetOldSudentNum)
          sumObj.nowPeriodNum += Number(val.nowPeriodNum)
          sumObj.sequentialNum += Number(val.sequentialNum)
          sumObj.stepNum += Number(val.stepNum)
          sumObj.targetStepNum += Number(val.targetStepNum)

        })
        sumObj.realNewStudentNum = sumObj.realNewStudentNum.toFixed(2)
        sumObj.targetNewStudentNum = sumObj.targetNewStudentNum.toFixed(2)
        sumObj.realOldStudentNum = sumObj.realOldStudentNum.toFixed(2)
        sumObj.targetOldSudentNum = sumObj.targetOldSudentNum.toFixed(2)
        sumObj.nowPeriodNum = sumObj.nowPeriodNum.toFixed(2)
        sumObj.sequentialNum = sumObj.sequentialNum.toFixed(2)
        sumObj.stepNum = sumObj.stepNum.toFixed(2)
        sumObj.targetStepNum = sumObj.targetStepNum.toFixed(2)
        this.sum = sumObj
        this.tableData = tableData
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
