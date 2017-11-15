<template>
  <div class="m-campus-charge">
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">校区收支</div>
        </div>
        <div class="widget-body  am-fr">
          <div class="am-u-sm-12 am-form ">
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2  v-model="query.chargeCampusId" :options="campusList">
                </select2>
              </div>
            </div>
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
                <input type="text" v-model="query.orderId" placeholder="请输入订单号"/>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <input type="text"  v-model="query.className" placeholder="请输入班级名称"/>
              </div>
            </div>

            <!--<div class="am-u-sm-12 am-u-md-12 am-u-lg-3">-->
              <!--<div class="am-form-group">-->
                <!--<input type="text"  v-model="query.regCampus" placeholder="请输入报名校区"/>-->
              <!--</div>-->
            <!--</div>-->

            <!--<div class="am-u-sm-12 am-u-md-12 am-u-lg-3">-->
              <!--<div class="am-form-group">-->
                <!--<input type="text"  v-model="query.chargeCampus" placeholder="请输入收费校区"/>-->
              <!--</div>-->
            <!--</div>-->

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
                <el-date-picker
                  v-model="query.startDate"
                  type="date"
                  placeholder="请选择开始日期">
                </el-date-picker>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <el-date-picker
                  v-model="query.endDate"
                  type="date"
                  placeholder="请选择结束日期">
                </el-date-picker>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-u-end">
              <div class="am-form-group">
                <button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="search" ><span class="am-icon-search"></span>查询
                </button>
                <button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="exportExcel" v-if="hasPermission('export')"><span class="am-icon-download"></span>导出excel
                </button>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
              <div class="am-form-group am-btn-group-xs">
                <button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="batchDailyCheck" v-if="hasPermission('daily_check')">批量日结
                </button>
              </div>
            </div>
          </div>
          <div class="am-u-sm-12 am-form-group totalSum">
            合计&nbsp;（{{(sumOther + sumCart + sumBalance + sumWX + sumZFB) |formatNumber(2)}}）：现金&nbsp;{{sumOther | formatNumber(2)}}，刷卡&nbsp;{{sumCart | formatNumber(2)}}，余额&nbsp;{{sumBalance | formatNumber(2)}}，微信&nbsp;{{sumWX | formatNumber(2)}}，
            支付宝&nbsp;{{sumZFB | formatNumber(2)}}
          </div>
          <div class="am-u-sm-12 table">

            <el-table :data="tableData"
              border
              ref="table"
              @selection-change="handleSelectionChange"
              stripe
              style="width: 100%">
              <el-table-column
                class-name="selection"
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                label="时间"
                min-width="180">
                <template scope="scope">
                  <div v-if="!scope.row.sum">
                    {{ scope.row.updateTime | formatTime }}
                  </div>
                  <div class="sum" v-else>
                    实缴金额总数小计
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="studentName"
                label="学生姓名"
                min-width="100">
                <template scope="scope">
                  <div v-if="!scope.row.sum">
                    {{scope.row.studentName}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="支付方式"
                min-width="100">
                <template scope="scope">
                  <div v-if="!scope.row.sum">
                    {{ {'0':'现金','1':'刷卡','2':'转账','3':'账户','4':'微信','5':'支付宝'}[scope.row.payWay] }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="paidAmount"
                label="实缴金额"
                min-width="100">
                <template scope="scope">
                  <div :class="{'sum': scope.row.sum}">
                    {{scope.row.paidAmount | formatNumber(2)}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="discountAmount"
                label="优惠金额"
                min-width="100">
                <template scope="scope">
                  <div :class="{'sum': scope.row.sum}">
                    {{scope.row.discountAmount | formatNumber(2)}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="业务类型"
                min-width="100">
                <template scope="scope">
                  <div v-if="!scope.row.sum">
                    {{ {'0':'报名收费','2':'退班退费','3':'众筹押金','4':'众筹退费'}[scope.row.busType] || '' }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="orderId"
                label="订单号"
                min-width="180">
                <template scope="scope">
                  <div v-if="!scope.row.sum">
                    {{scope.row.orderId}}
                  </div>
                </template>
              </el-table-column>

              <el-table-column
                prop="discountReason"
                label="优惠原因"
                min-width="200">
                <template scope="scope">
                  <div :class="{'sum': scope.row.sum}">
                    {{scope.row.discountReason}}
                  </div>
                </template>
              </el-table-column>

              <el-table-column
                prop="refundAmount"
                label="实退金额"
                min-width="100">
                <template scope="scope">
                  <div :class="{'sum': scope.row.sum}">
                    {{scope.row.refundAmount | formatNumber(2)}}
                  </div>
                </template>
              </el-table-column>

              <el-table-column
                label="日结状态"
                min-width="100">
                <template scope="scope">
                  <div v-if="!scope.row.sum">
                    {{ {'0':'未日结','1':'已日结'}[scope.row.dailyStatus] }}

                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="className"
                label="报读班级"
                min-width="200">
                 <template scope="scope">
                  <div v-if="!scope.row.sum">
                    {{scope.row.className}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="gradeName"
                label="年级"
                min-width="100">
                 <template scope="scope">
                  <div v-if="!scope.row.sum">
                    {{scope.row.gradeName}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="subjectName"
                label="科目"
                min-width="100">
                 <template scope="scope">
                  <div v-if="!scope.row.sum">
                    {{scope.row.subjectName}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="courseName"
                label="课程"
                min-width="200">
                 <template scope="scope">
                  <div v-if="!scope.row.sum">
                    {{scope.row.courseName}}
                  </div>
                </template>
              </el-table-column>

              <el-table-column
                prop="chargeCampus"
                label="收费校区"
                min-width="100">
                <template scope="scope">
                  <div v-if="!scope.row.sum">
                    {{scope.row.chargeCampus}}
                  </div>
                </template>
              </el-table-column>


              <el-table-column
                prop="operator"
                label="操作人"
                min-width="100">
                <template scope="scope">
                  <div v-if="!scope.row.sum">
                  {{scope.row.operator}}
                </div>
                </template>
              </el-table-column>

              <el-table-column
                label="报名方式"
                min-width="100">
                <template scope="scope">
                  <div v-if="!scope.row.sum">
                    {{ {'0':'线下','1':'线上'}[scope.row.regFrom] }}

                  </div>
                </template>
              </el-table-column>

              <el-table-column
                fixed="right"
                label="操作"
                :min-width="dailyCheckWidth">
                <template scope="scope">
                  <el-button size="small" v-show="!scope.row.sum" :disabled="scope.row.dailyStatus == 1"
                             @click.native="dailyCheck(scope.row)" v-if="hasPermission('daily_check')">日结</el-button>
                  <el-button size="small" v-show="!scope.row.sum" :disabled="scope.row.dailyStatus == 0"
                             @click.native="cancelDailyCheck(scope.row)" v-if="hasPermission('cancel_daily_check')">撤销</el-button>
                  <span v-show="scope.row.sum">-</span>
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
  import moment from 'moment'
  import Pagination from '../base/Pagination.vue'
  import util from '../../lib/util'

  export default{
    data: function () {
      return {
        tableData: [],
        allData: [],
        pageNo: 1,
        pageSize: 10,
        total: 1,
        sumCart: 0,
        sumBalance: 0,
        sumWX: 0,
        sumZFB: 0,
        sumOther: 0,
        query: {
          areaTeamId : '',
          busTeamId : '',
          productId : '',
          startDate: util.formatDate(new Date().getTime()),
          endDate: util.formatDate(new Date().getTime()),
          busType: '',
          year: '',
          regFrom: '',
          payWay: '',
          season: '',
          gradeId: '',
          subjectId: '',
          courseName: '',
          className: '',
          dailyStatus: '',
          operator: '',
          chargeCampusId: '',
          chargeCampus: '',
          regCampus: '',
        },
        searchConfig: {},
        products:[],
        selection:[]
      }
    },
    components: {Pagination},
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.query.chargeCampusId = window.config.campusList[0] ? window.config.campusList[0].campusId: ''
      this.loadTableData(this.pageNo)
      this.loadProductData()
    },
    computed: {
      dailyCheckWidth() {
    		return this.hasPermission('cancel_daily_check') ? 140 : 80
      },
      campusList: function () {
        var options = ( this.$root.config.campusList || [] )
          .map(function (item) {
            return {value: item.campusId, text: item.campusName}
          })
        return options
      },
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
        _this.sumOther=0
        _this.sumCart=0
        _this.sumBalance=0
        _this.sumWX=0
        _this.sumZFB=0
        _this.pageNo = pageNo || _this.pageNo || 1
        _this.$showLoading()
        io.post(io.campusChargeList, $.extend({}, _this.query, {
          startDate: this.query.startDate ? moment(this.query.startDate).format('YYYY-MM-DD') : '',
          endDate: this.query.endDate ? moment(this.query.endDate).format('YYYY-MM-DD') : ''
        }), function (ret) {
          _this.$hiddenLoading()
          if (ret.success) {
            let map = {}

            if(ret.data && ret.data ){
              ret.data.forEach((item)=>{
                let list  = map[item.orderId]
                if(!list){
                  list = []
                }
                list.push(item)
                map[item.orderId] = list
                switch(item.payWay) {
                  case '0':
                    _this.sumOther += Number(item.paidAmount);
                    break;
                  case '1':
                    _this.sumCart += Number(item.paidAmount);
                    break;
                  case '3':
                    _this.sumBalance += Number(item.paidAmount);
                    break;
                  case '4':
                    _this.sumWX += Number(item.paidAmount);
                    break;
                  case '5':
                    _this.sumZFB += Number(item.paidAmount);
                    break;
                }
              })
            }
            let tableData = []
            for(var key in map ){
              let paidAmount = 0
              let discountAmount = 0
              let refundAmount = 0
              let list  = map[key]
              list.forEach((item)=>{
                paidAmount += parseFloat(item.paidAmount)
                discountAmount += parseFloat(item.discountAmount)
                refundAmount += parseFloat(item.refundAmount)
              })

              list.map((val) => {
                tableData.push(val)
              })
              tableData.push({
                sum: true,
                orderId : key ,
                paidAmount: paidAmount,
                discountAmount:discountAmount,
                refundAmount:refundAmount,
                busType: list[0].busType,
                orderStatus: list[0].orderStatus,
                studentName: list[0].orderStatus,
                createTime: list[0].createTime,
                regFrom: list[0].regFrom,
                payWay: list[0].payWay,
                chargeCampus: list[0].chargeCampus,
                operator: list[0].operator,
              })
            }

            _this.allData = tableData
            _this.total = tableData.length
            _this.handlePage(pageNo)

          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      handlePage(pageNo) {
        this.pageNo = pageNo || this.pageNo || 1
        this.tableData = this.allData.slice((this.pageNo-1)*this.pageSize,this.pageSize*(this.pageNo))
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
          chargeIds: [item.chargeId]  ,
          dailyStatus : 1
        }, function (ret) {
          _this.$hiddenLoading()
          if (ret.success) {
            _this.loadTableData(_this.pageNo)
            _this.$toast('日结成功')
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      cancelDailyCheck:function(item){
        var _this = this
        _this.$showLoading()
        io.post(io.canelChargeDailyStatus , {
          chargeIds: [item.chargeId]  ,
          dailyStatus : 0
        }, function (ret) {
          _this.$hiddenLoading()
          if (ret.success) {
            _this.loadTableData(_this.pageNo)
            _this.$toast('撤销成功')
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      batchDailyCheck:function(){
        var chargeIds = this.selection.map(function (item) {
        	debugger
        	if (item.chargeId !== undefined) {
            return item.chargeId
          } else {
        		return ''
          }
        })

        if( !chargeIds || chargeIds.length == 0 ){
          this.$alert('请选择纪录')
          return
        }

        var _this = this
        _this.$showLoading()
        io.post(io.apiAdminReportChangeChargeDailyStatus, {
          chargeIds: chargeIds  ,
          dailyStatus : 1
        }, function (ret) {
          _this.$hiddenLoading()
          if (ret.success) {
            _this.loadTableData(_this.pageNo)
            _this.$toast('处理成功')
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      exportExcel:function(){
        io.downloadFile(io.exportCampusCharge,$.extend(this.query, {
          startDate: moment(this.query.startDate).format('YYYY-MM-DD'),
          endDate: moment(this.query.endDate).format('YYYY-MM-DD')
        }))
      },
      handleSelectionChange:function (selection) {
        this.selection = selection
      },
    }
  }
</script>
<style lang="less">
  .m-campus-charge {
    .am-form {
      &>.am-u-sm-12:nth-child(4n + 1) {
        clear: both;
      }
    }
    .totalSum {
      color: #333333;
      text-align: center;
    }
    .table {
      max-height: 650px;
      overflow-y: scroll;
    }
    .sum {
      font-weight: bold;
      color: #333333;
    }
  }
</style>
