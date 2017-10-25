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
                <select2  v-model="query.productId" :options="products">
                  <option value="">产品</option>
                </select2>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2  v-model="query.courseTemplateId" :options="courses">
                  <option value="">课程</option>
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
                <select2  v-model="query.status">
                  <option value="">班级状态</option>
                  <option value="0">初始化</option>
                  <option value="1">报名中</option>
                  <option value="2">已作废</option>
                  <option value="3">已结课</option>
                </select2>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2  v-model="query.isArrangeTime">
                  <option value="">是否排时间</option>
                  <option value="0">否</option>
                  <option value="1">是</option>
                </select2>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2  v-model="query.isArrangeRoom">
                  <option value="">是否排教室</option>
                  <option value="0">否</option>
                  <option value="1">是</option>
                </select2>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2  v-model="query.isArrangeTeacher">
                  <option value="">是否排老师</option>
                  <option value="0">否</option>
                  <option value="1">是</option>
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
                <el-date-picker
                  v-model="query.startCourseTime"
                  type="date"
                  placeholder="请选择开课日期">
                </el-date-picker>
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
                        @click="$router.push('/main/course/class/add')" v-if="hasPermission('add')"><span
                  class="am-icon-plus"></span>新建班级
                </button>
                <button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="setupSenior" v-if="hasPermission('edit')"><span
                  class="am-icon-plus"></span>设置班主任
                </button>
                <button type="button" class="am-btn am-btn-default am-btn-success" v-if="hasPermission('open')"
                        @click="batchChangeStatus(1)" ><span
                  class="am-icon-plus"></span>开启报名
                </button>
                <button type="button" class="am-btn am-btn-default am-btn-success" v-if="hasPermission('invalid')"
                        @click="batchChangeStatus(2)" ><span
                  class="am-icon-plus"></span>作废
                </button>
                <!--<button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="$router.push('/main/course/class/add')" v-if="hasPermission('add')"><span
                  class="am-icon-plus"></span>快速排班
                </button>-->

                <button type="button" class="am-btn am-btn-default am-btn-success"
                        v-if="hasPermission('add')" @click="prepareUpload">
                  <input id="uploadFile" @change="uploadExcel" type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" style="display: none">
                  <span class="am-icon-cloud-upload"></span>批量导入
                </button>

                <a href="http://static.yuyou100.com/%E7%8F%AD%E7%BA%A7%E5%AF%BC%E5%85%A5%E6%A8%A1%E7%89%88v_1.xlsx?attname=班级导入模板.xlsx" class="am-btn am-btn-default am-btn-success ">
                  <span class="am-icon-download"></span>下载模板
                </a>

              </div>
            </div>

          </div>

          <div class="am-u-sm-12">
            <el-table
              :data="tableData"
              border
              stripe
              @selection-change="handleSelectionChange"
              style="min-width: 100%">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
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
                label="排课状态"
                min-width="250">
                <template scope="scope">
                  <el-tag :type="scope.row.isArrangeTime == 0 ? 'warring' : 'success'">{{scope.row.isArrangeTime == 0 ? '未排时间':'已排时间'}}</el-tag>
                  <el-tag :type="scope.row.isArrangeRoom == 0 ? 'warring' : 'success'">{{scope.row.isArrangeRoom == 0 ? '未排教室':'已排教室'}}</el-tag>
                  <el-tag :type="scope.row.isArrangeTeacher == 0 ? 'warring' : 'success'">{{scope.row.isArrangeTeacher == 0 ? '未排老师':'已排老师'}}</el-tag>
                </template>
              </el-table-column>

              <el-table-column
                label="状态"
                min-width="100">
                <template scope="scope">
                  {{scope.row.status == 0 ? '初始化': ( scope.row.status == 1 ? '报名中' : ( scope.row.status == 2 ? '已作废' :'已结课') )}}
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
                label="已上/总讲次"
                min-width="100">
                <template scope="scope">
                  {{scope.row.completedLectureAmount}}/{{scope.row.lectureAmount}}
                </template>
              </el-table-column>
              <el-table-column
                prop="regAmount"
                label="已报人数"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="quota"
                label="学位数"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="teacherNames"
                label="教师"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="seniorName"
                label="班主任"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="studyingFee"
                label="学费"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="periodName"
                label="期数"
                min-width="100">
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
                label="状态"
                min-width="100">
                <template scope="scope">
                  {{scope.row.status == 0 ? '初始化': ( scope.row.status == 1 ? '报名中' : ( scope.row.status == 2 ? '已作废' :'已结课') )}}
                </template>
              </el-table-column>
              <el-table-column
                label="众筹"
                min-width="100">
                <template scope="scope">
                  {{scope.row.classType == 0 ? '否':  '是'}}
                </template>
              </el-table-column>
              <el-table-column
                prop="areaTeamName"
                label="区域"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="busTeamName"
                label="业务组"
                min-width="100">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="120">
                <template scope="scope">
                  <el-dropdown v-if="scope.row.status != 2">
                    <span class="el-dropdown-link">
                      操作菜单<i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <template v-if="hasPermission('arrange_time')">
                        <el-dropdown-item  @click.native="arrangeTime(scope.row)" v-if="scope.row.isArrangeTime == 0">排时间</el-dropdown-item>
                        <el-dropdown-item  @click.native="rearrangeTime(scope.row)" v-else>重排时间</el-dropdown-item>
                      </template>
                      <template v-if="hasPermission('arrange_room')">
                        <el-dropdown-item  @click.native="arrangeRoom(scope.row)" v-if="scope.row.isArrangeRoom == 0">排教室</el-dropdown-item>
                        <el-dropdown-item  @click.native="rearrangeRoom(scope.row)" v-else>重排教室</el-dropdown-item>
                      </template>
                      <template v-if="hasPermission('arrange_teacher')">
                        <el-dropdown-item  @click.native="arrangeTeacher(scope.row)" v-if="scope.row.isArrangeTeacher == 0">排老师</el-dropdown-item>
                        <el-dropdown-item  @click.native="rearrangeTeacher(scope.row)" v-else>重排老师</el-dropdown-item>
                      </template>

                      <el-dropdown-item v-if="hasPermission('edit')"  @click.native="$router.push('/main/course/class/edit/'+scope.row.classId)">编辑</el-dropdown-item>
                      <el-dropdown-item v-if="hasPermission('arrange_view')"  @click.native="$router.push('/main/course/class/time/'+scope.row.classId)">查看排课</el-dropdown-item>

                      <el-dropdown-item v-if="hasPermission('open')" :disabled="scope.row.status != 0 || scope.row.isArrangeTime == 0 || scope.row.classType != 0"  @click.native="changeStatus(scope.row.classId,1)">开启报名</el-dropdown-item>
                      <el-dropdown-item v-if="hasPermission('open')" :disabled="scope.row.status != 1 || scope.row.classType != 0"  @click.native="changeStatus(scope.row.classId,0)">暂停报名</el-dropdown-item>

                      <el-dropdown-item v-if="hasPermission('edit')" :disabled="scope.row.classType != 0 ||scope.row.isArrangeTime == 0 || scope.row.isArrangeTeacher == 0 || scope.row.status != 0"  @click.native="changeClassType(scope.row.classId,1)">众筹</el-dropdown-item>
                      <el-dropdown-item v-if="hasPermission('edit')" :disabled="scope.row.classType == 0 || scope.row.status !=0 "  @click.native="changeClassType(scope.row.classId,0)">取消众筹</el-dropdown-item>

                      <el-dropdown-item v-if="hasPermission('invalid')" :disabled="scope.row.regAmount > 0 "  @click.native="cancellation(scope.row)">作废</el-dropdown-item>
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

    <time-arragngement ref="timeArrangement" @completed="loadTableData()"></time-arragngement>
    <room-arrangement ref="roomArrangement" @completed="loadTableData()" ></room-arrangement>
    <teacher-arrangement ref="teacherArrangement" @completed="loadTableData()"></teacher-arrangement>
    <select-senior ref="selectSenior" @ok="updateSenior"></select-senior>
  </div>
