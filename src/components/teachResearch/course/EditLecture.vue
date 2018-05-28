<template>
    <el-row class="data-detail">
        <course-step :active="2" />
        <div class="add-type">
            <span class="c-title">物理初二提高班（人教版）</span>
            <el-button type="primary" class="new-btn" @click="addCourse">添加课程讲次</el-button>
        </div>
        <draggable v-model="myArray" @end="onEnd" class="drag-list">
            <div class="d-item" v-for="(element,i) in myArray" :key="element.id">
                <span class="l-num">第
                    <span>{{i+1}}</span>讲</span> {{element.name}}
                <div class="l-opt">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-huanhuo"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-icon-cross-empty"></use>
                    </svg>
                </div>
            </div>
        </draggable>

        <div class="opt-btn">
            <el-button class="height-btn" @click="sure">确定发布</el-button>
            <el-button class="light-btn">暂不发布</el-button>
        </div>
    </el-row>
</template>
<script>
import CourseStep from '../../common/CourseStep'
import Upload from '../../common/Upload'
import VPagination from '../../common/Pagination'
import draggable from 'vuedraggable'
export default {
    components: {
        CourseStep,
        Upload,
        VPagination,
        draggable
    },
    data() {
        return {
            myArray: [{ id: 1, name: '长度与时间的测量' }, { id: 2, name: '机械运动' }],
            form: {
                name: '',
                operatStatus: '',
                effictTime: '',
                regin: ''
            },
            sForm: {
                pageIndex: 1,
                pageSize: 10
            },
            addType: '1',
            checkItem: '',
            checkList: [],
            result: {
                total: 99
            },
            tableData: [
                {
                    className: "2018春季物理提高班",
                    grade: "初二",
                    term: "春季",
                    campus: "岗顶校区",
                    curriculumTime: "2017-02-12",
                    tier: "提高班",
                    schoolTime: "8:45 - 9:45",
                    week: '周一'
                }
            ],
        }
    },
    methods: {
        getListResult() {

        },
        onSubmit() {

        },
        addCourse() {

        },
        onEnd(end) {
            console.log("xx", end)
        },
        sure() {
            this.$router.push({path:'/main/teach-research/course/view-lecture/1'})
         }
    }
}
</script>
<style lang="stylus" scoped>
@import '~assets/stylus/mixin.styl'
.data-detail
    padding-bottom 70px
    .drag-list
        margin-top 20px
        padding 0 50px
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
                    font-size 29px
                    color #009170
                    &:first-child
                        margin-right 20px
    .c-title
        font-weight bold
        color #333
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
        margin 15px 50px 0
        border-bottom 4px solid #bfebf3
    .gray
        table-form()
        padding-top 15px
        padding-right 20px
        padding-bottom 10px
        .el-form-item
            margin-bottom 0
    .o-form
        padding 0 200px
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


