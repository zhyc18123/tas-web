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
                  <option value="">区域组</option>
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
                  <option value="0">未开班</option>
                  <option value="1">已开班</option>
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
                  <option value="">是否教室</option>
                  <option value="0">否</option>
                  <option value="1">是</option>
                </select2>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2  v-model="query.isArrangeTeacher">
                  <option value="">是否老师</option>
                  <option value="0">否</option>
                  <option value="1">是</option>
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
                <input type="text" name="teacherNames" v-model="query.teacherNames" placeholder="请输入教师姓名"/>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <date-picker v-model="query.startCourseTime" >
                  <input type="text" placeholder="请选择开课日期" data-am-datepicker readonly required >
                </date-picker>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="search" ><span class="am-icon-search"></span>查询
                </button>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-6">
              <div class="am-form-group">
                <button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="$router.push('/main/course/class/add')" v-if="hasPermission('add')"><span
                  class="am-icon-plus"></span>新建班级
                </button>
                <button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="$router.push('/main/course/class/add')" v-if="hasPermission('add')"><span
                  class="am-icon-plus"></span>快速排班
                </button>
              </div>
            </div>

          </div>

          <div class="am-u-sm-12 am-scrollable-horizontal">
            <el-table
              :data="tableData"
              border
              stripe
              style="min-width: 100%">
              <el-table-column
                fixed
                prop="className"
                label="班级名称"
                min-width="200">
              </el-table-column>
              <el-table-column
                prop="campusName"
                label="校区"
                min-width="100">
              </el-table-column>
              <el-table-column
                label="开课日期"
                min-width="100">
                <template scope="scope">
                  {{scope.row.startCourseTime | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
                prop="studyingTime"
                label="上课时间"
                min-width="100">
              </el-table-column>
              <el-table-column
                label="已上/总讲次"
                min-width="100">
                <template scope="scope">
                  {{scope.row.courseProgress}}/{{scope.row.lectureAmount}}
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
                prop="roomName"
                label="教室"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="studyingFee"
                label="学费"
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
                prop="periodName"
                label="期名"
                min-width="100">
              </el-table-column>
              <el-table-column
                label="开班状态"
                min-width="100">
                <template scope="scope">
                  {{scope.row.openStatus == 0 ? '未开办':'已开班'}}
                </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="120">
                <template scope="scope">
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      操作菜单<i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="arrangeTime(scope.row.classId,scope.row.lectureAmount)">排时间</el-dropdown-item>
                      <el-dropdown-item @click.native="arrangeRoom(scope.row.classId,scope.row.isArrangeRoom)">排教室</el-dropdown-item>
                      <el-dropdown-item @click.native="arrangeTeacher(scope.row.classId,scope.row.isArrangeTeacher,scope.row.isArrangeTime)">排老师</el-dropdown-item>
                      <el-dropdown-item @click.native="$router.push('/main/course/class/edit/'+scope.row.classId)">编辑</el-dropdown-item>
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

    <window ref="time_arrangement" title="排时间">
      <time-arragngement :classId="classId" :lectureAmount="lectureAmount" @arrangementSuccess="$refs.time_arrangement.close()"></time-arragngement>
    </window>

    <window ref="room_arrangement" title="排课室">
      <room-arrangement :classId="classId" :isArrangeRoom="lectureAmount" @arrangementSuccess="$refs.room_arrangement.close()"></room-arrangement>
    </window>

    <window ref="first" title="排老师" @close="classId=''">
      <teacher-arrangement :classId="classId" :isArrangeTeacher="isArrangeTeacher" @first="$refs.first.close()"></teacher-arrangement>
    </window>
  </div>
</template>
<script>
  import io from '../../lib/io'
  import Pagination from '../base/Pagination'
  import RoomArrangement from './RoomArrangement'
  import TeacherArrangement from './TeacherArrangement'
  import TimeArrangement from './TimeArrangement'

  export default{
    data: function () {
      return {
        tableData: [],
        total: 0,
        pageSize: 5,
        pageNo: 1,
        query: {
          areaTeamId : '',
          busTeamId : '',
          productId : '',
        },
        searchConfig: {},
        products:[],
        courses:[],
        courseClassId:'',
        classId:'',
        lectureAmount :'',
        isArrangeRoom:'',
        isArrangeTeacher:'',
        isArrangeTime:'',
        teacherNames:''
      }
    },
    components: {
      Pagination,
      'room-arrangement':RoomArrangement,
      'teacher-arrangement':TeacherArrangement,
      'time-arragngement':TimeArrangement,
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.loadTableData(this.pageNo)
      this.loadProductData()
      this.loadCourseData()
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
      periods:function(){
        return this.$root.config.periods.map(function(item){
          return {value: item.periodId, text: item.periodNo}
        })
      }

    },
    methods: {
      search: function () {
        this.loadTableData()
      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminCourseClassList, $.extend({
          pageNo: _this.pageNo,
          pageSize: _this.pageSize
        }, _this.query), function (ret) {
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
        io.post(io.apiAdminBaseProductList, {}, function (ret) {
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
        io.post(io.apiAdminBaseCourseList, {}, function (ret) {
          if (ret.success) {
            _this.courses = ret.data.map(function (item) {
              return {value: item.courseTemplateId, text: item.courseName}
            })
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      //排课
      arrangeTime:function (classId,lectureAmount) {
        //弹窗
        var _this = this;
        _this.classId = classId;
        _this.lectureAmount = lectureAmount;
        _this.$refs.time_arrangement.show({
          width:1000,
          height:700
        })
      },
      arrangeRoom:function (classId,isArrangeRoom) {
        //弹窗
        var _this = this;
        _this.classId = classId;
        _this.isArrangeRoom = isArrangeRoom;
        _this.$refs.room_arrangement.show({
          width : 1000,
          height: 500
        });
      },
      arrangeTeacher:function (classId,isArrangeTeacher,isArrangeTime) {
        //弹窗
        var _this = this;
        _this.classId = classId;
        _this.isArrangeTeacher = isArrangeTeacher;
  /*      if (isArrangeTime!='1'){
            _this.$alert("请先排时间");
            return;
        }*/
        this.$root.teacherName = [];
        _this.$refs.first.show({
          width : 1000,
          height: 800
        });
      },

    }
  }
</script>
