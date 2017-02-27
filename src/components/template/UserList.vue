<template>
  <div >
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title  am-cf">用户列表</div>
      </div>
      <div class="widget-body  am-fr">

        <div class="am-u-sm-12 am-u-md-6 am-u-lg-6">
          <div class="am-form-group">
            <div class="am-btn-toolbar">
              <div class="am-btn-group am-btn-group-xs">
                <button type="button" class="am-btn am-btn-default am-btn-success" @click="$router.push('/main/user/add')"><span class="am-icon-plus"></span>新增</button>
                <button type="button" class="am-btn am-btn-default am-btn-danger" @click="del"><span class="am-icon-plus"></span>删除</button>
                <button type="button" class="am-btn am-btn-default am-btn-danger" @click="$showLoading"><span class="am-icon-trash-o"></span> Loading</button>
              </div>
            </div>
          </div>
        </div>

        <div class="am-u-sm-12 am-u-md-6 am-u-lg-3">
          <div class="am-form-group tpl-table-list-select">
            <selected>
              <select data-am-selected="{btnSize: 'sm'}">
                <option value="option1">所有类别</option>
                <option value="option2">IT业界</option>
                <option value="option3">数码产品</option>
                <option value="option3">笔记本电脑</option>
                <option value="option3">平板电脑</option>
                <option value="option3">只能手机</option>
                <option value="option3">超极本</option>
              </select>
            </selected>
          </div>
        </div>
        <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
          <div class="am-input-group am-input-group-sm tpl-form-border-form cl-p">
            <input type="text" class="am-form-field ">
                                        <span class="am-input-group-btn">
            <button class="am-btn  am-btn-default am-btn-success tpl-table-list-field am-icon-search" type="button"></button>
          </span>
          </div>
        </div>

        <div class="am-u-sm-12">
          <table width="100%" class="am-table am-table-compact am-table-striped tpl-table-black ">
            <thead>
            <tr>
              <th>头像</th>
              <th>姓名</th>
              <th>性别</th>
              <th>电话号码</th>
              <th>籍贯</th>
              <th>生日</th>
              <th>年龄</th>
              <th>爱好</th>
            </tr>
            </thead>
            <tbody>

            <tr v-for="item in tableData" :key="item.userId">
              <td>
                <img :src="item.avatar" class="tpl-table-line-img" alt="">
              </td>
              <td>{{item.name}}</td>
              <td>{{item.sex == 1 ? '男' : item.sex == 2 ?  '女' : '其他' }}</td>
              <td>{{item.phoneNo}}</td>
              <td>{{item.location}}</td>
              <td>{{item.birthday}}</td>
              <td>{{item.age}}</td>
              <td>{{item.hobby ? item.hobby.join('、') : '' }}</td>
              <td>
                <div class="tpl-table-black-operation">
                  <a href="javascript:;" @click="$router.push('/main/user/edit/'+item.userId)">
                    <i class="am-icon-pencil"></i> 编辑
                  </a>
                  <a href="javascript:;" class="tpl-table-black-operation-del" @click="del(item.userId)">
                    <i class="am-icon-trash"></i> 删除
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
<style scoped>

</style>
<script>
import io from '../../lib/io'

import Pagination from '../base/Pagination'
import Window from '../base/Window'
import UserForm from './UserForm'

    export default{
        name: 'user-list',
        data:function(){
          return {
            tableData:[],
            total:0,
            pageSize:5,
            pageNo:1,
            query:{}
          }
        },
        components: {
          Pagination,
          UserForm,
          Window
        },
        mounted:function(){
          $(window).smoothScroll()
        },
        created:function(){
          this.loadTableData(this.pageNo);
        },
        methods:{
          add:function(){
            this.$refs.addWindow.show({width:1000})
          },
          del:function(){
            const _this = this ;
            _this.$confirm('你确定要删除' ,
            function(){
              _this.$alert('你选择删除');
            },
            function(){
              _this.$alert('你取消删除');

            });

          },
          reloadDataTable:function(){

          },
          loadTableData:function(pageNo){
            var _this = this
            _this.pageNo = pageNo
            io.get(io.userList,$.extend({
              pageNo:_this.pageNo,
              pageSize:_this.pageSize
            },_this.query),function(ret){
              if(ret.success){
                _this.total = ret.data.total
                _this.tableData = ret.data.list
              }else{
                _this.$alert('请求服务器失败')
              }
            })
          }
        }
    }
</script>
