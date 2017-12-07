<template>
  <div class="am-u-sm-12">
    <el-table
      :data="tableData"
      border
      stripe
      style="min-width: 100%">
      <el-table-column
        fixed
        prop="courseClass.classNo"
        label="班级编号"
        min-width="100">
      </el-table-column>
      <el-table-column
        fixed
        label="班级名称"
        min-width="200">
        <template scope="scope">
          {{scope.row.courseClass.className}}

        </template>
      </el-table-column>
      <el-table-column
        label="期数"
        min-width="120">
        <template scope="scope">
          {{scope.row.courseClass.periodName }}

        </template>
      </el-table-column>

      <el-table-column
        label="校区"
        min-width="200">
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
        label="起止讲数"
        min-width="100">
        <template scope="scope">
          {{scope.row.studentReg.startAmount}}-{{scope.row.studentReg.endAmount}}
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
      <el-table-column
        fixed="right"
        label="操作"
        min-width="200">
        <template scope="scope">
          <el-button size="small"  @click.native="shiftClass(scope.row.studentReg.regId)">临时调班</el-button>
          <el-button size="small" :disabled="scope.row.studentReg.chargingStatus != 2 || scope.row.studentReg.refundStatus == 1 "
                     @click.native="studentRefund(scope.row.studentReg.regId)">退费申请
          </el-button>
          <!--todo-->
          <!--<el-button size="small" :disabled="scope.row.studentReg.chargingStatus != 2 || scope.row.studentReg.refundStatus == 1 "-->
                     <!--@click.native="studentRefund(scope.row.studentReg.regId)">发票管理-->
          <!--</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <turn-class ref="turnClass" @completed="loadDataTable"></turn-class>
    <shift-class ref="shiftClass" @completed="loadDataTable"></shift-class>
    <student-refund ref="studentRefund" @completed="loadDataTable"></student-refund>

  </div>
</template>

<script>
  import io from '../../lib/io'

  import Pagination from '../base/Pagination'
  import TurnClass from './TurnClass'
  import ShiftClass from './ShiftClass'
  import StudentRefundForm from './StudentRefundForm'

  export default{
    data: function () {
      return {
        refund: '',
        studentId: '',
        tableData: [],
      }
    },
    components: {
      'turn-class': TurnClass,
      'shift-class': ShiftClass,
      'student-refund': StudentRefundForm,
    },
    created: function () {
    	let _this = this
      this.loadDataTable()
      this.$root.$on('order:new',()=>{
        _this.loadDataTable()
      })
      this.$root.$on('order:pay:success',()=>{
        _this.loadDataTable()
      })
    },
    methods: {
      loadDataTable: function () {
        var _this = this
        var studentId = this.$params('studentId')
        //创建订单和注册信息
        io.post(io.apiAdminStudentReadClassList, {
          studentId: studentId,
        }, function (ret) {
          if (ret.success) {
            _this.tableData = ret.data
          } else {
            _this.$alert(ret.desc || '处理失败')
          }
        })
      },
      turnClass: function (regId) {
        this.$refs.turnClass.regId = regId
        this.$refs.turnClass.show()
      },
      shiftClass: function (regId) {
        this.$refs.shiftClass.regId = regId
        this.$refs.shiftClass.show()
      },
      studentRefund: function (regId) {
        this.$refs.studentRefund.regId = regId
        this.$refs.studentRefund.show()
      }
    }
  }

</script>
