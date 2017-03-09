<template>
  <div >
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title  am-cf">班级列表</div>
      </div>
      <div class="widget-body  am-fr">

        <div class="am-u-sm-12 am-u-md-6 am-u-lg-6">
          <div class="am-form-group">
            <div class="am-btn-toolbar">
              <div class="am-btn-group am-btn-group-xs">
                <button type="button" class="am-btn am-btn-default am-btn-success" @click="$router.push('/main/course/class/add')" v-if="hasPermission('add')"><span class="am-icon-plus"></span>新增</button>
              </div>
            </div>
          </div>
        </div>

        <div class="am-u-sm-12 am-u-md-6 am-u-lg-3">
          <div class="am-form-group tpl-table-list-select">
            <selected v-model="searchConfig.searchItem">
              <select data-am-selected="{btnSize: 'sm'}" placeholder="搜索选项">
                <option></option>
                <option value="className">班级</option>
                <option value="gradeName">年级</option>
                <option value="subjectName">科目</option>
                <option value="teacherNames">教师</option>
                <option value="seniorName">班主任</option>
                <option value="periodName">期名</option>
                <option value="areaTeamName">区域组</option>
                <option value="busTeamName">业务组</option>
              </select>
            </selected>
          </div>
        </div>
        <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
          <div class="am-input-group am-input-group-sm tpl-form-border-form cl-p">
            <input type="text" class="am-form-field " v-model="searchConfig.searchValue">
            <span class="am-input-group-btn">
              <button class="am-btn  am-btn-default am-btn-success tpl-table-list-field am-icon-search" type="button" @click="search"></button>
            </span>
          </div>
        </div>

        <div class="am-u-sm-12 am-scrollable-horizontal">
          <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
            <thead>
            <tr>
              <th>班级名称</th>
              <th>年级</th>
              <th>科目</th>
              <th>教师</th>
              <th>班主任</th>
              <th>教室</th>
              <th>期名</th>
              <th>进度状态</th>
              <th>校区</th>
              <th>开班状态</th>
              <th>区域组</th>
              <th>业务组</th>
              <th>状态</th>
            </tr>
            </thead>
            <tbody>

            <tr v-for="item in tableData" :key="item.userId">
              <td>{{item.className}}</td>
              <td>{{item.gradeName}}</td>
              <td>{{item.subjectName}}</td>
              <td>{{item.teacherNames}}</td>
              <td>{{item.seniorName}}</td>
              <td>{{item.roomName}}</td>
              <td>{{item.periodName}}</td>
              <td>{{item.progressStatus == 0 ? '未开课' : item.progressStatus == 1 ?  '已开课' : '已结课' }}</td>
              <td>{{item.campusName}}</td>
              <td>{{item.openStatus == 0 ? '未开办':'已开班'}}</td>
              <td>{{item.areaTeamName}}</td>
              <td>{{item.busTeamName}}</td>
              <td>
                <div class="tpl-table-black-operation">
                  <a href="javascript:;" @click="$router.push('/main/course/course/edit/'+item.classId)" v-if="hasPermission('edit')">
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
            pageSize:5,
            pageNo:1,
            query:{},
            searchConfig:{}
          }
        },
        components: {
          Pagination
        },
        mounted:function(){
          $(window).smoothScroll()
        },
        created:function(){
          this.loadTableData(this.pageNo);
        },
        methods:{
          search:function(){
            this.query={}
            if(!this.searchConfig.searchItem){
              this.$alert('请选择搜索选项')
              return
            }
            this.query[this.searchConfig.searchItem] =  this.searchConfig.searchValue
            this.loadTableData()
          },
          loadTableData:function(pageNo){
            var _this = this
            _this.pageNo = pageNo || _this.pageNo || 1
            io.post(io.apiAdminCourseClassList,$.extend({
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
          }
        }
    }
</script>
