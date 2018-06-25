<template>
    <el-row class="data-detail">
        <course-step :active="2" v-if="course.courseChapterObj.status!==1" />
        <div v-if="!isAdd">
            <div class="add-type">
                <span class="c-title">{{course.courseChapterObj.name}}</span>
                <span class="b-line"></span>
                <el-button type="primary" class="new-btn" @click="addCourse" v-if="course.courseChapterObj.status!==1">添加课程讲次</el-button>
            </div>
            <draggable v-model="myArray" @end="onEnd" class="drag-list">
                <div class="d-item" v-for="(element,i) in myArray" :key="element.id">
                    <span class="l-num">第
                        <span>{{i+1}}</span>讲</span> {{element.name}}
                    <div class="l-opt" v-if="course.courseChapterObj.status!==1">
                        <svg class="icon" aria-hidden="true" @click="addCourse();isChange=true;changeItemId=element.id">
                            <use xlink:href="#icon-huanhuo"></use>
                        </svg>
                        <svg class="icon" aria-hidden="true" @click="delLesChapters(element.id)">
                            <use xlink:href="#icon-icon-cross-empty"></use>
                        </svg>
                    </div>
                </div>
            </draggable>
            <div class="opt-btn" v-if="course.courseChapterObj.status===0">
                <el-button type="primary" class="height-btn" @click="preview(true)">发布教学计划，下一步</el-button>
                <el-button type="primary" class="light-btn" @click="preview">暂不发布教学计划，下一步</el-button>
            </div>
            <div class="opt-btn" v-else>
                <el-button type="primary" class="height-btn" @click="preview">下一步</el-button>
            </div>
        </div>
        <div v-if="isAdd" class="add-course">
            <div class="add-type">
                <div class="c-title">
                    {{course.courseChapterObj.name}}
                    <p>已选择 {{tableSelectNum+chapterNum}} 讲，最多可选择
                        <em> {{chapterTotal}} </em>讲</p>
                </div>
                <span class="b-line"></span>
            </div>
            <el-form :inline="true" :model="form" class="t-form">
                <!--<el-form-item label="">
                                <el-select v-model="form.subjectId" placeholder="科目">
                                    <el-option label="全部" value=""></el-option>
                                    <el-option v-for="(subject,index) in condition.subjectList" :label="subject.name" :value="subject.id"></el-option>
                                </el-select>
                            </el-form-item>-->
                <el-form-item label="">
                    <el-select v-model="form.sectionId" placeholder="年级">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="(grade,index) in condition.gradeObj.list" :label="grade.name" :value="grade.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-select v-model="form.baseLevelId" placeholder="班型">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="(level,index) in condition.levelObj.list" :label="level.name" :value="level.id"></el-option>
                    </el-select>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="form.name" placeholder="请输入讲次名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                </el-form-item>
            </el-form>
            <div class="t-cont">
                <el-table :data="chapter.chapterObj.list" style="width: 100%" class="line-table" @selection-change="handleSelectionChange" ref="table">
                    <el-table-column v-if="!isChange" type="selection" width="55" :reserve-selection="false"> </el-table-column>
                    <el-table-column v-else label="" align="center" width="60">
                        <template scope="scope">
                            <el-radio :label="scope.row.id" v-model="checkItem" class="table-radio"></el-radio>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="讲次名称" align="center"></el-table-column>
                    <el-table-column prop="subjectName" label="科目" align="center"></el-table-column>
                    <el-table-column prop="sectionNames" label="年级" align="center"> </el-table-column>
                    <el-table-column prop="leverName" label="班型" align="center"> </el-table-column>
                </el-table>
                <v-pagination ref="pagin" class="pag" :total="chapter.chapterObj.total|toNumber" @getListResult="getChapterList" :currentPage="form.pageIndex"></v-pagination>
            </div>
            <div class="next-btn">
                <el-button class="height-btn" @click="sure">确定</el-button>
                <el-button class="light-btn" @click="cancle">取消</el-button>
            </div>
        </div>
    </el-row>
