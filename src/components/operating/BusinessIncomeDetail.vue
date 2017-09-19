<template>
  <div class="m-business-cost-detail">
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title am-fl">{{name}}详情</div>
          <div class="widget-function am-fr">
            <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
          </div>
        </div>
        <div class="widget-body">
          <div class="am-form-group" style="line-height: 33px;margin-top: 13px;">
            <div class="am-u-sm-12">
              <choose style="float: left" class="main-account-select" v-model="mainAccountId">
                <select required data-placeholder="主体" style="min-width:200px;" class="chosen-select">
                  <option value=""></option>
                  <option v-for="item in mainAccounts" :value="item.mainAccountId">{{item.name}}</option>
                </select>
              </choose>
              <div class="am-u-md-2">
                <div class="am-form-group">
                  <date-picker v-model="startDate">
                    <input type="text" class="am-form-field" placeholder="开始日期" data-am-datepicker readonly>
                  </date-picker>
                </div>
              </div>
              <div class="am-u-md-2" style="float: left">
                <div class="am-form-group">
                  <date-picker v-model="endDate">
                    <input type="text" class="am-form-field" placeholder="结束日期" data-am-datepicker readonly>
                  </date-picker>
                </div>
              </div>
              <button @click="handleSearch" type="button" class="btn-search am-btn am-btn-default am-btn-success">
                <span class="am-icon-search"></span>搜索
              </button>
            </div>
          </div>
          <div v-if="detailType === '6'" class="am-u-sm-12">
            <el-table
              :data="tableData"
              border
              stripe
              style="min-width: 100%">
              <el-table-column
                label="序号"
                min-width="190">
                <template scope="scope">
                  {{scope.$index}}
                </template>
              </el-table-column>
              <el-table-column
                prop="remark"
                label="备注"
                min-width="190">
              </el-table-column>
              <el-table-column
                prop="amount"
                label="金额（元）">
                <template scope="scope">
                  <div>
                    {{scope.row.amount | formatNumber(2)}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="发生日期/时间段"
                min-width="190">
                <template scope="scope">
                  <div>
                    {{scope.row.createTime | formatDate}}
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-if="detailType === '7'" class="am-u-sm-12">
            <el-table
              :data="tableData"
              border
              stripe
              style="min-width: 100%">
              <el-table-column
                label="序号">
                <template scope="scope">
                  {{scope.$index}}
                </template>
              </el-table-column>
              <el-table-column
                prop="className"
                label="班级名称">
              </el-table-column>
              <el-table-column
                label="学费(元)">
                <template scope="scope">
                  <div>
                    {{scope.row.studyingFee | formatNumber(2)}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="lectureAmount"
                label="总讲次">
              </el-table-column>
              <el-table-column
                prop="happernLectureAmount"
                label="发生讲次">
              </el-table-column>
              <el-table-column
                prop="regAmount"
                label="报名人数">
              </el-table-column>
              <el-table-column
                prop="areaTeamName"
                label="区域">
              </el-table-column>
              <el-table-column
                prop="busTeamName"
                label="业务组">
              </el-table-column>
              <el-table-column
                label="总退费（元）">
                <template scope="scope">
                  <div>
                    {{scope.row.totalRefundAmount | formatNumber(2)}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="营收(元)">
                <template scope="scope">
                  <div>
                    {{scope.row.totalIncomeAmount | formatNumber(2)}}
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-if="detailType === '8'" class="am-u-sm-12">
            <el-table
              :data="tableData"
              border
              stripe
              style="min-width: 100%">
              <el-table-column
                label="序号">
                <template scope="scope">
                  {{scope.$index}}
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="成本名称"
                min-width="190">
              </el-table-column>
              <el-table-column
                label="金额（元）">
                <template scope="scope">
                  <div>
                    {{scope.row.totalAmount | formatNumber(2)}}
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import io from '../../lib/io'
  import moment from 'moment'
  export default{
    data:function(){
      return {
      	name: '',
        detailType: '6',
        mainAccountId: '',
        mainAccounts: [],
        startDate: '',
        endDate: '',
        incomeCategoryId: '',
        tableData:[
          {
            index: 0,
            name: '兼职',
            price: 100,
            to: '01',
          }
        ],
      }
    },
    mounted:function(){
      $(window).smoothScroll()
    },
    created:function(){
      this.name = this.$route.query.name
      this.detailType = this.$route.query.detailType
      this.mainAccountId = this.$route.query.mainAccountId
      this.startDate = this.$route.query.startDate
      this.endDate = this.$route.query.endDate
      this.incomeCategoryId = this.$route.query.incomeCategoryId
      this.loadTableData();
    },
    methods:{
      loadMainAccountList:function(){
        var _this = this
        io.post(io.apiAdminSettlementMainAccountList,{},function(ret){
          if(ret.success){
            _this.mainAccounts = ret.data.list;
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
      handleSearch() {
      	this.loadTableData()
      },
      loadTableData:function(){
        var _this = this;
        _this.$showLoading()
        io.post(io.incomeDetail,{
          detailType: this.detailType,
          mainAccountId: this.mainAccountId,
          startDate: this.startDate,
          endDate: this.endDate,
          incomeCategoryId: this.incomeCategoryId,
        },function(ret){
          _this.$hiddenLoading()
          if(ret.success){
          	if (_this.detailType == 6) {
              _this.tableData = ret.data.changeRecordList
            } else if (_this.detailType == 7) {
              _this.tableData = ret.data.classIncomeVoList
            } else if (_this.detailType == 8) {
              _this.tableData = ret.data.categoryMainAccountVoList
            }

          }else{
            _this.$alert(ret.desc)
          }
        })
      }
    }
  }
</script>

<style lang="less">
  .m-business-cost-detail{
    .el-tabs__header {
      margin-top: 20px;
    }
    .am-u-sm-5 {
      margin-bottom: 1.5rem;
    }
  }
</style>
