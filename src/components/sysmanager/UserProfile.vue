<template>
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12" >
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">账号设置</div>
      </div>
      <div class="widget-body am-fr">
        <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
          <fieldset>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                用户名
              </label>
              <div class="am-u-sm-9 input-field">
                {{formData.username}}
              </div>
            </div>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                登录密码
              </label>
              <div class="am-u-sm-9 input-field">
                ***********<a class="am-btn am-btn-link" @click="changePassword">修改</a>
              </div>
            </div>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>姓名
              </label>
              <div class="am-u-sm-9 input-field">
                {{formData.realName}}
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>电话号码
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="text" class="am-form-field" placeholder="请输入手机号码"  data-validation-message="请输入正确的手机号码" pattern="^1((3|5|8){1}\d{1}|70)\d{8}$" required v-model="formData.phoneNo"/>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                业务组
              </label>
              <div class="am-u-sm-9 input-field">
                {{formData.busTeamName}}
              </div>
            </div>


            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                头像
              </label>
              <div class="am-u-sm-9 am-form-file input-field">
                <file-upload extensions="jpg,png" @uploaded="uploadAvatar">
                  <img class="am-margin-top" :src="formData.avatarUrl">
                </file-upload>
              </div>
            </div>

            <div class="am-form-group">
              <div class="am-u-sm-9 am-u-sm-push-3">

                <button type="submit" class="am-btn am-btn-primary">提交</button>
              </div>
            </div>
            </fieldset>
        </form>
      </div>
    </div>
    <window ref="setupPasswordWin" title="修改密码">
      <form class="am-form am-form-horizontal">
        <div class="am-form-group">
          <label class="am-u-sm-2 am-form-label">原密码</label>
          <div class="am-u-sm-10">
            <input id="oldPasswordInput" type="password" placeholder="请输入您原来的密码" required>
          </div>
        </div>
        <div class="am-form-group">
          <label class="am-u-sm-2 am-form-label">新密码</label>
          <div class="am-u-sm-10">
            <input id="newPasswordInput" type="password" placeholder="请输入您的新密码(6-16位)" required>
          </div>
        </div>

        <div class="am-form-group">
          <div class="am-u-sm-12 am-u-sm-centered">
            <button type="button" class="am-btn am-btn-default" @click="saveNewPassword">确定</button>
          </div>
        </div>
      </form>
    </window>
  </div>

</template>

<script>

import md5 from 'js-md5'

import storage from '../../lib/storage'
import io from '../../lib/io'

    export default{
        data(){
            var userInfo  = storage.getCurrentUserInfo()
            return{
                formData:userInfo
            }
        },
        created:function(){
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
            io.post(io.apiAdminSaveOrUpdateSysUser,_this.formData,
            function(ret){
              complete.call()
              _this.$toast('OK')
              _this.$root.refreshUserInfo()
            },
            function(){
              complete.call()
              _this.$alert('请求服务器失败')
            })
          },
          uploadAvatar:function(info){
            this.formData.avatarUrl = info.url
          },
          changePassword:function(){
            $('#oldPasswordInput').val('')
            $('#newPasswordInput').val('')
            this.$refs.setupPasswordWin.show()
          },
          saveNewPassword:function(){
            var oldPassword = $('#oldPasswordInput').val()
            var newPassword = $('#newPasswordInput').val()

            if(!oldPassword){
              this.$alert('请输入原密码')
              return
            }

            if(!newPassword){
              this.$alert('请输入新密码')
              return
            }

            if(!/.{6,16}/.test(newPassword)){
              this.$alert('新的密码长度为6-12位')
              return
            }
            var _this = this
            io.post(io.apiAdminChangeMyPassword,{
              oldPassword:md5(oldPassword),newPassword:md5(newPassword)
            },
            function(ret){
              if(ret.success){
                _this.$toast('OK')
                _this.$refs.setupPasswordWin.close()
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
