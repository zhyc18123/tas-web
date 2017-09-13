<template>
  <div class="m-business-statistics-list">
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title am-fl">业务组统计</div>
        </div>
        <div class="widget-body  am-fr">
          <div class="am-form-group" style="line-height: 38px;">
            <div class="am-u-sm-12">
              <div class="am-u-md-2">
                <div class="am-form-group">
                  <date-picker v-model="formData.startDate">
                    <input type="text" class="am-form-field" placeholder="开始日期" data-am-datepicker readonly>
                  </date-picker>
                </div>
              </div>

              <div class="am-u-md-2" style="float: left">
                <div class="am-form-group">
                  <date-picker v-model="formData.endDate">
                    <input type="text" class="am-form-field" placeholder="结束日期" data-am-datepicker readonly>
                  </date-picker>
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
                stripe
                style="min-width: 100%">
                <el-table-column
                  prop="name"
                  label="主体"
                  min-width="190">
                </el-table-column>
                <el-table-column
                  prop="cost"
                  label="成本（万）"
                  min-width="190">
                </el-table-column>
                <el-table-column
                  prop="income"
                  label="营收（万）"
                  min-width="190">
                </el-table-column>
                <el-table-column
                  prop="profits"
                  label="利润（万）"
                  min-width="190">
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="100">
                  <template scope="scope">
                    <router-link :to="'/main/operating/businessStatistics/costIncomeList?mainAcoountId=' +
                     scope.row.mainAcoountId + '&name=' + scope.row.name + '&startDate=' + formData.startDate+
                     '&endDate=' + formData.endDate" tag="a">详情</router-link>
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
        io.post(io.findMainAccountCostAndIncome,this.formData,function(ret){
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
