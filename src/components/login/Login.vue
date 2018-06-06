<template>
    <div class="login" @keydown="keydown">
        <v-nav ref="nav" :noTab='true' :noLogin='true' />
        <el-carousel height="500px">
            <el-carousel-item>
                <div class="item-bg">
                    <img class="bg" src="../../assets/img/b-bg.png" alt="">
                    <div class="item-img">
                        <img src="../../assets/img/b-1.png" alt="">
                    </div>
                </div>
            </el-carousel-item>
        </el-carousel>
        <el-row class="login-div">
            <div class="login-box">
                <div class="login-btn">
                    欢迎登录教师工作模块
                </div>
                <el-form :model="loginForm" :rules="rules" ref="loginForm">
                    <el-form-item prop="phone">
                        <el-input placeholder="请输入用户名/手机号" v-model="loginForm.phone" autocomplete="off">
                            <svg slot="prefix" class="icon" aria-hidden="true">
                                <use xlink:href="#icon-wode"></use>
                            </svg>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="请输入密码" v-model="loginForm.password" autocomplete="off">
                            <svg slot="prefix" class="icon" aria-hidden="true">
                                <use xlink:href="#icon-Secret"></use>
                            </svg>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="captcha" v-if="needCaptcha">
                        <el-col :span="16">
                            <el-input placeholder="请输入验证码" v-model="loginForm.captcha">
                            </el-input>
                        </el-col>
                        <el-col :span="8">
                            <img :src="'data:image/jpeg;base64,'+captImg" @click="getCaptcha" />
                        </el-col>
                    </el-form-item>
                    <div class="el-form-remember">
                        <el-checkbox v-model="remember">记住密码</el-checkbox>
                    </div>
                    <div class="el-form-btn">
                        <el-button type="primary" @click="login">登录</el-button>
                    </div>
                </el-form>
            </div>
        </el-row>
        <v-footer></v-footer>
    </div>
</template>
<script>
import VNav from '../common/Nav.vue'
import VFooter from '../common/Footer.vue'
import storage from 'lib/storage'
import io from 'lib/io'
import md5 from 'js-md5'
import {mapGetters} from 'vuex'
export default {
    components: {
        VNav,
        VFooter
    },
    computed: {...mapGetters(['loginSuccess','needCaptcha'])},
    watch: {
        loginSuccess(val){
            if(val){
                this.$router.push(this.backUrl||'/')
            }
        },
        needCaptcha(val){
            if(val){
                this.getCaptcha()
            }
        }
    },
    data() {
        return {
            backUrl:this.$route.query.backUrl,
            loginForm: {
                phone: '',
                password: '',
                captcha: '',
                token:''
            },
            remember: true,
            rules: {
                phone: [
                    { required: true, message: '请输入账号', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                captcha: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ]
            },
            showCaptcha: false,
            captImg: '',
            rem: storage.getRemember()
        }
    },
    created () {
      this.$store.commit('changeLoginSuccess')
    },
    methods: {

        keydown(e) {
            if (e.keyCode == '13') {
                this.login()
            }
        },
        async login() {
            // if (!(/^1[34578]\d{9}$/.test(this.form.phone))) {
            //     this.$message('手机号码有误')
            //     return false
            // };
            this.$refs.loginForm.validate(async (valid) => {
                if (valid) {
                    let password = ''
                    if (this.rem && this.rem.remember) {
                        password = this.loginForm.password
                    } else {
                        password = md5(this.loginForm.password)
                    }
                    try {
                    this.$store.dispatch('login', {
                        ...this.loginForm,
                        password: password,
                    });
                    } catch (error) {
                        console.log('xd')
                    }

                    // if (data.data.success) {
                    //     if (this.remember) {
                    //         storage.setRemember(JSON.stringify({ ...this.form, remember: this.remember, password: password }))
                    //     }
                    //     this.afterLoginSuccess(data.data)
                    // } else {
                    //     await this.checkNeedCaptcha()
                    //     this.$message(data.data.message)
                    // }
                }
            });
        },
        // afterLoginSuccess(data) {
        //     storage.setAccessToken(data.accessToken)
        //     storage.setCurrentUserInfo(JSON.stringify(data));
        //     this.$parent.$refs.head.setLogin();
        //     let toUrl = '/perfectinfo'
        //     if (data.isFirst === 0) {
        //         toUrl = "/homepage"
        //     }
        //     this.$router.push({ path: toUrl, query: { userId: data.userId, type: data.type } })
        // },
        async getCaptcha() {
            let { data } = await io.post6(io.generCaptcha)
            if (data.success) {
                this.captImg = data.data.img
                this.loginForm.token = data.data.token
            }
        },
        // async checkNeedCaptcha() {
        //     let { data } = await checkNeedCaptcha({ ...this.form, account: this.form.phone })
        //     if (data.success) {
        //         if (data.data) {
        //             this.getCaptcha()
        //             this.showCaptcha = true
        //         }
        //         return data.data
        //     } else {
        //         return false
        //     }
        // }
    }
}
</script>
<style lang="stylus">
    .el-form-remember
        .el-checkbox__label
            font-size 12px
        .el-checkbox__input.is-checked+.el-checkbox__label
            color #00A8Eb 
    .el-form-item
        .el-input--prefix
            .el-input__inner
                padding-left:49px;
            .el-input__prefix
                left 13px 
                padding-top:8px;
                hieght:40px;
                .icon
                    font-size 24px
                    color #55CAB0
</style>
<style lang="stylus" scoped>
.login
    // height 500px
    // background url('../../assets/img/login-banner.png')
    position relative
    .item-bg
        width 100%
        position absolute
        height 100%
        img.bg
            height 100%
            position absolute
            width 100%
        .item-img
            position absolute
            bottom -3px
            width 80%
            min-width 1200px
            margin auto
            z-index 11
            left 50%
            transform translateX(-50%)
.login-div
    width 80%
    min-width 1200px
    margin auto
    position absolute
    z-index 2
    top 80px
    left 50%
    transform translateX(-50%)
    .login-box
        width 400px
        height 400px
        box-sizing border-box
        background-color rgba(255,255,255,.8)
        margin-top 50px
        float right 
        position relative
        border-radius  6px
        .login-btn
            font-size 20px
            padding-left 40px
            padding-top 30px
        .active
            background-color rgba(255,255,255,.8)
        .el-form
            width 100%
            height 100%
            padding 20px 40px 40px 40px
            box-sizing border-box
            .el-form-item
                margin-bottom 0px
                margin-top 25px
                .el-col-16
                   	width 200px
                .el-col-8
                   	width 110px
                   	height 40px
                   	float right
                		img
                			width 110px
                			height 40px
      
            .el-form-item:first-child
            		margin-top 0px
            .el-form-remember    
                margin-top 17px
                
                a
                    font-size 12px
                    color #00A8Eb
                    padding 4px 0 0 0
                    text-decoration underline 
                    float right   	
    		.el-form-btn
    				height 50px
    				position:absolute;
    				left:40px;
    				bottom:40px;
    				button
        		        width 320px
        		        height 50px
        		        background-image: linear-gradient(45deg,#6ad2dd 0%,#52caaf 100%);
		                border-radius: 4px;
		                border 0 none
		                font-size 20px
</style>


