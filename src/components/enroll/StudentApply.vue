<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">

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
              <button type="button" class="am-btn am-btn-default am-btn-success"
                      @click="search" ><span class="am-icon-search"></span>查询
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
            <th>开始讲数</th>
            <th>结束讲数</th>
            <th>讲数</th>
            <th>期数</th>
            <th>年级</th>
            <th>学费</th>
            <th>已报/学位数</th>
            <th>老师</th>
            <th>教室</th>
            <th>开课日期</th>
            <th>上课时间</th>
            <th>校区</th>

            <!--<th>进度状态</th>
            <th>区域组</th>
            <th>业务组</th>-->
          </tr>
          </thead>
          <tbody>

          <tr v-for="item in tableData" :key="item.classId">
            <td>
              <div class="tpl-table-black-operation">
                <a href="javascript:;" @click="studentReg(item.classId)">
                  <i class="am-icon-edit"></i> 报名
                </a>
                <a href="javascript:;">
                  <i class="am-icon-edit"></i> 缴费
                </a>
              </div>
            </td>
            <td>{{item.className}}</td>
            <td><input type="text" v-model="reg.startAmount"/></td>
            <td><input type="text" v-model="reg.endAmount"/></td>
            <td>{{item.lectureAmount}}</td>
            <td>{{item.periodName}}</td>
            <td>{{item.gradeName}}</td>
            <td>{{item.studyingFee}}</td>
            <td>0/{{item.lectureAmount}}</td>
            <td>{{item.teacherNames}}</td>
            <td>{{item.roomName}}</td>
            <td>{{item.startCourseTime | formatDate }}</td>
            <td>{{0}}-{{0}}</td>
            <td>{{item.campusName}}</td>

            <!--<td>{{item.progressStatus == 0 ? '未开课' : item.progressStatus == 1 ?  '已开课' : '已结课' }}</td>
            <td>{{item.areaTeamName}}</td>
            <td>{{item.busTeamName}}</td>-->
          </tr>
          </tbody>
        </table>
      </div>

          <!-- more data -->
          </tbody>
        </table>
      </div>


      <div class="am-u-lg-12 am-cf">

        <div class="am-fr">
          <pagination v-bind:total="total" v-bind:pageNo="pageNo" v-bind:pageSize="pageSize" @paging="loadTableData" />
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
        studentId:'',
        tableData: [],
        tableJson: [],
        total: 0,
        pageSize: 5,
        pageNo: 1,
        query: {
          areaTeamId : '',
          busTeamId : '',
          productId : '',

        },
        products:[],
        courses:[],
        searchConfig: {},
        reg:{
          startAmount:'',
          endAmount:''
        }
      }
    },
    components: {
      Pagination
    },
    computed:{

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
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.loadTableData(this.pageNo);
    },
    methods: {
      search: function () {
        this.query = {}
        if (!this.searchConfig.searchItem) {
          this.$alert('--请选择--搜索选项')
          return
        }
        this.query[this.searchConfig.searchItem] = this.searchConfig.searchValue
        this.loadTableData()
      },
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
      studentReg:function (classId) {
        var studentId = this.$params('studentId')
        var _this = this
        io.post(io.apiAdminSaveOrUpdateStudentReg, $.extend({
          classId:classId,
          studentId:studentId,
          startAmount:_this.startAmount,
          endAmount:_this.endAmount
        },_this.reg), function(ret) {
          if (ret.success) {
            _this.$alert(ret.desc)
          } else {
            _this.$alert(ret.desc)
          }
        })

      }

    }
  }


</script>
