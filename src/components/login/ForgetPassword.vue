<template lang='pug'>
	.t-forget
		.t-forget-bg
		.t-form-content
			.t-form-header 
				svg(class="icon" aria-hidden="true")
					use(xlink:href="#icon-wangjimima")
				span 忘记密码
			el-form(:model="form" :rules="rules" ref="forgetForm")
				.t-form-cue
					svg(class="icon" aria-hidden="true")
						use(xlink:href="#icon-tishi")
					span(v-text="cue")
				el-form-item(prop="phone")
					el-input( placeholder="请输入你注册的手机号" v-model="form.phone" autocomplete="off")
				el-form-item()
					el-col(:span="16")
						el-input(placeholder="请输入图形验证码" v-model="captcha")
					el-col(:span="8")
						img(:src="'data:image/jpeg;base64,'+captImg" @click="getCaptcha()" class="t-showSend")
				el-form-item(prop="sms")
					el-col(:span="16")
						el-input(placeholder="请输入短信验证码" v-model="form.sms")
					el-col(:span="8")
						el-button(v-if="showSend" @click="sendLoginSms" class="t-showSend") 发送验证码
						el-button(v-else @click='false') {{restSecond}}秒后重新发送
				el-form-item(prop="password")
					el-col(:span="16")
						el-input(type="password" placeholder="请输入新密码" v-model="form.password")
				el-form-item(prop="cPassword")
					el-col(:span="16")
						el-input(type="password" placeholder="请确认新密码" v-model="form.cPassword")
				.t-form-btn(align="center")
					el-button(type="success" class="t-form-submit" @click="resetPass") 提交
					el-button(plain class="t-form-cancel" @click="$router.go(-1)") 取消
		
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { generCaptcha, sendLoginSms,resetPass } from 'service/login.ts'
import md5 from 'js-md5'
import { setTimeout } from 'timers';
@Component({
	name: 'forget',

})
export default class forget extends Vue {
	cue: any = "提示消息"
	captImg: string = ''
	token: string = ''
	captcha: string = ''
	showSend: boolean = true
	restSecond: number = 60
	inter:any
    timer:any
	form: any = {
		phone: '',
		sms: '',
		password: '',
		cPassword: '',
	}
	rules: Object = {
		phone: [
			{ required: true, message: '请输入账号', trigger: 'blur' }
		],
		sms: [
			{ required: true, message: '请输入短信验证码', trigger: 'blur' }
		],
		password: [
			{ required: true, message: '请输入密码', trigger: 'blur' }
		],
		cPassword: [
			{ required: true, message: '请确认新密码', trigger: 'blur' }
		],
	}
	created() {
		this.getCaptcha()
	}
	async getCaptcha() {
		let { data } = await generCaptcha()
		if (data.success) {
			this.captImg = data.data.img
			this.token = data.data.token
		}
	}
	async sendLoginSms() {
		if (!this.form.phone) {
			this.$message('手机号不能为空')
			return
		}
		if (!(/^1[34578]\d{9}$/.test(this.form.phone))) {
			this.$message('手机号码有误')
			return false
		};
		if (!this.captcha) {
			this.$message('图片验证码不能为空')
			return
		}
		this.showSend = false
		this.inter = setInterval(() => {
			if (this.restSecond > 0) {
				this.restSecond--
			} else {
				this.restSecond = 60
				this.showSend = true
				clearInterval(this.inter)
			}
		}, 1000)
		let { data } = await sendLoginSms({ phone: this.form.phone, captcha: this.captcha, token: this.token })
		if (data.success) {
			if(data.data.success){
			this.$message('发送成功')
			}else{
				this.timer=setTimeout(()=>{
					this.restSecond = 60
					this.showSend = true
					clearInterval(this.inter)
					clearInterval(this.timer)
				},2000)
				this.$message(data.data)
			}
		}
	}
    async resetPass() {
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
        let {data}=await resetPass({...this.form,password,cPassword})
        if(data.success){
            if(data.data.success){
            this.$message('重置成功');
			this.$router.go(-1)
            }else{
                this.$message(data.data.message)
            }
        }
    }
}
</script>
<style lang='stylus'>
	.t-forget
		.el-form
			.el-form-item
				.el-input__inner
					height 45px
</style>
<style lang='stylus' scoped>
.t-forget
	background #f5f8f9
	.t-forget-bg
		width 100%
		height 216px
		background-image: linear-gradient(45deg, 
		#72d9ea 0%, 
		#47c7ab 21%, 
		#6ed19e 80%, 
		#a9dfa6 90%, 
		#e4edad 100%);
	.t-form-content
		width 1200px
		height 770px
		background #fff
		border solid 1px #dadada
		margin 0 auto
		margin-top -166px
		.t-form-header
			width 100%
			height 98px
			padding 36px 0 22px 43px
			box-sizing border-box
			background #f9f9f9
			.icon
				color #6BD1DF
				font-size 54px
				float left
				margin-top -7px
				margin-left -7px
			span
				float left
				font-size 24px
				padding-top 12px
				padding-left 9px
				color #333
		.el-form
			border-top 2px solid #66D2D5
			padding 3px 373px 0 373px
			.el-form-item
				height 45px
				line-height 45px
				.el-input
					height 45px
				.el-col-16
					width 328px
					height 45px
				.el-col-8
					width 110px
					height 45px
					float right
					img
						width 110px
						height 45px
						border 1px solid #d2eed1
					.el-button
						width 110px
						height 45px
						padding-left 0
						padding-right 0
						border solid 1px #4BC6AA
						color #4BC6AA
					.t-showSend
						cursor pointer
			.t-form-cue
				height 86px
				color #FF7900
				line-height 86px
				margin-left -10px
				.icon
					font-size 22px
					padding-top 32px
					float left
				span
					font-size 12px
					float left
					padding-left 12px
			.t-form-btn
				margin 0 auto
				margin-top 106px
				width 296px
				.el-button
					width 120px
					height 50px
					font-size 18px
				.t-form-submit
					float left
					background-color #2BBC61
				.t-form-cancel
					float right
					border-color #2BBC61
					color #2BBC61
				.t-form-cancel:hover
					background-color #fff
						
</style>