<template>
  <div >
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title  am-cf">课程类型</div>
      </div>
      <div class="widget-body am-fr">

        <div class="am-u-sm-12 am-form ">
          <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
            <div class="am-form-group">
              <button v-if="hasPermission('add')" type="button" class="am-btn am-btn-default am-btn-success " @click="$router.push('/main/course/courseType/add')">
                  <span class="am-icon-plus"></span>新增课程类型
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
              prop="name"
              label="课程类型"
              min-width="200">
            </el-table-column>
            <el-table-column
              align="center"
              fixed="right"
              label="操作"
              width="150">
              <template scope="scope">
                <el-button v-if="hasPermission('edit')" size="small" @click.native="$router.push('/main/course/courseType/edit/'+ scope.row.courseTypeId + '/'+scope.row.name)">编辑</el-button>
                <el-button v-if="hasPermission('del')"  size="small" @click.native="del(scope.row.courseTypeId)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="am-u-lg-12 am-cf">
          <div class="am-fr">
            <pagination v-bind:total="total" v-bind:pageNo="pageNo" v-bind:pageSize="pageSize" @paging="loadTableData" />
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
        data:function(){
          return {
            tableData:[],
            total:0,
            pageSize:10,
            pageNo:1,
            query:{
              areaTeamId : '',
              busTeamId : '',
              productId : ''
            },
            products:[],
          }
        },
        components: {
          Pagination
        },
        mounted:function(){
          $(window).smoothScroll()
        },
        created:function(){
          this.loadTableData(this.pageNo)
        },
        methods:{
          loadTableData:function(pageNo){
            var _this = this
            _this.pageNo = pageNo || _this.pageNo || 1
            io.post(io.apiAdminCourseTypeManageList,$.extend({
              pageNo:_this.pageNo,
              pageSize:_this.pageSize
            },_this.query),function(ret){
              if(ret.success){
                _this.total = ret.data.total
                _this.tableData = ret.data.list
              }else{
                _this.$alert(ret.desc)
              }
            })
          },
          del:function(courseTypeId){
            var _this  = this
            this.$confirm('确定删除',function () {
                io.post(io.apiAdminDeleteCourseType,{
                courseTypeId : courseTypeId
              },function(ret){
                if(ret.success){
                  _this.loadTableData()
                  _this.$alert('删除成功')
                }else{
                  _this.$alert(ret.desc)
                }
            })
          })
        }
      }
    }
</script>
