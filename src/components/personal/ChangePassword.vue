<template>
    <div class="personal">
        <el-row class="personal-div">
            <div class="personal-cont">
                <ul class="tab-info">
                    <router-link tag="li" to="/personal/user-info" >
                        <svg class="icon xiala" aria-hidden="true">
                            <use xlink:href="#icon-order-mine"></use>
                        </svg>
                        我的信息
                    </router-link>
                    <router-link tag="li" to="/personal/change-password" class="active">
                        <svg class="icon xiala" aria-hidden="true">
                            <use xlink:href="#icon-xiugaimima01"></use>
                        </svg>
                        修改密码
                    </router-link>
                </ul>
                <div class="info-cont">
                    <el-form :rules="rules" ref="form" :model="form" label-width="200px" >
                        <el-form-item prop="oPassword" required label="原登录密码：">
                            <el-input type="password" v-model="form.oPassword"></el-input>
                        </el-form-item>
                        <el-form-item prop="password" required label="新密码：" >
                            <el-input type="password" v-model="form.password" placeholder="请输入6-18位数字或字母为密码"></el-input>
                        </el-form-item>
                         <el-form-item prop="cPassword" required label="再次输入新密码：">
                            <el-input type="password" v-model="form.cPassword"></el-input>
                        </el-form-item>
                        <div class="el-form-btn">
                            <el-button type="primary" @click="changePassword">确定</el-button>
                        </div>  
                    </el-form>
                    
                </div>
            </div>
        </el-row>
    </div>
</template>
<script>
import storage from 'lib/storage'
import io from 'lib/io'
import md5 from 'js-md5'
import {mapGetters} from 'vuex'
export default {
    components: {

    },
    computed: {

    },
    watch: {

    },
    data() {
        const cPassword = (rule, value, callback) => {
            console.log(rule,value,callback)
            // if (value === '') {
            //     callback(new Error('请输入个人电话'));
            // } else if (!(/^1[34578]\d{9}$/.test(value))) {
            //     callback(new Error('手机号码有误，请重填'));
            // } else {
            //     callback();
            // }
        };
        return {
            form:{
                oPassword:"",
                password:"",
                cPassword:"",
            },
            rules: {
               
                oPassword: [
                    {  required: true, message: '请输入原密码', trigger: 'blur' }
                ],
                cPassword: [
                    { required: true, min: 6, max: 18, message: '请输入6-18位数字或字母为密码', trigger: 'blur' },
                ],
                password: [
                    { required: true, min: 6, max: 18, message: '请输入6-18位数字或字母为密码', trigger: 'blur' },
                ],
            }
        }
    },
    created () {

    },
    methods: {
                   
        changePassword(){
            this.$refs.form.validate((valid) => {
                    if (valid) {
                        let param = this.form
                        param.oPassword = md5(param.oPassword)
                        param.password = md5(param.password)
                        param.cPassword = md5(param.cPassword)
                        console.log(valid)
                        this.$confirm('确认修改密码?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            try {
                                io.post(io.updatePass,param,(ret)=>{
                                    console.log(ret)
                                    this.$message({
                                        type:"success",
                                        message:'已修改成功'
                                    });
                                })
                            } catch (error) {
                                this.$message({
                                    message:'修改失败'
                                });
                            }
                        }).catch(() => {
                            this.$message({
                                message:'已取消修改'
                            });
                        });
                    }else{
                        this.$message('还有必填项未填，请先填写')
                        return
                    }
                });
           
            
            
        }
    }
}
</script>
<style lang="stylus">

</style>
<style lang="stylus" scoped>
.personal
    min-height: 100%;
    height: 100%;
    .personal-div
        width: 100%;
        background-color: #f5f8f9;
        min-height: 100%;
        .personal-cont
            width 80%
            min-width 1200px
            margin 0 auto
            box-sizing: border-box;
            background #ffffff
            margin-top -156px
            border 1px solid #dadada
            display flex 
            min-height 600px
            .tab-info
                width 170px
                background #f9f9f9
                border-right 1px solid #dadada
                li
                    height 80px
                    font-size 18px
                    color #999999
                    line-height 80px
                    padding-left 25px
                    border-bottom 1px solid #dadada
                    cursor pointer
                    &:last-child
                        border-bottom 0 none
                    .icon
                        font-size 24px
                        color #999999
                        margin-right 14px
                    &.active
                        background #fff
                        color #333
                        width 146px
                        
                        // border-right 1px solid #fff 
                        .icon
                            color #2bcfbb
                    &:last-child.active
                        border-bottom 1px solid #dadada
                        

            .info-cont
                flex 1
                padding-top 80px
                .el-form
                    width 55%
                    margin-left 17%
                    .el-input
                        width 100%
                        min-width 450px
                        height 50px
                .el-form-btn
                    text-align center
                    padding-top 100px
                    .el-button
                        width 100px 
                        height 38px
                        background #00b1d1



</style>
<style lang="stylus">
    .info-cont
        .el-form
            .el-form-item__label
                line-height 50px
            .el-input
                height 50px
                .el-input__inner
                    height 50px
</style>



