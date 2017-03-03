<template>
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12" >
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">角色信息</div>
        <div class="widget-function am-fr">
          <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
        </div>
      </div>
      <div class="widget-body am-fr">
        <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
          <fieldset>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>角色名
              </label>
              <div class="am-u-sm-9 input-field">
                <label class="am-checkbox-inline" v-for="item in roles" :key="item.roleId">
                  <input type="checkbox" :value="item.roleId" name="roleIds" minchecked="1" required  v-model="formData.roleIds"> {{item.roleName}}
                </label>
              </div>
            </div>

            <div class="am-form-group">
              <div class="am-u-sm-9 am-u-sm-push-3">
                <button type="submit" class="am-btn am-btn-primary">保存</button>
              </div>
            </div>
            </fieldset>
        </form>
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
                roles:[],
                formData:{
                  userId : this.$params('userId'),
                  roleIds:[]
                }
            }
        },
        created:function(){
          this.loadRoles()
          this.loadUserRoles()
        },
        mounted:function(){
          var _this = this ;
          $('#' + this.id ).validator({
            onValid: function(validity) {
              $(validity.field).closest('.input-field').find('.am-alert').hide();
            },
            onInValid: function(validity) {
              var $field = $(validity.field);
              var $group = $field.closest('.input-field');
              var $alert = $group.find('.am-alert');
              // 使用自定义的提示信息 或 插件内置的提示信息
              var msg = $field.data('validationMessage') || this.getValidationMessage(validity);

              if (!$alert.length) {
                $alert = $('<div class="am-alert am-alert-danger"></div>').hide().
                appendTo($group);
              }

              $alert.html(msg).show();
            },
            submit:function(e){
              e.preventDefault();
              var $submitBtn = $('button[type=submit]',e.target);
              $submitBtn.attr("disabled" ,"disabled" )
              _this.$showLoading()
              var formValidity = this.isFormValid();
              var complete = function(){
                _this.$hiddenLoading()
                $submitBtn.removeAttr("disabled" ,"disabled" )
              }
              if(formValidity){
                _this.save(complete);
              }else{
                complete.call()
              }
            }
          });
        },

        methods:{
          save:function(complete){
            var _this = this
            io.post(io.apiAdminSaveUserRole,_this.formData,
            function(ret){
              complete.call()
              _this.$toast('OK')
              _this.$router.push('/main/sys/user/list')
            },
            function(){
              complete.call()
              _this.$alert('请求服务器失败')
            })
          },
          loadRoles:function(){
            var _this = this
            io.post(io.apiAdminRoleList,{},
            function(ret){
              if(ret.success){
                _this.roles = ret.data

              }else{
                _this.$alert(ret.desc)
              }
            },
            function(){
              _this.$alert('请求服务器失败')
            })
          },
          loadUserRoles:function(){
            var _this = this
            io.post(io.apiAdminUserRoleList,{ userId:_this.formData.userId },
            function(ret){
              if(ret.success){
                _this.formData.roleIds = ret.data.map(function(role){
                  return role.roleId
                })

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
