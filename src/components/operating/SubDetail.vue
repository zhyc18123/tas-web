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
          <div class="am-u-sm-12">
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
                label="金额（元）"
                min-width="190">
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
        mainAccountId: '',
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
      this.mainAccountId = this.$route.query.mainAccountId
      this.startDate = this.$route.query.startDate
      this.endDate = this.$route.query.endDate
      this.feeCategoryId = this.$route.query.feeCategoryId
      this.loadTableData();
    },
    methods:{
      handleSearch() {
        this.loadTableData()
      },
      loadTableData:function(){
        var _this = this;
        _this.$showLoading()
        io.post(io.costDetail,{
          detailType: this.detailType,
          mainAccountId: this.mainAccountId,
          startDate: this.startDate,
          endDate: this.endDate,
          feeCategoryId: this.feeCategoryId,
        },function(ret){
          _this.$hiddenLoading()
          if(ret.success){
            if (_this.detailType == 0) {
              _this.tableData = ret.data.changeRecordList
            } else if (_this.detailType == 1) {
              _this.tableData = ret.data.categoryMainAccountVoList
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
