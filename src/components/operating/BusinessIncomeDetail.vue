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
          <toolbar @initList="initList" @handleSearch="handleSearch" ref="toolbar"></toolbar>
          <div v-if="detailType === '6'" class="am-u-sm-12">
            <el-table
              :data="tableData"
              border
              :show-summary="true"
              :summary-method="getSummaries"
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
              :show-summary="true"
              :summary-method="getSummaries"
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
                prop="studyingFee"
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
                prop="happenLectureAmount"
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
             <!-- <el-table-column
                label="总退费（元）">
                <template scope="scope">
                  <div>
                    {{scope.row.totalRefundAmount | formatNumber(2)}}
                  </div>
                </template>
              </el-table-column>-->
              <el-table-column
                prop="totalIncomeAmount"
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
              :show-summary="true"
              :summary-method="getSummaries"
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
                prop="totalAmount"
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
  import Toolbar from './Toolbar.vue'
  import moment from 'moment'
  export default{
    data:function(){
      return {
      	name: '',
        detailType: '6',
        incomeCategoryId: '',
        tableData:[],
      }
    },
    components: {Toolbar},
    mounted:function(){
      $(window).smoothScroll()
    },
    created:function(){
      this.name = this.$route.query.name
      this.detailType = this.$route.query.detailType
      this.incomeCategoryId = this.$route.query.incomeCategoryId
    },
    computed: {
      areaTeamId: function () {
        return this.$refs.toolbar.areaTeamId
      },
      busTeamId: function () {
        return this.$refs.toolbar.busTeamId
      },
      startDate: function () {
        return this.$refs.toolbar.startDate
      },
      endDate: function () {
        return this.$refs.toolbar.endDate
      }
    },
    methods:{
      handleSearch(data) {
      	this.loadTableData(data)
      },
      initList(data) {
        this.loadTableData(data);
      },
      loadTableData:function(data){
        var _this = this;
        _this.$showLoading()
        io.post(io.incomeDetail, Object.assign({},data,{
          detailType: this.detailType,
          incomeCategoryId: this.incomeCategoryId,
        }),function(ret){
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
