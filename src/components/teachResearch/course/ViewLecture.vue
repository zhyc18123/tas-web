<template>
    <el-row class="data-detail">
        <course-step :active="3" v-if="course.courseChapterObj.status!==1" />
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
                        <li v-for="(item,i) in course.courseChapterObj.list" :key="item.id" class="left-list" :class="item.id == styleTag?'active':''" @click="showList(item)">
                            <div class="left-order">第 {{i+1}} 讲</div>
                            <div class="list-name">{{item.name}}</div>
                            <div v-if="item.status===1" class="status has-publish">已发布</div>
                            <div v-else class="status no-publish">未发布</div>
                        </li>
                    </ul>
                    <div class="l-btn" :class="{tran:!isShow}" @click="isShow=!isShow">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-jiantouarrowhead7"></use>
                        </svg>
                    </div>
                </div>
                <div class="cont-right">
                    <div class="title">{{chapterDetail.name||'--'}}</div>
                    <div class="source-body" v-if="sourceType==='courseWare'">
                        <div v-if="token">
                            <iframe class="office-ppt edit" :src="conf.ofsUrl+'office/view/'+chapterDetail.courseUrl+'?token='+office.token" frameborder="0"></iframe>
                        </div>
                    </div>
                    <div class="source-body" v-else>
                        <div v-if="token">
                            <iframe class="office-word" :src="conf.ofsUrl+'office/view/'+chapterDetail.lectureUrl+'?token='+office.token" frameborder="0"></iframe>
                        </div>
                    </div>
                </div>
            </div>
            <div class="next-btn">
                <el-button class="light-btn" @click="$router.push('/main/teach-research/course/edit-lecture/'+courseId)">上一步</el-button>
                <el-button class="height-btn" @click="$router.push('/main/teach-research/course/sheet/'+courseId)" v-if="course.courseChapterObj.allPublic">下一步</el-button>
                <el-button class="height-btn" @click="$router.push('/main/teach-research/course/sheet/'+courseId)" v-if="!course.courseChapterObj.allPublic">暂不发布讲次，下一步</el-button>
                <el-button class="light-btn" @click="showLecture=true" v-if="!course.courseChapterObj.allPublic">发布讲次，下一步</el-button>
            </div>
            <el-dialog :title="course.courseChapterObj.name" :visible.sync="showLecture" width="40%" center class="g-tell">
                <el-checkbox label="全选" v-model="allCheck"></el-checkbox>
                <el-checkbox-group v-model="lectureList">
                    <el-checkbox class="lec-list" :label="item.id" v-for="(item,i) in course.courseChapterObj.list" :disabled="item.status===1">{{item.name}}</el-checkbox>
                </el-checkbox-group>
                <div class="next-btn">
                    <el-button class="height-btn" @click="publishLecture">确定</el-button>
                    <el-button class="light-btn" @click="showLecture=false">取消</el-button>
                </div>
            </el-dialog>
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
    data() {
        return {
            sourceType: this.$route.params.sourceType,
            courseId: this.$route.params.courseId,
            chapterId: this.$route.params.chapterId,
            styleTag: this.$route.params.chapterId,
            chapterDetail: {},
            isShow: true,
            conf: conf,
            showLecture: false,
            lectureList:[],
            allCheck:false,
            token:''
        }
    },
    computed: {
        ...mapState(['course', 'office'])
    },
    watch: {
        allCheck(val){
            if(val){
                this.course.courseChapterObj.list.map((item,i)=>{
                    if(item.status===0&&(!this.lectureList.indexOf(item.id)>-1)){
                        this.lectureList.push(item.id)
                    }
                })
            }else{
                this.lectureList=[]
            }
        },
        'office.token'(val){
            this.token=val
        }
    },
    beforeRouteUpdate(to, from, next) {
        console.log('to', to)
        this.sourceType = to.params.sourceType
        this.styleTag = to.params.chapterId
        this.optType = to.params.optType
        this.courseId = to.params.courseId
        this.chapterId = to.params.chapterId
        this.findLesChapterPage({ lessonId: this.courseId })
        this.detailLesChapters()
        next()
    },
    created() {
        this.findLesChapterPage({ lessonId: this.courseId })
        this.detailLesChapters()
    },
    methods: {
        ...mapActions(['findLesChapterPage', 'view']),
        showList(item) {
            // this.styleTag = id
            this.$router.push('/main/teach-research/course/view-lecture/courseWare/' + this.courseId + '/' + item.id)
        },
        async publishLecture() {
            if(!this.lectureList.length){
                this.$message('请选择要发布的讲次')
                return
            }
            let tipText = '发布讲次后，无法修改，是否确定？'
            this.$confirm(tipText).then(async () => {
                let { data } = await io.post6(io.publishLesChapter, { lessonId: this.courseId, ids: this.lectureList.join(',') })
                if (data.success) {
                    this.$message({message:'发布成功',type:'success'})
                    this.$router.push('/main/teach-research/course/sheet/' + this.courseId)
                }
            })
        },
        async detailLesChapters() {
            let { data } = await io.post6(io.detailLesChapters, { lessonId: this.courseId, id: this.chapterId })
            if (data.success) {
                this.chapterDetail = data.data
                let sourceId = ''
                if (this.sourceType === 'courseWare') {
                    sourceId = data.data.courseUrl
                } else {
                    sourceId = data.data.lectureUrl
                }
                this.view({ resourceId: sourceId })
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
            display: box;               /* OLD - Android 4.4- */
            display: -webkit-box;       /* OLD - iOS 6-, Safari 3.1-6 */
            display: -moz-box;          /* OLD - Firefox 19- (buggy but mostly works) */
            display: -ms-flexbox;       /* TWEENER - IE 10 */
            display: -webkit-flex;      /* NEW - Chrome */
            display: flex; 
            width 172px
            div
                -webkit-box-flex: 1;              /* OLD - iOS 6-, Safari 3.1-6 */
                -moz-box-flex: 1;                 /* OLD - Firefox 19- */
                -webkit-flex: 1;                     /* Chrome */
                -ms-flex: 1;                           /* IE 10 */
                flex: 1; 
                display flex
                justify-content center
                align-items center
                text-align center
                box-sizing border-box
                line-height 46px
                height 46px
                color #999
                cursor pointer
                position relative
                border-bottom 6px solid transparent
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
                        left:50%;
                        transform :translateX(-50%)
    .t-cont
        padding 20px 0
        display: box;               /* OLD - Android 4.4- */
        display: -webkit-box;       /* OLD - iOS 6-, Safari 3.1-6 */
        display: -moz-box;          /* OLD - Firefox 19- (buggy but mostly works) */
        display: -ms-flexbox;       /* TWEENER - IE 10 */
        display: -webkit-flex;      /* NEW - Chrome */
        display: flex; 
        .cont-left
            padding-right 28px
            position relative
            .left-list
                position relative
            .status
                position absolute
                right 0
                top 15px
                height 20px
                line-height 20px
                background #2bcfbb
                color white
                font-size 12px
                padding 0 3px 0 5px
                border-top-left-radius 10px
                border-bottom-left-radius 10px
            .no-publish
                background #aeaeae
            .l-btn
                position absolute
                top 0
                right 10px
                width 16px
                height 50px
                line-height 50px
                background #f4f4f4
                border-radius 4px
                cursor pointer
                // display: box;               /* OLD - Android 4.4- */
                // display: -webkit-box;       /* OLD - iOS 6-, Safari 3.1-6 */
                // display: -moz-box;          /* OLD - Firefox 19- (buggy but mostly works) */
                // display: -ms-flexbox;       /* TWEENER - IE 10 */
                // display: -webkit-flex;      /* NEW - Chrome */
                // display: flex; 
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
                        max-width 120px
                        text-overflow ellipsis
                        overflow hidden
                        white-space nowrap
                    &:hover,&.active
                        background rgba(75, 202, 173, 0.3)
                        .list-name
                            color #333

        .cont-right
            -webkit-box-flex: 1;              /* OLD - iOS 6-, Safari 3.1-6 */
            -moz-box-flex: 1;                 /* OLD - Firefox 19- */
            -webkit-flex: 1;                     /* Chrome */
            -ms-flex: 1;                           /* IE 10 */
            flex: 1; 
            min-height 500px
            text-align center
            .title
                padding 15px 0
                background: #f8f8f8;
                color: #0BBFA9;
                font-weight: 700;
                font-size: 16px;
    .next-btn
        text-align center
        padding-top 20px
.lec-list
    display block
    margin-left 0

</style>
<style  lang="stylus">
.data-detail
    .main
        .g-tell
            .el-dialog--center 
                .el-dialog__body
                    text-align left
</style>
