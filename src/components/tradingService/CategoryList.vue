<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">分类列表</div>
        </div>
        <div class="widget-body  am-fr">
          <div class="am-u-sm-12 am-form ">
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-6">
              <div class="am-form-group">
                <button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="$router.push('/main/tradingService/category/add')" v-if="hasPermission('add')"><span
                  class="am-icon-plus"></span>新增
                </button>
              </div>
            </div>


            <div class="am-u-sm-12 am-u-md-6 am-u-lg-3">
              <div class="am-form-group tpl-table-list-select">
                <selected v-model="query.type">
                  <select data-am-selected="{btnSize: 'sm'}" placeholder="搜索选项">
                    <option></option>
                    <option value="">所属分类</option>
                    <option value="0">商品</option>
                    <option value="2">租赁</option>
                    <option value="3">需求</option>
                  </select>
                </selected>
              </div>
            </div>
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-input-group am-input-group-sm tpl-form-border-form cl-p">
                <input type="text" class="am-form-field " v-model="query.name">
                <span class="am-input-group-btn">
              <button class="am-btn  am-btn-default am-btn-success tpl-table-list-field am-icon-search" type="button"
                      @click="search"></button>
            </span>
              </div>
            </div>
          </div>

          <div class="am-u-sm-12">
            <el-table :data="tableData" border stripe style="min-width: 100%">
              <el-table-column prop="name" label="分类名称" min-width="100"></el-table-column>
              <el-table-column label="所属分类" min-width="100">
                <template scope="scope">{{scope.row.type==0?"商品":scope.row.type==2?"租赁":"需求"}}</template>
              </el-table-column>
              <el-table-column label="成本类型" min-width="100">
                <template scope="scope">{{scope.row.feeCategoryName}}</template>
              </el-table-column>
              <el-table-column label="收入类型" min-width="100">
                <template scope="scope">{{scope.row.incomeCategoryName}}</template>
              </el-table-column>

              <el-table-column label="操作" width="120">
                <template scope="scope">
                  <el-dropdown>
                    <span class="el-dropdown-link">操作菜单<i class="el-icon-caret-bottom el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-if="hasPermission('edit')"
                                        @click.native="$router.push('/main/tradingService/category/edit/'+scope.row.categoryId)">
                        编辑
                      </el-dropdown-item>
                      <el-dropdown-item @click.native="deleteCategory(scope.row.categoryId)">删除</el-dropdown-item>
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
    data: function () {
      return {
        tableData: [],
        total: 0,
        pageSize: 10,
        pageNo: 1,
        query: {
          categoryName: ''
        },
        searchConfig: {}
      }
    },
    components: {
      Pagination
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.loadTableData(this.pageNo);
    },
    methods: {
      deleteCategory: function (categoryId) {
        var _this = this;
        _this.categoryId = categoryId

        _this.$confirm("确认删除吗",
          function () {
            io.post(io.apiAdminDeleteCategory, {categoryId: _this.categoryId}, function (ret) {
              if (ret.success) {
                _this.$toast('OK')
                _this.loadTableData()
              } else {
                _this.$alert(ret.desc)
              }
            })
          });
      },
      search: function () {
        this.loadTableData()
      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminCategoryList, $.extend({
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
      }
    }
  }
</script>
