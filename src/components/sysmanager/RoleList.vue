<template>
  <div >
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title  am-cf">角色列表</div>
      </div>
      <div class="widget-body  am-fr">

        <div class="am-u-sm-12 am-u-md-6 am-u-lg-6">
          <div class="am-form-group">
            <div class="am-btn-toolbar">
              <div class="am-btn-group am-btn-group-xs">
                <button type="button" class="am-btn am-btn-default am-btn-success" @click="$router.push('/main/sys/role/add')" v-if="hasPermission('add')"><span class="am-icon-plus"></span>新增</button>
              </div>
            </div>
          </div>
        </div>


        <div class="am-u-sm-12 am-scrollable-horizontal">
          <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
            <thead>
            <tr>
              <th>角色名</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>

            <tr v-for="item in tableData" :key="item.roleId">
              <td>{{item.roleName}}</td>
              <td>
                <div class="tpl-table-black-operation">
                  <a href="javascript:;" @click="$router.push('/main/sys/role/edit/'+item.roleId)" v-if="hasPermission('edit')">
                    <i class="am-icon-edit"></i> 编辑
                  </a>

                  <a href="javascript:;" @click="$router.push('/main/sys/role/optPermission/'+item.roleId)" v-if="hasPermission('permission')">
                    <i class="am-icon-gear"></i>设置操作权限
                  </a>

                  <a href="javascript:;" class="tpl-table-black-operation-danger" @click="$router.push('/main/sys/role/users/'+item.roleId)" v-if="hasPermission('users')">
                    <i class="am-icon-recycle"></i>权限回收
                  </a>

                  <a  href="javascript:;" class="tpl-table-black-operation-danger" @click="del(item.roleId ,0)" v-if="hasPermission('recycle')">
                    <i class="am-icon-trash"></i>删除
                  </a>

                </div>
              </td>
            </tr>
            <!-- more data -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  </div>
</template>

<script>
import io from '../../lib/io'

    export default{
        data:function(){
          return {
            tableData:[],
            query:{},
            searchConfig:{}
          }
        },
        mounted:function(){
          $(window).smoothScroll()
        },
        created:function(){
          this.loadTableData(this.pageNo);
        },
        methods:{
          del:function(roleId){
            const _this = this ;
            _this.$confirm('你确定要删除？' ,
            function(){
              io.post(io.apiAdminDelRole,{roleId},function(ret){
                if(ret.success){
                  _this.$toast('OK')
                  _this.loadTableData()
                }else{
                  _this.$alert(ret.desc)
                }
              })
            });

          },
          loadTableData:function(pageNo){
            var _this = this
            io.post(io.apiAdminRoleList,$.extend({},_this.query),function(ret){
              if(ret.success){
                _this.tableData = ret.data
              }else{
                _this.$alert(ret.desc)
              }
            })
          }
        }
    }
</script>
