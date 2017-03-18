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
                  <button type="button" class="am-btn am-btn-default am-btn-success am-btn-lg" @click=""
                          ><span class="am-icon-download"></span>下载模板</button>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="am-u-sm-12 am-scrollable-horizontal">
          <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
            <thead>
            <tr>
              <th>课程名</th>
              <th>课程类型</th>
              <th>年级</th>
              <th>科目</th>
              <th>讲数</th>
              <th>区域组</th>
              <th>业务组</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>

            <tr v-for="item in tableData" :key="item.courseTemplateId">
              <td>{{item.courseName}}</td>
              <td>{{item.courseTypeName }}</td>
              <td>{{item.gradeName}}</td>
              <td>{{item.subjectName}}</td>
              <td>{{item.lectureAmount}}</td>
              <td>{{item.areaTeamName}}</td>
              <td>{{item.busTeamName}}</td>
              <td>{{item.status == 0 ? '未启用':'已启用'}}</td>
              <td>
                <div class="tpl-table-black-operation">
                  <a href="javascript:;" @click="$router.push('/main/course/course/edit/'+item.courseTemplateId)" v-if="hasPermission('edit')">
                    <i class="am-icon-edit"></i> 编辑
                  </a>


                </div>
              </td>
            </tr>


            <!-- more data -->
            </tbody>
          </table>
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
            var _this = this
            console.log(",,,,," );
            var formData = new FormData();
            formData.append("file",document.getElementById('courseTemplateFile').files[0]);
            this.$http.post(io.importCourseExcel+"?accessToken="+io.getHeaders().accessToken,formData).then(response =>{
                var ret = response.body;
                console.log(ret.success);
            },response => {

            })
          }

        }
    }
</script>
