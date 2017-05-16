<template>
  <div>
    <div class="am-u-sm-12">
      <div class="am-form">
        <div class="am-form-group">
          <label ><input  type="radio" name="regStatus" value=""  v-model="regStatus">全部班级</label>
          <label ><input  type="radio" name="regStatus" value="0" v-model="regStatus">在读班级</label>
          <label ><input  type="radio" name="regStatus" value="1" v-model="regStatus">转出班级</label>
          <label ><input  type="radio" name="regStatus" value="3" v-model="regStatus">退费班级</label>

        </div>
      </div>

      <el-table
        :data="tableData"
        border
        stripe
        style="min-width: 100%">
        <el-table-column
          fixed
          label="班级名称"
          min-width="200">
          <template scope="scope">
            {{scope.row.courseClass.className}}

        </template>
        </el-table-column>
        <el-table-column
          label="报读状态"
          min-width="100">
          <template scope="scope">
            {{scope.row.studentReg.regStatus == 0 ? '在读' : scope.row.studentReg.regStatus ==  1 ? '转班' : scope.row.studentReg.regStatus ==  2 ? '退账户' :'退班退费' }}
        </template>
        </el-table-column>
        <el-table-column
          label="期数"
          min-width="100">
          <template scope="scope">
            {{scope.row.courseClass.periodName}}

        </template>
        </el-table-column>

        <el-table-column
          label="校区"
          min-width="100">
          <template scope="scope">
            {{scope.row.courseClass.campusName}}

        </template>
        </el-table-column>
        <el-table-column
          label="年级"
          min-width="100">
          <template scope="scope">
            {{scope.row.courseClass.gradeName}}

        </template>
        </el-table-column>

        <el-table-column
          label="总金额"
          min-width="100">
          <template scope="scope">
            {{scope.row.courseClass.studyingFee}}

        </template>
        </el-table-column>
        <el-table-column
          label="已上/总讲数"
          min-width="120">
          <template scope="scope">
            {{scope.row.courseClass.completedLectureAmount}}/{{scope.row.courseClass.lectureAmount}}

        </template>
        </el-table-column>
        <el-table-column
          label="报读开始讲数"
          min-width="150">
          <template scope="scope">
            {{scope.row.studentReg.startAmount}}

        </template>
        </el-table-column>
        <el-table-column
          label="报读结束讲数"
          min-width="150">
          <template scope="scope">
            {{scope.row.studentReg.endAmount}}

        </template>
        </el-table-column>
        <el-table-column
          label="报名讲数"
          min-width="100">
          <template scope="scope">
            {{scope.row.studentReg.endAmount - scope.row.studentReg.startAmount + 1}}
        </template>
        </el-table-column>
        <el-table-column
          label="开课日期"
          min-width="150">
          <template scope="scope">
            {{scope.row.courseClass.startCourseTime | formatDate }}
        </template>
        </el-table-column>
        <el-table-column
          prop="courseClass.studyingTime"
          label="上课时间"
          min-width="150">
        </el-table-column>
      </el-table>

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
    watch:{
      regStatus:function(val){
          this.loadDataTable()
      }
    },
    mounted:function () {

    },
    methods: {
      loadDataTable: function () {
        var _this = this;
        var studentId = this.$params('studentId');
        io.get(io.apiAdminClassHistoryList,{
          regStatus:this.regStatus,
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
