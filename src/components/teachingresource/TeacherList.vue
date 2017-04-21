<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">老师列表</div>
        </div>
        <div class="widget-body  am-fr">

          <div class="am-u-sm-12 am-u-md-6 am-u-lg-6">
            <div class="am-form-group">
              <div class="am-btn-toolbar">
                <div class="am-btn-group am-btn-group-xs">
                  <button type="button" class="am-btn am-btn-default am-btn-success"
                          @click="$router.push('/main/sys/teacher/add')" v-if="hasPermission('add')"><span
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
                  <option value="teacherName">姓名</option>
                  <option value="idNo">身份证号码</option>
                  <option value="teachGradeNames">任教年级</option>
                  <option value="teachSubjectNames">任教科目</option>
                  <option value="areaTeamName">区域</option>
                  <option value="busTeamName">业务组</option>
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

          <div class="am-u-sm-12 am-scrollable-horizontal">
            <el-table
              :data="tableData"
              border
              stripe
              style="min-width: 100%">
              <el-table-column
                fixed
                prop="teacherName"
                label="姓名"
                min-width="100">
              </el-table-column>
              <el-table-column
                label="性别"
                min-width="100">
                <template scope="scope">
                  {{scope.row.sex == 1 ? '男' : '女' }}

                </template>
              </el-table-column>
              <el-table-column
                prop="idNo"
                label="身份证号码"
                min-width="200">
              </el-table-column>
              <el-table-column
                prop="phoneNo"
                label="电话号码"
                min-width="150">
              </el-table-column>
              <el-table-column
                prop="teachGradeNames"
                label="任教年级"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="teachSubjectNames"
                label="任教科目"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="areaTeamName"
                label="所在区域"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="busTeamName"
                label="所在业务组"
                min-width="100">
              </el-table-column>
              <el-table-column
                label="入职时间"
                min-width="100">
                <template scope="scope">
                  {{scope.row.joinTime | formatDate}}

                </template>
              </el-table-column>
              <el-table-column
                label="状态"
                min-width="100">
                <template scope="scope">
                  {{scope.row.status == 0 ? '离职' : '在职'}}

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
                      <el-dropdown-item v-if="hasPermission('edit')" @click.native="$router.push('/main/sys/teacher/edit/'+scope.row.teacherId)">编辑
                      </el-dropdown-item>
                      <el-dropdown-item v-if="hasPermission('del')" @click.native="del(scope.row.teacherId)">删除</el-dropdown-item>
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
        pageSize: 5,
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
      del: function (teacherId) {
        const _this = this;
        _this.$confirm('你确定要删除？',
          function () {
            io.post(io.apiAdminDelTeacher, {teacherId}, function (ret) {
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
        this.query[this.searchConfig.searchItem] = this.searchConfig.searchValue
        this.loadTableData()
      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminTeacherList, $.extend({
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
