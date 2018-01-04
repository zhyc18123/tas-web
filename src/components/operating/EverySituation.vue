<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title am-fl">每日运营概况</div>
        </div>
        <div class="widget-body  am-fr">
          <multiple-toolbar ref="toolbar"  class="toolbar" @search="handleFind" :needInitSearch="false" needGradeSearch
                            areaTeam startDate endDate period grade
          ></multiple-toolbar>
          <div class="am-u-sm-12">
            <el-button-group>
              <el-button @click="active = 0;tableData = amountList" size="big" :class="{'el-button el-button--primary': active === 0}">
                金额
              </el-button>
              <el-button @click="active = 1;tableData = branchList" size="big" :class="{'el-button el-button--primary': active === 1}">
                科数
              </el-button>
              <el-button @click="active = 2;tableData = personList" size="big" :class="{'el-button el-button--primary': active === 2}">
                人数
              </el-button>
            </el-button-group>
          </div>
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
                prop="newStudentNum"
                min-width="160"
                label="新生">
              </el-table-column>
              <el-table-column
                prop="oldStudentNum"
                min-width="160"
                label="老生">
              </el-table-column>
              <el-table-column
                prop="seqStepStudentNum"
                min-width="160"
                label="续读生">
              </el-table-column>
              <el-table-column
                prop="totalNum"
                min-width="160"
                label="总计">
              </el-table-column>
              <el-table-column
                align="center"
                fixed="right"
                label="操作"
                width="120">
                <template scope="scope">
                  <el-button size="small" @click="handleDetail(scope.row.amountBranchPersonDetailVoList)">查看明细</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <every-situation-detail ref="everySituationDetail" :titleType="titleType"></every-situation-detail>
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
  import EverySituationDetail from './EverySituationDetail.vue'
  import Pagination from '../base/Pagination.vue'
  import moment from 'moment'

  export default{
    data:function(){
      return {
        active: 0,
        total: 0,
        pageSize: 10,
        pageNo: 1,
        tableData: [],
        amountList: [],
        branchList: [],
        personList: [],
      }
    },
    components: {
      MultipleToolbar, Pagination, EverySituationDetail
    },
    watch: {

    },
    computed: {
      titleType() {
        if (this.active === 0) {
          return '金额'
        } else if(this.active === 1) {
          return '科数'
        } else if(this.active === 2) {
          return '人数'
        }
      }
    },
    mounted :function(){
      $(window).smoothScroll()
//      this.loadTableData()
    },
    methods:{
      handleFind() {
        this.loadTableData()
      },
      handleDetail(amountBranchPersonDetailVoList) {
        this.$refs.everySituationDetail.show()
        this.$refs.everySituationDetail.tableData = amountBranchPersonDetailVoList || []
      },
      handleExport() {
        var _this = this

        io.downloadFile(io.exportAmountBranchPerson, this.formatData(), function (ret) {
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
        io.post(io.findAmountBranchPerson, Object.assign({}, {
          pageNo: _this.pageNo,
          pageSize: _this.pageSize
        }, this.formatData()), function (ret) {
          _this.$hiddenLoading()
          if (ret.success) {
            _this.total = ret.data.total
            if (_this.active === 0) {
              _this.tableData = ret.data.amountList
            } else if(_this.active === 1) {
              _this.tableData = ret.data.branchList
            } else if(_this.active === 2) {
              _this.tableData = ret.data.personList
            }
            _this.amountList = ret.data.amountList
            _this.branchList = ret.data.branchList
            _this.personList = ret.data.personList
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
          periodIds: periodIds.join(','),
          gradeIds: gradeIds.join(','),
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .el-button-group {
    margin: 0 auto;
    display: table;
    padding-bottom: 15px;
    border-bottom: 1px dashed #ddd;
  }
</style>
