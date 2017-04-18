<template>
  <div class="am-u-sm-12">
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">学生退费管理</div>
      </div>
      <div class="widget-body am-fr">
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
            label="状态"
            min-width="100">
            <template scope="scope">
              {{scope.row.status==0?'处理中':(scope.row.status==1?'已处理':'已拒绝')}}
                </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template scope="scope">
              <el-button v-if="hasPermission('audit')" size="small" :disabled="scope.row.status!=0" @click.native="editRefund(scope.row.studentRefundId)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <window ref="studentRefund" title="退费审批">
          <change-student-refund :studentRefundId="studentRefundId"
                                 @changeStudentRefund="$refs.studentRefund.close()"></change-student-refund>
        </window>

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
  export default{
    data: function () {
      return {
        tableData: [],
        total: 0,
        pageSize: 10,
        pageNo: 1,
        studentRefundId: ''
      }
    },
    components: {
      Pagination,
      'change-student-refund': ChangeStudentRefund
    },
    mounted: function () {
      $(window).smoothScroll()
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
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminStudentRefundList, {
          pageNo: _this.pageNo,
          pageSize: _this.pageSize
        }, function (ret) {
          if (ret.success) {
            _this.total = ret.data.total
            _this.tableData = ret.data.list
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      editRefund: function (studentRefundId) {
        var _this = this
        _this.studentRefundId = studentRefundId
        _this.$refs.studentRefund.show({
          width: 1000,
          height: 600
        })
      }

    }
  }

</script>
