<template>
  <div class="am-g tpl-g">
    <div class="tpl-login">
      <div class="tpl-login-content">
        <div class="tpl-login-logo">
        </div>
        <form class="am-form tpl-form-line-form">
          <div class="am-form-group">
            <input type="text" class="tpl-form-input"  placeholder="请输入账号" v-model="formData.username" @blur="checkNeedCaptcha">
          </div>
          <div class="am-form-group">
            <input type="password" class="tpl-form-input"  placeholder="请输入密码" v-model="formData.password" >
          </div>
          <div class="am-form-group am-g-collapse" v-if="showCaptchaCode">
            <div class="am-u-sm-8">
              <input type="text" class="tpl-form-input"  placeholder="请输入验证码" v-model="formData.captchaCode" >
            </div>
            <div class="am-u-sm-4 tpl-captcha-code">
              <img :src="captchaCodeUrl" @click="refreshCaptchaCode"/>
            </div>
          </div>
          <div class="am-form-group tpl-login-remember-me" >
            <input id="remember-me" type="checkbox" v-model="rememberMe">
            <label for="remember-me">
              记住密码
            </label>
          </div>

          <div class="am-form-group">
            <button type="button" class="am-btn am-btn-primary  am-btn-block tpl-btn-bg-color-success  tpl-login-btn" @click="login">提交</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped>

  .tpl-captcha-code img{
    height:30px;
  }

</style>
<script>
import md5 from 'js-md5'
import io from '../../lib/io'
import storage from '../../lib/storage'

const PASSWORD_PLACEHOLDER = '****************' // 16

    export default{
        name:'login',
        data:function(){
          return {
            formData:{},
            rememberMe : true,
            captchaCodeUrl : io.apiCaptcha,
            showCaptchaCode : false
          }
        },
        created:function(){
          var loginInfo  = storage.getLogin()
          if(loginInfo){
            this.rememberMe = loginInfo.rememberMe
            if(this.rememberMe == true ){
              this.formData.username = loginInfo.username
              this.formData.password = PASSWORD_PLACEHOLDER
              this.localPassword = loginInfo.password
              this.formData.captchaCode = loginInfo.captchaCode
            }
          }
        },
        methods:{
          login:function(e){
            var _this  = this
            var $submitBtn = $(e.target)
            $submitBtn.attr("disabled" ,"disabled" )
            var complete = function(){
               $submitBtn.removeAttr("disabled")
            }

            if( !this.formData.username ){
              this.$alert('请输入帐号');
              complete();
              return ;
            }

            if( !this.formData.password ){
              this.$alert('请输入密码');
              complete();
              return ;
            }

            var password ;

            if( PASSWORD_PLACEHOLDER == this.formData.password ){
              password = this.localPassword
            }else{
              password = md5(this.formData.password)
            }

            io.post(io.apiAdminLogin,{
              username : this.formData.username,
              password : password,
              captchaCode :this.formData.captchaCode                     //添加验证码
            },function(ret){
              $submitBtn.removeAttr("disabled")
              if(ret.success){
                if( _this.rememberMe ) {
                  storage.setAccessToken(ret.data.accessToken)
                  storage.setLogin({
                    username:_this.formData.username,
                    password:password,
                    rememberMe : _this.rememberMe,
                    userId : ret.data.user.userId ,
                    successLogin :true ,
                    loginAt : new Date().getTime()
                  })
                  storage.setCurrentUserInfo(ret.data.user)

                  _this.$router.push('/main/index')
                }
              }else{
                _this.$alert(ret.desc ||  '登录失败' )
              }
            })
          },
          checkNeedCaptcha:function(){
            if(!this.formData.username){
              return ;
            }
            var _this = this
            io.post(io.apiAdminCheckNeedCaptcha,{
              username : this.formData.username
            },function(ret){
              if(ret.success){
                _this.showCaptchaCode = ret.data
              }else{

              }
            })
          },
          refreshCaptchaCode:function(){
            this.captchaCodeUrl = io.apiCaptcha + '?t=' + (new Date().getTime())
          }
          }
    }
</script>
