<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">查看排课</div>
          <div class="widget-function am-fr">
            <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
          </div>
        </div>
        <div class="widget-body  am-fr">

          <div class="am-u-sm-12">
            <el-table
              :data="tableData"
              border
              stripe
              style="min-width: 100%">

              <el-table-column
                prop="lectureNo"
                label="讲数"
                min-width="50">
              </el-table-column>
              <el-table-column
                label="上课时间"
                min-width="150">
                <template scope="scope">
                  <span v-if="scope.row.classDate">{{ scope.row.classDate | formatDate('dddd YYYY-MM-DD') }}&nbsp;{{scope.row.startTime}}-{{scope.row.endTime}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="teacherName"
                label="上课老师"
                min-width="100">
              </el-table-column>
              <el-table-column
                align="center"
                fixed="right"
                label="操作"
                width="150">
                <template scope="scope">
                    <el-dropdown v-if="scope.row.attendanceStatus == 0">
                    <span class="el-dropdown-link">
                      操作菜单<i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item  :disabled="!scope.row.classDate"  @click.native="rearrangeTime(scope.row)">重排时间</el-dropdown-item>
                        <el-dropdown-item  :disabled="!scope.row.teacherId"  @click.native="rearrangeTeacher(scope.row)">重排老师</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                </template>
              </el-table-column>

            </el-table>
          </div>
        </div>
      </div>
    </div>
    <rearrange-time ref="rearrangeTime" @ok="loadTableData()"></rearrange-time>
    <rearrange-teacher ref="rearrangeTeacher" @ok="loadTableData()"></rearrange-teacher>

  </div>
</template>
<script>
  import io from '../../lib/io'

  import RearrangeTimeForSingleLecture from './RearrangeTimeForSingleLecture'
  import RearrangeTeacherForSingleLecture from './RearrangeTeacherForSingleLecture'

  export default{
    data: function () {
      return {
        tableData: [],
        query: {
          classId : this.$params('classId')
        },
      }
    },
    components:{ 'rearrange-time' :  RearrangeTimeForSingleLecture,'rearrange-teacher' :  RearrangeTeacherForSingleLecture },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.loadTableData()
    },
    methods: {
      rearrangeTime:function(classLecture){
        this.$refs.rearrangeTime.classLecture = classLecture
        this.$refs.rearrangeTime.show()
      },
      rearrangeTeacher:function(classLecture){

        var _this = this;
        io.post(io.apiAdminCourseClassBaseDetail, { classId : classLecture.classId },
          function (ret) {
            if (ret.success) {
              _this.$refs.rearrangeTeacher.courseClass = ret.data
              _this.$refs.rearrangeTeacher.classLecture = classLecture
              _this.$refs.rearrangeTeacher.show()
            }
          },
          function () {
            _this.$alert('请求服务器失败')
          })

      },
      search: function () {
        this.loadTableData(1)
      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminClassTimeList, $.extend({
          pageNo: _this.pageNo,
          pageSize: _this.pageSize
        }, _this.query), function (ret) {
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
