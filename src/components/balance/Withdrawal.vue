<template>
  <div class="am-u-sm-12">
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">提现审核</div>
      </div>
      <div class="widget-body am-fr">

        <div class="am-u-sm-12 am-form ">
          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group">
              <select2  v-model="query.areaTeamId" :options="areaTeams">
                <option value="">区域</option>
              </select2>
            </div>
          </div>

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group">
              <select2  v-model="query.campusId" :options="campuses">
                <option value="">受理校区</option>
              </select2>
            </div>
          </div>

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group">
              <select2  v-model="query.status" >
                <option value="">处理状态</option>
                <option value="0">审核中</option>
                <option value="1">已审核</option>
                <option value="2">驳回审核</option>
              </select2>
            </div>
          </div>
          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group">
              <select2  v-model="query.payStatus" >
                <option value="">支付状态</option>
                <option value="0">未支付</option>
                <option value="1">已支付</option>
              </select2>
            </div>
          </div>

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group">
              <input type="text"  v-model="query.applierMainAccountName" placeholder="学生姓名"/>
            </div>
          </div>

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group">
              <input type="text"  v-model="query.extra" placeholder="学生编号"/>
            </div>
          </div>

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group">
              <input type="text"  v-model="query.operatorName" placeholder="申请人"/>
            </div>
          </div>

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group">
              <el-date-picker
                v-model="createTime"
                type="daterange"
                placeholder="申请时间">
              </el-date-picker>
            </div>
          </div>
          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group">
              <el-date-picker
                v-model="auditTime"
                type="daterange"
                placeholder="审核时间">
              </el-date-picker>
            </div>
          </div>
          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group">
              <el-date-picker
                v-model="payTime"
                type="daterange"
                placeholder="支付时间">
              </el-date-picker>
            </div>
          </div>


          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-u-end">
            <div class="am-form-group">
              <button type="button" class="am-btn am-btn-default am-btn-success"
                      @click="search" ><span class="am-icon-search"></span>查询
              </button>
              <button v-if="hasPermission('export')" type="button" class="am-btn am-btn-default am-btn-success"
                      @click="exportWithdrawalList" ><span class="am-icon-download"></span>导出
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
              fixed
              prop="applierMainAccountName"
              label="学生姓名"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="amount"
              label="提现金额"
              min-width="100">
            </el-table-column>
            <el-table-column
              label="申请时间"
              min-width="200">
              <template scope="scope">
                {{scope.row.createTime | formatTime }}
              </template>
            </el-table-column>
            <el-table-column
              prop="operatorName"
              label="申请人"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="payPersonName"
              label="支付人"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="acceptCampusName"
              label="受理校区"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="auditName"
              label="审核人"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="status"
              label="审核状态"
              min-width="100">
              <template scope="scope">
                {{ {'0':'审核中','1':'通过审核','2':'驳回审核' }[scope.row.status] }}
              </template>
            </el-table-column>
            <el-table-column
              label="支付状态"
              min-width="100">
              <template scope="scope">
                {{ {'0':'未支付','1':'已支付' }[scope.row.payStatus] }}
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              :min-width="optionWidth">
              <template scope="scope">
                <el-button v-if="hasPermission('list')" size="small" @click.native="handleView(scope.row.balanceWithdrawalId)">查看</el-button>
                <el-button v-if="hasPermission('audit')" size="small" :disabled="scope.row.status!=0" @click.native="handleAudit(scope.row)">审核</el-button>
                <el-button v-if="hasPermission('pay')" size="small" :disabled="scope.row.status!=1 || scope.row.payStatus != 0" @click.native="changePayStatus(scope.row.balanceWithdrawalId)">支付</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>



        <withdraw-audit ref="withdrawAudit" @completed="loadTableData()"></withdraw-audit>
        <withdraw-doc ref="withdrawDoc"></withdraw-doc>

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
  import Pagination from '../base/Pagination'
  import WithdrawDoc from '../base/WithdrawDoc.vue'
  import WithdrawAudit from './WithdrawAudit.vue'
  export default{
    data: function () {
      return {
        tableData: [],
        total: 0,
        pageSize: 10,
        pageNo: 1,
        campuses: [],
        query: {
          areaTeamId : '',
          applierMainAccountName : '',
          operatorName : '',
          extra : '',
          status : '',
          payStatus: '',
          campusId: '',
          startAuditTime: '',
          endAuditTime: '',
          startPayTime: '',
          endPayTime: '',
          startCreateTime: '',
          endCreateTime: '',
        },
        auditTime: '',
        payTime: '',
        createTime: '',
      }
    },
    components: {
      Pagination,
      WithdrawAudit,
      WithdrawDoc
    },
    computed: {
      optionWidth() {
        return this.hasPermission('audit') && this.hasPermission('pay') ? 220 : 150
      },
      areaTeams: function () {
        var options = ( this.$root.config.areaTeams || [] )
          .map(function (item) {
            return {value: item.areaTeamId, text: item.name}
          })
        return options
      }
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    watch: {
      'query.areaTeamId':function(){
        this.query.campusId = ''
        this.loadCampusData()
      },
      auditTime(newVal) {
        this.query.startAuditTime = newVal[0] ? this.$options.filters.formatDate(newVal[0]) : ''
        this.query.endAuditTime = newVal[1] ? this.$options.filters.formatDate(newVal[1]): ''
      },
      payTime(newVal) {
        this.query.startPayTime = newVal[0] ? this.$options.filters.formatDate(newVal[0]) : ''
        this.query.endPayTime = newVal[1] ? this.$options.filters.formatDate(newVal[1]): ''
      },
      createTime(newVal) {
        this.query.startCreateTime = newVal[0] ? this.$options.filters.formatDate(newVal[0]) : ''
        this.query.endCreateTime = newVal[1] ? this.$options.filters.formatDate(newVal[1]): ''
      },
    },
    created: function () {
      this.loadTableData(this.pageNo)
      var _this = this
      this.$root.$on('studentRefundList:new', function () {
        _this.pageNo = 1
        _this.loadTableData(_this.pageNo)
      })
    },
    methods: {
      search: function () {
        this.loadTableData(1)
      },
      loadCampusData:function(){
        var _this  = this
        io.post(io.apiAdminCampusOfAreaTeam, {
          areaTeamId : _this.query.areaTeamId
        }, function (ret) {
          if (ret.success) {
            _this.campuses = ret.data.map(item => {
              return {value: item.campusId, text: item.campusName}
            })
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        var startTime = this.$options.filters.formatDate(this.query.startTime)
        var endTime = this.$options.filters.formatDate(this.query.endTime)
        io.post(io.withdrawalList, $.extend({
          pageNo: _this.pageNo,
          pageSize: _this.pageSize
        }, _this.query, {
          startTime: startTime,
          endTime: endTime,
        }), function (ret) {
          if (ret.success) {
            _this.total = ret.data.total
            _this.tableData = ret.data.list
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      editRefund: function (studentRefundId) {
        this.$refs.changeStudentRefund.formData.studentRefundId = studentRefundId
        this.$refs.changeStudentRefund.show()
      },

      changePayStatus:function(balanceWithdrawalId){
        this.$confirm('确定更改支付状态',()=>{
          io.post(io.setupPayStatusForWithdrawal,{
            balanceWithdrawalId : [balanceWithdrawalId]
          },  (ret) => {
            if (ret.success) {
              this.$toast('处理成功')
              this.loadTableData()
            } else {
              this.$alert(ret.desc)
            }
          })
        })
      },
      handleAudit(row) {
        this.$refs.withdrawAudit.balanceWithdrawalId = row.balanceWithdrawalId
        this.$refs.withdrawAudit.show()
      },
      handleView(balanceWithdrawalId) {
        this.$refs.withdrawDoc.balanceWithdrawalId = balanceWithdrawalId
        this.$refs.withdrawDoc.show()
      },
      //导出学生退费信息
      exportWithdrawalList:function(){
        var startTime = this.$options.filters.formatDate(this.query.startTime)
        var endTime = this.$options.filters.formatDate(this.query.endTime)
        io.downloadFile(io.exportWithdrawalList , Object.assign({},this.query, {
          startTime:startTime,
          endTime:endTime
        }) )
      },
    }
  }
</script>
<style lang="less" scpoed>
  .am-form {
    &>.am-u-sm-12:nth-child(4n + 1) {
      clear: both;
    }
  }
</style>

