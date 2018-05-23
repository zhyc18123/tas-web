<template>
<el-row class="class-detail">
    <line-head-form class="head" title="班级详情"/>
    <div class="detail-cont">
        <div class="cont-head">
             <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-banciguanli"></use>
            </svg>
            <span>物理能力提高班</span>
            <em>开课中</em>
        </div>
        <div class="cont-main">
            <el-steps :active="stepActive" direction="vertical" name="">
                <el-step title="班级基础信息" >
                    <div slot="title">
                        <span>班级基础信息</span>
                        <el-button>修改基本信息</el-button>
                    </div>
                    <div slot="description" class="class-info">
                        
                    </div>
                </el-step>
                <el-step title="主讲老师基础信息" >
                    <div slot="title">
                        <span>主讲老师基础信息</span>
                        <el-button>添加主讲老师</el-button>
                    </div>
                    <div slot="description">
                        
                    </div>
                </el-step>
                <el-step title="讲次排课信息" >
                    <div slot="title">
                        <span>讲次排课信息</span>
                        <el-button>修改讲次课表</el-button>
                    </div>
                    <div slot="description">
                        
                    </div>
                </el-step>
                <el-step >
                    
                </el-step>
            </el-steps>
        </div>
        
    </div>
    
</el-row>
</template>
<script>
import LineHeadForm from '../../common/LineHeadForm'
export default {
    components: {
         LineHeadForm,
    },
    data () {
        return {
            stepActive:4
        }
    },
    created(){

    },
    methods:{
        handleCheckedWeekChange(val){
            if(val.constructor==Array){
                console.log("array",val.constructor==Array)
                this.form.everyday = false
            }else if(val.constructor==Boolean){
                this.form.checkweek = []
                console.log("boolean",val.constructor==Boolean)
            }
      }
  }
}
</script>
<style lang="stylus" scoped>
.class-detail
    .head
        margin-top 10px
    .detail-cont
        width 85%
        margin 0 auto
        padding-top 30px
        .cont-head
            width 100%
            height 60px
            border-radius 30px
            background rgba(0, 177, 209, 0.2);
            line-height 60px
            padding 0 21px 0 28px
            box-sizing border-box
            .icon
                font-size 30px
                color #00b1d1
                vertical-align -0.3em
            span 
                padding-left 20px
                font-size 18px
                color #333
                font-weight 700
            em
                font-size 16px
                color #ff9600
                font-weight 700
                float right
        .cont-main
            width 100%
            padding 38px 64px 38px 25px
            box-sizing border-box
            .el-step
                .el-button
                    height 30px
                    background #009ada
                    border 1px solid #009ada
                    color #ffffff
                    font-size 12px
                    float right
                .class-info
                    width 100%
                    height 222px
                    background rgba(230, 236, 238, 0.4)

</style>
<style lang="stylus">
.class-detail
    .detail-cont
        .cont-main
            .el-steps
                .el-step.is-vertical .el-step__line
                    left 16px
                    width 3px
                .el-step
                    .el-step__head
                        width 36px
                        .el-step__line
                            background #cceff6
                        .el-step__icon
                            background #00b1d1
                            width 36px
                            height 36px
                            .el-step__icon-inner
                                color #fff
                                font-size 20px
                                // font-style italic 
                        .el-step__icon.is-text
                            border 3px solid #fff
                    .el-step__head.is-finish
                        color #cceff6
                        border-color #cceff6
                    .el-step__main
                        padding-left 23px
                        padding-bottom 37px
                        box-sizing border-box
                        .el-step__title
                            height 36px
                            line-height 36px
                            color #333
                            font-size 14px
                            font-weight 700 
                        .el-step__description
                            padding-right 0       



</style>


