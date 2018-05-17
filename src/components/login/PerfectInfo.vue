<template lang="pug">
    .t-perfect-info
        .t-info-bg
        .t-info-content
            .t-info-header
                el-steps(:active="1" align-center v-if="!isTeacher")
                    el-step(title="注册账号" )
                    el-step(title="完善资料" )
                    el-step(title="分配导师" )
                    el-step(title="进入个人主页" )
                el-steps(:active="1" align-center v-if="isTeacher")
                    el-step(title="注册账号" )
                    el-step(title="完善资料" )
                    el-step(title="进入个人主页" )
            .t-form-title
                .t-form-title-text 完善你的个人资料，让更多人认识你
            p 完成身份验证后，自动匹配班级  
            edit-info(:type="type" )     
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import EditInfo from "../../base/EditInfo.vue"
// import Upload from "../../base/Upload.vue"
@Component({
    name: 'perfectinfo',
    components :{
        // Upload,
        EditInfo
    }
})
export default class perfectinfo extends Vue {
    isTeacher: boolean = true
    type :any = 'student'
    created () {
        (window as any).scrollTo(0,0);
        this.type=this.$route.query.type==='0'?'student':'teacher'
        console.log('type',this.type)
        if(this.type!=='teacher'){
            this.isTeacher=false
        }
    }
  
}
</script>
<style lang="stylus">
    // 修改性别单选样式
    .el-form-item.t-gender
        height 16px
        line-height 16px
        .el-form-item__content
            height 16px
            line-height 16px
            label
                height 16px
    // 固定文本域大小
    .t-info-brief
        .el-textarea__inner
            width 428px
            height 122px
            resize none
            font-family MicrosoftYaHei
    // 修改上传框大小
    .t-portrait
        .upload
            .el-upload
                width 98px
                height 98px
                i
                    width 98px
                    height 98px
                    line-height 98px
                img
                    width 98px
                    height 98px
</style>
<style lang="stylus" scoped>
    .t-perfect-info
        width 100%
        height 100%
        .t-info-content
            width 1200px
            // height 1410px
            margin 0 auto
            margin-top -166px
            border solid 1px #dadada
            background-color #fff
            .t-info-header
                width 100%
                height 100px
                padding-top 23px
                box-sizing border-box
                background-color #f9f9f9
                border-bottom solid 1px #dadada
            .t-form-title
                width 920px
                height 66px
                margin 0 auto
                border-bottom 1px solid #DADADA
                .t-form-title-text
                    width:300px;
                    text-align center
                    height 16px
                    color #333
                    font-size 16px
                    background-color #fff
                    margin 0 auto
                    padding-top 58px
            p
                font-size 12px
                color #999
                text-align center
                padding-top 24px
                padding-bottom 57px        
</style>