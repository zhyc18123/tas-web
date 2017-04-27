<template>
  <div >
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">提现管理</div>
        </div>
        <div class="widget-body  am-fr">
          <div class="am-u-sm-12 am-form ">

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <input type="text"  v-model="query.mainAccountName" placeholder="请输入主体"/>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2 required  v-model="query.status"  >
                  <option value="">状态</option>
                  <option value="0">处理中</option>
                  <option value="1">已打款</option>
                </select2>
              </div>
            </div>
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-u-end">
              <div class="am-form-group">
                <button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="search" ><span class="am-icon-search"></span>查询
                </button>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
              <div class="am-form-group">
                <button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="$router.push('/main/course/class/add')" v-if="hasPermission('add')"><span
                  class="am-icon-plus"></span>新建班级
                </button>
                <button type="button" class="am-btn am-btn-default am-btn-success" v-if="hasPermission('open')"
                        @click="changeStatus(1)" ><span
                  class="am-icon-plus"></span>开班
                </button>
                <button type="button" class="am-btn am-btn-default am-btn-success" v-if="hasPermission('open')"
                        @click="changeStatus(2)" ><span
                  class="am-icon-plus"></span>作废
                </button>
                <!--<button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="$router.push('/main/course/class/add')" v-if="hasPermission('add')"><span
                  class="am-icon-plus"></span>快速排班
                </button>-->
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
                fixed
                prop="mainAccountName"
                label="主体"
                min-width="150">
              </el-table-column>
              <el-table-column
                prop="amount"
                label="余额"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="bankName"
                label="开户银行"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="bankCity"
                label="开户城市"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="cardNo"
                label="卡号"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="cardUser"
                label="姓名"
                min-width="100">
              </el-table-column>
              <el-table-column
                label="状态"
                width="100">
                <template scope="scope">
                  {{scope.row.status == 0 ? '处理中' :'已打款' }}
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="150">
                <template scope="scope">
                  <el-button size="small" v-if="hasPermission('change_status')" :disabled="scope.row.status == 1 " @click.native="pay(scope.row.withdrawalId)">打款</el-button>
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
import Pagination from '../base/Pagination'

    export default{
        data:function(){
          return {
            tableData:[],
            query:{},
            total: 0,
            pageSize: 5,
            pageNo: 1
          }
        },
        components: {
          Pagination
        },
        mounted:function(){
          $(window).smoothScroll()
        },
        created:function(){
          this.loadTableData();
        },
        methods:{
          search:function(){
              this.loadTableData(1)
          },
          loadTableData:function(pageNo){
            var _this = this
            _this.pageNo = pageNo || _this.pageNo || 1
            io.post(io.apiAdminSettlementWithdrawalList,$.extend({
              pageNo: _this.pageNo,
              pageSize: _this.pageSize
            }, _this.query),function(ret){
              if(ret.success){
                _this.total = ret.data.total
                _this.tableData = ret.data.list
              }else{
                _this.$alert(ret.desc)
              }
            })
          },
          pay:function(withdrawalId){
            var _this = this
            io.post(io.apiAdminSettlementUpdateWithdrawalStatus,{
              withdrawalId : withdrawalId ,
                status : 1
            },function(ret){
              if(ret.success){
                _this.$toast("OK")
                _this.loadTableData()
              }else{
                _this.$alert(ret.desc)
              }
            })
          }
        }
    }
</script>
