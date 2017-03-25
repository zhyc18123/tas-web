<template>
  <div >
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title  am-cf">成本录入列表</div>
        <div class="widget-function am-fr">
          <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
        </div>
      </div>
      <div class="widget-body  am-fr">

        <div class="am-u-sm-12 am-form">
          <div class="am-u-sm-12 am-u-md-6 am-u-lg-3">
            <div class="am-form-group">
              <date-picker v-model="query.startDate" >
                <input type="text" class="am-form-field" placeholder="开始日期" data-am-datepicker >
              </date-picker>
            </div>
          </div>

          <div class="am-u-sm-12 am-u-md-6 am-u-lg-3">
            <div class="am-form-group">
              <date-picker v-model="query.endDate" >
                <input type="text" class="am-form-field" placeholder="结束日期" data-am-datepicker >
              </date-picker>
            </div>
          </div>

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-u-end">
            <div class="am-form-group">
              <button class="am-btn  am-btn-default am-btn-success am-btn-sm am-icon-search " type="button" @click="search">查询</button>
              <button class="am-btn  am-btn-default am-btn-success am-btn-sm" type="button" @click="$router.push('/main/settlement/fee/add/'+query.accountMainBodyId )">录入</button>
            </div>
          </div>


        </div>




        <div class="am-u-sm-12 am-scrollable-horizontal">
          <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
            <thead>
            <tr>
              <th>备注</th>
              <th>金额</th>
              <th>时间</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>

            <tr v-for="item in tableData" :key="item.feeId">
              <td>{{item.remark}}</td>
              <td>{{item.amount }}</td>
              <td>{{item.createTime | formatTime }}</td>
              <td>{{item.status == 0 ? '未审核' : ( item.status == 1 ? '审核通过' : '审核失败' ) }}</td>
              <td>
                <div class="tpl-table-black-operation" v-if="item.status == 0">
                  <a  href="javascript:;" class="tpl-table-black-operation-danger" @click="auditing(item.feeId, 1 )" v-if="hasPermission('auditing')">
                    审核通过
                  </a>
                  <a  href="javascript:;" class="tpl-table-black-operation-danger" @click="auditing(item.feeId , 2)" v-if="hasPermission('auditing')">
                    审核失败
                  </a>
                </div>
              </td>
            </tr>


            <!-- more data -->
            </tbody>
          </table>
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

import Pagination from '../base/Pagination'

    export default{
        data:function(){
          return {
            tableData:[],
            total:0,
            pageSize:10,
            pageNo:1,
            query:{ accountMainBodyId : this.$params('accountMainBodyId') },
            searchConfig:{}
          }
        },
        components: {
          Pagination
        },
        mounted:function(){
          $(window).smoothScroll()
          $('[data-am-dropdown]', this.$el ).dropdown();

        },
        created:function(){
          this.loadTableData(this.pageNo);
        },
        methods:{
          search:function(){
            this.loadTableData()
          },
          loadTableData:function(pageNo){
            var _this = this
            _this.pageNo = pageNo || _this.pageNo || 1
            io.post(io.apiAdminSettlementFeelList,$.extend({
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
          },
          auditing:function(feeId , status){
            var _this = this
            io.post(io.apiAdminSettlementAuditingFee,{
              feeId : feeId ,
              status : status
            },function(ret){
              if(ret.success){
                _this.loadTableData()
              }else{
                _this.$alert(ret.desc)
              }
            })
          }
        }
    }
</script>
