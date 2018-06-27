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
    display:  box;               /* OLD - Android 4.4- */
    display: -webkit-box;       /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box;          /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox;       /* TWEENER - IE 10 */
    display: -webkit-flex;     /* NEW - Chrome */
    display: flex;
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
        -webkit-box-flex: 1;              /* OLD - iOS 6-, Safari 3.1-6 */
        -moz-box-flex: 1;                 /* OLD - Firefox 19- */
        -webkit-flex: 1;                     /* Chrome */
        -ms-flex: 1;                           /* IE 10 */
        flex: 1;
        height 4px
        background linear-gradient(to right,#01d0bb,#009fd7)
</style>

