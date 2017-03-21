<template>
  <div class="am-u-sm-12 am-scrollable-horizontal">
   <!-- <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
      <thead>
      <tr>
        <th>班级名称</th>
        <th>年份</th>
        <th>季节</th>
        <th>年级</th>
        <th>学费</th>
        <th>开课日期</th>
        <th>上课时间</th>
        <th>讲数</th>
        <th>起始讲数</th>
        <th>结束讲数</th>
        <th>学费</th>
        <th>优惠后金额</th>
      </tr>
      </thead>
      <tbody>

      <tr v-for="item in tableData" :key="item.classId">
        <td>{{item.className}}</td>
        <td>{{item.year}}</td>
        <td></td>
        <td>{{item.gradeName}}</td>
        <td>{{item.periodName}}</td>
        <td>{{item.gradeName}}</td>
        <td>0/{{item.lectureAmount}}</td>
        <td>{{item.lectureAmount}}</td>
        <td>{{item.startAmount}}</td>
        <td>{{item.endAmount}}</td>
        <td>{{item.studyingFee}}</td>
        <td>{{0}}</td>
      </tr>
      </tbody>
    </table>-->
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    </table>
    </div>
  </div>


</template>

<script>
  import io from '../../lib/io'

  import Pagination from '../base/Pagination'

  export default{
    data:function () {
      return{
        tableData:[],
        total: 0,
        pageSize: 10,
        pageNo: 1,
        studentId:''
      }
    },

    props:['courseOrderId'],
    created:function(){
      //this.courseOrderId
      this.loadTableData(this.pageNo)
    },
    mounted:function(){
      $(window).smoothScroll()
    },

    methods:{
      loadTableData:function(pageNo){

       /* var studentId = this.$params('studentId')
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
            _this.tableData.year = new Date().getFullYear();
          }else{
            _this.$alert(ret.desc)
          }
        })*/
      }
    }
  }


</script>
