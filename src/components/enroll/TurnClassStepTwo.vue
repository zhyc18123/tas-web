<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">

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
              <select2 v-model="query.productId" :options="products">
                <option value="">产品</option>
              </select2>
            </div>
          </div>

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group">
              <select2 required  v-model="query.season"  >
                <option value="">季节</option>
                <option value="春季班">春季班</option>
                <option value="暑期班">暑期班</option>
                <option value="秋季班">秋季班</option>
                <option value="寒假班">寒假班</option>
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
              <input type="text" class="am-form-field" placeholder="班级名" v-model="query.className">
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

        <div class="am-u-sm-12" v-if="tableData&&tableData.length>0">
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
              label="开始讲数"
              min-width="100">
              <template scope="scope">
                <input type="number" class="am-form-field am-input-sm" v-model="scope.row.startAmount"
                       @change="check(scope.row)"/>
              </template>
            </el-table-column>
            <el-table-column
              prop="endAmount"
              label="结束讲数"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="gradeName"
              label="年级"
              min-width="100">
            </el-table-column>
            <el-table-column
              label="剩余名额"
              min-width="100">
              <template scope="scope">
                {{scope.row.quota-scope.row.regAmount}}
                </template>
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
              label="已上/总讲数"
              min-width="100">
              <template scope="scope">
                {{scope.row.completedLectureAmount}}/{{scope.row.lectureAmount}}
                </template>
            </el-table-column>
            <el-table-column
              prop="busTeamName"
              label="业务组"
              min-width="100">
            </el-table-column>
            <el-table-column
              label="开课日期"
              min-width="100">
              <template scope="scope">
                {{scope.row.startCourseTime | formatDate }}
                </template>
            </el-table-column>
            <el-table-column
              prop="studyingTime"
              label="上课时间"
              min-width="100">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="120">
              <template scope="scope">
                <el-button size="small" :disabled="!scope.row.allow" @click.native="confirm(scope.row)">确定</el-button>
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

      <div class="am-u-sm-12 am-text-center am-margin-top-lg">
        <button type="button" class="am-btn am-btn-primary" @click="back">上一步</button>
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
        studentId: '',
        tableData: [],
        total: 0,
        pageSize: 5,
        pageNo: 1,
        query: {
          areaTeamId: '',
          busTeamId: '',
          productId: '',
          status : 1
        },
        products: [],
        courses: [],
        searchConfig: {},
        courseOrderId: '',
      }
    },
    props: ['args', 'regId'],
    components: {
      Pagination,
    },
    watch: {
      args: function () {
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
      periods: function () {
        return this.$root.config.periods.map(function (item) {
          return {value: item.periodId, text: item.periodNo}
        })
      }
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.loadProductData()
      this.loadCourseData()
    },
    methods: {
      check: function (item) {
        if (item.startAmount <= 0 || item.startAmount > item.lectureAmount) {
          item.startAmount = 1
        }

        if (item.endAmount < 0 || item.endAmount > item.lectureAmount) {
          item.endAmount = item.lectureAmount
        }

      },
      search: function () {
        this.loadTableData()
      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminCourseClassList, $.extend({
          pageNo: _this.pageNo,
          pageSize: _this.pageSize,
          status: 1
        }, _this.query), function (ret) {

          if (ret.success) {
            _this.total = ret.data.total
            for (var i = 0; i < ret.data.list.length; i++) {

              ret.data.list[i].startAmount = parseInt(_this.args.formData.studyAmount) + 1
              ret.data.list[i].endAmount = _this.args.formData.endAmount
              ret.data.list[i].regId = _this.regId

              if (( _this.args.formData.studyingFee == ret.data.list[i].studyingFee) && ( _this.args.formData.lectureAmount == ret.data.list[i].lectureAmount)) {
                ret.data.list[i].allow = true
              } else {
                ret.data.list[i].allow = false
              }
            }
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
      confirm: function (item) {
        this.$emit('goStep', 'step-three', {item: item, formData: this.args.formData})
      },
      back: function () {
        this.$emit('goStep', 'step-one' )
      }
    }
  }


</script>
