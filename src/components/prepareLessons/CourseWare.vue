<template>
    <div class="course-ware container">
        <div class="course-title">
            <img src="../../assets/img/to-right.png" alt=""> {{className}}
        </div>
        <div class="times-div">
            <div class="t-title">
                <em>第 {{lectureNum}} 讲</em>
                <em>{{chapterDetail.name}}</em>
            </div>
            <span class="b-line"></span>
            <div class="c-tab t-flexs" v-if="optType==='read'">
                <div class="t-ware t-flex" :class="{active:sourceType==='courseWare'}" @click="$router.push({path:'/main/prepare-lessons/'+id+'/courseWare/read',query:{lessonId,className,lectureNum,classId}})">课件</div>
                <div class="t-lecture" :class="{active:sourceType==='lecture'}" @click="$router.push({path:'/main/prepare-lessons/'+id+'/lecture/read',query:{lessonId,className,lectureNum,classId}})">讲义</div>
            </div>
        </div>
        <div class="opt-div">
            <div class="o-body" v-if="optType==='read'&&((sourceType==='courseWare'&&config.courseware_edit)||(sourceType==='lecture'&&config.lecture_edit))">
                <!--<template v-if="sourceType==='courseWare'">-->
                <span>如需调整{{sourceType==='courseWare'?'课件':'讲义'}}，可点击该按钮！</span>
                <img src="../../assets/img/finger.png" alt="">
                <div class="write-btn" @click="selfEdit">自定义编辑</div>
                <!--<div v-show="sourceType!=='courseWare'" class="write-btn print" @click="print">
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
        <template v-if="token">
            <div class="source-body" v-if="sourceType==='courseWare'">
                <iframe class="office-ppt" v-if="chapterDetail.courseUrl" v-show="optType==='edit'" :src="conf.ofsUrl+'office/edit/'+chapterDetail.courseUrl+'?token='+office.token" frameborder="0"></iframe>
                <iframe class="office-ppt edit" v-if="chapterDetail.courseUrl" v-show="optType==='read'" :src="conf.ofsUrl+'office/view/'+chapterDetail.courseUrl+'?token='+office.token" frameborder="0"></iframe>
            </div>
            <div class="source-body" v-else>
                <iframe class="office-word" v-show="optType==='edit'" :src="conf.ofsUrl+'office/edit/'+chapterDetail.lectureUrl+'?token='+office.token" frameborder="0"></iframe>
                <iframe class="office-word" v-show="optType==='read'" :src="conf.ofsUrl+'office/view/'+chapterDetail.lectureUrl+'?token='+office.token" frameborder="0"></iframe>
            </div>
        </template>
            <div class="next-btn">
                <el-button class="height-btn" @click="$router.push('/main/prepare-lessons')">返回列表</el-button>
                <el-button v-if="lectureNum<chapterList.length" class="light-btn" :class="{disable:nextDisabled}" @click="next">下一讲</el-button>
            </div>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import io from 'lib/io'
import conf from 'lib/conf'
import storage from 'lib/storage'
export default {
    components: {

    },
    data() {
        return {
            id: this.$route.params.id,
            sourceType: this.$route.params.sourceType,
            optType: this.$route.params.optType,
            lessonId: this.$route.query.lessonId,
            className: this.$route.query.className,
            classId: this.$route.query.classId,
            lectureNum: Number(this.$route.query.lectureNum),
            chapterDetail: {},
            conf: conf,
            chapterList:storage.getChapter(),
            token:'',
            nextDisabled:false
        }
    },
    computed: {
        ...mapState(['office']),
        ...mapGetters(['config'])
    },
    watch: {
        'office.token'(val){
            this.token=val
        }
    },
    beforeRouteUpdate(to, from, next) {
        this.sourceType = to.params.sourceType
        this.optType = to.params.optType
        this.lectureNum=to.query.lectureNum
        this.id=to.params.id
        this.detailLessonClassChapter()
        next()
    },
    created() {
        this.detailLessonClassChapter()
        console.log(this.lectureNum,this.chapterList)
    },
    mounted () {  
        this.nextDisabled=this.chapterList[this.lectureNum].status===0
    },
    updated () {
        this.nextDisabled=this.chapterList[this.lectureNum].status===0
    },
    beforeDestroy () {
    // storage.removeChapter()
    },
    methods: {
        ...mapActions(['view', 'edit', 'prints', 'download','clearToken']),
        next(){
            console.log(this.chapterList)
            // this.token=''
            console.log(this.chapterList[this.lectureNum].chapterId)
            if(this.nextDisabled){
                return
            }
            this.$router.push({path:'/main/prepare-lessons/'+this.chapterList[this.lectureNum].chapterId+'/'+this.sourceType+'/read',query:{lessonId:this.lessonId,lectureNum:Number(this.lectureNum)+1,className:this.className,classId:this.classId}})
        },
        selfEdit() {
            this.token=''
            this.$router.push({ path: '/main/prepare-lessons/' + this.id + '/' + this.sourceType + '/edit', query: { lessonId: this.lessonId, className: this.className, lectureNum: this.lectureNum ,classId:this.classId} })
        },
        print() {
            // let sourceId = this.chapterDetail.courseUrl
            // this.download({ resourceId: sourceId })
            // setTimeout(() => {
            //     let url = 'http://static.yuyou100.com/Ft-P10bUvaPcUwkTget4p0UOWpaR?attname=导师模板.xlsx'
            //     let wind = window.open(url, 'newwindow', 'height=300, width=700, top=100, left=100, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no');
            //     wind.print();
            // }, 3000)
        },
        getToken(data) {
            let sourceId = this.getId(data)
            if (this.optType === 'edit') {
                this.edit({ resourceId: sourceId })
            } else {
                  if(this.config.print){
                  this.prints({ resourceId: sourceId })
                  }else{
                this.view({ resourceId: sourceId })
                  }
            }
        },
        getId(data) {
            let sourceId = ''
            if (this.sourceType === 'courseWare') {
                let urlArr = data.courseUrl.split('/')
                sourceId = urlArr[urlArr.length - 1]
            } else {
                let urlArr = data.lectureUrl.split('/')
                sourceId = urlArr[urlArr.length - 1]
            }
            return sourceId
        },
        async detailLessonClassChapter() {
            let { data } = await io.post6(io.detailLessonClassChapter, { lessonId: this.lessonId, lessonClassId: this.classId,lessonChapterId:this.id })
            if (data.success) {
                this.chapterDetail = data.data
                this.getToken(data.data)
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
    padding 0 54px
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
        bottom 0px
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
                    left 50%
                    transform translateX(-50%)
.next-btn
    text-align center
    padding-bottom 20px
    .disable
        background #ddd !important
        cursor auto
</style>
<style lang="stylus">
#application{
    top 0px !important
}
</style>


