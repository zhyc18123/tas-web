<template>
    <el-row class="data-detail">
        <course-step :active="3" />
        <div class="times-div">
            <div class="t-title">
                <em>第1讲</em>
                <em>长度与时间</em>
            </div>
            <span class="b-line"></span>
            <div class="c-tab">
                <div class="t-ware" :class="{active:sourceType==='courseWare'}" @click="$router.push('/main/prepare-lessons/'+id+'/courseWare/read')">课件</div>
                <div class="t-lecture" :class="{active:sourceType==='lecture'}" @click="$router.push('/main/prepare-lessons/'+id+'/lecture/read')">讲义</div>
            </div>
        </div>
    </el-row>
</template>
<script>
import CourseStep from '../../common/CourseStep'
export default {
  props: [],
  components: {
      CourseStep
  },
  data () {
      return {
          sourceType:'courseWare'
      }
  }
}
</script>
<style lang="stylus" scoped>

.times-div
    display flex
    align-items flex-end
    position relative
    font-size 16px
    .t-title
        border 2px solid #23c9b3
        border-radius 20px
        height 36px
        line-height 36px
        padding 0 20px
        color #008eba
        font-weight bold
    .b-line
        height 4px
        flex 1
        background-image linear-gradient(270deg,#009fd7 0%,#01d1bb 100%)
    .c-tab
        position absolute
        right 0
        display flex
        width 172px
        div
            flex 1
            display flex
            justify-content center
            align-items center
            height 40px
            color #999
            cursor pointer
            position relative
            &.active,&:hover
                color #ff9000
                font-weight bold
                border-bottom 4px solid #ff9000
                &:before
                    border-bottom 5px solid #ff9000
                    border-left 5px solid transparent
                    border-right 5px solid transparent
                    content ''
                    width 0
                    height 0
                    position absolute
                    bottom 0
</style>
