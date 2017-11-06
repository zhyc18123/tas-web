<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">考勤班级列表</div>
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
                  <option value="">期数</option>
                </select2>
              </div>
            </div>


            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <input type="text" class="am-form-field" placeholder="班级编号"  v-model="query.classNo">
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3" style="clear: both">
              <div class="am-form-group">
                <input type="text" name="className" v-model="query.className" placeholder="班级名称"/>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <input type="text" name="teacherName" v-model="query.teacherName" placeholder="任课老师姓名"/>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <el-date-picker
                  v-model="query.classDate"
                  type="date"
                  placeholder="上课日期">
                </el-date-picker>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2  v-model="query.timeSegment">
                  <option value="">上课时间</option>
                  <option value="00:00-08:00">00:00-08:00</option>
                  <option value="08:00-10:00">08:00-10:00</option>
                  <option value="10:00-12:00">10:00-12:00</option>
                  <option value="12:00-14:00">12:00-14:00</option>
                  <option value="14:00-16:00">14:00-16:00</option>
                  <option value="16:00-18:00">16:00-18:00</option>
                  <option value="18:00-20:00">18:00-20:00</option>
                  <option value="20:00-22:00">20:00-22:00</option>
                  <option value="22:00-24:00">22:00-24:00</option>
                </select2>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2  v-model="query.attendanceStatus">
                  <option value="">是否考勤</option>
                  <option value="0">未考勤</option>
                  <option value="1">已考勤</option>
                </select2>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-6 am-u-end">
              <div class="am-form-group">
                <button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="search" ><span class="am-icon-search"></span>查询
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
                fixed
                prop="classNo"
                label="班级编号"
                min-width="100">
              </el-table-column>
              <el-table-column
                fixed
                prop="className"
                label="班级名称"
                min-width="200">
              </el-table-column>
              <el-table-column
                prop="periodName"
                label="期名"
                min-width="120">
              </el-table-column>
              <el-table-column
                prop="campusName"
                label="校区"
                min-width="200">
              </el-table-column>

              <el-table-column
                prop="lectureNo"
                label="讲次"
                min-width="70">
              </el-table-column>
              <el-table-column
                label="上课日期"
                min-width="150">
                <template scope="scope">
                  {{scope.row.classDate | formatDate }}
                </template>
              </el-table-column>
              <el-table-column
                label="上课时间"
                min-width="150">
                <template scope="scope">
                  {{scope.row.startTime }}-{{scope.row.endTime }}
                </template>
              </el-table-column>
              <el-table-column
                label="是否考勤"
                min-width="100">
                <template scope="scope">
                  {{scope.row.attendanceStatus  == 0 ? '否' : '是'}}
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
                prop="seniorName"
                label="班主任"
                min-width="100">
              </el-table-column>

              <el-table-column
                prop="teacherName"
                label="任课老师"
                min-width="100">
              </el-table-column>

              <el-table-column
                fixed="right"
                label="操作"
                width="80">
                <template scope="scope">
                  <el-button size="small"  @click.native="showDetailWin(scope.row)">{{scope.row.attendanceStatus  == 0 ? '考勤' : '修改考勤'}}</el-button>
                </template>
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
    <detail-list ref="attendanceRecordDetail" @completed="loadTableData()"></detail-list>
  </div>
</template>
<script>
  import io from '../../lib/io'
  import moment from 'moment'
  import Pagination from '../base/Pagination'
  import AttendanceRecordDetailList from './AttendanceRecordDetailList'

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
          timeSegment : '',
          classDate:'',
          classNo: '',
          teacherName: '',
          className: '',
          attendanceStatus: '',
        },
        periods:[],
      }
    },
    components: {
      Pagination,
      'detail-list':AttendanceRecordDetailList
    },
    watch:{
      'query.areaTeamId':function(){
        this.query.busTeamId =  ''
        this.query.periodId = ''
        this.loadPeriodData()
      }
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.$once('period.loaded',()=>{
        this.loadTableData(this.pageNo)
      })
      this.loadPeriodData()
      var _this = this
      this.$root.$on('courseClass:new',function(){
        _this.pageNo = 1
        _this.loadTableData(_this.pageNo)
      })
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

    },
    methods: {
      search: function () {
        this.loadTableData(1)
      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminAttendClassLectureList, $.extend({
          pageNo: _this.pageNo,
          pageSize: _this.pageSize
        }, Object.assign({},_this.query, {
          classDate: this.query.classDate ? moment(this.query.classDate).format('YYYY-MM-DD') : ''
        })), function (ret) {
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
      showDetailWin:function(attendanceRecord){
        this.$refs.attendanceRecordDetail.attendanceRecord =  attendanceRecord
        this.$refs.attendanceRecordDetail.show()
      }
    }
  }
</script>
