<template>
  <div class="am-u-sm-12 am-scrollable-horizontal">
    <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
      <thead>
      <tr>
        <th>序号</th>
        <th>订单编号</th>
        <th>缴费时间</th>
        <th>总金额</th>
        <th>应缴金额</th>
        <th>已缴金额</th>
        <th>欠费金额</th>
        <th>状态</th>
        <th>操作人</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>

      <tr v-for="(item,index) in tableData" :key="item.courseOrderId">
        <td>{{index+1}}</td>
        <td>{{item.courseOrderId}}</td>
        <td>{{item.createTime | formatTime}}</td>
        <td>{{item.totalAmount}}</td>
        <td>{{item.payableAmount}}</td>
        <td>{{item.paidAmount}}</td>
        <td>{{item.payableAmount-item.paidAmount}}</td>
        <td>
          <span v-if="item.payableAmount-item.paidAmount==0">已缴费</span>
          <span v-else>欠费&nbsp;&nbsp;&nbsp;<a>缴费</a></span>
        </td>
        <td>{{item.operator}}</td>
        <td>
          <div class="tpl-table-black-operation">
              <a  @click = showDetail(item.courseOrderId)><i class="am-icon-edit"></i>订单详情</a>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
    <window ref="order">
      <course-order-detail :courseOrderId="courseOrderId"></course-order-detail>
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
  import CourseOrderDetail from './CourseOrderDetail'

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
      'course-order-detail' : CourseOrderDetail
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
