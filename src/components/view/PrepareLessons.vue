<template>
    <div class="prepare container">
        <div class="p-img">
            <img src="../../assets/img/prepare-banner.png" alt="">
        </div>
        <div class="p-line"></div>
        <div class="condit">
            <el-tabs v-model="activeName" type="border-card" class="t-card">
                <el-tab-pane v-for="(item,i) in condition.subjectList" :label="item.name" :name="i+''">
                    <div class="g-search">
                        <ul>
                            <li>
                                <div class="search-title">
                                    <label>年级：</label>
                                </div>
                                <div class="search-list">
                                    <el-radio-group v-model="form.gradeId" size="mini">
                                        <el-radio-button v-for="(item,index) in condition.gradeObj.list" :label="item.id">{{item.name}}</el-radio-button>
                                    </el-radio-group>
                                </div>
                            </li>
                            <li>
                                <div class="search-title">
                                    <label>学期：</label>
                                </div>
                                <div class="search-list">
                                    <el-radio-group v-model="form.termId" size="mini">
                                        <el-radio-button v-for="(item,index) in condition.termObj.list" :label="item.id">{{item.name}}</el-radio-button>
                                    </el-radio-group>
                                </div>
                            </li>
                            <li>
                                <div class="search-title">
                                    <label>版本：</label>
                                </div>
                                <div class="search-list">
                                    <el-radio-group v-model="form.versionId" size="mini">
                                        <el-radio-button v-for="(item,index) in condition.materList" :label="item.id">{{item.name}}</el-radio-button>
                                    </el-radio-group>
                                </div>
                            </li>
                            <li class="g-course">
                                <div class="search-title">
                                    <label>课程：</label>
                                </div>
                                <div class="search-list">
                                    <el-radio-group v-model="form.courseId" size="mini">
                                        <el-radio-button v-for="(item,index) in course.courseObj.list" :label="item.id">{{item.name}}</el-radio-button>
                                    </el-radio-group>
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="t-card c-body"  v-show="form.courseId">
            <div class="c-left">
                <line-head :title="course.courseChapterObj.name+'课程讲次'" />
                <ul class="times-ul" v-if="course.courseChapterObj.list&&course.courseChapterObj.list.length">
                    <router-link tag="li" :to="{path:'/main/prepare-lessons/'+item.id+'/courseWare/read',query:{lessonId:form.courseId,lectureNum:i+1,lessonName:course.courseChapterObj.name}}" v-for="(item,i) in course.courseChapterObj.list">第 {{i+1}} 讲{{item.name}}</router-link>
                </ul>
                    <div class="empty" v-else>
                        暂无课程讲次
                    </div>
            </div>
            <div class="c-right">
                <div class="c-introduce">
                    <line-head :title="course.courseChapterObj.name+'课程说明'" />
                    <div class="i-video">
                        <d-player v-if="course.courseDetail.videoUrl" :options="{video:{url:course.courseDetail.videoUrl,pic:course.courseDetail.videoUrl+'-thumbnail-2'}}"></d-player>
                    </div>
                    <div class="i-text">
                        {{course.courseDetail.remark}}
                    </div>
                </div>
                <div class="c-data">
                    <line-head title="课程资料" />
                    <ul class="data-ul" v-if="course.courseDataObj.list&&course.courseDataObj.list.length">
                        <li v-for="(item,i) in course.courseDataObj.list" @click="downloadData(item)">
                            <img :src="item.url" alt="">
                            <span>{{item.attchName}}</span>
                        </li>
                    </ul>
                    <div class="empty" v-else>
                        暂无课程资料
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import LineHead from 'common/LineHead'
import VueDPlayer from 'vue-dplayer'
import '../../../node_modules/vue-dplayer/dist/vue-dplayer.css'
import testUrl from '../../assets/img/prepare-banner.png'
import { mapState, mapActions } from 'vuex'
export default {
    name: "PrepareLessons",
    components: {
        LineHead,
        'd-player': VueDPlayer,
    },
    data() {
        return {
            activeName: '0',
            form: {
                gradeId: '',
                termId: '',
                versionId: '',
                courseId: ''
            }
        }
    },
    computed: {
        ...mapState(['condition', 'course','chapter']),
    },
    watch: {
        'condition.subjectList'(val) {
            this.findBaseSectionPage({ pageIndex: 1, pageSize: 1000000, subjectId: val[0].id })
            this.activeName = 0 + ''
        },
        'condition.gradeObj'(val) {
            this.form.gradeId = val.list[0]&&val.list[0].id
        },
        'condition.termObj'(val) {
            this.form.termId = val.list[0]&&val.list[0].id
        },
        'condition.materList'(val) {
            this.form.versionId = val[0]&&val[0].id
        },
        'course.courseObj'(val){
            console.log('xx',val)
            this.form.courseId=val.list[0]&&val.list[0].id
        },
        activeName(val) {
            this.findBaseSectionPage({ pageIndex: 1, pageSize: 1000000, subjectId: this.condition.subjectList[val].id })
            this.findMaterialData({ sectionId: this.form.gradeId, subjectId: this.condition.subjectList[val].id })
            this.getLessons()
        },
        'form.gradeId'(val) {
            this.findMaterialData({ sectionId: val, subjectId: this.condition.subjectList[Number(this.activeName)].id })
            this.getLessons()
        },
        'form.termId'(val){
            this.getLessons()
        },
        'form.versionId'(val){
            this.getLessons()
        },
        'form.courseId'(val){
            if(!val){
                return
            }
        this.findLesChapterPage({ lessonId: val })
        this.detailLesson({id:val})
        this.findLessonMaterial({pageIndex:1,pageSize:1000000,lessonId:val})
        }
    },
    created() {
        this.findSubjectsData()
        this.findBaseTermPage({ pageIndex: 1, pageSize: 1000000 })
    },
    methods: {
        ...mapActions(['findBaseSectionPage', 'findSubjectsData', 'findBaseTermPage', 'findLessonPage', 'findMaterialData','findLesChapterPage','detailLesson','findLessonMaterial']),
        getLessons() {
            this.findLessonPage(
                {
                    pageIndex: 1,
                    pageSize: 10000000,
                    dataSubject: this.form.subjectId,
                    baseSectionId: this.form.gradeId,
                    baseTrimesterId: this.form.termId,
                    status:1
                })
        },
        downloadData(item){
            window.open(item.attchUrl+'?attname='+item.attchName)
        }
    }

}
</script>
<style lang="less" scoped>
    .empty{
        margin: 20px
    }
