<template>
    <div class="course-ware container">
        <div class="course-title">
            <img src="../../assets/img/to-right.png" alt=""> {{lessonName}}
        </div>
        <div class="times-div">
            <div class="t-title">
                <em>第 {{lectureNum}} 讲</em>
                <em>{{chapterDetail.name}}</em>
            </div>
            <span class="b-line"></span>
            <div class="c-tab" v-if="optType==='read'">
                <div class="t-ware" :class="{active:sourceType==='courseWare'}" @click="$router.push({path:'/main/prepare-lessons/'+id+'/courseWare/read',query:{lessonId,lessonName,lectureNum}})">课件</div>
                <div class="t-lecture" :class="{active:sourceType==='lecture'}" @click="$router.push({path:'/main/prepare-lessons/'+id+'/lecture/read',query:{lessonId,lessonName,lectureNum}})">讲义</div>
            </div>
        </div>
        <div class="opt-div">
            <div class="o-body" v-if="optType==='read'">
                <!--<template v-if="sourceType==='courseWare'">-->
                <span>如需调整{{sourceType==='courseWare'?'课件':'讲义'}}，可点击该按钮！</span>
                <img src="../../assets/img/finger.png" alt="">
                <div class="write-btn" @click="selfEdit">自定义编辑</div>
                <!--<div v-show="sourceType!=='courseWare'" class="write-btn print" @click="selfEdit">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-dayin"></use>
                    </svg>
                    打印
                </div>-->
                <!--</template>-->
                <!--<template v-else>
                    <span>如需调整讲义，可点击该按钮！</span>
                    <img src="../../assets/img/finger.png" alt="">
                    <div class="write-btn" @click="selfEdit">自定义编辑</div>
                    </template>-->
            </div>
        </div>
        <template v-if="office.token">
            <div class="source-body" v-if="sourceType==='courseWare'">
                <iframe class="office-ppt" v-if="chapterDetail.courseUrl" v-show="optType==='edit'" :src="conf.ofsUrl+'office/edit/'+chapterDetail.courseUrl+'?token='+office.token" frameborder="0"></iframe>
                <iframe class="office-ppt edit" v-if="chapterDetail.courseUrl" v-show="optType==='read'" :src="conf.ofsUrl+'office/view/'+chapterDetail.courseUrl+'?token='+office.token" frameborder="0"></iframe>
            </div>
            <div class="source-body" v-else>
                <iframe class="office-word" v-show="optType==='edit'" :src="conf.ofsUrl+'office/edit/'+chapterDetail.lectureUrl+'?token='+office.token" frameborder="0"></iframe>
                <iframe class="office-word" v-show="optType==='read'" :src="conf.ofsUrl+'office/view/'+chapterDetail.lectureUrl+'?token='+office.token" frameborder="0"></iframe>
            </div>
        </template>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import io from 'lib/io'
import conf from 'lib/conf'
export default {
    components: {

    },
    data() {
        return {
            id: this.$route.params.id,
            sourceType: this.$route.params.sourceType,
            optType: this.$route.params.optType,
            lessonId: this.$route.query.lessonId,
            lessonName: this.$route.query.lessonName,
            lectureNum: this.$route.query.lectureNum,
            chapterDetail: {},
            conf: conf
        }
    },
    computed: {
        ...mapState(['office'])
    },
    beforeRouteUpdate(to, from, next) {
        console.log('to', to)
        this.sourceType = to.params.sourceType
        this.optType = to.params.optType
        this.detailLesChapters()
        next()
    },
    created() {
        this.detailLesChapters()
    },
    methods: {
        ...mapActions(['view', 'edit']),
        selfEdit() {
            this.$router.push({ path: '/main/prepare-lessons/' + this.id + '/' + this.sourceType + '/edit', query: { lessonId: this.lessonId, lessonName: this.lessonName, lectureNum: this.lectureNum } })
        },
        getToken(data) {
            let sourceId = this.getId(data)
            if (this.optType === 'edit') {
                this.edit({ resourceId: sourceId })
            } else {
                this.view({ resourceId: sourceId })
            }
        },
        getId(data) {
            let sourceId = ''
            if (this.sourceType === 'courseWare') {
                let urlArr = data.data.courseUrl.split('/')
                sourceId = urlArr[urlArr.length - 1]
            } else {
                let urlArr = data.data.lectureUrl.split('/')
                sourceId = urlArr[urlArr.length - 1]
            }
            return sourceId
        },
        async detailLesChapters() {
            let { data } = await io.post6(io.detailLesChapters, { lessonId: this.lessonId, id: this.id })
            if (data.success) {
                this.chapterDetail = data.data
                this.getToken(data)
            }
        }
        // ...mapActions(['getBaseChapter'])
    }
}
</script>
<style lang="stylus" scoped>
.opt-div
    height auto
    min-height 30px
    .o-body
        height 58px
        display flex
        align-items center
        justify-content flex-end
        color #999
        img
            margin-right 10px
        .write-btn
            width 110px
            height 30px
            background #01cabf
            border-radius 30px
            color white
            display flex
            justify-content center
            align-items center
            cursor pointer
        .print
            width 90px
            background #00a0d7
            margin-left 10px
            .icon
                color white
                margin-right 4px
.course-ware
    background white
    padding 0 60px
.course-title
    height 60px
    line-height 60px
    font-size 16px
    color #333
    font-style italic 
    position relative
    
    img 
        position absolute
        left -22px
        top 22px
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
<style lang="stylus">
#application{
    top 0px !important
}
</style>


