<template>
  <div class="m-business-statistics-list">
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title am-fl">业务组统计</div>
          <div class="widget-function am-fr">
            <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
          </div>
        </div>
        <div class="widget-body  am-fr">
          <div class="am-form-group" style="line-height: 38px;">
            <div class="am-u-sm-12">
              <choose class="main-account-select" v-model="formData.mainAccountId">
                <select required data-placeholder="主体" style="min-width:200px;" class="chosen-select">
                  <option value=""></option>
                  <option v-for="item in mainAccounts" :value="item.mainAccountId">{{item.name}}</option>
                </select>
              </choose>
              <div class="am-u-md-2">
                <div class="am-form-group">
                  <date-picker v-model="formData.shareStart">
                    <input type="text" class="am-form-field" placeholder="开始日期" data-am-datepicker readonly>
                  </date-picker>
                </div>
              </div>

              <div class="am-u-md-2" style="float: left">
                <div class="am-form-group">
                  <date-picker v-model="formData.shareEnd">
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
                  prop="mainAccountName"
                  label="主体"
                  min-width="190">
                </el-table-column>
                <el-table-column
                  prop="a"
                  label="成本（万）"
                  min-width="190">
                </el-table-column>
                <el-table-column
                  prop="b"
                  label="营收（万）"
                  min-width="190">
                </el-table-column>
                <el-table-column
                  prop="c"
                  label="利润（万）"
                  min-width="190">
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="100">
                  <template scope="scope">
                    <router-link :to="'/main/operating/businessStatistics/costList?id=' + scope.row.to" tag="a">详情</router-link>
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
          shareStart: '',
          shareEnd: '',
          mainAccountId: '',
        },
        mainAccounts: '',
        tableData: [
          {
            mainAccountName: '广州区域',
            a: '100',
            b: '300',
            c: '200',
            to: '01',
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
//      this.loadTableData();
    },
    methods:{
      handleSearch() {
//          this.loadTableData()
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
        io.post(io.mainAccountTargetList,this.formData,function(ret){
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
