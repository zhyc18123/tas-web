<template>
    <div class="line-head">
        <span class="left-span"></span>
        <span class="title-name">{{title}}</span>
        <img src="../../assets/img/l-line.png" alt="">
        <span class="l-span"></span>
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
.line-head
    height 18px
    font-size 16px
    display flex
    align-items flex-end
    .left-span
        width 4px
        height 18px
        background #52caaf
        display inline-block
        margin-right 10px
    .title-name
        font-weight bold
        font-style italic
    img 
        display inline-block
        height 4px
        margin-left 16px
    .right-text
        font-size 12px
        color #999
        float right 
    .l-span
        flex 1
        height 4px
        background linear-gradient(to right,#01d0bb,#009fd7)
</style>

