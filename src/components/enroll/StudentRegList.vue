<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">班级列表</div>
        </div>
        <div class="widget-body  am-fr">
          <div class="am-u-sm-12 am-form ">
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2 v-model="query.areaTeamId" :options="areaTeams">
                  <option value="">区域</option>
                </select2>
              </div>
            </div>
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2 v-model="query.busTeamId" :options="busTeams">
                  <option value="">业务组</option>
                </select2>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2 v-model="query.periodId" :options="periods">
                  <option value="">期数</option>
                </select2>
              </div>
            </div>
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2  v-model="query.gradeId" :options="grades">
                  <option value="">年级</option>
                </select2>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2  v-model="query.subjectId" :options="subjects">
                  <option value="">科目</option>
                </select2>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <input type="text" name="className" v-model="query.className" placeholder="请输入班级名称"/>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <input type="text" name="teacherNames" v-model="query.studentName" placeholder="请输入学生姓名"/>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2 v-model="query.regStatus">
                  <option value="">报名状态</option>
                  <option value="0">在读</option>
                  <option value="1">转班</option>
                  <!--<option value="2">退账户</option>-->
                  <option value="3">退班退费</option>
                  <option value="4">无效</option>
                </select2>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2 v-model="query.chargingStatus">
                  <option value="">缴费状态</option>
                  <option value="0">未缴费</option>
                  <option value="1">欠费</option>
                  <option value="2">已缴费</option>
                </select2>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-u-end">
              <div class="am-form-group">
                <button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="search"><span class="am-icon-search"></span>查询
                </button>
                <button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="exportStudentReg"><span class="am-icon-download"></span>导出
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
                prop="studentName"
                label="学生姓名"
                min-width="100">
              </el-table-column>
              <el-table-column
                fixed
                prop="studentNo"
                label="学生学号"
                min-width="130">
              </el-table-column>
              <el-table-column
                fixed
                prop="phoneNo"
                label="电话号码"
                min-width="130">
              </el-table-column>
              <el-table-column
                fixed
                prop="phoneNo"
                label="生源类型"
                min-width="100">
                <template scope="scope">
                  {{{'0': '新生', '1': '老生', '2': '续读生'}[scope.row.studentState]}}
                </template>
              </el-table-column>
              <el-table-column
                prop="seniorName"
                label="班主任"
                min-width="100">
              </el-table-column>

              <el-table-column
                prop="className"
                label="班级名称"
                min-width="200">
              </el-table-column>
              <el-table-column
                prop="gradeName"
                label="年级"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="subjectName"
                label="科目"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="periodName"
                label="期名"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="campusName"
                label="校区"
                min-width="200">
              </el-table-column>
              <el-table-column
                prop="roomName"
                label="教室"
                min-width="100">
              </el-table-column>
              <el-table-column
                label="众筹"
                min-width="60">
                <template scope="scope">
                  {{scope.row.classType == 0 ? "否" : "是"}}
                </template>
              </el-table-column>
              <el-table-column
                label="开课日期"
                min-width="150">
                <template scope="scope">
                  {{scope.row.startCourseTime | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
                prop="studyingTime"
                label="上课时间"
                min-width="150">
              </el-table-column>
              <el-table-column
                prop="teacherNames"
                label="教师"
                min-width="100">
              </el-table-column>
              <el-table-column
                label="报读开始讲数"
                min-width="80">
                <template scope="scope">
                  {{scope.row.startAmount}}
                </template>
              </el-table-column>
              <el-table-column
                label="报读结束讲数"
                min-width="80">
                <template scope="scope">
                 {{scope.row.endAmount}}
                </template>
              </el-table-column>

              <el-table-column
                label="报读讲数"
                min-width="100">
                <template scope="scope">
                  {{scope.row.startAmount}}~{{scope.row.endAmount}}
                </template>
              </el-table-column>

              <el-table-column
                label="应缴金额"
                min-width="100">
                <template scope="scope">
                  {{scope.row.totalAmount}}
                </template>
              </el-table-column>

              <el-table-column
                label="已缴金额"
                min-width="100">
                <template scope="scope">
                  {{scope.row.payAmount}}
                </template>
              </el-table-column>

              <el-table-column
                label="报名状态"
                min-width="100">
                <template scope="scope">
                  {{{'0': '在读', '1': '转班', '2': '退账户', '3': '退班退费', '4': '无效'}[scope.row.regStatus]}}
                </template>
              </el-table-column>

              <el-table-column
                label="缴费状态"
                min-width="100">
                <template scope="scope">
                  {{{'0': '未缴费', '1': '欠费', '2': '已缴费'}[scope.row.chargingStatus]}}
                </template>
              </el-table-column>

              <el-table-column
                prop="operator"
                label="操作人"
                min-width="120">
              </el-table-column>
              <el-table-column
                prop="location"
                label="学生地址（区域）"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="address"
                label="详细地址"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="discountReason"
                label="优惠原因"
                min-width="300">
              </el-table-column>
              <el-table-column
                align="center"
                fixed="right"
                label="操作"
                width="150">
                <template scope="scope">
                  <el-dropdown >
                    <span class="el-dropdown-link">
                      操作菜单<i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item  v-if="hasPermission('changeSenior')" @click.native="setupSenior(scope.row)">修改班主任</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
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
    <select-senior ref="selectSenior" @ok="updateSenior"></select-senior>
  </div>
</template>
<script>
  import io from '../../lib/io'
  import Pagination from '../base/Pagination'
  import SelectSenior from '../course/SelectSenior'
  export default {
    data: function () {
      return {
        tableData: [],
        total: 0,
        pageSize: 10,
        pageNo: 1,
        query: {
          areaTeamId: window.config.areaTeams[0] && window.config.areaTeams[0].areaTeamId || '',
          busTeamId: '',
          periodId: '',
          className: '',
          gradeId: '',
          subjectId: '',
          regStatus: '',
          chargingStatus: '',
          studentName: '',
        },
        regId:'',
        periods:[],
        searchConfig: {},
      }
    },
    components: {
      Pagination,
      'select-senior':SelectSenior,
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
      }
    },
    methods: {
      search: function () {
        this.loadTableData(1)
      },
      //导出注册信息
      exportStudentReg: function () {
        io.downloadFile(io.apiAdminExportStudentReg, this.query)
      },

      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        _this.$showLoading()
        io.post(io.apiAdminStudentRegList, $.extend({
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
      setupSenior:function (studentReg) {

        var areaTeamId=studentReg.areaTeamId
        this.regId=studentReg.studentRegStateId
        this.$refs.selectSenior.query.areaTeamId = areaTeamId
        this.$refs.selectSenior.show()

      },
      updateSenior: function (teacher) {
        var _this = this
        _this.$showLoading()
        io.post(io.apiAdminSetupStudentRegSenior, {
          teacherId:teacher.teacherId,
          regId : _this.regId
        }, function (ret) {
          _this.$hiddenLoading()
          if (ret.success) {
            _this.loadTableData(_this.pageNo)
            _this.$alert('处理成功')
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      loadPeriodData: function () {
        var _this = this
        io.post(io.apiAdminPeriodListForAreaTeam, {
          areaTeamId: this.query.areaTeamId
        }, function (ret) {
          if (ret.success) {
          	_this.loadTableData(_this.pageNo)
            _this.periods = ret.data.map(function (item) {
              return {value: item.periodId, text: item.periodName}
            })
            _this.query.periodId = ret.data.filter(item => item.isCurrent == 1)[0].periodId
            _this.$emit('period.loaded')
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
    }
  }
</script>

