<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">学生考勤列表</div>
        </div>
        <div class="widget-body  am-fr">
          <div class="am-u-sm-12 am-form ">
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2  v-model="query.areaTeamId" :options="areaTeams">
                  <option value="" disabled>区域</option>
                </select2>
              </div>
            </div>
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2  v-model="query.busTeamId" :options="busTeams">
                  <option value="">业务组</option>
                </select2>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2  v-model="query.periodId" :options="periods">
                  <option value="" disabled>期数</option>
                </select2>
              </div>
            </div>


            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <input type="text" class="am-form-field" placeholder="班级编号"  v-model="query.classNo">
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <input type="text" name="className" v-model="query.className" placeholder="请输入班级名称"/>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <input type="text" name="teacherNames" v-model="query.teacherNames" placeholder="请输入教师姓名"/>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2  v-model="query.isAttendance">
                  <option value="">是否已考勤</option>
                  <option value="0">否</option>
                  <option value="1">是</option>
                </select2>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-u-end">
              <div class="am-form-group">
                <button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="search" ><span class="am-icon-search"></span>查询
                </button>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
              <div class="am-form-group am-btn-group-xs">
                <button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="exportData" v-if="hasPermission('export')">导出下载
                </button>

              </div>
            </div>

          </div>

          <div class="am-u-sm-12">
            <el-table
              :data="tableData"
              border
              stripe
              style="min-width: 100%">
              <el-table-column
                prop="areaTeamName"
                label="区域"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="busTeamName"
                label="业务组"
                min-width="200">
              </el-table-column>
              <el-table-column
                prop="campusName"
                label="校区"
                min-width="200">
              </el-table-column>
              <el-table-column
                prop="periodName"
                label="期数"
                min-width="120">
              </el-table-column>
              <el-table-column
                prop="classNo"
                label="班级编号"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="className"
                label="班级名称"
                min-width="200">
              </el-table-column>
              <el-table-column
                prop="studentName"
                label="学生姓名"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="lectureNo"
                label="讲次"
                min-width="100">
              </el-table-column>
              <el-table-column
                label="考勤情况"
                min-width="100">
                <template scope="scope">
                  <span v-if="scope.row.isAttendance == 1">
                    {{ {'0':'出勤', '1':'缺勤', '2':'迟到', '3':'请假'}[scope.row.attendanceStatus]}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                label="上课日期"
                min-width="150">
                <template scope="scope">
                  {{ scope.row.classDate | formatDate }}
                </template>
              </el-table-column>
              <el-table-column
                prop="lectureNo"
                label="上课时间"
                min-width="150">
                <template scope="scope">
                  {{ scope.row.startTime}}-{{ scope.row.endTime}}
                </template>
              </el-table-column>

              <el-table-column
                prop="studentNo"
                label="学号"
                min-width="150">
              </el-table-column>
              <el-table-column
                prop="studentPhoneNo"
                label="手机号码"
                min-width="150">
              </el-table-column>

            </el-table>
          </div>
          <div class="am-u-lg-12 am-cf">

            <div class="am-fr">
              <pagination v-bind:total="total" v-bind:pageNo="pageNo" v-bind:pageSize="pageSize"
                          @paging="loadTableData"/>
            </div>
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
        tableData: [],
        total: 0,
        pageSize: 10,
        pageNo: 1,
        query: {
          areaTeamId : window.config.areaTeams[0] && window.config.areaTeams[0].areaTeamId || '' ,
          busTeamId : '',
          periodId : '',
          isAttendance : ''
        },
        periods:[],
      }
    },
    components: {
      Pagination,
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.loadTableData(this.pageNo)
      this.loadPeriodData()
    },
    computed: {
      areaTeams: function () {
        var options = ( this.$root.config.areaTeams || [] )
          .map(function (item) {
            return {value: item.areaTeamId, text: item.name}
          })
        return options
      },
      busTeams: function () {
        var options = ( ( this.query.areaTeamId  ) ? ( this.$root.config.groupBusTeams[this.query.areaTeamId] || [] ) : [] )
          .map(function (item) {
            return {value: item.busTeamId, text: item.name}
          })
        this.query.busTeamId = ''
        return options
      },
      grades: function () {
        return this.$root.config.grades.map(function(item){
          return {value: item.gradeId, text: item.gradeName}
        })
      },
      subjects: function () {
        return this.$root.config.subjects.map(function(item){
          return {value: item.subjectId, text: item.subjectName}
        })
      },
    },
    watch:{
      'query.areaTeamId':function(){
        this.query.busTeamId =  ''
        this.query.periodId = ''
        this.loadPeriodData()
      }
    },
    methods: {
      search: function () {
        this.loadTableData(1)
      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        _this.$showLoading()
        io.post(io.apiAdminAttendanceAttendClassRecordDetailList, $.extend({
          pageNo: _this.pageNo,
          pageSize: _this.pageSize
        }, _this.query), function (ret) {
          _this.$hiddenLoading()
          if (ret.success) {
            _this.total = ret.data.total
            _this.tableData = ret.data.list
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      loadPeriodData: function () {
        var _this = this
        io.post(io.apiAdminPeriodListForAreaTeam, {
          areaTeamId : this.query.areaTeamId
        }, function (ret) {
          if (ret.success) {
            _this.periods = ret.data.map(function (item) {
              return {value: item.periodId, text: item.periodName }
            })
            _this.query.periodId = ret.data.filter(item => item.isCurrent == 1 )[0].periodId
            _this.$emit('period.loaded')
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      exportData:function(){
        io.downloadFile(io.apiAdminAttendanceExportAttendClassRecordDetail , this.query )
      },
    }
  }
</script>
