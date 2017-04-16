<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">考勤列表</div>
        </div>
        <div class="widget-body  am-fr">
          <div class="am-u-sm-12 am-scrollable-horizontal">
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
                  <el-button size="small" :disabled="scope.row.status == 1" @click.native="$router.push('/main/enroll/class/reg/'+scope.row.classId)">考勤</el-button>
                </template>
              </el-table-column>

            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import io from '../../lib/io'
  import Pagination from '../base/Pagination'

  export default{
    data: function () {
      return {
        tableData: []
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
      }
    }
  }
</script>
