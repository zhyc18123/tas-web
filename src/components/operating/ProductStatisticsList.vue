<template>
  <div class="m-business-statistics-list">
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title am-fl">产品线统计</div>
        </div>
        <div class="widget-body  am-fr">
          <div class="am-form-group">
            <div class="am-u-sm-12">
              <div class="am-u-md-3">
                <div class="am-form-group">
                  <el-date-picker
                    v-model="formData.startDate"
                    type="date"
                    placeholder="开始日期">
                  </el-date-picker>
                </div>
              </div>

              <div class="am-u-md-3">
                <div class="am-form-group">
                  <el-date-picker
                    v-model="formData.endDate"
                    type="date"
                    placeholder="结束日期">
                  </el-date-picker>
                </div>
              </div>
              <button @click="handleSearch" type="button" class="btn-search am-btn am-btn-default am-btn-success">
                <span class="am-icon-search"></span>搜索
              </button>
            </div>
          </div>
        </div>
        <div class="am-form-group">
          <div class="am-u-sm-12">
            <el-table
              :data="tableData"
              border
              :show-summary="true"
              :summary-method="getSummaries"
              stripe
              style="min-width: 100%">
              <el-table-column
                prop="productName"
                label="产品线"
                min-width="190">
              </el-table-column>
              <el-table-column
                prop="income"
                label="营收（元）"
                min-width="190">
                <template scope="scope">
                  <div>
                    {{scope.row.income | formatNumber(2)}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="cost"
                label="成本（元）"
                min-width="190">
                <template scope="scope">
                  <div>
                    {{scope.row.cost | formatNumber(2)}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="profits"
                label="利润（元）"
                min-width="190">
                <template scope="scope">
                  <div>
                    {{scope.row.profits | formatNumber(2)}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="100">
                <template scope="scope">
                  <router-link :to="'/main/operating/productStatistics/costIncomeList?productId=' +
                     scope.row.productId + '&name=' + scope.row.productName + '&startDate=' + formatStartDate+
                     '&endDate=' + formatEndDate + '&activeName=income'" tag="a">详情</router-link>
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
        formData: {
          startDate: moment().month(moment().month() - 1).startOf('month').format('YYYY-MM-DD'),
          endDate: moment().month(moment().month() - 1).endOf('month').format('YYYY-MM-DD'),
          mainAccountId: '',
        },
        mainAccounts: '',
        tableData: [
          {
            name: '广州区域',
            cost: '',
            income: '',
            profits: '',
          }
        ],
      }
    },
//    components: {
//      Pagination
//    },
    mounted:function(){
      $(window).smoothScroll()
    },
    created:function(){
      this.loadMainAccountList();
      this.loadTableData();
    },
    computed: {
      formatStartDate() {
        return moment(this.formData.startDate).format('YYYY-MM-DD')
      },
      formatEndDate() {
        return moment(this.formData.endDate).format('YYYY-MM-DD')
      },
    },
    methods:{
      handleSearch() {
        this.loadTableData()
      },
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
      loadTableData:function(){
        var _this = this;
        _this.$showLoading()
        io.post(io.productStatisticsList,Object.assign({},this.formData, {
          startDate: this.formatStartDate,
          endDate: this.formatEndDate
        }),function(ret){
          _this.$hiddenLoading()
          if(ret.success){
            _this.tableData = ret.data
          }else{
            _this.$alert(ret.desc)
          }
        })
      }
    }
  }
</script>

<style lang="less">
  .m-business-statistics-list {
    .main-account-select {
      width: 230px;
      float: left;
    }
    .btn-search {
      margin-bottom: 9px;
    }
  }
</style>
