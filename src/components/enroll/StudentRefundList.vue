<template>
  <div>
    <div class="am-u-sm-12 am-scrollable-horizontal">
      <div class="widget-head am-cf">
        <div class="widget-title  am-cf">学生退费管理</div>
      </div>
      <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
        <thead>
        <tr>
          <th>序号</th>
          <th>学生姓名</th>
          <th>班级名称</th>
          <th>申请退费讲次</th>
          <th>退费金额</th>
          <th>退费原因</th>
          <th>退费方式</th>
          <th>审批意见</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>

        <tr v-for="(item,index) in tableData" :key="item.studentRefundId">
          <td>{{index+1}}</td>
          <td>{{item.studentName}}</td>
          <td>{{item.className}}</td>
          <td>{{item.refundLecture}}</td>
          <td>{{item.amount}}</td>
          <td>{{item.description}}</td>
          <td>
            <span v-if="item.refundWay==0">支付宝</span>
            <span v-if="item.refundWay==1">微信</span>
            <span v-if="item.refundWay==2">现金</span>
            <span v-if="item.refundWay==3">余额账户</span>
            <span v-if="item.refundWay==4">银行卡转账</span>
          </td>
          <td>{{item.returnResult}}</td>
          <td>{{item.status==0?'处理中':(item.status==1?'已处理':'已拒绝')}}</td>
          <td>
            <div class="tpl-table-black-operation">
              <a @click="editRefund(item.studentRefundId)">
                <i class="am-icon-edit"></i> 修改
              </a>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <window ref="studentRefund" title="退费审批">
        <change-student-refund :studentRefundId="studentRefundId" @changeStudentRefund="$refs.studentRefund.close()" ></change-student-refund>
      </window>

      <div class="am-u-lg-12 am-cf">
        <div class="am-fr">
          <pagination v-bind:total="total" v-bind:pageNo="pageNo" v-bind:pageSize="pageSize"
                      @paging="loadTableData"/>
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
        studentRefundId:''
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
      this.$root.$on('studentRefundList:new',function(){
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
//        alert(studentRefundId)
        _this.$refs.studentRefund.show({
          width: 1000,
          height: 600
        })
      }

    }
  }

</script>
