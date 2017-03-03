<template>
  <div >
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title  am-cf">校区列表</div>
      </div>
      <div class="widget-body  am-fr">

        <div class="am-u-sm-12 am-u-md-6 am-u-lg-6">
          <div class="am-form-group">
            <div class="am-btn-toolbar">
              <div class="am-btn-group am-btn-group-xs">
                <button type="button" class="am-btn am-btn-default am-btn-success" @click="$router.push('/main/sys/campus/add')" v-if="hasPermission('add')"><span class="am-icon-plus"></span>新增</button>
              </div>
            </div>
          </div>
        </div>

        <div class="am-u-sm-12 am-u-md-6 am-u-lg-3">
          <div class="am-form-group tpl-table-list-select">
            <selected v-model="searchConfig.searchItem">
              <select data-am-selected="{btnSize: 'sm'}" placeholder="搜索选项">
                <option></option>
                <option value="campusName">校区名</option>
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
              <th>校区名</th>
              <th>地址</th>
              <th>联系电话</th>
              <th>归属</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>

            <tr v-for="item in tableData" :key="item.campusId">
              <td>{{item.campusName}}</td>
              <td>{{item.address }}</td>
              <td>{{item.phoneNo}}</td>
              <td>{{item.areaTeamName}}{{item.busTeamName ? '/' + item.busTeamName : '' }}</td>
              <td>
                <div class="tpl-table-black-operation">
                  <a href="javascript:;" @click="$router.push('/main/sys/campus/edit/'+item.campusId)" v-if="hasPermission('edit')">
                    <i class="am-icon-edit"></i> 编辑
                  </a>

                  <a href="javascript:;" @click="$router.push('/main/sys/room/list?campusId='+item.campusId)" v-if="hasPermission('room')">
                    <i class="am-icon-gear"></i>管理教室
                  </a>

                  <a  href="javascript:;" class="tpl-table-black-operation-danger" @click="del(item.campusId)" v-if="hasPermission('del')">
                    <i class="am-icon-trash"></i>删除
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
          del:function(campusId){
            const _this = this ;
            _this.$confirm('你确定要删除？' ,
            function(){
              io.post(io.apiAdminDelCampus,{campusId},function(ret){
                if(ret.success){
                  _this.$toast('OK')
                  _this.loadTableData()
                }else{
                  _this.$alert(ret.desc)
                }
              })
            });

          },
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
            io.post(io.apiAdminCampusList,$.extend({
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
