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
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>姓名
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="text" name="name" class="am-form-field" placeholder="输入姓名" required v-model="formData.name">
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                籍贯
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <selected v-model="formData.location" >
                  <select data-am-selected  required>
                    <option></option>
                    <option value="云浮">云浮</option>
                    <option value="广州">广州</option>
                    <option value="佛山">佛山</option>
                  </select>
                </selected>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>出生日期
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <date-picker v-model="formData.birthday" >
                  <input type="text" class="am-form-field" placeholder="出生日期" data-am-datepicker readonly  required v-model="formData.birthday" >
                </date-picker>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                年龄
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="number" name="age" class="am-form-field" placeholder="输入年龄  18-120" min="18" max="120" required v-model="formData.age"/>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                性别
              </label>
              <div class="am-u-sm-9 input-field">
                <label class="am-radio-inline">
                  <input type="radio"  value="1" name="sex" required v-model="formData.sex" >  男
                </label>
                <label class="am-radio-inline">
                  <input type="radio" value="2" name="sex" v-model="formData.sex"> 女
                </label>
                <label class="am-radio-inline">
                  <input type="radio" value="3" name="sex" v-model="formData.sex"> 其他
                </label>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                爱好
              </label>
              <div class="am-u-sm-9 am-margin-top-xs input-field">
                <label class="am-checkbox-inline">
                  <input type="checkbox" value="橘子" name="hobby" minchecked="2" maxchecked="4" v-model="formData.hobby"> 橘子
                </label>
                <label class="am-checkbox-inline">
                  <input type="checkbox" value="苹果" name="hobby" v-model="formData.hobby"> 苹果
                </label>
                <label class="am-checkbox-inline">
                  <input type="checkbox" value="菠萝" name="hobby" v-model="formData.hobby"> 菠萝
                </label>
                <label class="am-checkbox-inline">
                  <input type="checkbox" value="芒果" name="hobby" v-model="formData.hobby"> 芒果
                </label>
                <label class="am-checkbox-inline">
                  <input type="checkbox" value="香蕉" name="hobby" v-model="formData.hobby"> 香蕉
                </label>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                手机号码
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="text" class="am-form-field" placeholder="输入手机号" data-validation-message="输入正确的手机号码" pattern="^1((3|5|8){1}\d{1}|70)\d{8}$" required v-model="formData.phoneNo"/>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                头像
              </label>
              <div class="am-u-sm-9 am-form-file input-field">
                <file-upload extensions="jpg,png" @uploaded="uploadAvatar">
                  <img class="am-margin-top" :src="formData.avatar">
                </file-upload>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                个人介绍
              </label>
              <div class="am-u-sm-9 input-field">
                <!--<textarea name="intro" rows="10" minlength="10" maxlength="100" v-model="formData.intro"></textarea>-->
                <editor v-model="formData.intro"></editor>
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
<style scoped>
</style>
<script>
import io from '../../lib/io'
    export default{
        name:'user-form',
        data(){
            return{
                formData:{
                  name : '攻城狮',
                  location:'佛山',
                  //birthday:'1999-09-09',
                  age:28,
                  sex:1,
                  hobby:['香蕉','苹果'],
                  phoneNo:'18312421977',
                  avatar:require('../../assets/img/empty.jpg'),
                  intro:'呵呵,我是地球最闷骚的程序员'
                }
            }
        },
        created:function(){
         var userId  = this.$params('userId')
         if(userId){
          var _this = this
          io.get(io.getUser,{ userId : userId },
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
            io.get(io.saveUser,_this.formData,
            function(ret){
              complete.call()
              _this.$toast('OK')
              _this.$router.push('/main/user/list')
            },
            function(){
              complete.call()
              _this.$alert('请求服务器失败')
            })

          },
          uploadAvatar:function(info){
            this.formData.avatar = info.url
          }
        }
    }
</script>
