<template>
    <el-row class="data-detail">
        <course-step :active="2" />
        <div v-if="!isAdd">
            <div class="add-type">
                <span class="c-title">物理初二提高班（人教版）</span>
                <span class="b-line"></span>
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
        </div>
        <div v-if="isAdd" class="add-course">
            <div class="add-type">
                <div class="c-title">
                     物理初二提高班（人教版）
                    <p>已选择 0 讲，最多可选择  <em> 13 </em>讲</p>
                </div>
                <span class="b-line"></span>
            </div>
            <el-form :inline="true" :model="sForm" class="t-form">
                <el-form-item label="">
                    <el-select v-model="form.region" placeholder="年级">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-select v-model="form.region" placeholder="层级">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-select v-model="form.region" placeholder="学期">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="form.user" placeholder="请输入讲次名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
            <div class="t-cont" >
                <el-table :data="tableData" style="width: 100%" class="line-table"  @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55" :selectable="selectable"> </el-table-column>
                    <el-table-column prop="name" label="讲次名称"   align="center"></el-table-column>
                    <el-table-column prop="knowledge"  label="知识点"   align="center">  </el-table-column>
                    <el-table-column prop="type" label="讲次类型" align="center"></el-table-column>  
                </el-table>
            </div>
            <div class="next-btn" >
                <el-button class="height-btn" @click="isAdd=!isAdd">确定</el-button>
            </div>
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
            isAdd:false,
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
                    name: "长度的测量 ",
                    knowledge: "长度的测量，时间的测量  ",
                    type:"非期中期末"
                },
                {
                    name: "长度的测量 ",
                    knowledge: "长度的测量，时间的测量  ",
                    type:"非期中期末"
                },
                {
                    name: "长度的测量 ",
                    knowledge: "长度的测量，时间的测量  ",
                    type:"非期中期末"
                },
                {
                    name: "长度的测量 ",
                    knowledge: "长度的测量，时间的测量  ",
                    type:"非期中期末"
                },
            ],
            addCourseList:[],
        }
    },
    methods: {
        getListResult() {

        },
        onSubmit() {

        },
        addCourse() {
            this.isAdd = true
        },
        onEnd(end) {
            console.log("xx", end)
        },
        sure() {
            this.$router.push({path:'/main/teach-research/course/view-lecture/courseWare/'+ this.myArray[0].id+'/1'})
         },
        handleSelectionChange(val){
            this.addCourseList = val
            console.log(val)
        },
        selectable(val,index){
           if(this.addCourseList.length>2){
               return false
           }else{
               return true
           }
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


