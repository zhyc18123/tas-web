<template>
  <div >
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title  am-cf">课程列表</div>
      </div>
      <div class="widget-body am-fr">

        <!--searching condition-->
        <div class="am-u-sm-12 am-form ">
          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group">
              <select2  v-model="query.areaTeamId" :options="areaTeams">
                <option value="">区域</option>
              </select2>
            </div>
          </div>
          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group">
              <select2  v-model="query.busTeamId" :options="busTeams">
                <option value="">业务组</option>
              </select2>
            </div>
          </div>

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group">
              <select2  v-model="query.productId" :options="products">
                <option value="">请选择产品</option>
              </select2>
            </div>
          </div>
          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group">
              <select2 required  v-model="query.season"  >
                <option value="">季节</option>
                <option value="春季班">春季班</option>
                <option value="暑期班">暑期班</option>
                <option value="秋季班">秋季班</option>
                <option value="寒假班">寒假班</option>
              </select2>
            </div>
          </div>

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group">
              <select2  v-model="query.gradeId" :options="grades">
                <option value="">年级</option>
              </select2>
            </div>
          </div>

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group">
              <select2  v-model="query.subjectId" :options="subjects">
                <option value="">学科</option>
              </select2>
            </div>
          </div>

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group">
              <input type="text"  name="courseName" v-model="query.courseName" placeholder="请输入课程名称"/>
            </div>
          </div>

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-u-end">
            <div class="am-form-group">
              <button type="button" class="am-btn am-btn-default am-btn-success "
                      @click="search" ><span class="am-icon-search"></span>查询
              </button>
            </div>
          </div>

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
            <div class="am-form-group">
              <button type="button" class="am-btn am-btn-default am-btn-success " @click="$router.push('/main/course/course/add')"
                      v-if="hasPermission('add')"><span class="am-icon-plus"></span>新增课程</button>

              <button type="button" class="am-btn am-btn-default am-btn-success  am-form-file"
                      v-if="hasPermission('add')">
                <input id="uploadFile" @change="uploadExcel" type="file" accept="application/vnd.ms-excel">
                <span class="am-icon-cloud-upload"></span>批量导入</button>
              <a href="http://static.yuyou100.com/course_tempalet_v4.xls?attname=课程导入模板.xls" class="am-btn am-btn-default am-btn-success "><span class="am-icon-download"></span>下载模板</a>
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
              fixed
              prop="courseName"
              label="课程名"
              min-width="200">
            </el-table-column>
            <el-table-column
              label="课程类型"
              prop="courseTypeName"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="gradeName"
              label="年级"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="subjectName"
              label="科目"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="lectureAmount"
              label="讲数"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="season"
              label="季节"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="level"
              label="层次"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="areaTeamName"
              label="区域"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="busTeamName"
              label="业务组"
              min-width="100">
            </el-table-column>
            <!--<el-table-column
              label="状态"
              min-width="100">
              <template scope="scope">
                {{scope.row.status == 0 ? '未启用':'已启用'}}
                </template>
            </el-table-column>-->
            <el-table-column
              align="center"
              fixed="right"
              label="操作"
              width="150">
              <template scope="scope">
                <el-button v-if="hasPermission('edit')" size="small" @click.native="$router.push('/main/course/course/edit/'+scope.row.courseTemplateId)">编辑</el-button>
                <el-button v-if="hasPermission('del')" size="small" @click.native="del(scope.row.courseTemplateId)">删除</el-button>
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
          this.loadProductData()
        },
        computed:{
          areaTeams: function () {
            var options = ( this.$root.config.areaTeams || [] )
              .map(function (item) {
                return {value: item.areaTeamId, text: item.name}
              })
            return options
          },
          //响应式，（this.query.areaTeamId ）相关依赖改变重新求值，
          busTeams: function () {
            var options = ( ( this.query.areaTeamId  ) ? ( this.$root.config.groupBusTeams[this.query.areaTeamId] || [] ) : [] )
              .map(function (item) {
                return {value: item.busTeamId, text: item.name}
              })
            this.query.busTeamId = ''
            return options
          },
          //计算缓存，性能开销比较大的的计算属性
          grades: function () {
            return this.$root.config.grades.map(function(item){
              return {value: item.gradeId, text: item.gradeName}
            })
          },
          subjects: function () {
            return this.$root.config.subjects.map(function(item){
              return {value: item.subjectId, text: item.subjectName}
            })
          }
        },
        methods:{
          search:function(){
            this.loadTableData()
          },
          loadTableData:function(pageNo){
            var _this = this
            _this.pageNo = pageNo || _this.pageNo || 1
            io.post(io.apiAdminCourseTemplateList,$.extend({
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
          loadProductData: function () {
            var _this = this
            io.post(io.apiAdminBaseProductList, {}, function (ret) {
              if (ret.success) {
                _this.products = ret.data.map(function (item) {
                  return {value: item.productId, text: item.name}
                })
              } else {
                _this.$alert(ret.desc)
              }
            })
          },
          uploadExcel:function() {
            var _this = this;
            var formData = new FormData();
            formData.append("file",document.getElementById('uploadFile').files[0]);
            io.postMitiFile(io.importCourseExcel,formData,function (ret) {
              if (ret.ok && ret.data.success){
                $("#courseTemplateFile").val("");
                _this.loadTableData();
                _this.$alert("上传成功");
              } else {
                _this.$alert(ret.data.desc || "上传失败");
              }
            })
          },
          del:function(courseTemplateId){
            var _this  = this
            io.post(io.apiAdminDeleteCourseTemplate,{
              courseTemplateId : courseTemplateId
            },function(ret){
              if(ret.success){
                _this.loadTableData()
                _this.$alert('删除成功')
              }else{
                _this.$alert(ret.desc)
              }
            })
          }
        }
    }
</script>
