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
              <choose style="float: left" class="main-account-select" v-model="productId">
                <select required data-placeholder="产品线名称" style="min-width:200px;" class="chosen-select">
                  <option value=""></option>
                  <option v-for="item in products" :value="item.productId">{{item.name}}</option>
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
          <div v-if="detailType !== '0'" class="am-u-sm-12">
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
                prop="name"
                label="成本名称"
                min-width="190">
              </el-table-column>
              <el-table-column
                prop="totalAmount"
                label="金额（元）"
                min-width="190">
                <template scope="scope">
                  <div>
                    {{scope.row.totalAmount | formatNumber(2)}}
                  </div>
                </template>
              </el-table-column>
              <!--教师成本 todo-->
              <el-table-column
                label="操作"
                width="100">
                <template scope="scope">
                  <router-link v-if="detailType === '1'" :to="'/main/operating/businessStatistics/subDetail?detailType=' +
                       scope.row.detailType + '&name=' + name +  '-'+scope.row.name+ '&feeCategoryId=' + scope.row.categoryId+
                       '&productId=' + productId + '&startDate=' + startDate +
                       '&endDate=' + endDate" tag="a">明细</router-link>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-if="detailType === '0'" class="am-u-sm-12">
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
        detailType: '0',
        productId: '',
        products: [],
        startDate: '',
        endDate: '',
        feeCategoryId: '',
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
      this.productId = this.$route.query.productId
      this.startDate = this.$route.query.startDate
      this.endDate = this.$route.query.endDate
      this.feeCategoryId = this.$route.query.feeCategoryId
      this.loadProductsList();
      this.loadTableData();
    },
    methods:{
      handleSearch() {
        this.loadTableData()
      },
      loadProductsList:function(){
        var _this = this
        io.post(io.apiAdminBaseProductList,{},function(ret){
          if(ret.success){
            _this.products = ret.data;
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
      loadTableData:function(){
        var _this = this;
        _this.$showLoading()
        io.post(io.productCostDetail,{
          detailType: this.detailType,
          productId: this.productId,
          startDate: this.startDate,
          endDate: this.endDate,
          feeCategoryId: this.feeCategoryId,
        },function(ret){
          _this.$hiddenLoading()
          if(ret.success){
            if (_this.detailType == 0) {
              _this.tableData = ret.data.changeRecordList
            } else if (_this.detailType == 1 ||_this.detailType == 3) {
              _this.tableData = ret.data.productCostByCategoryVoList
            } else if(_this.detailType == 2) {
              _this.tableData = ret.data.teacherClassCostVoList
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
