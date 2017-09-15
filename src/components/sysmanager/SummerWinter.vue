<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">寒暑假列表</div>
        </div>
        <div class="widget-body  am-fr">

          <div class="am-u-sm-12 am-u-md-6 am-u-lg-8">
            <div class="am-form-group">
              <div class="am-btn-toolbar">
                <div class="am-btn-group am-btn-group-xs">
                  <button type="button" class="am-btn am-btn-default am-btn-success"
                          @click="$router.push('/main/sys/vacation/add')" v-if="hasPermission('add')"><span
                    class="am-icon-plus"></span>新增
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="am-u-sm-12 am-u-md-6 am-u-lg-3">
            <div class="am-form-group tpl-table-list-select">
              <date-picker v-model="year" >
                <input style="height: 32px;" type="text" placeholder="请选择年份" data-am-datepicker="{format: 'yyyy ', viewMode: 'years', minViewMode: 'years'}"  required >
              </date-picker>
            </div>
          </div>
          <div class="am-u-sm-12 am-u-md-12 am-u-lg-1">
            <div class="am-input-group am-input-group-sm tpl-form-border-form cl-p">
              <span class="am-input-group-btn">
              <button class="am-btn  am-btn-default am-btn-success tpl-table-list-field am-icon-search" type="button"
                      @click="loadTableData"></button>
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
                prop="areaTeamName"
                label="区域"
                min-width="100">
              </el-table-column>
              <el-table-column
                label="年份"
                prop="year"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="phoneNo"
                label="暑假"
                min-width="100">
                <template scope="scope">
                  {{scope.row.summerStartDate | formatDate}}~{{scope.row.summerEndDate | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
                label="寒假"
                min-width="100">
                <template scope="scope">
                  {{scope.row.winterStartDate | formatDate}}~{{scope.row.winterEndDate | formatDate}}
                </template>
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
                      <el-dropdown-item v-if="hasPermission('edit')" @click.native="$router.push('/main/sys/vacation/add?summerWinterDateId='+scope.row.summerWinterDateId)">编辑
                      </el-dropdown-item>
                      <el-dropdown-item  @click.native="del(scope.row.summerWinterDateId)">删除</el-dropdown-item>
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
    data: function () {
      return {
        tableData: [],
        year: '',
      }
    },
    components: {
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.loadTableData();
    },
    methods: {
      del: function (summerWinterDateId) {
        const _this = this;
        _this.$confirm('你确定要删除？',
          function () {
            io.post(io.deleteSummerWinter, {summerWinterDateId}, function (ret) {
              if (ret.success) {
                _this.$toast('OK')
                _this.loadTableData()
              } else {
                _this.$alert(ret.desc)
              }
            })
          });

      },
      loadTableData: function () {
        var _this = this
        io.post(io.findSummerWinterList, {
          year: _this.year
        }, function (ret) {
          if (ret.success) {
            _this.tableData = ret.data
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
