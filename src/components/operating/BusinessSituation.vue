<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title am-fl">营运概况</div>
        </div>
        <div class="widget-body  am-fr">
          <multiple-toolbar ref="toolbar"  class="toolbar" @search="handleFind" :needInitSearch="false" needGradeSearch
                            areaTeam busTeam startDate endDate period grade needWithPeriod defaultEndDate
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
        sum: [],
        tableData: [],
      }
    },
    components: {
      MultipleToolbar, Pagination
    },
    watch: {

    },
    mounted :function(){
      $(window).smoothScroll()
//      this.loadTableData()
    },
    methods:{
      summary() {
        let sum = []
        debugger
        sum[0] = ''
        sum[1] = '总计'
        sum[2] = ''
        sum[3] = this.sum.targetAmount
        sum[4] = this.sum.totalAmount
        sum[5] = this.sum.realAmount
        sum[6] = this.sum.discountAmount
        sum[7] = this.sum.amountRate
        sum[8] = this.sum.newStudentPersonNum
        sum[9] = this.sum.newStudentNum
        sum[10] = this.sum.newStudentAmount
        sum[11] = this.sum.oldStudentPersonNum
        sum[12] = this.sum.oldStudentNum
        sum[13] = this.sum.oldStudentAmount
        sum[14] = this.sum.seqStepPersonNum
        sum[15] = this.sum.seqStepNum
        sum[16] = this.sum.seqStepAmount
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
            _this.GroupingData(ret.data)

          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      GroupingData(data) {
        let obj = {},tableData = [],sumObj = {
          busTeamName: "总计",
          targetAmount: 0,
          totalAmount: 0,
          realAmount: 0,
          discountAmount: 0,
          amountRate: 0,
          newStudentPersonNum: 0,
          newStudentNum: 0,
          newStudentAmount: 0,
          oldStudentPersonNum: 0,
          oldStudentNum: 0,
          oldStudentAmount: 0,
          seqStepPersonNum: 0,
          seqStepNum: 0,
          seqStepAmount: 0,
        }
        for (let i =0; i<data.length; i++) {
          if (!obj[data[i].busTeamId + data[i].periodId]) {
            obj[data[i].busTeamId + data[i].periodId] = [data[i]]
          } else {
            obj[data[i].busTeamId + data[i].periodId].push(data[i])
          }
        }
        Object.keys(obj).map(key => {
          let sum = {
            busTeamName: "小计",
            targetAmount: 0,
            totalAmount: 0,
            realAmount: 0,
            discountAmount: 0,
            amountRate: 0,
            newStudentPersonNum: 0,
            newStudentNum: 0,
            newStudentAmount: 0,
            oldStudentPersonNum: 0,
            oldStudentNum: 0,
            oldStudentAmount: 0,
            seqStepPersonNum: 0,
            seqStepNum: 0,
            seqStepAmount: 0,
          }
          obj[key].map(val => {
            sum.targetAmount += Number(val.targetAmount)
            sum.totalAmount += Number(val.totalAmount)
            sum.realAmount += Number(val.realAmount)
            sum.discountAmount += Number(val.discountAmount)
            sum.newStudentPersonNum += Number(val.newStudentPersonNum)
            sum.newStudentNum += Number(val.newStudentNum)
            sum.newStudentAmount += Number(val.newStudentAmount)
            sum.oldStudentPersonNum += Number(val.oldStudentPersonNum)
            sum.oldStudentNum += Number(val.oldStudentNum)
            sum.oldStudentAmount += Number(val.oldStudentAmount)
            sum.seqStepPersonNum += Number(val.seqStepPersonNum)
            sum.seqStepNum += Number(val.seqStepNum)
            sum.seqStepAmount += Number(val.seqStepAmount)
          })
          sum.targetAmount = sum.targetAmount.toFixed(2)
          sum.totalAmount = sum.totalAmount.toFixed(2)
          sum.realAmount = sum.realAmount.toFixed(2)
          sum.discountAmount = sum.discountAmount.toFixed(2)
          sum.newStudentPersonNum = sum.newStudentPersonNum.toFixed(2)
          sum.newStudentNum = sum.newStudentNum.toFixed(2)
          sum.newStudentAmount = sum.newStudentAmount.toFixed(2)
          sum.oldStudentPersonNum = sum.oldStudentPersonNum.toFixed(2)
          sum.oldStudentNum = sum.oldStudentNum.toFixed(2)
          sum.oldStudentAmount = sum.oldStudentAmount.toFixed(2)
          sum.seqStepPersonNum = sum.seqStepPersonNum.toFixed(2)
          sum.seqStepNum = sum.seqStepNum.toFixed(2)
          sum.seqStepAmount = sum.seqStepAmount.toFixed(2)
          sum.amountRate = this.$options.filters.formatNumber((sum.realAmount/sum.targetAmount*100), 2) + '%'
          obj[key].push(sum)
          tableData = tableData.concat(obj[key])
        })
        data.map(val => {
          sumObj.targetAmount += Number(val.targetAmount)
          sumObj.totalAmount += Number(val.totalAmount)
          sumObj.realAmount += Number(val.realAmount)
          sumObj.discountAmount += Number(val.discountAmount)
          sumObj.newStudentPersonNum += Number(val.newStudentPersonNum)
          sumObj.newStudentNum += Number(val.newStudentNum)
          sumObj.newStudentAmount += Number(val.newStudentAmount)
          sumObj.oldStudentPersonNum += Number(val.oldStudentPersonNum)
          sumObj.oldStudentNum += Number(val.oldStudentNum)
          sumObj.oldStudentAmount += Number(val.oldStudentAmount)
          sumObj.seqStepPersonNum += Number(val.seqStepPersonNum)
          sumObj.seqStepNum += Number(val.seqStepNum)
          sumObj.seqStepAmount += Number(val.seqStepAmount)
        })
        sumObj.targetAmount = sumObj.targetAmount.toFixed(2)
        sumObj.totalAmount = sumObj.totalAmount.toFixed(2)
        sumObj.realAmount = sumObj.realAmount.toFixed(2)
        sumObj.discountAmount = sumObj.discountAmount.toFixed(2)
        sumObj.newStudentPersonNum = sumObj.newStudentPersonNum.toFixed(2)
        sumObj.newStudentNum = sumObj.newStudentNum.toFixed(2)
        sumObj.newStudentAmount = sumObj.newStudentAmount.toFixed(2)
        sumObj.oldStudentPersonNum = sumObj.oldStudentPersonNum.toFixed(2)
        sumObj.oldStudentNum = sumObj.oldStudentNum.toFixed(2)
        sumObj.oldStudentAmount = sumObj.oldStudentAmount.toFixed(2)
        sumObj.seqStepPersonNum = sumObj.seqStepPersonNum.toFixed(2)
        sumObj.seqStepNum = sumObj.seqStepNum.toFixed(2)
        sumObj.seqStepAmount = sumObj.seqStepAmount.toFixed(2)
        sumObj.amountRate = this.$options.filters.formatNumber((sumObj.realAmount/sumObj.targetAmount*100), 2) + '%'
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
          startDate: toolbar.formData.startDate ? moment(toolbar.formData.startDate).format('YYYY-MM-DD') + ' 00:00:00' : '',
          endDate: toolbar.formData.endDate ? moment(toolbar.formData.endDate).format('YYYY-MM-DD') + ' 23:59:59' : '',
          areaTeamId: toolbar.formData.areaTeamId,
          needWithPeriod: toolbar.formData.needWithPeriod,
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
