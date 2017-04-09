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
                <option value="">区域组</option>
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
                <option value="请选择产品">请选择产品</option>
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

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-6">
            <div class="am-form-group">
              <input type="text" class="am-input-lg" name="courseName" v-model="query.courseName" placeholder="请输入课程名称"/>
            </div>
          </div>

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group">
              <button type="button" class="am-btn am-btn-default am-btn-success am-btn-lg"
                      @click="search" ><span class="am-icon-search"></span>查询
              </button>
            </div>
          </div>

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group">
              <div class="am-btn-toolbar">
                <div class="am-btn-group ">
                  <button type="button" class="am-btn am-btn-default am-btn-success am-btn-lg" @click="$router.push('/main/course/course/add')"
                          v-if="hasPermission('add')"><span class="am-icon-plus"></span>新增课程</button>
                </div>
              </div>
            </div>
          </div>

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group">
              <div class="am-form-group am-form-file">
                <div>
                  <button type="button" class="am-btn am-btn-default am-btn-sm">
                    <i class="am-icon-cloud-upload"></i> 选择要上传的文件</button>
                </div>
                  <input id="courseTemplateFile" type="file"  @change="uploadExcel" />
              </div>
            </div>
          </div>

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group">
              <div class="am-btn-toolbar">
                <div class="am-btn-group ">
                  <!--<button type="button" class="am-btn am-btn-default am-btn-success am-btn-lg" @click="download"><span class="am-icon-download"></span>下载模板</button>-->
                  <a type="button" class="am-btn am-btn-default am-btn-success am-btn-lg" @click="download"><span class="am-icon-download"></span>下载模板</a>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="am-u-sm-12 am-scrollable-horizontal">
          <el-table
            :data="tableData"
            border
            stripe
            style="min-width: 100%">
            <el-table-column
              fixed
              prop="courseName"
              label="课程名"
              min-width="100">
            </el-table-column>
            <el-table-column
              label="课程类型"
              min-width="100">
              <template scope="scope">
                {{scope.row.courseTypeName }}
                </template>
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
              prop="areaTeamName"
              label="区域组"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="busTeamName"
              label="业务组"
              min-width="100">
            </el-table-column>
            <el-table-column
              label="状态"
              min-width="100">
              <template scope="scope">
                {{scope.row.status == 0 ? '未启用':'已启用'}}
                </template>
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
                    <el-dropdown-item @click.native="$router.push('/main/course/course/edit/'+scope.row.courseTemplateId)">编辑</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
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
          download:function() {

          },
          uploadExcel:function() {
            var _this = this;
            var formData = new FormData();
            formData.append("file",document.getElementById('courseTemplateFile').files[0]);
            io.postMitiFile(io.importCourseExcel,formData,function (ret) {
              if (ret.ok){
                $("#courseTemplateFile").val("");
                _this.loadTableData();
                _this.$alert("上传成功");
              } else {
                _this.$alert("上传失败");
              }
            })
          }
        }
    }
</script>
