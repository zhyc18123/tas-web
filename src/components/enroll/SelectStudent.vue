<template>
  <div>
    <window title="学生列表" ref="win">
      <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
        <div class="widget am-cf">

          <div class="am-u-sm-12 am-form ">
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-6">
              <div class="am-form-group">
                <input type="text" name="teacherNames" v-model="query.keyword" placeholder="请输入学生编号／姓名／手机号"/>
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

            <div class="am-u-sm-12" v-if="total != 0">
              <el-table
                :data="tableData"
                border
                stripe
                height="400"
                style="min-width: 100%">
                <el-table-column
                  fixed
                  label="学号"
                  min-width="150">
                  <template scope="scope">
                    {{scope.row.studentNo }}
                </template>
                </el-table-column>
                <el-table-column
                  fixed
                  prop="name"
                  label="姓名"
                  min-width="100">
                </el-table-column>

                <el-table-column
                  fixed
                  prop="phoneNo"
                  label="手机号码"
                  min-width="150">
                </el-table-column>
                <el-table-column
                  label="出生日期"
                  min-width="150">
                  <template scope="scope">
                    {{scope.row.birthday | formatDate }}
                </template>
                </el-table-column>
                <el-table-column
                  prop="gradeName"
                  label="年级"
                  min-width="100">
                </el-table-column>
                <el-table-column
                  prop="school"
                  label="就读学校"
                  min-width="100">
                </el-table-column>
                <el-table-column
                  prop="location"
                  label="地区"
                  min-width="100">
                </el-table-column>
                <el-table-column
                  fixed="right"
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

          <div class="am-u-lg-12 am-cf">

            <div class="am-fr">
              <pagination v-bind:total="total" v-bind:pageNo="pageNo" v-bind:pageSize="pageSize"
                          @paging="loadTableData"/>
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

    methods: {
      search:function(){
        if(!this.query.keyword){
          this.$alert('请输入学生编号／姓名／手机号')
          return
        }
        this.loadTableData(1)
      },
      loadTableData:function(pageNo){
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminSearchStudent,$.extend({
          pageNo:_this.pageNo,
          pageSize:_this.pageSize
        },_this.query),function(ret){
          if(ret.success){
            _this.total = ret.data.total
            _this.tableData = ret.data.list;
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
      show:function(){
          this.$refs.win.show({
            width: 800,
            height : 500,
          })
      }
    }
  }
</script>
