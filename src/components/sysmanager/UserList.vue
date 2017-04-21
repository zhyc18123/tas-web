<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">用户列表</div>
        </div>
        <div class="widget-body  am-fr">

          <div class="am-u-sm-12 am-u-md-6 am-u-lg-6">
            <div class="am-form-group">
              <div class="am-btn-toolbar">
                <div class="am-btn-group am-btn-group-xs">
                  <button type="button" class="am-btn am-btn-default am-btn-success"
                          @click="$router.push('/main/sys/user/add')" v-if="hasPermission('add')"><span
                    class="am-icon-plus"></span>新增
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="am-u-sm-12 am-u-md-6 am-u-lg-3">
            <div class="am-form-group tpl-table-list-select">
              <selected v-model="searchConfig.searchItem">
                <select data-am-selected="{btnSize: 'sm'}" placeholder="搜索选项">
                  <option></option>
                  <option value="username">用户名</option>
                  <option value="realName">姓名</option>
                  <option value="phoneNo">电话号码</option>
                  <option value="busTeamName">业务组</option>
                  <option value="status">状态</option>
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
                fixed
                prop="username"
                label="用户名"
                min-width="100">
              </el-table-column>
              <el-table-column
                label="姓名"
                min-width="100">
                <template scope="scope">
                  {{scope.row.realName }}

                </template>
              </el-table-column>
              <el-table-column
                prop="phoneNo"
                label="电话号码"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="areaTeamName"
                label="区域"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="busTeamName"
                label="业务组"
                min-width="100">
              </el-table-column>
              <el-table-column
                label="状态"
                min-width="100">
                <template scope="scope">
                  {{scope.row.status == 0 ? '禁用' : '正常'}}
                </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="120">
                <template scope="scope">
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      操作菜单<i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-if="hasPermission('edit')" @click.native="$router.push('/main/sys/user/edit/'+scope.row.userId)">编辑
                      </el-dropdown-item>
                      <el-dropdown-item v-if="hasPermission('permission')" @click.native="$router.push('/main/sys/user/roles/'+scope.row.userId)">设置权限
                      </el-dropdown-item>
                      <el-dropdown-item  @click.native="del(scope.row.userId)">删除</el-dropdown-item>
                      <el-dropdown-item v-if="scope.row.status == 1 && hasPermission('enable_disable')" @click.native="changeStatus(scope.row.userId ,0)">禁用</el-dropdown-item>
                      <el-dropdown-item v-if="scope.row.status == 0 && hasPermission('enable_disable')" @click.native="changeStatus(scope.row.userId , 1 )">解禁</el-dropdown-item>
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
        query: {},
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
      del: function (userId) {
        const _this = this;
        _this.$confirm('你确定要删除？',
          function () {
            io.post(io.apiAdminDelSysUser, {userId}, function (ret) {
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
        this.query = {}
        if (!this.searchConfig.searchItem) {
          this.$alert('请选择搜索选项')
          return
        }
        let value = this.searchConfig.searchValue
        if (this.searchConfig.searchItem == 'status') {
          value = value == '正常' ? 1 : 0
        }
        this.query[this.searchConfig.searchItem] = value
        this.loadTableData()
      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminSysUserList, $.extend({
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
      changeStatus: function (userId, status) {
        var _this = this
        io.post(io.apiAdminUpdateSysUserStatus, {
          userId: userId,
          status: status
        }, function (ret) {
          if (ret.success) {
            _this.loadTableData()
          } else {
            _this.$alert(ret.desc)
          }
        })
      }
    }
  }
</script>
