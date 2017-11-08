<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">

      <div class="widget-body  am-fr">
        <div class="am-u-sm-12 am-form ">
          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group">
              <select2 v-model="query.areaTeamId" :options="areaTeams">
                <option value="" disabled>区域</option>
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
              <select2 v-model="query.productId" :options="products">
                <option value="">产品</option>
              </select2>
            </div>
          </div>

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group">
              <select2 v-model="query.courseTemplateId" :options="courses">
                <option value="">课程</option>
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
              <select2 v-model="query.segmentNo">
                <option value="">段次</option>
                <option value="1">段次1</option>
                <option value="2">段次2</option>
                <option value="3">段次3</option>
                <option value="4">段次4</option>
              </select2>
            </div>
          </div>

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group">
              <select2 v-model="query.gradeId" :options="grades">
                <option value="">年级</option>
              </select2>
            </div>
          </div>

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group">
              <select2 v-model="query.subjectId" :options="subjects">
                <option value="">科目</option>
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
              <input type="text" class="am-form-field" placeholder="班级名"  v-model="query.className">
            </div>
          </div>

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-u-end">
            <div class="am-form-group">
              <button type="button" class="am-btn am-btn-default am-btn-success"
                      @click="search"><span class="am-icon-search"></span>查询班级
              </button>
            </div>
          </div>

        </div>

        <div class="am-u-sm-12" >
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
              fixed
              prop="periodName"
              label="期数"
              min-width="100">
            </el-table-column>
            <el-table-column
              fixed
              label="已报/学位数"
              min-width="100">
              <template scope="scope">
                {{scope.row.regAmount}}/{{scope.row.quota}}
                </template>
            </el-table-column>

            <el-table-column
              label="开始讲数"
              min-width="100">
              <template scope="scope">
                <input type="number" class="am-form-field am-input-sm" v-model="scope.row.startAmount" @change="check(scope.row)"/>
              </template>
            </el-table-column>
            <el-table-column
              label="结束讲数"
              min-width="100">
              <template scope="scope">
                <input type="number" class="am-form-field am-input-sm" v-model="scope.row.endAmount" @change="check(scope.row)"/>
              </template>
            </el-table-column>
            <el-table-column
              prop="lectureAmount"
              label="讲数"
              min-width="100">
            </el-table-column>

            <el-table-column
              prop="gradeName"
              label="年级"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="studyingFee"
              label="学费"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="teacherNames"
              label="老师"
              min-width="100">
            </el-table-column>

            <el-table-column
              label="段次"
              min-width="100">
              <template scope="scope">
                段次{{scope.row.segmentNo}}
              </template>
            </el-table-column>
            <el-table-column
              label="开课日期"
              min-width="150">
              <template scope="scope">
                {{scope.row.startCourseTime | formatDate }}
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
              fixed="right"
              label="操作"
              width="100">
              <template scope="scope">
                <el-button size="small" :disabled="hadReg(scope.row) || scope.row.regAmount == scope.row.quota" @click.native="studentReg(scope.row)">报名</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>


      <div class="am-u-lg-12 am-cf">

        <div class="am-fr">
          <pagination v-bind:total="total" v-bind:pageNo="pageNo" v-bind:pageSize="pageSize" @paging="loadTableData"/>
        </div>
      </div>

    </div>


  </div>

</template>

<script>
  import io from '../../lib/io'
  import CourseOrder from './CourseOrder'
  import Pagination from '../base/Pagination'


  export default{
    data: function () {
      return {
        studentId: '',
        tableData: [],
        total: 0,
        pageSize: 10,
        pageNo: 1,
        query: {
          areaTeamId: window.config.areaTeams[0] && window.config.areaTeams[0].areaTeamId || '' ,
          busTeamId: '',
          courseTemplateId:'',
          productId: '',
          periodId: '',
          status:'',
          classType:'',
          gradeId:'',
          subjectId:'',
          classNo:'',
          className:'',
          segmentNo :'',
        },
        products: [],
        courses: [],
        searchConfig: {},
        courseOrderId: '',
        periods:[]
      }
    },
    components: {
      Pagination,
      'course-order': CourseOrder
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
        return this.$root.config.grades.map(function (item) {
          return {value: item.gradeId, text: item.gradeName}
        })
      },
      subjects: function () {
        return this.$root.config.subjects.map(function (item) {
          return {value: item.subjectId, text: item.subjectName}
        })
      },
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.$once('period.loaded',()=>{
        this.loadTableData()
      })
      this.loadTableData()
      this.loadProductData()
      this.loadCourseData()
      this.loadPeriodData()
    },
    methods: {
      check:function(item){
        var start = item.completedLectureAmount + 1
        if(parseInt(item.startAmount) < parseInt(start) || parseInt(item.startAmount) > parseInt(item.lectureAmount) ){
          item.startAmount = start
        }

        if( parseInt(item.endAmount) < 0 || parseInt(item.endAmount) > parseInt(item.lectureAmount) ){
          item.endAmount = item.lectureAmount
        }

      },
      search: function () {
        this.loadTableData(1)
      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        _this.$showLoading()
        io.post(io.apiAdminCourseClassForReg, $.extend({
          pageNo: _this.pageNo,
          pageSize: _this.pageSize,
          status : 1,
          classType : 0
        }, _this.query), function (ret) {
          _this.$hiddenLoading()
          if (ret.success) {
            _this.total = ret.data.total
            for (var i = 0; i < ret.data.list.length; i++) {
              ret.data.list[i].completedLectureAmount = parseInt(ret.data.list[i].completedLectureAmount)
              ret.data.list[i].startAmount = ret.data.list[i].completedLectureAmount + 1 ;
              ret.data.list[i].endAmount = ret.data.list[i].lectureAmount;
            }
            _this.tableData = ret.data.list
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      loadProductData: function () {
        var _this = this
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
            _this.query.periodId = ret.data.filter(item => item.isCurrent == 1 )[0].periodId
            _this.$emit('period.loaded')
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      hadReg:function(classInfo){
        var isHad = false;
        for (var i = 0; i < this.$root.courseShoppingCart.length; i++) {
          if (this.$root.courseShoppingCart[i].classId == classInfo.classId) {
            isHad = true

            break
          }
        }
        return isHad
      },
      studentReg: function (classInfo) {
        if (!this.hadReg(classInfo)) {
          this.$root.courseShoppingCart.push(classInfo)
        }else{
          this.$alert('已报名，请查看代缴费页')
        }
      }
    }
  }


</script>
