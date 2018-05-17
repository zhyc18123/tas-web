<template lang="pug">
    container
        .t-info-header
            el-steps(:active="2" align-center )
                el-step(title="注册账号" )
                el-step(title="完善资料" )
                el-step(title="分配导师" )
                el-step(title="进入个人主页" )
        .t-form-t
            .t-form-title
                .t-form-title-text 欢迎您加入新教师大家庭 ！
        p.t-info 在这里你将学习新的技能，并需要通过层层关卡考验后，才能成为一个合格的教师！导师就是这个游戏中的NPC，快跟老师并肩作战吧 ！
        .t-choose-content
            .t-your-course(v-if="teacherDetail.lessonClassList&&teacherDetail.lessonClassList[0]")
                h4 你即将学习的课程是
                .t-course-left
                    .t-course-left-pic
                        img(src="../../assets/img/going-head.png")
                .t-course-right
                    h5 《{{teacherDetail.lessonClassList[0].name}}》
                    .t-course-right-info
                        p 课程介绍：
                        p.info-text(v-html="teacherDetail.lessonClassList[0].introduce")
            .t-your-teacher
                h4 你的个人导师
                .t-teacher-content(v-if="teacherDetail")
                    .t-teacher-label
                        .t-teacher-label-left
                            .t-label-left-img
                                img(:src="teacherDetail.headImg || defaultHead")
                                .t-teacher-name(v-html="teacherDetail.username")
                        .t-teacher-label-right
                            .t-label-item.t-yellow
                                .t-label-item-head-light
                                .t-label-item-head
                                    span 个人简介
                                .t-label-item-text(:title="teacherDetail.introduction")(v-html="teacherDetail.introduction")
                            .t-label-item.t-blue
                                .t-label-item-head-light
                                .t-label-item-head 
                                    span 擅长科目
                                .t-label-item-text(:title="teacherDetail.subjectList") {{teacherDetail.subjectList}}
                            .t-label-item.t-purple
                                .t-label-item-head-light
                                .t-label-item-head 
                                    span 个人标签
                                .t-label-item-text(:title="teacherDetail.tagList") {{teacherDetail.tagList}}
                    .t-teacher-do
                        .t-teacher-do-title 
                            span 老师能为你做些什么
                        .t-teacher-do-content
                            .t-teacher-do-item
                                |答疑解惑
                            .t-teacher-do-item
                                |点评作业
                            .t-teacher-do-item
                                |考评
                    .t-you-need
                        .t-you-need-title
                            span 你需要做什么
                        .t-need-content
                            .t-need-item 
                                .t-need-font
                                    svg(class="icon" aria-hidden="true")
                                        use(xlink:href="#icon-shu2")
                                |学习课程
                            .t-need-item
                                .t-need-font
                                    svg(class="icon dazuoye" aria-hidden="true")
                                        use(xlink:href="#icon-dazuoye")
                                |完成作业
                            .t-need-item
                                .t-need-font
                                    svg(class="icon kaohebiaozhun" aria-hidden="true")
                                        use(xlink:href="#icon-kaohebiaozhun")
                                |参加考核
                            .t-need-item
                                .t-need-font
                                    svg(class="icon share" aria-hidden="true")
                                        use(xlink:href="#icon-ai-share")
                                |分享
            .t-btn
                router-link(:to="{path:'/homepage'}")
                    el-button() 进入个人主页
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Container from "base/Container.vue"
import {detailTeacher} from 'service/user'
@Component({
    name: 'chooseteacher',
    components: {
        Container
    }
    
})
export default class chooseteacher extends Vue {
    defaultHead:any=require('assets/img/default-head.png')
    teacherId:string=""
    userId:string=""
    teacherDetail:any={}
    active: any = 2
    // name:any = "程老师"
    created () {
        this.teacherId=this.$route.query.teacherId
        this.userId=this.$route.query.userId
        this.detailTeacher()
    }
    async detailTeacher(){
        let {data}=await detailTeacher({studentId:this.userId,teacherId:this.teacherId})
        if(data.success){
            data.data.subjectList=data.data.subjectList.join(',')
            data.data.tagList=data.data.tagList.join(',')
        this.teacherDetail=data.data
        }
    }
}
</script>
<style lang="stylus" scoped>
    .t-info-header
        width 100%
        height 100px
        padding-top 23px
        box-sizing border-box
        background-color #f9f9f9
        border-bottom solid 1px #dadada
    .t-form-t
        width 100%
        height 66px
        background-color #fff
        border-bottom 1px solid #fff
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
    .t-info
        font-size 12px
        color #999
        text-align center
        padding-top 30px
        padding-bottom 57px 
        background-color #fff
    .t-choose-content
        background-color #fff
        padding 0 140px
        .t-your-course
            min-height 341px
            width 100%
            h4
                padding-left 16px
                height 18px 
                font-size 16px
                line-height 18px
                color #333
                font-weight 700
                border-left 4px solid #52CAAF
            .t-course-left
                width 300px
                height 324px
                padding-top 50px
                box-sizing border-box
                float left
                .t-course-left-pic
                    width 280px
                    height 220px
                    border 2px solid #CBEEE7
                    border-radius 8px
                    position relative
                    img
                        width 280px
                        height 220px
                        border 0 none
                        border-radius 8px
                        position absolute
                        left 18px
                        top -18px
            .t-course-right
                float right
                width 620px
                padding-top 42px
                min-height 324px
                padding-left 28px
                box-sizing border-box
                h5
                    font-size 16px
                    color #53ACCA
                    font-weight 700
                .t-course-right-info
                    padding-top 27px
                    font-size 12px
                    line-height 20px
                    color #666
                    p
                        font-size 12px
                        max-width 592px
                        line-height 20px
                        word-wrap break-word  
                        float left 
        .t-your-teacher
            width 100%
            height 758px
            background-color #fff
            h4
                padding-left 16px
                height 18px 
                font-size 16px
                line-height 18px
                color #333
                font-weight 700
                border-left 4px solid #52CAAF
                margin-bottom 20px
            .t-teacher-content
                width 100%
                height 720px
                border 2px solid #CAEFE7
                box-sizing border-box
                padding 60px 50px 0px
                .t-teacher-label
                    width 100%
                    min-height 190px
                    .t-teacher-label-left
                        width 150px 
                        height 190px
                        // padding-left 10px
                        float left
                        box-sizing border-box
                        .t-label-left-img
                            width 100%
                            height 190px
                            // background-color #F0F0F2
                            position relative
                            box-shadow 10px 10px #F0F0F2
                            img 
                                width 150px
                                height 150px
                                display block
                                border 1px solid #F0F0F2
                                border-bottom 0 none
                                box-sizing border-box
                                background-color #fff
                            .t-teacher-name
                                width 150px
                                height 40px
                                background-color #52CAAF 
                                color #333
                                font-size 16px
                                text-align center
                                line-height 40px 
                    .t-teacher-label-right
                        width 654px
                        height 190px
                        float right
                        .t-label-item
                            float right
                            width 585px
                            height 46px
                            background #F8F8F8
                            margin-bottom 26px
                            line-height 46px
                            padding-left 144px
                            box-sizing border-box
                            position relative
                            .t-label-item-head
                                width 128px
                                height 46px
                                transform skew(-33deg)
                                text-align center
                                position absolute
                                left -17px
                                top 0px
                                z-index 5
                                span 
                                    display block
                                    color #333
                                    font-weight 700
                                    transform skew(33deg)
                            .t-label-item-head-light  
                                width 128px 
                                height 46px
                                transform skew(-33deg)
                                position absolute
                                left -7px
                                top 0px
                                z-index 5
                            .t-label-item-text
                                color #333
                                font-size 12px
                                overflow hidden
                                text-overflow ellipsis
                                white-space nowrap
                        .t-yellow
                            .t-label-item-head
                                background-color #FFD162
                            .t-label-item-head-light  
                                background-color #FFEDBF
                        .t-blue
                            .t-label-item-head
                                background-color #7AD6EF
                            .t-label-item-head-light  
                                background-color #94E9FE
                        .t-purple
                            .t-label-item-head
                                background-color #C6B6F7
                            .t-label-item-head-light  
                                background-color #E0D5FF 
                        .t-label-item:last-child
                            margin-bottom 0px
                .t-teacher-do
                    width 100%
                    height 218px
                    .t-teacher-do-title 
                        height 70px
                        border-bottom 1px solid #D9DDE0
                        span 
                            display block
                            width 254px
                            height 30px
                            text-align center
                            line-height 30px
                            font-size 16px
                            color #333
                            font-weight 700
                            background-color #fff
                            margin 0 auto
                            padding-top 60px
                            position relative
                        span:after
                            content ""
                            display inline-block
                            width 32px
                            height 1px
                            background-color #D9DDE0
                            transform rotate(-40deg)
                            position absolute
                            right -4px
                            top 80px
                        span:before
                            content ""
                            display inline-block
                            width 32px
                            height 1px
                            background-color #D9DDE0
                            transform rotate(40deg)
                            position absolute
                            left -4px
                            top 80px
                    .t-teacher-do-content
                        padding-top 66px
                        height 148px
                        box-sizing border-box
                        .t-teacher-do-item
                            width 123px
                            height 48px
                            display inline-block
                            line-height 46px
                            padding-left 28px
                            box-sizing border-box
                            font-size 12px
                            color #333
                            margin-left 111px
                            background url("../../assets/img/chooseteacher-bg.png") no-repeat
                        .t-teacher-do-item:last-child
                            padding-left 45px
                .t-you-need
                    width 100%
                    height 148px
                    .t-you-need-title 
                        height 40px
                        border-bottom 1px solid #D9DDE0
                        span 
                            display block
                            width 254px
                            height 30px
                            text-align center
                            line-height 30px
                            font-size 16px
                            color #333
                            font-weight 700
                            background-color #fff
                            margin 0 auto
                            padding-top 43px
                            position relative
                        span:after
                            content ""
                            display inline-block
                            width 32px
                            height 1px
                            background-color #D9DDE0
                            transform rotate(-40deg)
                            position absolute
                            right -4px
                            top 51px
                        span:before
                            content ""
                            display inline-block
                            width 32px
                            height 1px
                            background-color #D9DDE0
                            transform rotate(40deg)
                            position absolute
                            left -4px
                            top 51px
                    .t-need-content
                        padding-top 70px
                        .t-need-item
                            width 127px
                            height 50px
                            background-color #A9EBDD
                            border-radius 5px 
                            line-height 50px 
                            padding-left 25px
                            box-sizing border-box
                            text-align center
                            color #333
                            font-size 12px
                            display inline-block
                            margin-left 93px
                            position relative
                            .t-need-font
                                width 50px
                                height 50px
                                border 2px solid #fff
                                background-color #52CAAF
                                box-sizing border-box
                                border-radius 50%
                                line-height 48px
                                text-align center
                                position absolute
                                left -25px
                                top 0px
                                z-index 10
                                i,.icon
                                    font-size 26px
                                    color #fff
                                    position absolute
                                    left 50%
                                    top 50%
                                    transform translateX(-50%) translateY(-50%)
                                .dazuoye
                                    font-size 32px
                        .t-need-item:first-child
                            margin-left 25px
        .t-btn
            padding 45px 0 120px 0
            text-align center
            .el-button
                width 180px
                height 50px
                margin 0 auto 
                background-color #2BBC61
                color #fff  
                border 1px solid #2BBC61              
                        
                            
                            
                            
                        
                            
                        
                    
                    
                
                            
                    
                        
                   
                
            
            
        
</style>