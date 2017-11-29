<template>
  <div class="am-u-sm-12">
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">学生退费管理</div>
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
              <select2  v-model="query.busTeamId" :options="busTeams">
                <option value="">业务组</option>
              </select2>
            </div>
          </div>

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group">
              <input type="text"  v-model="query.studentName" placeholder="学生姓名"/>
            </div>
          </div>

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group">
              <input type="text"  v-model="query.className" placeholder="班级名称"/>
            </div>
          </div>

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3" style="clear: both;">
            <div class="am-form-group">
              <select2  v-model="query.status" >
                <option value="">处理状态</option>
                <option value="0">审核中</option>
                <option value="1">审核通过</option>
                <option value="2">审核不通过</option>
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
              <select2 v-model="query.periodId" :options="periods">
                <option value="">期数</option>
              </select2>
            </div>
          </div>
          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group">
              <el-date-picker
                v-model="auditTime"
                type="daterange"
                placeholder="申请时间">
              </el-date-picker>
            </div>
          </div>
          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group">
              <el-date-picker
                v-model="payTime"
                type="daterange"
                placeholder="审核时间">
              </el-date-picker>
            </div>
          </div>
          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group">
              <el-date-picker
                v-model="createTime"
                type="daterange"
                placeholder="支付时间">
              </el-date-picker>
            </div>
          </div>
          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group">
              <select2  v-model="query.refundWay" >
                <option value="">退费方式</option>
                <option value="0">支付宝</option>
                <option value="1">微信</option>
                <option value="2">现金</option>
                <option value="3">虚拟余额账户</option>
                <option value="4">银行卡转账</option>
              </select2>
            </div>
          </div>


          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-u-end">
            <div class="am-form-group">
              <button type="button" class="am-btn am-btn-default am-btn-success"
                      @click="search" ><span class="am-icon-search"></span>查询
              </button>
              <button type="button" class="am-btn am-btn-default am-btn-success"
                      @click="exportStudentRefund" ><span class="am-icon-download"></span>导出
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
              prop="studentName"
              label="学生姓名"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="className"
              label="班级名称"
              min-width="200">
            </el-table-column>
            <el-table-column
              prop="periodName"
              label="期数"
              min-width="120">
            </el-table-column>
            <el-table-column
              prop="campusName"
              label="校区"
              min-width="200">
            </el-table-column>
            <el-table-column
              label="申请时间"
              min-width="200">
              <template scope="scope">
                {{scope.row.createTime | formatTime }}
              </template>
            </el-table-column>
            <el-table-column
              prop="refundLecture"
              label="申请退费讲次"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="amount"
              label="退费金额"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="description"
              label="退费原因"
              min-width="100">
            </el-table-column>
            <el-table-column
              label="退费方式"
              min-width="100">
              <template scope="scope">
                {{scope.row.refundWay == 0 ? '支付宝' : scope.row.refundWay == 1 ? '微信' : scope.row.refundWay == 2 ? '现金' : scope.row.refundWay == 3 ? '余额账户':'银行卡转账' }}
              </template>
            </el-table-column>
            <el-table-column
              prop="returnResult"
              label="审批意见"
              min-width="100">
            </el-table-column>
            <el-table-column
              label="处理状态"
              min-width="100">
              <template scope="scope">
                {{ {'0':'审核中','1':'审核通过','2':'审核不通过' }[scope.row.status] }}
              </template>
            </el-table-column>
            <el-table-column
              label="审核人"
              min-width="100">
              <template scope="scope">
                {{ scope.row.auditOperator }}
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
              label="支付人"
              min-width="100">
              <template scope="scope">
                {{ scope.row.payOperator }}
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              :min-width="optionWidth">
              <template scope="scope">
                <el-button size="small" @click.native="previewRefund(scope.row.studentRefundId)">查看</el-button>
                <el-button v-if="hasPermission('audit')" size="small" :disabled="scope.row.status!=0" @click.native="editRefund(scope.row.studentRefundId)">审核</el-button>
                <el-button v-if="hasPermission('pay')" size="small" :disabled="scope.row.status!=1 || scope.row.payStatus != 0" @click.native="changePayStatus(scope.row.studentRefundId)">支付</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>



        <change-student-refund ref="changeStudentRefund" @completed="loadTableData()"></change-student-refund>
        <student-refund-preview ref="previewStudentRefund"></student-refund-preview>

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
  import ChangeStudentRefund from './ChangeStudentRefund'
  import StudentRefundPreview from './StudentRefundPreview.vue'
  export default{
    data: function () {
      return {
        tableData: [],
        total: 0,
        pageSize: 10,
        pageNo: 1,
        query: {
          areaTeamId : this.areaTeamId || window.config.areaTeams[0] && window.config.areaTeams[0].areaTeamId || '' ,
          busTeamId : '',
          status : 1,
          studentName: '',
          className: '',
          payStatus: 0,
          periodId: '',
          refundWay: '',
          startAuditTime: '',
          endAuditTime: '',
          startPayTime: '',
          endPayTime: '',
          startCreateTime: '',
          endCreateTime: '',
        },
        periods: [],
        auditTime: '',
        payTime: '',
        createTime: '',
      }
    },
    components: {
      Pagination,
      StudentRefundPreview,
      'change-student-refund': ChangeStudentRefund
    },
    watch: {
      'query.areaTeamId':function(){
        this.query.busTeamId = ''
        this.query.periodId = ''
        this.loadPeriodData()
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
      },
      busTeams: function () {
        var options = ( ( this.query.areaTeamId  ) ? ( this.$root.config.groupBusTeams[this.query.areaTeamId] || [] ) : [] )
          .map(function (item) {
            return {value: item.busTeamId, text: item.name}
          })
        this.query.busTeamId = ''
        return options
      }
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.loadPeriodData()
      this.loadTableData(this.pageNo)
      var _this = this
      this.$root.$on('studentRefundList:new', function () {
        _this.pageNo = 1
        _this.loadTableData(_this.pageNo)
      })
    },
    methods: {
      loadPeriodData: function () {
        var _this = this
        io.post(io.apiAdminPeriodListForAreaTeam, {
          areaTeamId: this.query.areaTeamId
        }, function (ret) {
          if (ret.success) {
            _this.loadTableData(_this.pageNo)
            _this.periods = ret.data.map(function (item) {
              return {value: item.periodId, text: item.periodName}
            })
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      search: function () {
        this.loadTableData(1)
      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminStudentRefundList, $.extend({
          pageNo: _this.pageNo,
          pageSize: _this.pageSize
        }, _this.query), function (ret) {
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
      previewRefund: function (studentRefundId) {
        this.$refs.previewStudentRefund.studentRefundId = studentRefundId
        this.$refs.previewStudentRefund.show()
      },

      changePayStatus:function(studentRefundId){
        this.$confirm('确定更改支付状态',()=>{
          io.post(io.apiAdminChangeStudentPayStatus,{
            studentRefundId : studentRefundId
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
      //导出学生退费信息
      exportStudentRefund:function(){
        io.downloadFile(io.apiAdminExportStudentRefund , this.query )
      },
    }
  }
</script>

