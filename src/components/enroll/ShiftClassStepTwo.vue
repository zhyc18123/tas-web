<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">

      <div class="widget-body  am-fr">
        <div class="am-u-sm-12 am-form ">

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group">
              <select2  v-model="query.busTeamId" :options="busTeams">
                <option value="">业务组</option>
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

        <div class="am-u-sm-12">
          <el-table
            :data="tableData"
            border
            stripe
            height="300"
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
              label="期数"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="campusName"
              label="校区"
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

    </div>

    <div class="am-u-sm-12 am-text-center">
      <button type="button" class="am-btn am-btn-primary" @click="back">上一步</button>
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
          status : 1,
          areaTeamId:'',
          gradeId:'',
          subjectId:''
        },
        originClass:{}
      }
    },
    props: ['args', 'regId'],
    components: {
      Pagination,
    },
    created:function(){
      this.originClass = this.args['step-one'].originClass
      this.query.areaTeamId  = this.originClass.courseClass.areaTeamId
      this.query.periodId  = this.originClass.courseClass.periodId
      this.query.gradeId  = this.originClass.courseClass.gradeId
      this.query.subjectId  = this.originClass.courseClass.subjectId
      this.loadTableData(1)
    },
    computed: {
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

        io.post(io.apiAdminCourseClassList, $.extend({
          pageNo: _this.pageNo,
          pageSize: _this.pageSize,
        }, _this.query), function (ret) {

          if (ret.success) {
            _this.total = ret.data.total

            var courseList  = []

            for (var i = 0; i < ret.data.list.length; i++) {

              ret.data.list[i].completedLectureAmount = parseInt(ret.data.list[i].completedLectureAmount)
              ret.data.list[i].startAmount = ret.data.list[i].completedLectureAmount + 1
              ret.data.list[i].endAmount = ret.data.list[i].lectureAmount;

              if ( parseInt( ret.data.list[i].regAmount) < parseInt( ret.data.list[i].quota )   ) {
                ret.data.list[i].allow = true
              } else {
                ret.data.list[i].allow = false
              }
              if(ret.data.list[i].classId != _this.originClass.classId ){//过滤
                courseList.push(ret.data.list[i])
              }
            }
            _this.tableData = courseList
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      confirm: function (item) {
        this.$emit('goStep', 'step-three', { selectClass :  item , originClass : this.originClass  })
      },
      back: function () {
        this.$emit('goStep', 'step-one' )
      }
    }
  }


</script>
