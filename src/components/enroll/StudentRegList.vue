<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">报名列表</div>
          <div class="widget-function am-fr">
            <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
          </div>
        </div>
        <div class="widget-body am-fr">

          <!--searching condition-->
          <div class="am-u-sm-12 am-form ">

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <input type="text"  v-model="query.studentName" placeholder="请输入学生名"/>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2 required  v-model="query.regStatus"  >
                  <option value="">状态</option>
                  <option value="0">在读</option>
                  <option value="1">转班</option>
                  <option value="3">退班退费</option>
                </select2>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-u-end">
              <div class="am-form-group">
                <button type="button" class="am-btn am-btn-default am-btn-success "
                        @click="search" ><span class="am-icon-search"></span>查询
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
                prop="studentName"
                label="姓名"
                min-width="200">
              </el-table-column>
              <el-table-column
                prop="startAmount"
                label="报读开始讲数"
                min-width="150">
              </el-table-column>
              <el-table-column
                prop="endAmount"
                label="报读结束讲数"
                min-width="150">
              </el-table-column>
              <el-table-column
                label="报读日期"
                min-width="150">
                <template scope="scope">
                  {{ scope.row.createTime | formatDate }}
                </template>
              </el-table-column>
              <el-table-column
                label="状态"
                min-width="150">
                <template scope="scope">
                  {{scope.row.regStatus == 0 ? '在读' : scope.row.regStatus == 1 ? '转班' : scope.row.regStatus == 2 ? '退账户' : '退班退费' }}
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
          regStatus: '',
          classId: ''
        }
      }
    },
    components: {
      Pagination
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.query.classId = this.$params('classId')
      this.loadTableData(this.pageNo)
    },
    methods: {
      search: function () {
        this.loadTableData()
      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminStudentRegList, $.extend({
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
