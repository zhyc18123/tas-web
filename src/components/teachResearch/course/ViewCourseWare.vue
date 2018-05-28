<template>
    <el-row class="data-detail">
        <course-step :active="3" />
        <div class="main">
            <div class="times-div">
                <div class="t-title">
                    <em>物理初二提高班（人教版）</em>
                </div>
                <span class="b-line"></span>
                <div class="c-tab">
                    <div class="t-ware" :class="{active:sourceType==='courseWare'}" @click="$router.push('/main/teach-research/course/view-course/courseWare')">课件</div>
                    <div class="t-lecture" :class="{active:sourceType==='lecture'}" @click="$router.push('/main/teach-research/course/view-lecture/lecture')">讲义</div>
                </div>
            </div>
            <div class="t-cont">
                <div class="cont-left">
                    <ul>
                        <li  v-for="item in courseList" :key="item.id" class="left-list" :class="item.id ==1?'active':''" @click="$router.push('/main/teach-research/course/view-lecture/1/'+sourceType+'/'+item.id)">
                            <div class="left-order">{{item.order}}</div>
                            <div class="list-name">{{item.courseName}}</div>
                        </li>
                    </ul>
                </div>
                <div class="cont-right">
                    <router-view></router-view>
                </div>
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
          sourceType:'courseWare',
          courseList:[
                {
                    order:"第一讲",
                    courseName:"长度与时间的测量",
                    id:"1"
                },
                 {
                     order:"第二讲",
                    courseName:"长度与时间的测量长度与时间的测量",
                    id:"2"
                }
          ]
      }
  }
}
</script>
<style lang="stylus" scoped>
.main
    padding 25px 0px
    .times-div
        position relative
        font-size 16px
        height 54px
        line-height 54px
        border-bottom 4px solid #bfebf3
        .t-title
            font-size 14px
            color #333
            font-weight bold
            em
                font-style normal
        .b-line
            height 1px
            display block 
            width 100%
            border-bottom 1px solid #bfebf3
            position absolute 
            left 0 
            bottom 1px
        .c-tab
            position absolute
            right 0
            bottom -4px
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
                    border-bottom 6px solid #ff9000
                    &:before
                        border-bottom 6px solid #ff9000
                        border-left 6px solid transparent
                        border-right 6px solid transparent
                        content ''
                        width 0
                        height 0
                        position absolute
                        bottom 0
    .t-cont
        padding 20px 0
        display flex
        .cont-left
            width 238px
            padding-right 18px
            ul
                li
                    width 100%
                    height 50px
                    font-size 14px
                    background rgba(221, 234, 238, 0.3)
                    color #999
                    margin-bottom 10px
                    line-height 50px
                    padding-left 15px
                    box-sizing border-box
                    cursor pointer
                    .left-order
                        float left
                        color #333
                    .list-name
                        float left
                        margin-left 10px
                        max-width 160px
                        text-overflow ellipsis
                        overflow hidden
                        white-space nowrap
                    &:hover,&.active
                        background rgba(75, 202, 173, 0.3)
                        .list-name
                            color #333

        .cont-right
            flex 1
            min-height 500px
            background #f8f8f8
            

</style>
