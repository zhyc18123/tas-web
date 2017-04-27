<template>
  <div >
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">账户提现</div>
          <div class="widget-function am-fr">
            <button type="button" class="am-btn am-btn-default" @click="$router.push('/main/settlement/account/list')">返回</button>
          </div>
        </div>
        <div class="widget-body  am-fr">

          <div class="am-u-sm-12 am-u-md-6 am-u-lg-6 am-u-end">
            <div class="am-form-group">
              <div class="am-btn-toolbar">
                <div class="am-btn-group am-btn-group-xs">
                  <button type="button" class="am-btn am-btn-default am-btn-success"
                          @click="$router.push('/main/settlement/account/withdrawal/apply/' + $params('mainAccountId'))"><span
                    class="am-icon-plus"></span>提现申请
                  </button>
                </div>
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
                label="时间"
                width="150">
                <template scope="scope">
                  {{ scope.row.createTime | formatTime}}
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
            query:{mainAccountId:this.$params('mainAccountId')},
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
          loadTableData:function(pageNo){
            var _this = this
            _this.pageNo = pageNo || _this.pageNo || 1
            io.post(io.apiAdminSettlementAccountWithdrawalList,$.extend({
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
          }
        }
    }
</script>
