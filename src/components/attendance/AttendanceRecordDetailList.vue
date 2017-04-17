<template>
  <div class="am-g">
    <div class="am-u-sm-12 am-scrollable-horizontal">

      <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
        <thead>
        <tr>
          <th>#</th>
          <th>学生</th>
          <th>考勤</th>
        </tr>
        </thead>
        <tbody>

        <tr v-for="(item,index) in tableData" :key="item.studentId">
          <td>{{index}}</td>
          <td>{{item.studentName}}</td>
          <td>
            <div class="am-form">
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
        </tr>

        </tbody>
      </table>

    </div>
    <div class="am-u-sm-12 am-text-center am-margin-top-lg">
      <button type="button" class="am-btn am-btn-primary" @click="save">保存</button>
    </div>
  </div>

</template>

<script>
  import io from '../../lib/io'

  export default{
    data: function () {
      return {
        tableData: [],
      }

    },
    props: ['attendanceRecord'],
    watch: {
      'attendanceRecord.recordId': function () {
        this.loadTableData()
      }
    },
    created: function () {
      this.loadTableData()
    },
    methods: {
      loadTableData: function () {
        if (!this.attendanceRecord.recordId) {
          return
        }
        var _this = this
        io.post(io.apiAdminAttendanceAttendanceRecordDetailList, {
          recordId: this.attendanceRecord.recordId
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
          recordId: this.attendanceRecord.recordId,
          details: JSON.stringify(this.tableData.map(function (item) {
            return {
              detailId: item.detailId,
              attendanceStatus: item.attendanceStatus
            }
          }))
        }, function (ret) {
          if (ret.success) {
            _this.$alert('保存成功')
            _this.$emit('completed')
          } else {
            _this.$alert(ret.desc)
          }
        })
      }
    }
  }

</script>