</template>
<script>
  import io from '../../lib/io'
  import moment from 'moment'
  import Pagination from '../base/Pagination'
  import RoomArrangement from './RoomArrangement'
  import TeacherArrangement from './TeacherArrangement'
  import TimeArrangement from './TimeArrangement'
  import SelectSenior from './SelectSenior'

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
          courseTemplateId:'',
          productId : '',
          periodId : '',
        },
        searchConfig: {},
        products:[],
        courses:[],
        periods:[],
        selection:[]
      }
    },
    components: {
      Pagination,
      'room-arrangement':RoomArrangement,
      'teacher-arrangement':TeacherArrangement,
      'time-arragngement':TimeArrangement,
      'select-senior':SelectSenior,
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.loadTableData(this.pageNo)
      this.loadProductData()
      this.loadCourseData()
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
        this.query.productId = ''
        this.query.courseTemplateId = ''
        this.query.periodId = ''
        this.loadProductData()
        this.loadCourseData()
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
        io.post(io.apiAdminCourseClassList, $.extend({
          pageNo: _this.pageNo,
          pageSize: _this.pageSize
        }, _this.query, {startCourseTime: moment(this.query.startCourseTime).format('YYYY-MM-DD')}), function (ret) {
          if (ret.success) {
            _this.total = ret.data.total
            _this.tableData = ret.data.list
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      loadProductData: function () {
        var _this = this
        if (!this.query.areaTeamId) {
        	this.$alert('请选择区域！')
          return
        }
        io.post(io.apiAdminBaseProductListForAreaTeam, {
          areaTeamId : this.query.areaTeamId
        }, function (ret) {
          if (ret.success) {
            _this.products = ret.data.map(function (item) {
              return {value: item.productId, text: item.name}
            })
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      loadCourseData: function () {
        var _this = this
        io.post(io.apiAdminBaseCourseListForAreaTeam, {
          areaTeamId : this.query.areaTeamId
        }, function (ret) {
          if (ret.success) {
            _this.courses = ret.data.map(function (item) {
              return {value: item.courseTemplateId, text: item.courseName}
            })
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
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      //排课
      arrangeTime:function (courseClass) {
        this.$refs.timeArrangement.courseClass =courseClass
        this.$refs.timeArrangement.show()
      },
      rearrangeTime:function (courseClass) {
        var _this = this
        _this.$confirm('确定重排时间',function(){
          io.post(io.apiAdminPrepareRearrange, {
            classId : courseClass.classId,
            which:'1'
          }, function (ret) {
            if (ret.success) {
              _this.arrangeTime(courseClass)
            } else {
              _this.$alert(ret.desc)
            }
          })
        })

      },
      arrangeRoom:function (courseClass) {
        if(courseClass.isArrangeTime !=  1 ){
          this.$alert('请先排时间')
          return
        }
        this.$refs.roomArrangement.courseClass = courseClass
        this.$refs.roomArrangement.show()
      },
      rearrangeRoom:function (courseClass) {
        var _this = this
        _this.$confirm('确定重排课室',function(){
          io.post(io.apiAdminPrepareRearrange, {
            classId : courseClass.classId,
            which:'2'
          }, function (ret) {
            if (ret.success) {
              _this.arrangeRoom(courseClass)
            } else {
              _this.$alert(ret.desc)
            }
          })
        })

      },
      arrangeTeacher:function (courseClass) {
        //弹窗
        if( courseClass.isArrangeTime !=  1 ){
          this.$alert('请先排时间')
          return
        }
        this.$refs.teacherArrangement.courseClass = courseClass
        this.$refs.teacherArrangement.show()
      },
      rearrangeTeacher:function (courseClass) {
        var _this = this
        _this.$confirm('确定重排老师',function(){
          io.post(io.apiAdminPrepareRearrange, {
            classId : courseClass.classId,
            which:'3'
          }, function (ret) {
            if (ret.success) {
              _this.arrangeTeacher(courseClass)
            } else {
              _this.$alert(ret.desc)
            }
          })
        })
      },
      batchChangeStatus:function (status) {
        if(this.selection.length == 0 ){
          this.$alert('请选择记录')
          return
        }

        for(var i =0 ;i < this.selection.length ;i++ ){

            if( status  == 2 && this.selection[i].regAmount > 0  ){
                this.$alert('有学生报名，不能作废')
                return
            }

            if(status  == 1 && this.selection[i].isArrangeTime == 0 ){
              this.$alert('【'+this.selection[i].className+'】未排时间，无法开启报名')
              return
            }
        }
        var classIds = this.selection.map(function (item) {
          return item.classId
        })

        var _this = this
        _this.$showLoading()

        io.post(io.apiAdminChangeCourseClassStatus, {
          status:status,
          classIds : classIds.join(',')
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
      cancellation:function(courseClass){
        var _this  = this
        this.$confirm('确定作废',function () {
          _this.changeStatus(courseClass.classId,2)
        })

      },
      changeStatus:function(classId , status ){
        var _this = this
        _this.$showLoading()
        io.post(io.apiAdminChangeCourseClassStatus, {
          status: status ,
          classIds : [classId].join(',')
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
      changeClassType:function(classId,classType){
        var _this = this
        _this.$showLoading()
        io.post(io.apiAdminChangeClassType,{
          classIds: [classId].join(','),
          classType: classType
        },function(ret){
          _this.$hiddenLoading()
          if(ret.success){
            _this.loadTableData(_this.pageNo)
            _this.$alert('处理成功')
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
      handleSelectionChange:function (selection) {
        this.selection = selection
      },
      setupSenior:function () {
        if(this.selection.length == 0 ){
          this.$alert('请选择记录')
          return
        }

        var areaTeamIds = new Set();
        for(var i =0 ;i < this.selection.length ;i++ ){
          areaTeamIds.add(this.selection[i].areaTeamId)
        }

        if(areaTeamIds.size > 1 ){
          this.$alert('不能同时选择多个区域的课程')
          return
        }

        var classIds = this.selection.map(function (item) {
          return item.classId
        })

        this.classIds = classIds
        var areaTeamId = areaTeamIds.values().next().value
        this.$refs.selectSenior.query.areaTeamId = areaTeamId
        this.$refs.selectSenior.show()
      },
      updateSenior:function(teacher){
        var _this = this
        _this.$showLoading()

        io.post(io.apiAdminSetupClassSenior, {
          teacherId:teacher.teacherId,
          classIds : _this.classIds
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
      prepareUpload:function(){
        $('#uploadFile').click()
      },
      uploadExcel:function() {
        var _this = this;
        var formData = new FormData();
        formData.append("file",document.getElementById('uploadFile').files[0]);
        _this.$showLoading()
        io.postMitiFile(io.importCourseClassImport,formData,function (ret) {
          $('#uploadFile').val(null)
          _this.$hiddenLoading()
          if (ret.ok && ret.data.success){
            _this.loadTableData(1)
            _this.$alert('导入成功');
          } else {
            _this.$alert(ret.data.desc || "上传失败");
          }

        })
      },
    }
  }
</script>
