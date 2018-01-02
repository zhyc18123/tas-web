<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title am-fl">班主任续读（营运指标）</div>
        </div>
        <div class="widget-body  am-fr">
          <multiple-toolbar ref="toolbar"  class="toolbar" @search="handleFind"
                            areaTeam busTeam startDate endDate period grade subject
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
                prop="periodName"
                min-width="160"
                label="期数">
              </el-table-column>
              <el-table-column
                prop="className"
                min-width="160"
                label="班级名称">
              </el-table-column>
              <el-table-column
                prop="busTeamName"
                min-width="160"
                label="业务组">
              </el-table-column>
              <el-table-column
                prop="subjectName"
                min-width="160"
                label="学科">
              </el-table-column>
              <el-table-column
                prop="gradeName"
                min-width="160"
                label="年级">
              </el-table-column>
              <el-table-column
                prop="teacherNames"
                min-width="160"
                label="教师">
              </el-table-column>
              <el-table-column
                prop="jobNature"
                min-width="160"
                label="任教性质">
                <template scope="scope">
                  <div>{{scope.row.jobNature === '0'? '专职': '兼职'}}</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="regNum"
                min-width="160"
                label="报名人数">
              </el-table-column>
              <el-table-column
                prop="sequentialPersonNum"
                min-width="160"
                label="顺期人数">
              </el-table-column>
              <el-table-column
                min-width="160"
                label="顺期续读率">
                <template scope="scope">
                  <div>{{scope.row.regNum ==null ||scope.row.sequentialPersonNum ==null || scope.row.regNum == '0' ? '0%' :
                    (parseInt(scope.row.sequentialPersonNum)/ parseInt(scope.row.regNum))*100 |formatNumber(2)}}%</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="sequentialTargetRate"
                min-width="160"
                label="目标顺期续读率">
              </el-table-column>
              <el-table-column
                prop="stepPersonNum"
                min-width="160"
                label="跨期人数">
              </el-table-column>
              <el-table-column
                min-width="160"
                label="跨期续读率">
                <template scope="scope">
                  <div>{{scope.row.regNum ==null ||scope.row.stepPersonNum ==null || scope.row.regNum == '0' ? '0%' :
                    (parseInt(scope.row.stepPersonNum)/ parseInt(scope.row.regNum))*100 |formatNumber(2)}}%</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="stepTargetRate"
                min-width="160"
                label="目标跨期续读率">
              </el-table-column>

              <el-table-column
                align="center"
                fixed="right"
                label="操作"
                width="120">
                <template scope="scope">
                  <el-button size="small" @click="handleDetail(scope.row.counselorRegDetailList)">查看明细</el-button>
                </template>
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

      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1

        io.post(io.findClassComletionRateVoPage, Object.assign({}, {
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
            gradeIds.push(val.gradeId)
          })
        } else {
          gradeIds = toolbar.formData.gradeIds
        }
        return {
          startRecordRegTime: toolbar.formData.startDate ? moment(toolbar.formData.startDate).format('YYYY-MM-DD') + ' 00:00:00' : '',
          endRecordRegTime: toolbar.formData.endDate ? moment(toolbar.formData.endDate).format('YYYY-MM-DD') + ' 23:59:59' : '',
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
