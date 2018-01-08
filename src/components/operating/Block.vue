<template>
  <div class="m-block">
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title am-fl">看板</div>
        </div>
        <div class="widget-body  am-fr">
          <multiple-toolbar ref="toolbar"  class="toolbar" @search="handleFind" :needInitSearch="false" needGradeSearch
                            areaTeam  period grade
          ></multiple-toolbar>
          <div class="am-u-sm-12">
            <el-button-group>
              <el-button @click="active = 0;tableData = advanceBlockVoList" size="big" :class="{'el-button el-button--primary': active === 0}">
                预收看板
              </el-button>
              <el-button @click="active = 1;tableData = studentStateBlockVoList" size="big" :class="{'el-button el-button--primary': active === 1}">
                生源看板
              </el-button>
              <el-button @click="active = 2;tableData = branchNumBlockVoList" size="big" :class="{'el-button el-button--primary': active === 2}">
                科数看板
              </el-button>
            </el-button-group>
          </div>
          <div class="am-u-sm-12 am-form-group">
            <el-button size="small" type="success" @click="handleExport">
              <span class="am-icon-download"></span>&nbsp;&nbsp;导出</el-button>
          </div>
          <div v-show="active === 0" v-for="item in advanceBlockVoListKeys">
            <h2>{{item}}</h2>
            <div class="am-u-sm-12 am-form-group">
              <el-table
                :data="advanceBlockVoList[item]"
                border
                :show-summary="true"
                :summary-method="getSummaries"
                empty-text="暂无数据"
                stripe
                style="min-width: 100%">
                <el-table-column
                  prop="areaTeamName"
                  min-width="160"
                  label="区域">
                </el-table-column>
                <el-table-column
                  prop="gradeName"
                  min-width="120"
                  label="年级">
                </el-table-column>
                <el-table-column
                  prop="advanceAmount"
                  min-width="120"
                  label="预收金额">
                </el-table-column>
                <el-table-column
                  prop="withAdvanceAmount"
                  min-width="120"
                  label="同期金额">
                </el-table-column>
                <el-table-column
                  prop="targetAmount"
                  min-width="120"
                  label="目标金额">
                </el-table-column>
                <el-table-column
                  prop="withTargetAmount"
                  min-width="120"
                  label="同期目标">
                </el-table-column>
                <el-table-column
                  prop="advanceProgress"
                  min-width="120"
                  label="预收进度">
                </el-table-column>
                <el-table-column
                  prop="withProgress"
                  min-width="120"
                  label="同期进度">
                </el-table-column>
                <el-table-column
                  prop="advanceCompare"
                  min-width="120"
                  label="预收同比">
                </el-table-column>
                <el-table-column
                  prop="targetCompare"
                  min-width="120"
                  label="目标增长">
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div v-show="active === 1" v-for="item in studentStateBlockVoListKeys">
            <h2>{{item}}</h2>
            <div class="am-u-sm-12 am-form-group">
              <el-table
                :data="studentStateBlockVoList[item]"
                border
                :show-summary="true"
                empty-text="暂无数据"
                stripe
                style="min-width: 100%">
                <el-table-column
                  prop="areaTeamName"
                  min-width="120"
                  label="区域">
                </el-table-column>
                <el-table-column
                  prop="gradeName"
                  min-width="120"
                  label="年级">
                </el-table-column>
                <el-table-column
                  prop="regStudentNum"
                  min-width="120"
                  label="报读人数">
                </el-table-column>
                <el-table-column
                  prop="withStudentNum"
                  min-width="120"
                  label="同期报读">
                </el-table-column>
                <el-table-column
                  prop="newStudentNum"
                  min-width="120"
                  label="新生人数">
                </el-table-column>
                <el-table-column
                  prop="withNewStudentNum"
                  min-width="120"
                  label="同期新生">
                </el-table-column>
                <el-table-column
                  prop="oldStudentNum"
                  min-width="120"
                  label="老生人数">
                </el-table-column>
                <el-table-column
                  prop="withOldStudentNum"
                  min-width="120"
                  label="同期老生">
                </el-table-column>
                <el-table-column
                  prop="seqStepStudentNum"
                  min-width="120"
                  label="续读人数">
                </el-table-column>
                <el-table-column
                  prop="withSeqStepStudentNum"
                  min-width="120"
                  label="同期续读">
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div v-show="active === 2" v-for="item in branchNumBlockVoListKeys">
            <h2>{{item}}</h2>
            <div class="am-u-sm-12 am-form-group">
              <el-table
                :data="branchNumBlockVoList[item]"
                border
                :show-summary="true"
                :summary-method="getSummaries2"
                empty-text="暂无数据"
                stripe
                style="min-width: 100%">
                <el-table-column
                  prop="areaTeamName"
                  min-width="120"
                  label="区域">
                </el-table-column>
                <el-table-column
                  prop="gradeName"
                  min-width="120"
                  label="年级">
                </el-table-column>
                <el-table-column
                  prop="totalPersonNum"
                  min-width="120"
                  label="报读人数">
                </el-table-column>
                <el-table-column
                  prop="totalBranchNum"
                  min-width="120"
                  label="总科数">
                </el-table-column>
                <el-table-column
                  prop="avgNum"
                  min-width="120"
                  label="人均科数">
                </el-table-column>
                <el-table-column
                  prop="percentNum1"
                  min-width="160"
                  label="报读一科（占比）">
                  <template scope="scope">
                    <div>{{scope.row.percentNum1}}({{scope.row.percent1}})</div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="percentNum2"
                  min-width="160"
                  label="报读两科（占比）">
                  <template scope="scope">
                    <div>{{scope.row.percentNum2}}({{scope.row.percent2}})</div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="percentNum3"
                  min-width="160"
                  label="报读三科（占比）">
                  <template scope="scope">
                    <div>{{scope.row.percentNum3}}({{scope.row.percent3}})</div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="percentNum4"
                  min-width="160"
                  label="报读四科（占比）">
                  <template scope="scope">
                    <div>{{scope.row.percentNum4}}({{scope.row.percent4}})</div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="percentNum5"
                  min-width="160"
                  label="报读五科（占比）">
                  <template scope="scope">
                    <div>{{scope.row.percentNum5}}({{scope.row.percent5}})</div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="percentNum6"
                  min-width="160"
                  label="报读六科（占比）">
                  <template scope="scope">
                    <div>{{scope.row.percentNum6}}({{scope.row.percent6}})</div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="percentNum7"
                  min-width="160"
                  label="报读七科（占比）">
                  <template scope="scope">
                    <div>{{scope.row.percentNum7}}({{scope.row.percent7}})</div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="percentNumOver"
                  min-width="160"
                  label="报读七科以上（占比）">
                  <template scope="scope">
                    <div>{{scope.row.percentNumOver}}({{scope.row.percentOver}})</div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
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
        active: 0,
        tableData: [],
        advanceBlockVoList: [],
        studentStateBlockVoList: [],
        branchNumBlockVoList: [],
        advanceBlockVoListKeys: [],
        studentStateBlockVoListKeys: [],
        branchNumBlockVoListKeys: [],
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
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总计';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] = sums[index];
          } else {
            sums[index] = '-';
          }
        });
        sums[6] = (sums[2]/sums[4]*(100)) === Infinity ? '': (sums[2]/sums[4]*(100)).toFixed(2) + '%'
        sums[7] = (sums[3]/sums[5]*(100)) === Infinity ? '': (sums[3]/sums[5]*(100)).toFixed(2) + '%'
        sums[8] = ((sums[2] - sums[3])/sums[3]*(100)) === Infinity ? '': ((sums[2] -sums[3])/sums[3]*(100)).toFixed(2) + '%'
        sums[9] = ((sums[4]-sums[5])/sums[5]*(100)) === Infinity ? '': ((sums[4]-sums[5])/sums[5]*(100)).toFixed(2) + '%'
        return sums;
      },
      getSummaries2(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总计';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] = sums[index];
          } else {
            sums[index] = '-';
          }
        });
        sums[4] = (sums[3]/sums[2]*(100)) === Infinity ? '': (sums[3]/sums[2]).toFixed(2)
        sums[5] = (sums[5]/sums[2]*(100)) === Infinity ? '': (sums[5]/sums[2]*(100)).toFixed(2) + '%'
        sums[6] = (sums[6]/sums[2]*(100)) === Infinity ? '': (sums[6]/sums[2]*(100)).toFixed(2) + '%'
        sums[7] = (sums[7]/sums[2]*(100)) === Infinity ? '': (sums[7]/sums[2]*(100)).toFixed(2) + '%'
        sums[8] = (sums[8]/sums[2]*(100)) === Infinity ? '': (sums[8]/sums[2]*(100)).toFixed(2) + '%'
        sums[9] = (sums[9]/sums[2]*(100)) === Infinity ? '': (sums[9]/sums[2]*(100)).toFixed(2) + '%'
        sums[10] = (sums[10]/sums[2]*(100)) === Infinity ? '': (sums[10]/sums[2]*(100)).toFixed(2) + '%'
        sums[11] = (sums[11]/sums[2]*(100)) === Infinity ? '': (sums[11]/sums[2]*(100)).toFixed(2) + '%'
        sums[12] = (sums[12]/sums[2]*(100)) === Infinity ? '': (sums[12]/sums[2]*(100)).toFixed(2) + '%'
        return sums;
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

        io.downloadFile(io.exportBlock, this.formatData(), function (ret) {
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
        io.post(io.findBlockVo, Object.assign({}, {
          pageNo: _this.pageNo,
          pageSize: _this.pageSize
        }, this.formatData()), function (ret) {
          _this.$hiddenLoading()
          if (ret.success) {
            _this.total = ret.data.total
            _this.advanceBlockVoList = _this.formatResult(ret.data.advanceBlockVoList)
            _this.advanceBlockVoListKeys = Object.keys(_this.advanceBlockVoList)
            _this.studentStateBlockVoList = _this.formatResult(ret.data.studentStateBlockVoList)
            _this.studentStateBlockVoListKeys = Object.keys(_this.studentStateBlockVoList)
            _this.branchNumBlockVoList = _this.formatResult(ret.data.branchNumBlockVoList)
            _this.branchNumBlockVoListKeys = Object.keys(_this.branchNumBlockVoList)
            _this.tableData = _this.advanceBlockVoList
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      formatResult(data) {
        let obj = {}
        data.map(val => {
          if (!obj[val.periodName]) {
            let arr = []
            arr.push(val)
            obj[val.periodName] = arr
          } else {
            obj[val.periodName].push(val)
          }
        })
//        Object.keys(obj).map(val => {
//          obj[val].map(i => {
//
//          })
//        })
        return obj
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
<style lang="less">
  .m-block {
    .el-button-group {
      margin: 0 auto;
      display: table;
      padding-bottom: 15px;
      border-bottom: 1px dashed #ddd;
    }
    h2 {
      text-align: center;
      font-weight: normal;
      margin-bottom: 5px;
    }
    .el-table__footer-wrapper tbody td, .el-table__header-wrapper tbody td {
      color: #333;
    }
  }
</style>
