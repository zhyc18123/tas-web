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
            <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
              <thead>
              <tr>
                <td>操作</td>
                <th>班级名称</th>
                <th>校区</th>
                <th>开课日期</th>
                <th>上课时间</th>
                <th>已上/总讲次</th>
                <th>已报人数</th>
                <th>学位数</th>
                <th>教师</th>
                <th>班主任</th>
                <th>教室</th>
                <th>学费</th>
                <th>年级</th>
                <th>科目</th>
                <th>期名</th>
                <th>开班状态</th>

                <!--<th>进度状态</th>
                <th>区域组</th>
                <th>业务组</th>-->
              </tr>
              </thead>
              <tbody>

              <tr v-for="item in tableData" :key="item.classId">
                <td>

                  <a href="javascript:;" @click="arrangeTime(item.classId,item.isArrangeTime)">排时间</a>
                  <a href="javascript:;" @click="arrangeRoom(item.classId,item.isArrangeRoom)">排教室</a>
                  <a href="javascript:;" @click="arrangeTeacher(item.classId,item.isArrangeTeacher,item.isArrangeTime)">排老师</a>

                  <div class="tpl-table-black-operation">
                    <a href="javascript:;" @click="$router.push('/main/course/class/edit/'+item.classId)"
                       v-if="hasPermission('edit')">
                      <i class="am-icon-edit"></i> 编辑
                    </a>
                  </div>
                </td>
                <td>{{item.className}}</td>
                <td>{{item.campusName}}</td>
                <td>{{item.startCourseTime | formatDate}}</td>
                <td>{{item.studyingTime}}</td>
                <td>{{item.courseProgress}}/{{item.lectureAmount}}</td>
                <td>{{item.regAmount}}</td>
                <td>{{item.quota}}</td>
                <td>{{item.teacherNames}}</td>
                <td>{{item.seniorName}}</td>
                <td>{{item.roomName}}</td>
                <td>{{item.studyingFee}}</td>
                <td>{{item.gradeName}}</td>
                <td>{{item.subjectName}}</td>
                <td>{{item.periodName}}</td>
                <td>{{item.openStatus == 0 ? '未开办':'已开班'}}</td>

                <!--<td>{{item.progressStatus == 0 ? '未开课' : item.progressStatus == 1 ?  '已开课' : '已结课' }}</td>
                <td>{{item.areaTeamName}}</td>
                <td>{{item.busTeamName}}</td>-->
              </tr>
              </tbody>
            </table>
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
      <time-arragngement :classId="classId" :isArrangeTime="isArrangeTime" @arrangementTime="$refs.time_arrangement.close()"></time-arragngement>
    </window>

    <window ref="room_arrangement" title="排课室">
      <room-arrangement :classId="classId" :isArrangeRoom="isArrangeRoom" @arrangementSuccess="$refs.room_arrangement.close()"></room-arrangement>
    </window>

    <window ref="teacher_arrangement" title="排老师">
      <teacher-arrangement :classId="classId" :isArrangeTeacher="isArrangeTeacher" @arrangementSuccess="$refs.teacher_arrangement.close()"></teacher-arrangement>
    </window>
  </div>
</template>
<script>
  import io from '../../lib/io'
  import Pagination from '../base/Pagination'
  import RoomArrangement from '../enroll/RoomArrangement'
  import TeacherArrangement from '../enroll/TeacherArrangement'
  import TimeArrangement from '../enroll/TimeArrangement'

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
      arrangeTime:function (classId,isArrangeTime) {
        //弹窗
        var _this = this;
        _this.classId = classId;
        _this.isArrangeTime = isArrangeTime;
        _this.$refs.time_arrangement.show({
          width:1000,
          height:500
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
        _this.$refs.teacher_arrangement.show({
          width : 1000,
          height: 500
        });
      },

    }
  }
</script>
