<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">财务收支</div>
        </div>
        <div class="widget-body  am-fr">
          <div class="am-u-sm-12 am-form ">
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2  v-model="query.busType">
                  <option value="">业务类型</option>
                  <option value="0">报名收费</option>
                  <option value="2">退班退费</option>
                  <option value="3">众筹押金</option>
                  <option value="4">众筹退费</option>
                </select2>
              </div>
            </div>
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
                <select2 required  v-model="query.regFrom"  >
                  <option value="">报名来源</option>
                  <option value="0">线下</option>
                  <option value="1">线上</option>
                </select2>
              </div>
            </div>
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2 required  v-model="query.payWay"  >
                  <option value="">支付方式</option>
                  <option value="0">现金</option>
                  <option value="1">刷卡</option>
                  <option value="2">转账</option>
                  <option value="3">账户</option>
                  <option value="4">微信</option>
                  <option value="5">支付宝</option>
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
                <input type="text"  v-model="query.regCampus" placeholder="请输入报名校区"/>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <input type="text"  v-model="query.chargeCampus" placeholder="请输入收费校区"/>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <input type="text"  v-model="query.operator" placeholder="请输入操作人"/>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2 required  v-model="query.dailyStatus">
                  <option value="">日结状态</option>
                  <option value="0">未日结</option>
                  <option value="1">已日结</option>
                </select2>
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
                        @click="exportExcel" ><span class="am-icon-download"></span>导出excel
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
                label="业务类型"
                min-width="100">
                <template scope="scope">
                  {{ {'0':'报名收费','2':'退班退费','3':'众筹押金','4':'众筹退费'}[scope.row.busType] || '' }}
                </template>
              </el-table-column>
              <el-table-column
                prop="orderId"
                label="订单号"
                min-width="200">
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
                prop="studentSchool"
                label="就读学校"
                min-width="200">
              </el-table-column>
              <el-table-column
                label="支付方式"
                min-width="100">
                <template scope="scope">
                  {{ {'0':'现金','1':'刷卡','2':'转账','3':'账户','4':'微信','5':'支付宝'}[scope.row.payWay] }}
                </template>
              </el-table-column>
              <el-table-column
                prop="paidAmount"
                label="实缴金额"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="discountReason"
                label="优惠原因"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="discountAmount"
                label="优惠金额"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="historyOwingAmount"
                label="历史欠费金额"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="newOwingAmount"
                label="最新欠费金额"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="refundAmount"
                label="实退金额"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="regCampus"
                label="报名校区"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="chargeCampus"
                label="收费校区"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="operator"
                label="操作人"
                min-width="100">
              </el-table-column>

              <el-table-column
                label="报名方式"
                min-width="100">
                <template scope="scope">
                  {{ {'0':'线下','1':'线上'}[scope.row.regFrom] }}
                </template>
              </el-table-column>
              <el-table-column
                label="申请退费时间"
                min-width="200">
                <template scope="scope">
                  {{ scope.row.applyRefundTime | formatTime }}
                </template>
              </el-table-column>
              <el-table-column
                label="日结状态"
                min-width="100">
                <template scope="scope">
                  {{ {'0':'未日结','1':'已日结'}[scope.row.dailyStatus] }}
                </template>
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
              </el-table-column>
              <el-table-column
                prop="remark"
                label="备注"
                min-width="200">
              </el-table-column>

              <el-table-column
                label="时间"
                min-width="200">
                <template scope="scope">
                  {{ scope.row.createTime | formatTime }}
                </template>
              </el-table-column>

              <el-table-column
                fixed="right"
                label="操作"
                width="80">
                <template scope="scope">
                  <el-button size="small" :disabled="scope.row.dailyStatus == 1"  @click.native="dailyCheck(scope.row)">日结</el-button>
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

  </div>
</template>
<script>
  import io from '../../lib/io'
  import util from '../../lib/util'
  import Pagination from '../base/Pagination'

  export default{
    data: function () {
      return {
        tableData: [],
        total: 0,
        pageSize: 50,
        pageNo: 1,
        query: {
          areaTeamId : '',
          busTeamId : '',
          productId : '',
          startDate: util.formatDate(new Date().getTime()),
          endDate: util.formatDate(new Date().getTime())
        },
        searchConfig: {},
        products:[]
      }
    },
    components: {
      Pagination
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
        io.post(io.apiAdminReportChargeList, $.extend({
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
      dailyCheck:function(item){
        var _this = this
        _this.$showLoading()
        io.post(io.apiAdminReportChangeChargeDailyStatus, {
          chargeId: item.chargeId  ,
          dailyStatus : 1
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
      exportExcel:function(){
          io.downloadFile(io.apiAdminReportExportCharge,this.query)
      }
    }
  }
</script>
