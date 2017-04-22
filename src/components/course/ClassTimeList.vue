<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">查看排课</div>
          <div class="widget-function am-fr">
            <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
          </div>
        </div>
        <div class="widget-body  am-fr">

          <div class="am-u-sm-12">
            <el-table
              :data="tableData"
              border
              stripe
              style="min-width: 100%">

              <el-table-column
                prop="lectureNo"
                label="讲数"
                min-width="100">
              </el-table-column>
              <el-table-column
                label="上课时间"
                min-width="100">
                <template scope="scope">
                  <span v-if="scope.row.classDate">{{scope.row.classDate | formatDate }}&nbsp;{{scope.row.startTime}}-{{scope.row.endTime}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="teacherName"
                label="上课老师"
                min-width="100">
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
        query: {
          classId : ''
        }
      }
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.query.classId = this.$params('classId')
      this.loadTableData()

    },
    methods: {
      search: function () {
        this.loadTableData()
      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminClassTimeList, $.extend({
          pageNo: _this.pageNo,
          pageSize: _this.pageSize
        }, _this.query), function (ret) {
          if (ret.success) {
            _this.tableData = ret.data
          } else {
            _this.$alert(ret.desc)
          }
        })
      }
    }
  }
</script>
