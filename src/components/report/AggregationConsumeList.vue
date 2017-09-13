<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">消耗统计</div>
        </div>
        <div class="widget-body  am-fr">
          <div class="am-u-sm-12 am-form ">
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2  v-model="query.year">
                  <option value="">年份</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                </select2>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2  v-model="query.areaTeamId" :options="areaTeams">
                  <option value="">区域</option>
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
                <input type="text" v-model="query.courseName" placeholder="请输入课程名称"/>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <input type="text"  v-model="query.className" placeholder="请输入班级名称"/>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <input type="text"  v-model="query.campusName" placeholder="请输校区"/>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <date-picker v-model="query.startDate" >
                  <input type="text" placeholder="请选择开始日期" data-am-datepicker readonly required >
                </date-picker>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <date-picker v-model="query.endDate" >
                  <input type="text" placeholder="请选择结束日期" data-am-datepicker readonly required >
                </date-picker>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-6 am-u-end">
              <div class="am-form-group">
                <button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="search" ><span class="am-icon-search"></span>查询
                </button>
                <button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="exportExcel" v-if="hasPermission('export_consume_aggregation_list')"><span class="am-icon-download"></span>导出excel
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
                label="统计开始日期"
                min-width="150">
                <template scope="scope">
                  {{scope.row.startDate | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
                label="统计结束日期"
                min-width="150">
                <template scope="scope">
                  {{scope.row.endDate | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
                prop="year"
                label="年份"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="season"
                label="季节"
                min-width="100">
              </el-table-column>

              <el-table-column
                prop="studentName"
                label="学生姓名"
                min-width="100">
              </el-table-column>

              <el-table-column
                prop="studentNo"
                label="学生编号"
                min-width="150">
              </el-table-column>
              <el-table-column
                prop="studentGradeName"
                label="就读年级"
                min-width="100">
              </el-table-column>

              <el-table-column
                prop="campusName"
                label="报读校区"
                min-width="200">
              </el-table-column>

              <el-table-column
                prop="className"
                label="报读班级"
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
                prop="remainClassTimeOfBeforeThis"
                label="期初课时数"
                min-width="100">
              </el-table-column>
              <el-table-column
                label="期初金额"
                min-width="100">
                <template scope="scope">
                  {{scope.row.remainAmountOfBeforeThis | formatNumber(2)}}
                </template>
              </el-table-column>
              <el-table-column
                prop="boughtClassTimeOfThis"
                label="本周期购买课时"
                min-width="100">
              </el-table-column>
              <el-table-column
                label="本周期实际缴费金额"
                min-width="100">
                <template scope="scope">
                  {{scope.row.paidAmountOfThis | formatNumber(2)}}
                </template>
              </el-table-column>
              <el-table-column
                prop="consumeClassTimeOfThis"
                label="本周期消耗课时"
                min-width="100">
              </el-table-column>
              <el-table-column
                label="本周期消耗金额"
                min-width="100">
                <template scope="scope">
                  {{scope.row.consumeAmountOfThis | formatNumber(2)}}
                </template>
              </el-table-column>

              <el-table-column
                prop="remainClassTimeOfAfterThis"
                label="期末剩余课时"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="remainAmountOfAfterThis"
                label="期末剩余金额"
                min-width="100">
                <template scope="scope">
                  {{scope.row.remainAmountOfAfterThis | formatNumber(2)}}
                </template>
              </el-table-column>
              <!--<el-table-column
                prop="courseName"
                label="课程"
                min-width="200">
              </el-table-column>
              <el-table-column
                prop="productName"
                label="产品"
                min-width="100">
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
              </el-table-column>-->

            </el-table>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import io from '../../lib/io'
  import util from '../../lib/util'

  export default{
    data: function () {
      return {
        tableData: [],
        query: {
          areaTeamId : '',
          busTeamId : '',
          productId : '',
          startDate : util.formatDate( util.firstDayOfMonth() ),
          endDate : util.formatDate( util.endDayOfMonth() )
        },
        products:[]
      }
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.loadTableData(this.pageNo)
      this.loadProductData()
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
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        _this.$showLoading()
        io.post(io.apiAdminReportAggregateConsumeList, $.extend({
          pageNo: _this.pageNo,
          pageSize: _this.pageSize
        }, _this.query), function (ret) {
          _this.$hiddenLoading()
          if (ret.success) {
            _this.tableData = ret.data
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
      exportExcel:function(){
        io.downloadFile(io.apiAdminReportExportConsumeAggregation,this.query)
      }
    }
  }
</script>
