<template>
  <div class="am-u-sm-12">

    <el-table
      :data="tableData"
      border
      stripe
      style="min-width: 100%">
      <el-table-column
        fixed
        prop="courseOrderId"
        label="订单编号"
        min-width="150">
      </el-table-column>
      <el-table-column
        label="缴费时间"
        min-width="100">
        <template scope="scope">
          {{scope.row.createTime | formatTime}}
              </template>
      </el-table-column>
      <el-table-column
        prop="totalAmount"
        label="总金额"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="payableAmount"
        label="应缴金额"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="paidAmount"
        label="已缴金额"
        min-width="100">
      </el-table-column>
      <el-table-column
        label="欠费金额"
        min-width="100">
        <template scope="scope">
          {{scope.row.payableAmount-scope.row.paidAmount}}
                </template>
      </el-table-column>
      <el-table-column
        label="缴费状态"
        min-width="100">
        <template scope="scope">
          {{scope.row.chargingStatus == 0 ? '未缴费' : (scope.row.chargingStatus == 1 ? '欠费' : '已缴费') }}
                </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="180">
        <template scope="scope">
          <el-button size="small" :disabled="scope.row.chargingStatus == 2 " @click.native="showDetail(scope.row.courseOrderId)">缴费</el-button>
          <el-button size="small" @click.native="showDetail(scope.row.courseOrderId)">订单详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <window ref="order" title="订单详情">
      <course-order :courseOrderId="courseOrderId" @paySuccess="$refs.order.close()" ></course-order>
    </window>
    <div class="am-u-lg-12 am-cf">
      <div class="am-fr">
        <pagination v-bind:total="total" v-bind:pageNo="pageNo" v-bind:pageSize="pageSize"
                    @paging="loadTableData"/>
      </div>
    </div>
  </div>
</template>

<script>
  import io from '../../lib/io'

  import Pagination from '../base/Pagination'
  import CourseOrder from './CourseOrder'

  export default{
    data : function () {
      return{
        tableData:[],
        total: 0,
        pageSize: 10,
        pageNo: 1,
        studentId:'',
        courseOrderId: '',
      }

    },
    components: {
      Pagination,
      'course-order' : CourseOrder
    },
    mounted:function(){
      $(window).smoothScroll()
    },
    created:function () {
      this.loadTableData(this.pageNo)
      var _this = this
      this.$root.$on('order:new',function(){
        _this.pageNo = 1
        _this.loadTableData(_this.pageNo)
      })
    },
    methods:{
      loadTableData:function(pageNo){

        var studentId = this.$params('studentId')
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminCourseOrderList,$.extend({
          pageNo:_this.pageNo,
          pageSize:_this.pageSize,
          studentId:studentId
        },_this.query),function(ret){
          if(ret.success){
//            alert(JSON.stringify(ret.data));
            _this.total = ret.data.total
            _this.tableData = ret.data.list;
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
      showDetail(courseOrderId){
        var _this = this
        _this.courseOrderId = courseOrderId
        _this.$refs.order.show({
          width:1000,
          height:600
        })
      }

    }
  }

</script>
