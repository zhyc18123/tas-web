<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title am-fl">班主任续读统计（奖金指标）</div>
        </div>
        <div class="widget-body  am-fr">
          <multiple-toolbar ref="toolbar"  class="toolbar" @search="handleFind" teacherNamePlaceholder="班主任名称"
                            areaTeam busTeam startDate endDate period teacherName
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
                min-width="100"
                label="期数">
              </el-table-column>
              <el-table-column
                prop="teacherName"
                min-width="100"
                label="班主任">
              </el-table-column>
              <el-table-column
                prop="lessSeqStudentNum"
                min-width="200"
                label="顺期科数（小于6讲）">
              </el-table-column>
              <el-table-column
                prop="bigSeqStudentNum"
                min-width="200"
                label="顺期科数（大于等于6讲）">
              </el-table-column>
              <el-table-column
                prop="lessStepStudentNum"
                min-width="180"
                label="跨期科数（小于6讲）">
              </el-table-column>
              <el-table-column
                prop="bigStepStudentNum"
                min-width="200"
                label="跨期科数（大于等于6讲）">
              </el-table-column>
              <el-table-column
                align="center"
                fixed="right"
                label="操作"
                width="120">
                <template scope="scope">
                  <el-button size="small" @click="handleDetail(scope.row.seniorRegDetailList)">查看明细</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <senior-branch-bonus-detail ref="seniorBranchBonusDetail"></senior-branch-bonus-detail>
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
  import SeniorBranchBonusDetail from './SeniorBranchBonusDetail.vue'
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
      MultipleToolbar, Pagination, SeniorBranchBonusDetail
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
      handleDetail(seniorRegDetailList) {
        this.$refs.seniorBranchBonusDetail.show()
        this.$refs.seniorBranchBonusDetail.tableData = seniorRegDetailList || []
      },
      handleExport() {
        var _this = this

        io.downloadFile(io.exportSeniorBranchBonus, this.formatData(), function (ret) {
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
        io.post(io.findSeniorBranchBonusPage, Object.assign({}, {
          pageNo: _this.pageNo,
          pageSize: _this.pageSize
        }, this.formatData()), function (ret) {
          _this.$hiddenLoading()
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
        let busTeamIds = [],periodIds = []
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
        return {
          startRecordRegTime: toolbar.formData.startDate ? moment(toolbar.formData.startDate).format('YYYY-MM-DD') + ' 00:00:00' : '',
          endRecordRegTime: toolbar.formData.endDate ? moment(toolbar.formData.endDate).format('YYYY-MM-DD') + ' 23:59:59' : '',
          areaTeamId: toolbar.formData.areaTeamId,
          busTeamIds: busTeamIds.join(','),
          teacherName: toolbar.formData.teacherName || '',
          periodIds: periodIds.join(','),
        }
      }
    }
  }
</script>
<style lang="less" scoped>
</style>
