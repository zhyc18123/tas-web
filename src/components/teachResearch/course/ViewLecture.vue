<template>
    <el-row class="data-detail">
        <course-step :active="3" />
        <div class="main">
            <div class="times-div">
                <div class="t-title">
                    <em>{{course.courseChapterObj.name}}</em>
                </div>
                <span class="b-line"></span>
                <div class="c-tab">
                    <div class="t-ware" :class="{active:sourceType==='courseWare'}" @click="$router.push('/main/teach-research/course/view-lecture/courseWare/'+courseId+'/'+chapterId)">课件</div>
                    <div class="t-lecture" :class="{active:sourceType==='lecture'}" @click="$router.push('/main/teach-research/course/view-lecture/lecture/'+courseId+'/'+chapterId)">讲义</div>
                </div>
            </div>
            <div class="t-cont">
                <div class="cont-left">
                    <ul v-show="isShow">
                        <li  v-for="(item,i) in course.courseChapterObj.list" :key="item.id" class="left-list" :class="item.id == styleTag?'active':''" @click="showList(item)">
                            <div class="left-order">第 {{i+1}} 讲</div>
                            <div class="list-name">{{item.name}}</div>
                        </li>
                    </ul>
                    <div class="l-btn" :class="{tran:!isShow}"  @click="isShow=!isShow">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-jiantouarrowhead7"></use>
                        </svg>
                    </div>
                </div>
                <div class="cont-right">

        <div class="source-body" v-if="sourceType==='courseWare'">
            <iframe class="office-ppt edit"  v-if="office.token" :src="conf.ofsUrl+'office/view/'+chapterDetail.courseUrl+'?token='+office.token" frameborder="0"></iframe>
        </div>
        <div class="source-body" v-else>
            <iframe class="office-word" v-if="office.token" :src="conf.ofsUrl+'office/view/'+chapterDetail.lectureUrl+'?token='+office.token" frameborder="0"></iframe>
        </div>
                </div>
            </div>
            <div class="next-btn">
                <el-button class="height-btn" @click="$router.push('/main/teach-research/course/sheet/'+courseId)">下一步</el-button>
            </div>
        </div>
       
    </el-row>
</template>
<script>
import CourseStep from '../../common/CourseStep'
import { mapState, mapActions } from 'vuex'
import io from 'lib/io'
import conf from 'lib/conf'
export default {
    props: [],
    components: {
        CourseStep
    },
    data () {
        return {
            sourceType:this.$route.params.sourceType,
            courseId:this.$route.params.courseId,
            chapterId:this.$route.params.chapterId,
            styleTag:this.$route.params.chapterId,
            chapterDetail:{},
            isShow:true,
            conf:conf
        }
    },
    computed: {
        ...mapState(['course','office'])
    },
    beforeRouteUpdate(to, from, next) {
        console.log('to', to)
        this.sourceType = to.params.sourceType
        this.styleTag=to.params.chapterId
        this.optType = to.params.optType
        this.courseId=to.params.courseId
        this.chapterId=to.params.chapterId
        this.findLesChapterPage({ lessonId: this.courseId })
        this.detailLesChapters()
        next()
    },
    created(){
        this.findLesChapterPage({ lessonId: this.courseId })
        this.detailLesChapters()
    },
    methods:{
        ...mapActions(['findLesChapterPage','view']),
        showList(item){
            // this.styleTag = id
            this.$router.push('/main/teach-research/course/view-lecture/courseWare/'+ this.courseId +'/'+item.id)
        },
        async detailLesChapters(){
            let {data}=await io.post6(io.detailLesChapters,{lessonId:this.courseId,id:this.chapterId})
            if(data.success){
                this.chapterDetail=data.data
                let sourceId=''
                if(this.sourceType==='courseWare'){
                    sourceId=data.data.courseUrl
                }else{
                    sourceId=data.data.lectureUrl
                }
                this.view({resourceId:sourceId})
            }
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
            padding-right 28px
            position relative
            .l-btn
                position absolute
                top 0
                right 10px
                width 16px
                height 50px
                background #f4f4f4
                border-radius 4px
                cursor pointer
                display flex
                justify-content center
                align-items center
                .icon
                    color #84bdce
                &.tran
                    transform rotate(180deg)
            ul
                width 238px
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
    .next-btn
        text-align center
        padding-top 20px
            

</style>
