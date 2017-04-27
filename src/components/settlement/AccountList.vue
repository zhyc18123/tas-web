<template>
  <div >
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">账户管理</div>
        </div>
        <div class="widget-body  am-fr">


          <div class="am-u-sm-12">
            <el-table
              :data="tableData"
              border
              stripe
              style="min-width: 100%">
              <el-table-column
                prop="name"
                label="主体"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="balanceAmount"
                label="账户余额"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="realtimeBalanceAmount"
                label="实时账户余额"
                min-width="100">
              </el-table-column>
              <el-table-column
                label="操作"
                width="120">
                <template scope="scope">
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      操作菜单<i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="$router.push('/main/settlement/account/report/detail/future_income/'+scope.row.mainAccountId)">预收明细</el-dropdown-item>
                      <el-dropdown-item @click.native="$router.push('/main/settlement/account/report/detail/real_income/'+scope.row.mainAccountId)">收入明细</el-dropdown-item>
                      <el-dropdown-item @click.native="$router.push('/main/settlement/account/report/detail/cost/'+scope.row.mainAccountId)">成本明细</el-dropdown-item>
                      <el-dropdown-item @click.native="$router.push('/main/settlement/account/report/profit/'+scope.row.mainAccountId)">利润</el-dropdown-item>
                      <el-dropdown-item @click.native="$router.push('/main/settlement/account/withdrawal/list/'+scope.row.mainAccountId)">提现</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
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

    export default{
        data:function(){
          return {
            tableData:[]
          }
        },
        mounted:function(){
          $(window).smoothScroll()
        },
        created:function(){
          this.loadTableData();
        },
        methods:{
          loadTableData:function(){
            var _this = this
            io.post(io.apiAdminSettlementMainAccountList,{},function(ret){
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
