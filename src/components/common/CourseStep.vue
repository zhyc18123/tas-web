<template>
    <el-steps :active="active" align-center class="step c-step">
        <el-step title="1.新建">
            <div slot="icon">
                <svg class="icon new" aria-hidden="true">
                    <use xlink:href="#icon-xinjiantianjiabiaodanyemian"></use>
                </svg>
            </div>
        </el-step>
        <el-step title="2.编辑教学计划">
            <div slot="icon">
                <svg class="icon edit" aria-hidden="true">
                    <use xlink:href="#icon-bianjiedit26"></use>
                </svg>
            </div>
        </el-step>
        <el-step title="3.预览发布课程内容">
            <div slot="icon">
                <svg class="icon publish" aria-hidden="true">
                    <use xlink:href="#icon-fabu"></use>
                </svg>
            </div>
        </el-step>
        <el-step title="4.添加辅助材料">
            <div slot="icon">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-gaiicon-"></use>
                </svg>
            </div>
        </el-step>
    </el-steps>
</template>
<script>
export default {
    props: ['active']
}
</script>
<style lang="stylus" scoped>
.step
    background #f7f7f7
    padding 10px 0 8px
    margin-top 20px
    
</style>
<style lang="stylus">
.c-step
    .el-step__icon
        width 48px
        height 48px
    .el-step.is-horizontal .el-step__line
        top 24px
    .icon
        font-size 28px
        position relative
        &.new
            top -2px
            left 1px
        &.edit
            left 2px
        &.publish
            left -3px
    .el-step__title
        font-size 12px
    .el-step__title.is-finish
        color #2bcfbb
        font-weight bold
    .el-step__head.is-finish
        border-color #2bcfbb
        color #2bcfbb
    .el-step__line
        background #ccc
    .el-step__title.is-process,.el-step__title.is-wait
        color #000
        font-weight normal
    .el-step__head.is-process,.el-step__head.is-wait
        color #cccccc
        border-color #ccc
    // .el-step__icon.is-text
    //     border-color #ccc
</style>



