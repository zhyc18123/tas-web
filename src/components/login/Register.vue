<template lang="pug">
    el-form(ref="reginsterForm" id="t-reginsterForm" )
            el-form-item(prop="phone")
                el-input(placeholder="请输入手机号码" v-model="form.phone" autocomplete="off")
            el-form-item(prop="captcha" )
                el-col(:span="16" )
                  el-input(placeholder="请输入图形验证码" v-model="captcha")
                el-col(:span="8")
                  img(:src="'data:image/jpeg;base64,'+captImg" @click="$parent.getCaptcha()" class="t-capt")
            el-form-item(prop="sms" )
                el-col(:span="16")
                  el-input(placeholder="请输入短信验证码" v-model="form.sms")
                el-col(:span="8")
                  el-button(v-if="showSend" @click="sendLoginSms") 发送验证码
                  el-button(v-else @click='false') {{restSecond}}秒后重新发送
            el-form-item(prop="password" )
                el-col(:span="16")
                    el-input(type="password" placeholder="请输入密码" v-model="form.password" autocomplete="off")
            el-form-item(prop="cPassword")
                el-col(:span="16")
                    el-input(type="password" placeholder="请确认密码" v-model="form.cPassword" autocomplete="off")
            .el-form-agreement()
                el-checkbox(v-model="agreement") 我已阅读并接受
                span(@click="$parent.changeAgreement()") 誉优教师成长平台协议
            .el-form-btn
                el-button(type="primary" @click="reginster") 注册
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { register, sendLoginSms } from 'service/login.ts'
import md5 from 'js-md5'
import storage from 'assets/js/storage'
@Component({
    name: 'reginster',
    props: ['captImg', 'token']
})
export default class reginster extends Vue {
    captcha: string = ''
    showSend:boolean=true
    restSecond:number=60
    inter:any
    timer:any
    form: any = {
        phone: '',
        sms: '',
        password: '',
        cPassword: '',
    }
    agreement: boolean = true
    created() {
    }
    mounted() {
    }
    async sendLoginSms() {
        if(!(/^1[34578]\d{9}$/.test(this.form.phone))){
            this.$message('手机号码有误')
            return false
        };
        if (!this.form.phone) {
            this.$message('手机号不能为空')
            return
        }
        if (!this.captcha) {
            this.$message('图片验证码不能为空')
            return
        }
        this.showSend=false
        this.inter=setInterval(()=>{
            if(this.restSecond>0){
            this.restSecond--
            }else{
                this.restSecond=60
                this.showSend=true
                clearInterval(this.inter)
            }
        },1000)
        let { data } = await sendLoginSms({ phone: this.form.phone, captcha: this.captcha, token: (this as any).token })
        if (data.success) {
			if(data.data.success){
            this.$message('发送成功')
			}else{
                this.timer=setTimeout(() => {
                this.restSecond=60
                this.showSend=true
                clearInterval(this.inter)
                clearInterval(this.timer)
                }, 2000);
				this.$message(data.data)
			}
        }
    }
    async reginster() {
        if(!this.agreement){
            this.$message('请同意誉优教师成长平台协议')
            return
        }
        if (!this.form.phone) {
            this.$message('手机号不能为空')
            return
        }
        if(!(/^1[34578]\d{9}$/.test(this.form.phone))){
            this.$message('手机号码有误')
            return false
        };
        if (!this.form.sms) {
            this.$message('短信验证码不能为空')
            return
        }
        if (!this.form.password) {
            this.$message('密码不能为空')
            return
        }
        if (!this.form.cPassword) {
            this.$message('确认密码不能为空')
            return
        }
        if(this.form.password!==this.form.cPassword){
            this.$message('两次输入的密码不相同')
            return
        }
        let password=md5(this.form.password)
        let cPassword=md5(this.form.cPassword)
        let {data}=await register({...this.form,password,cPassword})
        if(data.success){
            if(data.data.success){
            this.$message('注册成功');
            (this.$parent as any).afterLoginSuccess(data.data)
            }else{
                this.$message(data.data.message);
                (this.$parent as any).getCaptcha()
            }
        }
    }
}
</script>
<style lang="stylus">
    .el-form-agreement
        .el-checkbox__label
            font-size 12px
        
</style>

<style lang="stylus" scoped>
#t-reginsterForm
        padding 30px 40px
        box-sizing border-box
.el-form
        width 100%
        height 100%
        .el-form-item
            margin-bottom 0
            margin-top 10px
        	.el-col-16
            	width 200px
           	.el-col-8
           		width 110px
           		height 40px
           		border solid 1px #d2eed1
           		border-radius 4px
           		float right
           		.el-button
                         
                    display block
                    color #52caaf
           			width:110px
           			padding 12px 0
           			text-align center
           			border solid 1px #d2eed1
           			color #52caaf     
           		img
           			width 110px
           			height 40px
                    
        .el-form-item:first-child
        	margin 0
        .el-form-agreement
            height 16px
            font-size 12px
            margin-top 10px
            span
                font-size 12px
                padding-left 16px
                text-decoration underline
                color #00a8eb
                cursor pointer
        .el-form-btn
        	height 50px
        	margin-top 14px
        	button
        	    width 320px
        	    height 50px
        	    background-image: linear-gradient(45deg,#6ad2dd 0%,#52caaf 100%);
        	    border 0 none
        	    font-size 20px
		.t-capt
            cursor pointer
				
				

</style>