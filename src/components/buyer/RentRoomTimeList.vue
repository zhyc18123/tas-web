<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">租赁详情</div>
        </div>

        <!--table-->
        <div class="am-u-sm-12">
          <el-table :data="tableData" border stripe style="min-width: 100%">
            <el-table-column type="expand">
              <template scope="scope">
                <calendar :roomId="scope.row.roomId"></calendar>
              </template>
            </el-table-column>
            <el-table-column prop="roomName" label="教室名" min-width="100"></el-table-column>
            <el-table-column label="座位数" min-width="100"><template scope="scope">{{scope.row.seatAmount }}</template></el-table-column>
            <el-table-column prop="rent" label="每小时" min-width="100"></el-table-column>
            <el-table-column label="状态" min-width="100">
              <template scope="scope">{{scope.row.status == '0' ? '未启用' : '正常'}}</template>
            </el-table-column>
          </el-table>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import io from '../../lib/io'
  import Calendar from '../course/CalendarForRoom'

  export default{
    data: function () {
      return {
        tableData: [],
        total: 0,
        searchConfig: {},
        orderItemId: ''
      }
    },
    components: {
      'calendar' :Calendar
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.loadTableData();
    },
    methods: {
      search: function () {
        this.loadTableData()
      },
      loadTableData: function () {
        var _this = this
        io.post(io.apiAdminRentRoomList, {}, function (ret) {
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
