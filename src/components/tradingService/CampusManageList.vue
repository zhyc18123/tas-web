<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">校区管理</div>
        </div>
        <div class="widget-body  am-fr">
          <div class="am-u-sm-12 am-form ">
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2  v-model="query.busTeamId" :options="busTeams">
                  <option value="">所属商家</option>
                </select2>
              </div>
            </div>
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2  v-model="query.busTeamId" :options="busTeams">
                  <option value="">城市</option>
                </select2>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2  v-model="query.areaTeamId" :options="areaTeams">
                  <option value="">区域</option>
                </select2>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <input type="text" name="campusName" v-model="query.campusName" placeholder="请输入校区名称"/>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-u-end">
              <div class="am-form-group">
                <button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="search" ><span class="am-icon-search"></span>查询
                </button>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
              <div class="am-form-group">
                <button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="$router.push('/main/tradingService/campusManage/add')" v-if="hasPermission('add')"><span
                  class="am-icon-plus"></span>新增校区
                </button>
              </div>
            </div>

          </div>

          <div class="am-u-sm-12 am-scrollable-horizontal">
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
                fixed
                prop="className"
                label="所属商家"
                min-width="200">
              </el-table-column>
              <el-table-column
                prop="periodName"
                label="校区名称"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="城市"
                label="校区"
                min-width="200">
              </el-table-column>
              <el-table-column
                prop="roomName"
                label="区域"
                min-width="100">
              </el-table-column>
              <el-table-column
                label="状态"
                min-width="150">
                <template scope="scope">
                  {{scope.row.startCourseTime | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
                prop="studyingTime"
                label="联系人"
                min-width="150">
              </el-table-column>
              <el-table-column
                label="联系电话"
                min-width="100">
                <template scope="scope">
                  {{scope.row.courseProgress}}/{{scope.row.lectureAmount}}
                </template>
              </el-table-column>
              <el-table-column
                prop="regAmount"
                label="详细地址"
                min-width="100">
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
                      <el-dropdown-item :disabled="scope.row.status != 0" @click.native="$router.push('/main/tradingService/campusManage/edit/'+scope.row.classId)">编辑</el-dropdown-item>
                      <el-dropdown-item :disabled="scope.row.status != 0" @click.native="$router.push('')">禁用</el-dropdown-item>
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
        query: {
          areaTeamId : '',
          busTeamId : '',
        },
        searchConfig: {},
        selection:[]
      }
    },
    components: {
      Pagination,
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.loadTableData(this.pageNo)
      var _this = this
      this.$root.$on('courseClass:new',function(){
        _this.pageNo = 1
        _this.loadTableData(_this.pageNo)
      })
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
      },

    },
    methods: {
      search: function () {
        this.loadTableData()
      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminCourseClassList, $.extend({
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
      changeStatus:function (status) {
        if(this.selection.length == 0 ){
          this.$alert('请选择记录')
          return
        }

        for(var i =0 ;i < this.selection.length ;i++ ){
          if(this.selection[i].status != 0 ){
            this.$alert('只有"未开班"的记录才能"开班"或"作废"')
            return
          }

          if(status  == 1 && this.selection[i].isArrangeTime == 0 ){
            this.$alert('【'+this.selection[i].className+'】未排时间，无法开班')
            return
          }
        }
        var classIds = this.selection.map(function (item) {
          return item.classId
        })

        var _this = this

        io.post(io.apiAdminChangeCourseClassStatus, {
          status:status,
          classIds : classIds.join(',')
        }, function (ret) {
          if (ret.success) {
            _this.loadTableData(_this.pageNo)
            _this.$alert('处理成功')
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      handleSelectionChange:function (selection) {
        this.selection = selection
      }

    }
  }
</script>
