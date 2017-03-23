<template>
  <div>
    <div class="am-u-sm-12 am-scrollable-horizontal">
      <input type="radio" name="classStatus" value="4" class="who" checked>全部班级&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <input type="radio" name="classStatus" value="0" class="who">在读班级&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <input type="radio" name="classStatus" value="1" class="who">转出班级&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <input type="radio" name="classStatus" value="2" class="who">退账户班级&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <input type="radio" name="classStatus" value="3" class="who">退费班级
      <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
        <thead>
        <tr>
          <th>序号</th>
          <th>班级名称</th>
          <th>状态</th>
          <th>期数</th>
          <th>班级编号</th>
          <th>校区</th>
          <th>学科</th>
          <th>老师</th>
          <th>教室</th>
          <th>原价</th>
          <th>优惠金额</th>
          <th>实缴金额</th>
          <th>欠款金额</th>
          <th>退款金额</th>
          <th>开始讲次/结束讲次</th>
          <th>班级以上讲次</th>
          <th>开课时间</th>
          <th>上课时间</th>
        </tr>
        </thead>
        <tbody>

        <tr v-for="(item, index) in tableData" :key="">
          <td>{{index+1}}</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        </tbody>
      </table>
    </div>
    <!--<div class="am-u-lg-12 am-cf">
      <div class="am-fr">
        <pagination v-bind:total="total" v-bind:pageNo="pageNo" v-bind:pageSize="pageSize" @paging="loadTableData" />
      </div>
    </div>-->
  </div>
</template>

<script>
  import io from '../../lib/io'

  import Pagination from '../base/Pagination'

  export default{
    data: function () {
      return{
        studentId:'',
        regStatus:'',
        tableData:[],
        studentData:[],
        pageSize:10,
        pageNo:1,
      }
    },
    components: {
      Pagination
    },
    created:function () {
     /* var regStatus = 4;
      this.loadDataTable(this.pageNo, regStatus);*/
    },
    mounted:function () {
      /*$(window).smoothScroll()
      var _this = this;
      $(".who").unbind("click").click(function () {
        var regStatus = $(this).val();
        _this.loadDataTable(this.pageNo,regStatus);
      })*/
    },
    methods: {
     /* loadDataTable: function (pageNo,regStatus) {
        var _this = this
        var studentId = this.$params('studentId');
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminClassHistoryList,{
          pageNo:_this.pageNo,
          pageSize:_this.pageSize,
          regStatus:regStatus,
          studentId:studentId,
        },function(ret){
          if(ret.success){
            _this.total = ret.data.total
            _this.tableData = ret.data.list
          }else{
            _this.$alert(ret.desc)
          }
        })
      },*/

    }
  }

</script>
