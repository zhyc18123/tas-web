<template>
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12" >
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">用户信息</div>
        <div class="widget-function am-fr">
          <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
        </div>
      </div>
      <div class="widget-body am-fr">
        <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
          <fieldset>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>用户名
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="text"  class="am-form-field" placeholder="请输入用户名" required v-model="formData.username">
              </div>
            </div>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>姓名
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="text"  class="am-form-field" placeholder="请输入姓名" required v-model="formData.realName">
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
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>用户角色
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <select2 required v-model="formData.userType" >
                  <option value="">请选择</option>
                  <option value="0">誉优</option>
                  <option value="1">区域</option>
                  <option value="2">业务组</option>
                </select2>
              </div>
            </div>

            <div class="am-form-group" v-if="formData.userType == 1 || formData.userType == 2">
              <label class="am-u-sm-3 am-form-label">
                区域组
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <select2 name="areaTeam" v-model="formData.areaTeamId" :options="areaTeams">
                  <option value="">请选择</option>
                </select2>
              </div>
            </div>

            <div class="am-form-group" v-if="formData.userType == 2" >
              <label class="am-u-sm-3 am-form-label">
                业务组
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <select2 name="busTeam" v-model="formData.busTeamId" :options="busTeams" >
                  <option value="">请选择</option>
                </select2>
              </div>
            </div>


            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                头像
              </label>
              <div class="am-u-sm-9 am-form-file input-field">
                <file-upload extensions="jpg,png" @uploaded="uploadAvatar">
                  <img class="am-margin-top am-radius" :src="formData.avatarUrl" style="width:168px;height:168px">
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
  </div>
</template>

<script>
import io from '../../lib/io'
    export default{
        data(){
            return{
                formData:{
                  areaTeamId:'',
                  busTeamId:'',
                  userType:''
                }
            }
        },
        created:function(){
         var userId  = this.$params('userId')
         if(userId){
          var _this = this
          io.post(io.apiAdminSysUserDetail,{ userId : userId },
            function(ret){
              if(ret.success){
                _this.formData = ret.data
              }
            },
            function(){
              _this.$alert('请求服务器失败')
          })
         }


        },
        computed:{
          areaTeams : function(){
            var options =  ( ( this.formData.userType == 1 || this.formData.userType == 2 ) ? this.$root.config.areaTeams : [] )
            .map(function(item){
              return {value:item.areaTeamId,text:item.name}
            })
            return options
          },
          busTeams : function(){
            var options =  ( ( this.formData.userType == 2 && this.formData.areaTeamId  ) ? ( this.$root.config.groupBusTeams[this.formData.areaTeamId] || [] )  : [] )
            .map(function(item){
              return {value:item.busTeamId,text:item.name}
            })
            return options
          }
        },
        mounted:function(){
          var _this = this ;
          $('#' + this.id ).validator({
            validate:function(validity){
              if($(validity.field).is('select[name=busTeam]')){
                if(_this.formData.userType == 2 &&  !$(validity.field).val() ){
                  validity.valid = false
                  validity.valueMissing=true
                }
              }

              if($(validity.field).is('select[name=areaTeam]')){
                if( ( _this.formData.userType == 1 || _this.formData.userType == 2 ) &&  !$(validity.field).val() ){
                  validity.valid = false
                  validity.valueMissing=true
                }
              }

            },
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
              if(ret.success){
                _this.$toast('OK')
                _this.$router.push('/main/sys/user/list')
              }else{
                _this.$alert(ret.desc)
              }

            },
            function(){
              complete.call()
              _this.$alert('请求服务器失败')
            })
          },
          uploadAvatar:function(info){
            this.formData.avatarUrl = info.url
          }
        }
    }
</script>
