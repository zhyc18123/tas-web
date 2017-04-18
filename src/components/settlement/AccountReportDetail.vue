<template>
  <div >
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">{{title}}明细</div>
          <div class="widget-function am-fr">
            <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
          </div>
        </div>
        <div class="widget-body  am-fr">

          <div class="am-u-sm-12 am-form">
            <div class="am-u-sm-12 am-u-md-6 am-u-lg-3">
              <div class="am-form-group">
                <date-picker v-model="query.startDate" >
                  <input type="text" class="am-form-field" placeholder="开始日期" data-am-datepicker :value="query.startDate" >
                </date-picker>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-6 am-u-lg-3">
              <div class="am-form-group">
                <date-picker v-model="query.endDate" >
                  <input type="text" class="am-form-field" placeholder="结束日期" data-am-datepicker :value="query.endDate" >
                </date-picker>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group am-cf">
                <button class="am-btn  am-btn-default am-btn-success am-btn-sm am-icon-search am-fr" type="button" @click="search">查询</button>
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
                prop="remark"
                label="备注"
                min-width="100">
              </el-table-column>
              <el-table-column
                label="金额"
                min-width="100">
                <template scope="scope">
                  {{scope.row.amount < 0 ? '' : '+'}}{{ scope.row.amount | formatNumber(2) }}
                </template>
              </el-table-column>
              <el-table-column
                label="时间"
                min-width="100">
                <template scope="scope">
                  {{scope.row.createTime | formatTime }}
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="am-u-lg-12 am-cf">

            <div class="am-fr">
              <pagination v-bind:total="total" v-bind:pageNo="pageNo" v-bind:pageSize="pageSize" @paging="loadTableData" />
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

        data:function(){
          return {
            tableData:[],
            total:0,
            pageSize:10,
            pageNo:1,
            query:{
              startDate : util.formatDate( util.firstDayOfMonth() ),
              endDate : util.formatDate( util.endDayOfMonth() )
            },
            searchConfig:{},
            title : ''
          }
        },
        components: {
          Pagination
        },
        mounted:function(){
          $(window).smoothScroll()
          console.log(this.query.startDate)
        },
        created:function(){
          this.title = {'future_income' : '预收' , 'real_income' : '收入','cost' :'成本' }[this.$params('subject')]
          this.query.mainAccountId = this.$params('mainAccountId')
          this.query.subject = this.$params('subject')
          this.loadTableData(this.pageNo);
        },
        methods:{
          search:function(){
            this.loadTableData()
          },
          loadTableData:function(pageNo){
            var _this = this
            _this.pageNo = pageNo || _this.pageNo || 1
            io.post(io.apiAdminSettlementAccountReportDetailList,$.extend({
              pageNo:_this.pageNo,
              pageSize:_this.pageSize
            },_this.query),function(ret){
              if(ret.success){
                _this.total = ret.data.total
                _this.tableData = ret.data.list
              }else{
                _this.$alert(ret.desc)
              }
            })
          }
        }
    }
</script>
