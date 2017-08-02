<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">优惠列表</div>
        </div>
        <div class="widget-body  am-fr">

          <div class="am-u-sm-12 am-form ">

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2 v-model="query.areaTeamId" :options="areaTeams">
                  <option value="">区域</option>
                </select2>
              </div>
            </div>

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

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
              <div class="am-form-group am-btn-group-xs">
                <button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="$router.push('/main/discount/discount/add')" v-if="hasPermission('add')"><span
                  class="am-icon-plus"></span>新增
                </button>
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
                prop="name"
                label="优惠名称"
                fixed="left"
                min-width="200">
              </el-table-column>
              <el-table-column
                prop="areaTeamName"
                label="所属区域"
                min-width="100">
              </el-table-column>
              <el-table-column
                label="有效时间"
                min-width="250">
                <template scope="scope">
                  {{scope.row.effectiveStartTime | formatDate('YYYY-MM-DD HH:mm') }} ~ {{scope.row.effectiveEndTime | formatDate('YYYY-MM-DD HH:mm') }}
                </template>
              </el-table-column>
              <el-table-column
                label="开关状态"
                min-width="100">
                <template scope="scope">
                  {{ scope.row.switchStatus == 0 ? '关闭' : '启用' }}
                </template>
              </el-table-column>
              <el-table-column
                label="不和其他叠加"
                min-width="600">
                <template scope="scope">
                    <el-tag type="warring" v-for="name in scope.row.exclusiveDiscountNames">{{name}}</el-tag>
                </template>
              </el-table-column>


              <el-table-column
                label="操作"
                fixed="right"
                width="120">
                <template scope="scope">
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      操作菜单<i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-if="hasPermission('edit')"
                                        @click.native="$router.push('/main/discount/discount/edit/'+scope.row.discountId)">
                        编辑
                      </el-dropdown-item>
                      <el-dropdown-item v-if="hasPermission('del')" @click.native="del(scope.row.discountId ,0)">
                        删除
                      </el-dropdown-item>
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

  import Pagination from '../base/Pagination'

  import io from '../../lib/io'

  export default{
    data: function () {
      return {
        tableData: [],
        total: 0,
        pageSize: 10,
        pageNo: 1,
        query: {
          areaTeamId :''
        },
        discountCategoryList: [],
      }
    },
    components: {
      Pagination
    },
    computed: {
      areaTeams: function () {
        var options = ( this.$root.config.areaTeams || [] )
          .map(function (item) {
            return {value: item.areaTeamId, text: item.name}
          })
        return options
      },
      busTeams: function () {
        var options = ( ( this.query.areaTeamId  ) ? ( this.$root.config.groupBusTeams[this.query.areaTeamId] || [] ) : [] )
          .map(function (item) {
            return {value: item.busTeamId, text: item.name}
          })
        this.query.busTeamId = ''
        return options
      }
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.loadTableData(this.pageNo);
      this.loadDiscountCategoryList()
    },
    methods: {
      search:function(){
        this.loadTableData(1)
      },
      del: function (discountId) {
        const _this = this;
        _this.$confirm('你确定要删除？',
          function () {
            io.post(io.apiAdminDiscountDelDiscount, {discountId}, function (ret) {
              if (ret.success) {
                _this.$toast('删除成功')
                _this.loadTableData()
              } else {
                _this.$alert(ret.desc)
              }
            })
          });
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
            _this.tableData = ret.data.list.map(item =>{
              if(item.exclusiveDiscountNames){
                item.exclusiveDiscountNames = item.exclusiveDiscountNames.split(',')
              }else{
                item.exclusiveDiscountNames = []
              }
              return item
            })
          } else {
            _this.$alert(ret.desc)
          }
        })
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
    }
  }
</script>

<style>
  .el-tag+.el-tag {
    margin-left: 10px;
    margin-top: 5px;
  }
</style>
