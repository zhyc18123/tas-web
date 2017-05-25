<template>
  <div >
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">账户管理</div>
        </div>
        <div class="widget-body  am-fr">

          <div class="am-u-sm-12 am-u-md-6 am-u-lg-6">
            <div class="am-form-group"></div>

          </div>

          <div class="am-u-sm-12 am-u-md-6 am-u-lg-3">
            <div class="am-form-group tpl-table-list-select">
              <selected v-model="searchConfig.searchItem">
                <select data-am-selected="{btnSize: 'sm'}" placeholder="搜索选项">
                  <option></option>
                  <option value="name">主体</option>
                </select>
              </selected>
            </div>
          </div>
          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-input-group am-input-group-sm tpl-form-border-form cl-p">
              <input type="text" class="am-form-field " v-model="searchConfig.searchValue">
              <span class="am-input-group-btn">
              <button class="am-btn  am-btn-default am-btn-success tpl-table-list-field am-icon-search" type="button"
                      @click="search"></button>
            </span>
            </div>
          </div>


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
            total: 0,
            pageSize: 20,
            pageNo: 1,
            query: {},
            searchConfig: {}
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
          search: function () {
            this.query = {}
            if (!this.searchConfig.searchItem) {
              this.$alert('请选择搜索选项')
              return
            }
            this.query[this.searchConfig.searchItem] = this.searchConfig.searchValue
            this.loadTableData(1)
          },
          loadTableData:function(pageNo){
            var _this = this
            _this.pageNo = pageNo || _this.pageNo || 1
            io.post(io.apiAdminSettlementMainAccountList,$.extend({
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