.times-ul {
    margin-top: 30px;
    li {
        margin-top: 8px;
        height: 50px;
        line-height: 50px;
        background: #f5f9fa;
        font-size: 16px;
        color: #333;
        padding: 0 10px;
        cursor: pointer;
        &:hover {
            background: #c9efe6;
        }
    }
}

.c-body {
    background: white;
    margin-top: 20px;
    display: flex;
    padding: 40px 35px 20px;
}

.c-left {
    flex: 1;
}

.c-right {
    width: 323px;
    margin-left: 60px;
    .i-video {
        margin-top: 30px;
        font-size: 14px;
        line-height: 20px;
        color: #333;
        .dplayer{
            max-height: 300px;
        }
    }
    .i-text {
        padding: 20px;
        margin-bottom: 35px;
    }
    .data-ul {
        margin-top: 18px;
        li {
            height: 57px;
            border-bottom: 1px dashed rgba(204, 204, 204, .3);
            line-height: 57px;
            padding: 0 20px;
            display: flex;
            align-items: center;
            &:hover {
                background: #f5f9fa;
                cursor: pointer;
            }
            img {
                width: 28px;
                height: 28px;
                margin-right: 20px;
            }
            span {
                display: inline-block;
                max-width: 250px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
}

.p-img {
    background: linear-gradient(to right, #00a1d6 0%, #00a1d6 50%, #09cfc0 51%, #09cfc0 100%);
    margin: 0 30px;
    height: 176px;
}

.p-img img {
    margin: auto;
    display: block;
}

.p-line {
    background: #007ba0;
    height: 20px;
    position: relative;
    &::before {
        content: '';
        width: 0;
        height: 0;
        border-top: 20px solid #f5f8f9;
        border-right: 30px solid transparent;
        position: absolute;
        left: 0;
    }
    &::after {
        content: '';
        width: 0;
        height: 0;
        border-top: 20px solid #f5f8f9;
        border-left: 30px solid transparent;
        position: absolute;
        right: 0;
    }
}

.prepare {
    padding-top: 34px;
}

.g-search {
    width: 100%;
    background: #fff;
    padding: 0 38px;
    box-sizing: border-box;
    ul {
        li {
            min-height: 50px;
            box-sizing: border-box; // line-height:50px;
            padding: 14px 0 4px 0;
            border-bottom: 1px dashed #e5e5e5;
            display: flex;

            .search-list {
                flex: 1;
                line-height: 22px;
            }
            &:last-child {
                border-bottom: 0 none;
            }
            .search-title {
                width: 64px;
                font-size: 12px;
                line-height: 22px;
                color: #333;
            }
        }
    }
}
</style>
<style lang="less">
.g-search {
    .el-radio-button__inner,
    .el-radio-button:first-child .el-radio-button__inner,
    .el-radio-button:last-child .el-radio-button__inner {
        border: 0;
        font-size: 12px;
        height: 22px;
        color: #00b099;
        margin: 0 10px 10px 0;
        padding: 0 18px;
        border-radius: 11px;
        line-height: 22px;
        display: inline-block;
        cursor: pointer;
    }
    .el-radio-button__orig-radio:checked+.el-radio-button__inner,
    .el-radio-button__orig-radio+.el-radio-button__inner:hover {
        background: #23c9b3;
        color: #fff;
    }
    .el-radio-button:focus:not(.is-focus):not(:active) {
        box-shadow: unset;
    }
    .el-radio-button__orig-radio:checked+.el-radio-button__inner {
        box-shadow: 0 0 0 0;
    }
}

.g-course {
    .el-radio-button__orig-radio:checked+.el-radio-button__inner {
        box-shadow: unset;
    }
    .el-radio-button__orig-radio+.el-radio-button__inner {
        border: 1px solid #fff !important;
    }
    .el-radio-button__orig-radio:checked+.el-radio-button__inner,
    .el-radio-button__orig-radio+.el-radio-button__inner:hover {
        background: #fff;
        color: #ff9000;
        border: 1px solid #ff9000 !important;
    }
}

.condit {
    .el-tabs__header {
        box-shadow: unset;
    }
    .el-tabs__item {
        height: 50px;
        line-height: 50px;
    }
    .el-tabs--border-card>.el-tabs__header {
        background: #eee;
    }
    .el-tabs--border-card>.el-tabs__header .el-tabs__item {
        border: 0;
        color: #007ba0;
        width: 140px;
        box-sizing: border-box;
        text-align: center;
    }
    .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
        font-weight: bold;
    }
    .el-tabs__item {
        font-size: 16px;
    }
}
</style>
