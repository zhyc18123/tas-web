<template>
  <div class="am-u-sm-12 am-scrollable-horizontal">
    <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
      <thead>
      <tr>
        <th>序号</th>
        <th>期数</th>
        <th>校区</th>
        <th>年级</th>
        <th>班级名称</th>
        <th>总金额</th>
        <th>以上/总讲数</th>
        <th>报读开始讲数</th>
        <th>报读结束讲数</th>
        <th>报名讲数</th>
        <th>开课日期</th>
        <th>上课时间</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>

      <tr v-for="(item,index) in tableData" :key="item.studentReg">
        <td>{{index+1}}</td>
        <td>{{item.courseClass.periodName}}</td>
        <td>{{item.courseClass.campusName}}</td>
        <td>{{item.courseClass.gradeName}}</td>
        <td>{{item.courseClass.className}}</td>
        <td>{{item.courseClass.studyingFee}}</td>
        <td>/{{item.courseClass.lectureAmount}}</td>
        <td>{{item.studentReg.startAmount}}</td>
        <td>{{item.studentReg.endAmount}}</td>
        <td>{{item.studentReg.endAmount-item.studentReg.startAmount+1}}</td>
        <td>{{item.courseClass.startCourseTime | formatDate }}</td>
        <td></td>
        <td>
          <div class="tpl-table-black-operation">
            <a href="javascript:;" @click="">
              <i class="am-icon-edit"></i> 转班
            </a>
            <a href="javascript:;" @click="">
              <i class="am-icon-edit"></i> 班级退账户
            </a>
            <a href="javascript:;" @click="$router.push('/main/enroll/student/studentRefundForm')">
              <i class="am-icon-edit"></i> 退费申请
            </a>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import io from '../../lib/io'

  import Pagination from '../base/Pagination'

  export default{
    data: function () {
      return{
        studentId:'',
        tableData:[] //空{}肯定有问题，要多看下例子,还有其他问题么
      }
    },
    created:function () {
      this.loadDataTable()
      var _this = this
      this.$root.$on('class:new',function(){
        _this.loadDataTable()
      })
    },
    methods: {
      loadDataTable: function () {
        var _this = this
        var studentId = this.$params('studentId')
        //创建订单和注册信息
        io.get(io.apiAdminStudentReadClassList, {
          studentId: studentId,
        }, function (ret) {
          if (ret.success) {
            _this.tableData = ret.data

          }else {
            _this.$alert(ret.desc  || '处理失败')
          }
        })
      }
    }
  }

</script>
