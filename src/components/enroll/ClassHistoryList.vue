<template>
  <div>
    <div class="am-u-sm-12 am-scrollable-horizontal">
      <span class="am-u-lg-1"><input  type="radio" name="classStatus" value="4" class="who" checked>全部班级</span>
      <span class="am-u-lg-1"><input  type="radio" name="classStatus" value="0" class="who">在读班级</span>
      <span class="am-u-lg-1"><input  type="radio" name="classStatus" value="1" class="who">转出班级</span>
      <span class="am-u-lg-1"><input  type="radio" name="classStatus" value="2" class="who">退账户班级</span>
      <span class="am-u-lg-1"><input  type="radio" name="classStatus" value="3" class="who">退费班级</span>
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
          <th>班级已上讲次</th>
          <th>开课时间</th>
          <th>上课时间</th>
        </tr>
        </thead>
        <tbody>

        <tr v-for="(item, index) in tableData" :key="item.classId">
          <td>{{index+1}}</td>
          <td>{{item.className}}</td>
          <td>{{item.status}}</td>
          <td>{{item.periodName}}</td>
          <td>{{item.classId}}</td>
          <td>{{item.campusName}}</td>
          <td>{{item.subjectName}}</td>
          <td>{{item.teacherNames}}</td>
          <td>{{item.roomName}}</td>
          <td>{{item.totalAmount}}</td>
          <td></td>
          <td>{{item.paidAmount}}</td>
          <td>{{item.totalAmount - item.paidAmount}}</td>
          <td>{{item.amount}}</td>
          <td>{{item.startAmount}} / {{item.endAmount}}</td>
          <td>{{item.courseProgress}}</td>
          <td>{{item.startCourseTime}}</td>
          <td></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import io from '../../lib/io'

  export default{
    data: function () {
      return{
        studentId:'',
        regStatus:'',
        tableData:[],
      }
    },
    created:function () {
      var regStatus = 4;
      this.loadDataTable(regStatus);
    },
    mounted:function () {
      var _this = this;
      $(".who").unbind("click").click(function () {
        var regStatus = $(this).val();
        _this.loadDataTable(regStatus);
      })
    },
    methods: {
      loadDataTable: function (regStatus) {
        var _this = this;
        var studentId = this.$params('studentId');
        io.get(io.apiAdminClassHistoryList,{
          regStatus:regStatus,
          studentId:studentId,
        },function(ret){
          if(ret.success){
            _this.tableData = ret.data;
          }else{
            _this.$alert(ret.desc);
          }
        })
      },
    }
  }

</script>
