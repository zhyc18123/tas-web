<template>
  <div>
    <window title="生源学校" ref="win">
      <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
        <div class="widget am-cf">

          <div class="am-u-sm-12 am-form ">
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <input type="text" name="teacherNames" v-model="query.schoolName" placeholder="请输入学校名"/>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-u-end am-text-left">
              <div class="am-form-group">
                <button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="search" ><span class="am-icon-search"></span>查询
                </button>
              </div>
            </div>


          </div>

          <div class="widget-body  am-fr" style="padding: 0px ;">
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
                    <el-button size="small"  @click.native="$emit('select' , scope.row );$refs.win.close()">确定
                  </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </window>
  </div>
</template>

<script>

  import Pagination from '../base/Pagination'

  import io from '../../lib/io'
  import Window from "../base/Window";

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
      Window, Pagination
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.loadTableData(this.pageNo);
    },
    methods: {
      search:function(){
        this.loadTableData(1);
      },
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
      },
      show:function(){
          this.$refs.win.show({
            width: 700,
            height : 500,
          })
      }
    }
  }
</script>
