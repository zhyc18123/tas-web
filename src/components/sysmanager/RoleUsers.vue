<template>
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12" >
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">权限回收</div>
        <div class="widget-function am-fr">
          <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
        </div>
      </div>
      <div class="widget-body am-fr">
        <div class="am-u-sm-12">
          <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
            <thead>
            <tr>
              <th>用户名</th>
              <th>姓名</th>
              <th>所在区域</th>
              <th>所在业务组</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>

            <tr v-for="item in users" :key="item.userId">
              <td>{{item.username}}</td>
              <td>{{item.realName}}</td>
              <td>{{item.areaTeamName}}</td>
              <td>{{item.busTeamName}}</td>
              <td>
                <div class="tpl-table-black-operation">
                  <a href="javascript:;" class="tpl-table-black-operation-danger" @click="recycle(item.userId)">
                    <i class="am-icon-recycle"></i> 回收
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
</template>
<style scoped>
</style>
<script>
import io from '../../lib/io'
    export default{
        data(){
            return{
                users:[]
            }
        },
        created:function(){
          this.loadRoleUsers()
        },
        methods:{
          recycle:function(userId){
            var _this = this
            io.post(io.apiAdminRecycleRole,{ userId : userId , roleId : _this.$params('roleId') },
            function(ret){
              if(ret.success){
                _this.$toast('OK')
                _this.loadRoleUsers()
              }else{
                _this.$alert(ret.desc)
              }
            })
          },
          loadRoleUsers:function(){
            var _this = this
            io.post(io.apiAdminRoleUserList,{ roleId :_this.$params('roleId') },
            function(ret){
              if(ret.success){
                _this.users = ret.data

              }else{
                _this.$alert(ret.desc)
              }
            },
            function(){
              _this.$alert('请求服务器失败')
            })
          }
        }
    }
</script>
