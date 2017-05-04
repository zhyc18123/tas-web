<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">生源学校列表</div>
        </div>
        <div class="widget-body  am-fr">

          <div class="am-u-sm-12 am-u-md-6 am-u-lg-6">
            <div class="am-form-group">
              <div class="am-btn-toolbar">
                <div class="am-btn-group am-btn-group-xs">
                  <button type="button" class="am-btn am-btn-default am-btn-success"
                          @click="$router.push('/main/sys/student/school/add')" v-if="hasPermission('add')"><span
                    class="am-icon-plus"></span>新增
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
                prop="schoolName"
                label="校名"
                min-width="200">
              </el-table-column>
              <el-table-column
                label="地址"
                min-width="250">
                <template scope="scope">
                  {{scope.row.province }}{{scope.row.city }}{{scope.row.district }}{{scope.row.address}}
                </template>
              </el-table-column>


              <el-table-column
                label="操作"
                width="120">
                <template scope="scope">
                  <el-button size="small" v-if="hasPermission('edit')" @click.native="$router.push('/main/sys/student/school/edit/'+scope.row.studentSchoolId)">编辑
                  </el-button>
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

  import Pagination from '../base/Pagination'

  import io from '../../lib/io'

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
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminStudentSchoolList, $.extend({
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
