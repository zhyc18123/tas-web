<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">考勤列表</div>
        </div>
        <div class="widget-body  am-fr">
          <div class="am-u-sm-12">
            <el-table
              :data="tableData"
              border
              stripe
              style="min-width: 100%">
              <el-table-column
                fixed
                prop="lectureNo"
                label="讲次"
                min-width="100">
              </el-table-column>
              <el-table-column
                fixed
                label="是否考勤"
                min-width="100">
                <template scope="scope">
                  {{scope.row.status  == 0 ? '否' : '是'}}
                </template>
              </el-table-column>
              <el-table-column
                prop="totalAmount"
                label="总人数"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="attendanceAmount"
                label="出勤人数"
                min-width="100">
              </el-table-column>

              <el-table-column
                prop="absenceAmount"
                label="缺勤人数"
                min-width="100">
              </el-table-column>

              <el-table-column
                prop="lateAmount"
                label="迟到人数"
                min-width="100">
              </el-table-column>

              <el-table-column
                prop="leaveAmount"
                label="请假人数"
                min-width="100">
              </el-table-column>

              <el-table-column
                fixed="right"
                label="操作"
                width="120">
                <template scope="scope">
                  <el-button size="small"  @click.native="showDetailWin(scope.row)">考勤</el-button>
                </template>
              </el-table-column>

            </el-table>
          </div>
        </div>
      </div>
    </div>
    <window ref="detailWin" title="考勤">
      <detail-list :attendanceRecord="attendanceRecord" @completed="loadTableData();$refs.detailWin.close()"></detail-list>
    </window>
  </div>
</template>
<script>
  import io from '../../lib/io'
  import AttendanceRecordDetailList from './AttendanceRecordDetailList'

  export default{
    components: {'detail-list':AttendanceRecordDetailList},
    data: function () {
      return {
        tableData: [],
        attendanceRecord:{}
      }
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.loadTableData()
    },
    methods: {
      loadTableData: function () {
        var _this = this
        io.post(io.apiAdminAttendanceAttendanceRecordList, {
          classId : _this.$params('classId')
        }, function (ret) {
          if (ret.success) {
            _this.tableData = ret.data
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      showDetailWin:function(attendanceRecord){
        this.attendanceRecord = attendanceRecord
        this.$refs.detailWin.show({
          width : 800,
          height : 500
        })
      }
    }
  }
</script>
