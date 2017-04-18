<template>
  <div class="am-u-sm-12">
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
      <el-table-column
        fixed="right"
        label="操作"
        width="180">
        <template scope="scope">
          <el-button size="small" :disabled="scope.row.studentReg.chargingStatus != 2" @click.native="turnClass(scope.row.studentReg.regId)">转班</el-button>
          <el-button size="small" :disabled="scope.row.studentReg.chargingStatus != 2 || scope.row.studentReg.refundStatus == 1"
                     @click.native="studentRefund(scope.row.studentReg.regId)">退费申请
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <window ref="first" title="转班" @close="regId=''">
      <turn-class :regId="regId" @completed="$refs.first.close()"></turn-class>
    </window>


    <window ref="studentRefund" title="退费申请">
      <student-refund :regId="regId" @arrangementSuccess="$refs.studentRefund.close()"></student-refund>
    </window>

  </div>
</template>

<script>
  import io from '../../lib/io'

  import Pagination from '../base/Pagination'
  import TurnClass from './TurnClass'
  import StudentRefundForm from './StudentRefundForm'

  export default{
    data: function () {
      return {
        refund: '',
        studentId: '',
        tableData: [],
        regId: '',
        classId: ''
      }
    },
    components: {
      'turn-class': TurnClass,
      'student-refund': StudentRefundForm,
    },
    created: function () {
      this.loadDataTable()
      var _this = this
      this.$root.$on('class:new', function () {
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

          } else {
            _this.$alert(ret.desc || '处理失败')
          }
        })
      },
      turnClass: function (regId) {
        var _this = this
        _this.regId = regId
        _this.$refs.first.show({
          width: 1200,
          height: 600,
        })
      },
      studentRefund: function (regId) {
        var _this = this;
        _this.regId = regId;
        _this.$refs.studentRefund.show({
          width: 1000,
          height: 700,
        })
      }
    }
  }

</script>
