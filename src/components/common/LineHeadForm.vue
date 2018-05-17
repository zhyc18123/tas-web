<template>
    <div class="line-head-form">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-plus-creat"></use>
                            </svg>
        <span class="title-name">{{title}}</span>
        <el-button class="back-btn" @click="$router.go(-1)">返回</el-button>
    </div>
</template>
<script>
  export default {
    name: 'child',
    components:{
    },
    props:['title']
}
</script>
<style lang="stylus" scoped>
.line-head-form
    height 44px
    font-size 14px
    display flex
    align-items center
    color #333
    background #effdff
    font-weight bold
    position relative
    .title-name
        font-weight bold
    .icon
        font-size 20px
        color #1ebd99
        margin 0 10px 0 20px
    .back-btn
        background #1ebd99
        border-color #1ebd99
        position absolute
        right 10px
        padding 7px 25px
        border-radius 30px
        color white
</style>