</template>
<script>
import CourseStep from '../../common/CourseStep'
import Upload from '../../common/Upload'
import VPagination from '../../common/Pagination'
import draggable from 'vuedraggable'
import { mapState, mapActions } from 'vuex'
import io from 'lib/io'
export default {
    components: {
        CourseStep,
        Upload,
        VPagination,
        draggable
    },
    data() {
        return {
            id: this.$route.params.id,
            myArray: [],
            isAdd: false,
            isChange: false,
            form: {
                name: '',
                subjectId: null,
                sectionId: null,
                baseLevelId: null,
                pageIndex: 1,
                pageSize: 10
            },
            chapterTotal: 10,
            chapterNum: 0,
            tableSelectNum: 0,
            tableSelectItem: [],
            addType: '1',
            checkItem: '',
            changeItemId: '',
            checkList: [],
            addCourseList: [],
        }
    },
    computed: {
        ...mapState(['chapter', 'condition', 'course'])
    },

    created() {
        this.findLesChapterPage({ lessonId: this.id })
    },
    watch: {
        'form.subjectId'(val) {
            this.findBaseSectionPage({ pageIndex: 1, pageSize: 1000000, subjectId: this.form.subjectId })
        },
        // 'chapter.courseChapter'(val) {
        //     this.chapterNum = val.list.length
        // },
        'course.courseChapterObj'(val) {
            this.chapterTotal = Number(val.chapterNum)
            this.myArray = [...val.list]
            this.chapterNum = val.list.length
            this.form.subjectId = val.dataSubject
        },
        'chapter.chapterObj'(val) {
            // [...val.list].map((item,i)=>{
            //     this.tableSelectItem.map((tItem,tI)=>{
            //         if(item.id===tItem.id){
            //             this.$refs.table.toggleRowSelection(item,true)
            //         }
            //     })
            // })
        }
    },
    methods: {
        ...mapActions(['findLesChapterPage', 'findBaseChapterPage', 'findBaseSectionPage', 'findSubjectsData', 'findBaseLevelPage']),
        preview(isPublish) {
            if (!this.myArray.length) {
                this.$message('请先选择讲次')
                return
            }
            if (isPublish === true) {
                this.publishLesson()
            } else {
                this.$router.push({
                    path: '/main/teach-research/course/view-lecture/courseWare/' + this.id + '/' + this.myArray[0].id
                })
            }
        },
        async publishLesson() {
            let tipText = '是否发布？发布后不能新增、移动、修改讲次'
            this.$confirm(tipText).then(async () => {
                let { data } = await io.post6(io.publishLesson, { id: this.id, status: 1 })
                if (data.success) {
                    this.$message('发布成功')
                    this.$router.push({
                        path: '/main/teach-research/course/view-lecture/courseWare/' + this.id + '/' + this.myArray[0].id
                    })
                }
            })
        },
        search() {
            this.$refs.pagin.changePage(1)
            this.getChapterList()
        },
        getChapterList(opt) {
            this.findBaseChapterPage({ ...this.form, ...opt })
        },
        getListResult() {

        },
        onSubmit() {

        },
        addCourse() {
            this.getChapterList()
            this.findBaseSectionPage({ pageIndex: 1, pageSize: 1000000, subjectId: this.form.subjectId })
            this.findSubjectsData({ sectionId: this.form.sectionId })
            this.findBaseLevelPage({ pageIndex: 1, pageSize: 1000000 })
            this.isAdd = true
        },
        changeCourse() {
            this.getChapterList()
            this.findBaseSectionPage({ pageIndex: 1, pageSize: 1000000, subjectId: this.form.subjectId })
            this.findSubjectsData({ sectionId: this.form.sectionId })
            this.findBaseLevelPage({ pageIndex: 1, pageSize: 1000000 })
            this.isAdd = true
        },
        onEnd(end) {
            console.log("xx", end)
            this.sortLesChapters()
        },
        // sure() {
        //     this.$router.push({ path: '/main/teach-research/course/view-lecture/courseWare/' + this.myArray[0].id + '/1' })
        // },
        handleSelectionChange(val) {
            console.log('val', val)
            this.tableSelectNum = val.length
            this.tableSelectItem = val
            if (this.tableSelectNum + this.chapterNum > this.chapterTotal) {
                this.$message('最多只能选择' + this.chapterTotal + '讲')
                this.$refs.table.toggleRowSelection(val[val.length - 1], false)
                return
            }
            // val.map((item, i) => {
            //     this.myArray.map((mItem, mI) => {
            //         console.log(mItem)
            //         if (item.id === mItem.id) {
            //             console.log("xxxxxx")
            //             this.$refs.table.toggleRowSelection(val[val.length - 1], false)
            //             return
            //         }
            //     })
            // })
        },
        sure() {
            if (this.changeItemId) {
                this.changeLesChapter()
            } else {
                this.addLesChapters()
            }
        },
        cancle() {
            this.isAdd = false
        },
        async addLesChapters() {
            if (!this.tableSelectItem.length) {
                this.$message('请选择讲次')
                return
            }
            let chapterIds = []
            this.tableSelectItem.map((item, i) => {
                chapterIds.push(item.id)
            })
            let { data } = await io.post6(io.addLesChapters, { baseChapterIds: chapterIds.join(','), lessonId: this.id })
            if (data.success) {
                this.$message('保存成功！')
                this.tableSelectItem = []
                this.tableSelectNum = 0
                this.findLesChapterPage({ lessonId: this.id })
                this.isAdd = false
            }
        },
        async changeLesChapter() {
            let { data } = await io.post6(io.changeLesChapter, { lessonId: this.id, id: this.changeItemId, baseChapterId: this.checkItem })
            if (data.success) {
                this.$message("更换成功！")
                this.findLesChapterPage({ lessonId: this.id })
                this.changeItemId = ''
                this.isChange = false
                this.isAdd = false
            }
        },
        async delLesChapters(id) {
            this.$confirm('确认删除？', '提示').then(async () => {
                let { data } = await io.post6(io.delLesChapters, { lessonId: this.id, id: id })
                if (data.success) {
                    this.$message('删除成功！')
                    this.findLesChapterPage({ lessonId: this.id })
                }
            })
        },
        async sortLesChapters() {
            let ids = []
            this.myArray.map((item, i) => {
                ids.push(item.id)
            })
            let { data } = await io.post6(io.sortLesChapters, { lessonId: this.id, ids: ids.join(',') })
            if (data.success) {
                this.$message('修改成功！')
            }
            this.findLesChapterPage({ lessonId: this.id })
        },
        // selectable(val, index) {
        //     if (this.addCourseList.length > 2) {
        //         return false
        //     } else {
        //         return true
        //     }
        // }
    }
}
</script>
<style lang="stylus" scoped>
@import '~assets/stylus/mixin.styl'
.data-detail
    padding-bottom 70px
    .drag-list
        margin-top 20px
        // padding 0 50px
        margin-bottom 170px
        .d-item
            height 50px
            line-height 50px
            padding-left 10px
            background rgba(221,234,238,.3)
            margin-bottom 10px
            position relative
            cursor pointer
            &:hover
                background rgba(75,202,173,.3)
                .l-opt
                    display block
            .l-num
                margin-right 20px
                font-size 16px
                span 
                    margin 0 2px
                    font-weight bold
            .l-opt
                display none
                position absolute
                right 25px
                top 6px
                .icon
                    font-size 28px
                    color #009170
                    &:first-child
                        margin-right 20px
                        font-size 30px
    .c-title
        font-weight bold
        color #333
        p
            float right 
            font-size 12px
            color #333333
            font-weight 500
            em
                font-size 14px
                color #ff8326
                font-weight 700
    .b-line
        height 1px
        display block 
        width 100%
        border-bottom 1px solid #bfebf3
        position absolute 
        left 0 
        bottom 1px
    .new-btn
        border-radius 30px
        background #1ebd99
        border-color #1ebd99
        float right 
    .has-course-btn
        margin-top 50px
    .add-type
        height 45px
        line-height 45px
        margin 25px 0 0
        position relative
        border-bottom 4px solid #bfebf3
    .gray
        table-form()
        padding-top 15px
        padding-right 20px
        padding-bottom 10px
        .el-form-item
            margin-bottom 0
    .o-form
        // padding 0 200px
        margin auto
        margin-top 50px
        .el-select
            width 100%
    .head
      margin-top 10px
    .free-num
        margin-left 10px
        font-style normal
    .personal
        border 0
        color #606266
        &:hover
            background transparent
    .opt-btn
        text-align center
    .surport
        color #ff7800
        padding-left 40px
    .add-course
        .next-btn
            text-align center
            padding-top 70px
        .t-form
            margin 10px 0 28px 0
            padding 22px 20px 0 20px
            background #f7f7f7
            
.has-course
    padding 20px 50px 
</style>
<style lang="stylus">
.data-detail .gray
    .el-form-item__label,.el-form-item__content
        line-height 30px
        font-size 14px
        font-weight normal 
.table-radio
    .el-radio__label
        display none
</style>


