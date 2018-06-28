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
                                    <label>校区：</label>
                                </div>
                                <div class="search-list">
                                    <el-radio-group v-model="form.schoolId" size="mini">
                                        <el-radio-button label="">全部</el-radio-button>
                                        <el-radio-button v-for="item in school.schoolObj.list" :label="item.id" :key="item.id">{{item.name}}</el-radio-button>
                                    </el-radio-group>
                                </div>
                            </li>
                            <li class="g-course">
                                <div class="search-title">
                                    <label>班级：</label>
                                </div>
                                <div class="search-list">
                                    <el-radio-group v-model="form.classId" size="mini">
                                        <el-radio-button v-for="(item,index) in classes.classObj.list" :label="item.id">{{item.className}}</el-radio-button>
                                    </el-radio-group>
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="t-card c-body empty t-flexs" v-if="!(classes.classObj.list&&classes.classObj.list.length)">
            <img src="../../assets/img/class-empty.png" alt="">
            <div>没有班级哦，请重新筛选</div>
        </div>
        <div v-else class="t-card c-body t-flexs" v-show="form.classId">
            <div class="c-left t-flex">
                <line-head :title="className+'课程讲次'" />
                <ul class="times-ul" v-if="classes.classChapterList.length">
                    <template v-for="(item,i) in classes.classChapterList">
                        <router-link tag="li" :to="{path:'/main/prepare-lessons/'+item.chapterId+'/courseWare/read',query:{lessonId:lessonId,lectureNum:i+1,className:className,classId:form.classId}}" v-if="item.status===1">第 {{i+1}} 讲
                            <span>{{item.chapterName}}</span>
                        </router-link>
                        <li v-else class="disable">第 {{i+1}} 讲
                            <span>{{item.chapterName}}</span>
                        </li>
                    </template>
                </ul>
                <div class="empty" v-else>
                    暂无课程讲次
                </div>
            </div>
            <div class="c-right">
                <div class="c-introduce">
                    <line-head :title="className+'课程说明'" />
                    <div class="i-video">
                        <d-player ref="dplay" @fullscreen="fullscreen" :class="{full:!isFullscreen}" v-if="detail.videoUrl" :options="{video:{url:detail.videoUrl,pic:detail.videoUrl+'-thumbnail-2'}}"></d-player>
                    </div>
                    <div class="i-text" :title="detail.remark">
                        {{detail.remark}}
                    </div>
                </div>
                <div class="c-data">
                    <line-head title="课程资料" />
                    <ul class="data-ul" v-if="course.courseDataObj.list&&course.courseDataObj.list.length">
                        <li v-for="(item,i) in course.courseDataObj.list" @click="downloadData(item)">
                            <img :src="item.imgUrl" alt="">
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
import storage from 'lib/storage'
import pdf from '../../assets/img/pdf.png'
import ppt from '../../assets/img/ppt.png'
import word from '../../assets/img/word.png'
import excel from '../../assets/img/excel.png'
import rar from '../../assets/img/rar.png'
import videoImg from '../../assets/img/video.png'
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
                classId: '',
                schoolId: ''
            },
            className: '',
            lessonId: '',
            fileType: {
                pdf, ppt, word, excel, rar, videoImg
            },
            detail: {},
            isFullscreen: false
        }
    },
    computed: {
        ...mapState(['condition', 'classes', 'chapter', 'school', 'course']),
    },
    watch: {
        'course.courseDetail'(val) {
            this.detail = val
        },
        'course.courseDataObj'(val) {
            val && val.list.map((item, i) => {
                console.log(item.attchType)
                if (item.attchType === '0') {
                    item.imgUrl = item.attchUrl
                } else if (item.attchType === '1') {
                    item.imgUrl = this.fileType.ppt
                } else if (item.attchType === '2') {
                    item.imgUrl = this.fileType.word
                } else if (item.attchType === '3') {
                    item.imgUrl = this.fileType.excel
                } else if (item.attchType === '4') {
                    item.imgUrl = this.fileType.pdf
                } else if (item.attchType === '5') {
                    item.imgUrl = this.fileType.rar
                } else if (item.attchType === '6') {
                    item.imgUrl = this.fileType.videoImg
                } else {
                    item.imgUrl = item.attchUrl
                }
            })
            console.log(val)
        },
        'condition.subjectList'(val) {
            this.findBaseSectionPage({ pageIndex: 1, pageSize: 1000000, subjectId: val[0].id })
            this.activeName = 0 + ''
        },
        'condition.gradeObj'(val) {
            this.form.gradeId = val.list[0] && val.list[0].id
        },
        'condition.termObj'(val) {
            this.form.termId = val.list[0] && val.list[0].id
        },
        'classes.classChapterList'(val) {
            storage.setChapter(val)
        },
        'classes.classObj'(val) {
            console.log('xx', val)
            this.form.classId = val.list[0] && val.list[0].id
            // this.className=val.list[0]&&val.list[0].className
        },
        activeName(val) {
            this.findBaseSectionPage({ pageIndex: 1, pageSize: 1000000, subjectId: this.condition.subjectList[val].id })
            // this.findMaterialData({ sectionId: this.form.gradeId, subjectId: this.condition.subjectList[val].id })
            this.getClasses()
        },
        'form.gradeId'(val) {
            // this.findMaterialData({ sectionId: val, subjectId: this.condition.subjectList[Number(this.activeName)].id })
            this.getClasses()
        },
        'form.termId'(val) {
            this.getClasses()
        },
        'form.schoolId'(val) {
            this.getClasses()
        },
        activeName(val) {
            this.getClasses()
        },
        'form.classId'(val) {
            if (!val) {
                return
            }
            this.detail = {}
            this.lessonClassPlanChapterList({ id: val })
            this.classes.classObj.list.map((item, i) => {
                if (item.id === val) {
                    this.className = item.className
                    this.lessonId = item.lessonId
                    this.detailLesson({ id: item.lessonId })
                    this.findLessonMaterial({ pageIndex: 1, pageSize: 1000000, lessonId: item.lessonId })
                }
            })
        }
    },
    created() {
        this.findSubjectsData()
        this.findBaseTermPage({ pageIndex: 1, pageSize: 1000000 })
        this.findBaseSchoolPage({ pageIndex: 1, pageSize: 1000000 })
    },
    methods: {
        ...mapActions(['findBaseSectionPage', 'findSubjectsData', 'findBaseTermPage', 'findClassPage', 'findBaseSchoolPage', 'lessonClassPlanChapterList', 'detailLesson', 'findLessonMaterial']),
        // getLessons() {
        //     this.findLessonPage(
        //         {
        //             pageIndex: 1,
        //             pageSize: 10000000,
        //             dataSubject: this.form.subjectId,
        //             baseSectionId: this.form.gradeId,
        //             // baseTrimesterId: this.form.termId,
        //             status: 1
        //         })
        // },
        getClasses() {
            this.findClassPage({ pageIndex: 1, pageSize: 1000000, baseSectionId: this.form.gradeId, baseTrimesterId: this.form.termId, schoolId: this.form.schoolId, dataSubject: this.condition.subjectList[Number(this.activeName)].id })
        },
        downloadData(item) {
            window.open(item.attchUrl + '?attname=' + item.attchName)
        },
        fullscreen() {
            this.isFullscreen = true
        }
    }

}
</script>
<style lang="less" scoped>
.empty {
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
        font-weight: bold;
        padding: 0 18px;
        cursor: pointer;
        span {
            margin-left: 20px;
            font-weight: normal;
        }
        &:hover {
            background: #c9efe6;
        }
        &.disable {
            cursor: auto;
            background: #ccc;
            color: #666;
            &:hover {
                background: #ccc;
            }
        }
    }
}

.c-body {
    background: white;
    margin-top: 20px;
    display: flex;
    padding: 40px 40px 20px;
    margin-bottom: 3px;
}

.empty {
    padding: 60px 0 100px;
    margin: 20px 0;
    img {
        margin: auto;
    }
    display: block;
    text-align: center;
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
        .full {
            max-height: 300px;
        }
    }
    .i-text {
        padding: 20px;
        margin-bottom: 35px;
        max-height: 60px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
        overflow: hidden;
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
        border: 2px solid #fff !important;
        line-height:20px !important;
    }
    .el-radio-button__orig-radio:checked+.el-radio-button__inner,
    .el-radio-button__orig-radio+.el-radio-button__inner:hover {
        background: #fff;
        color: #ff9000;
        border: 2px solid #ff9000 !important;
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
