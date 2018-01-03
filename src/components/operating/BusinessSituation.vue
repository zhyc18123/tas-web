<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title am-fl">营运概况</div>
        </div>
        <div class="widget-body  am-fr">
          <multiple-toolbar ref="toolbar"  class="toolbar" @search="handleFind" :needInitSearch="false"
                            areaTeam busTeam startDate endDate period grade subject needWithPeriod defaultEndDate
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
                prop="targetAmount"
                min-width="160"
                label="目标金额">
              </el-table-column>
              <el-table-column
                prop="totalAmount"
                min-width="160"
                label="总计金额">
              </el-table-column>
              <el-table-column
                prop="realAmount"
                min-width="160"
                label="实收金额">
              </el-table-column>
              <el-table-column
                prop="discountAmount"
                min-width="160"
                label="优惠金额">
              </el-table-column>
              <el-table-column
                prop="amountRate"
                min-width="160"
                label="金额完成率">
              </el-table-column>
              <el-table-column
                prop="newStudentPersonNum"
                min-width="160"
                label="新生人数">
              </el-table-column>
              <el-table-column
                prop="newStudentNum"
                min-width="160"
                label="新生科数">
              </el-table-column>
              <el-table-column
                prop="newStudentAmount"
                min-width="160"
                label="新生金额">
              </el-table-column>
              <el-table-column
                prop="oldStudentPersonNum"
                min-width="160"
                label="老生人数">
              </el-table-column>
              <el-table-column
                prop="oldStudentNum"
                min-width="160"
                label="老生科数">
              </el-table-column>
              <el-table-column
                prop="oldStudentAmount"
                min-width="160"
                label="老生金额">
              </el-table-column>
              <el-table-column
                prop="seqStepPersonNum"
                min-width="160"
                label="续读人数">
              </el-table-column>
              <el-table-column
                prop="seqStepNum"
                min-width="160"
                label="续读科数">
              </el-table-column>
              <el-table-column
                prop="seqStepAmount"
                min-width="160"
                label="续读金额">
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
  import MultipleToolbar from './MultipleToolbar.vue'
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
      MultipleToolbar, Pagination
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

        io.downloadFile(io.exportBusinessSituation, this.formatData(), function (ret) {
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
        io.post(io.findBusinessSituationList, Object.assign({}, {
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
          startDate: toolbar.formData.startDate ? moment(toolbar.formData.startDate).format('YYYY-MM-DD') + ' 00:00:00' : '',
          endDate: toolbar.formData.endDate ? moment(toolbar.formData.endDate).format('YYYY-MM-DD') + ' 23:59:59' : '',
          areaTeamId: toolbar.formData.areaTeamId,
          busTeamIds: busTeamIds.join(','),
          needWithPeriod: 0,
          periodIds: periodIds.join(','),
          gradeIds: gradeIds.join(','),
        }
      }
    }
  }
</script>
<style lang="less" scoped>
</style>
