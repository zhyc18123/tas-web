<template>
  <window ref="win" title="选择优惠">
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-body  am-fr">

          <div class="am-u-sm-12 am-form ">

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2 v-model="query.categoryId" >
                  <option value="">优惠分类</option>
                  <option v-for="item in discountCategoryList" :value="item.discountCategoryId" >{{item.name}}</option>
                </select2>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <input type="text" v-model="query.name" placeholder="优惠名称"/>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-u-end">
              <div class="am-form-group">
                <button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="search"><span class="am-icon-search"></span>查询

                </button>
              </div>
            </div>

          </div>

          <div class="am-u-sm-12">
            <el-table
              :data="tableData"
              border
              stripe
              @selection-change="handleSelectionChange"
              style="min-width: 100%">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                prop="name"
                label="优惠名称"
                min-width="100">
              </el-table-column>
              <el-table-column
                label="有效时间"
                min-width="250">
                <template scope="scope">
                  {{scope.row.effectiveStartTime | formatDate('YYYY-MM-DD HH:mm')
                  }} ~ {{scope.row.effectiveEndTime | formatDate('YYYY-MM-DD HH:mm') }}
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="120">
                <template scope="scope">
                  <el-button type="small" @click="$emit('ok',[scope.row])">确定</el-button>
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
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <button type="button" class="am-btn am-btn-primary" @click="confirm">确定</button>
    </div>
  </window>
</template>

<script>

  import Pagination from '../base/Pagination'

  import io from '../../lib/io'

  export default {
    data: function () {
      return {
        tableData: [],
        total: 0,
        pageSize: 8,
        pageNo: 1,
        query: {
          areaTeamId: ''
        },
        selected:[],
        discountCategoryList: [],
      }
    },
    components: {
      Pagination
    },
    created: function () {
      //this.loadTableData(this.pageNo);
      this.loadDiscountCategoryList();
    },
    methods: {
      search: function () {
        this.loadTableData(1)
      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminDiscountDiscountList, $.extend({
          pageNo: _this.pageNo,
          pageSize: _this.pageSize
        }, _this.query), function (ret) {
          if (ret.success) {
            _this.total = ret.data.total
            _this.tableData = ret.data.list
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      show:function(params){
        this.query.areaTeamId = params.areaTeamId || ''
        this.loadTableData(this.pageNo);
        this.$refs.win.show({
          width:1000,
          height:600
        })
      },
      handleSelectionChange:function(val){
        this.selected = val
      },
      confirm:function(){
        this.$emit('ok', this.selected )
        this.$refs.win.close()
      },
      loadDiscountCategoryList: function () {
        io.post(io.apiAdminDiscountCategoryList, {
            pageNo: 1,
            pageSize: 100
          },
          (ret) => {
            if (ret.success) {
              this.discountCategoryList = ret.data.list
            } else {
              this.$alert(ret.desc)
            }
          },
          () => {
            this.$alert('请求服务器失败')
          })
      },
    },

  }
</script>
