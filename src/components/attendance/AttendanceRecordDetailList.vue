<template>
  <window ref="win" title="考勤">
    <div class="am-u-sm-12 am-scrollable-horizontal">

      <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
        <thead>
        <tr>
          <th>#</th>
          <th>学生</th>
          <th>班级状态</th>
          <th>考勤</th>
          <th>调班</th>
        </tr>
        </thead>
        <tbody>

        <tr v-for="(item,index) in tableData" :key="item.studentId">
          <td>{{index}}</td>
          <td>{{item.studentName}}</td>
          <td>{{ {'0' : '正常' , '1' : '已调出' , '2' : '调入' }[item.shiftStatus]}}</td>
          <td>
            <div class="am-form" v-if="item.shiftStatus != 1 ">
              <label class="am-radio-inline">
                <input type="radio" :name="'status-'+item.studentId" value="0" v-model="item.attendanceStatus"> 出勤
            </label>
              <label class="am-radio-inline">
                <input type="radio" :name="'status-'+item.studentId" value="1" v-model="item.attendanceStatus"> 缺勤
            </label>
              <label class="am-radio-inline">
                <input type="radio" :name="'status-'+item.studentId" value="2" v-model="item.attendanceStatus"> 迟到
            </label>
              <label class="am-radio-inline">
                <input type="radio" :name="'status-'+item.studentId" value="3" v-model="item.attendanceStatus"> 请假
            </label>
            </div>
          </td>
          <td>
            <el-button size="small"  @click.native="shiftClass(item.regId ,item.attendClassRecordId )" :disabled="item.shiftStatus != 0 || ( item.isAttendance == 1 && item.attendanceStatus == 0)">临时调班</el-button>
          </td>
        </tr>

        </tbody>
      </table>

    </div>
    <div class="am-u-sm-12 am-text-center am-margin-top-lg">
      <button type="button" class="am-btn am-btn-primary" @click="save">保存</button>
    </div>
    <shift-class ref="shiftClass" @completed="loadTableData"></shift-class>
  </window>

</template>

<script>
  import io from '../../lib/io'
  import ShiftClass from '../enroll/ShiftClass.vue'

  export default{
    data: function () {
      return {
        tableData: [],
        attendanceRecord:{},
      }

    },
    components: {
      'shift-class': ShiftClass,
    },
    methods: {
      show:function(){
        this.$refs.win.show({
          width : 1000,
          height : 500
        })
        this.loadTableData()
      },
      loadTableData: function () {
        if (!this.attendanceRecord.classLectureId) {
          return
        }
        var _this = this
        io.post(io.apiAdminAttendanceAttendanceRecordDetailList, {
          classLectureId: this.attendanceRecord.classLectureId
        }, function (ret) {
          if (ret.success) {
            _this.tableData = ret.data;
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      save: function () {
        var _this = this
        io.post(io.apiAdminAttendanceSaveAttendanceRecordDetail, {
          classLectureId: this.attendanceRecord.classLectureId,
          details: JSON.stringify(this.tableData.map(function (item) {
            return {
              attendClassRecordId: item.attendClassRecordId,
              attendanceStatus: item.attendanceStatus
            }
          }))
        }, function (ret) {
          if (ret.success) {
            _this.$toast('保存成功')
            _this.$emit('completed')
            _this.$refs.win.close()
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      shiftClass: function (regId , attendClassRecordId ) {
        this.$refs.shiftClass.regId = regId
        this.$refs.shiftClass.args.defaultAttendClassRecordId = attendClassRecordId
        this.$refs.shiftClass.show()
      },
    }
  }

</script>
