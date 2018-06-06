<template>
<el-row class="class-detail">
    <line-head-form class="head" title="班级详情"/>
    <div class="detail-cont">
        <div class="cont-head">
             <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-banciguanli"></use>
            </svg>
            <span>物理能力提高班</span>
            <em>开课中</em>
        </div>
        <div class="cont-main">
            <el-steps :active="stepActive" direction="vertical" name="">
                <el-step title="班级基础信息" >
                    <div slot="title"  class="title">
                        <span>班级基础信息</span>
                        <el-button @click="$router.push('/main/system/class/add')">修改基本信息</el-button>
                    </div>
                    <div slot="description" class="class-info">
                        <ul class="">
                            <li>
                                <div class="info-item">
                                    <div slot="label" class="tow-four">
                                       班级编号：
                                    </div>
                                    <span>12311313131</span>
                                </div>
                                <div class="info-item">
                                    <div slot="label" class="tow-four">
                                        学<span>科：</span>
                                    </div>
                                    <span>初中物理</span>
                                </div>
                                <div class="info-item">
                                    <div slot="label" class="tow-four">
                                       创建日期：
                                    </div>
                                    <span>2018-01-01</span>
                                </div>
                                <!-- <div class="info-item">
                                    <div slot="label" class="tow-four">
                                        上课时段：
                                    </div>
                                    <span>周一  09:10-11:20，周二  09:10-11:20</span>
                                </div> -->
                            </li>
                            <li>
                                <div class="info-item">
                                    <div slot="label" class="tow-four">
                                       学员总数：
                                    </div>
                                    <span>50</span>
                                </div>
                                <div class="info-item">
                                    <div slot="label" class="tow-four">
                                        年<span>级：</span>
                                    </div>
                                    <span>初二</span>
                                </div>
                                <div class="info-item">
                                    <div slot="label" class="tow-four">
                                       所在校区：
                                    </div>
                                    <span>岗顶校区</span>
                                </div>
                            </li>
                            <li>
                                <div class="info-item">
                                    <div slot="label" class="tow-four">
                                       每讲总数：
                                    </div>
                                    <span>15讲</span>
                                </div>
                                <div class="info-item">
                                    <div slot="label" class="tow-four">
                                        开课日期：
                                    </div>
                                    <span>2018-01-01</span>
                                </div>
                                <div class="info-item">
                                    <div slot="label" class="tow-four">
                                      班<span>型：</span>
                                    </div>
                                    <span>物理能力提高</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-step>
                <el-step title="主讲老师基础信息" >
                    <div slot="title" class="title">
                        <span>主讲老师基础信息</span>
                        <el-button @click="dialogAddTeacher = true">添加主讲老师</el-button>
                    </div>
                    <div slot="description" class="teacher-info">
                        <ul>
                            <li v-for="(item,index) in teacherData" :key="item.id">
                                <span class="teacher-order">主讲老师{{index+1}}</span>
                                <span>{{item.name}}</span>
                                <div class="teacher-btn">
                                    <el-button  @click="dialogAddTeacher = true">更换</el-button>
                                    <el-button>删除</el-button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-step>
                <el-step title="讲次排课信息" >
                    <div slot="title" class="title">
                        <span>讲次排课信息</span>
                        <!-- <el-button>修改讲次课表</el-button> -->
                    </div>
                    <div slot="description">
                        <el-table 
                            :data="tableData"
                            class="line-table"
                            header-align="center" 
                            style="width: 100%">
                            <el-table-column
                                prop="course"
                                label="讲次"
                                align = "center"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="courseName"
                                label="讲次名称"
                                align = "center"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="dateTime"
                                align = "center"
                                label="日期">
                            </el-table-column>
                            <el-table-column
                                prop="substituteTeacher"
                                align = "center"
                                label="带课老师">
                            </el-table-column>
                            <el-table-column
                                align = "center"
                                label="操作">
                                <template slot-scope="scope">
                                    <div>
                                        <el-button class="noborder"  @click="dialogAddTeacher = true">添加代课老师</el-button>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-step>
                <el-step v-show="false">
                    
                </el-step>
            </el-steps>
        </div>
        <el-dialog title="选择老师" :visible.sync="dialogAddTeacher" class="add-teacher" width="40%">
            <el-form>
                <el-form-item >
                    <el-input v-model="query.keyword" auto-complete="off" placeholder="请输入关键字进行筛选"></el-input>
                    <el-button>搜索</el-button>
                </el-form-item>
            </el-form>
            <div class="teacher-table">
                <el-table :data="TeacherData" ref="multipleTable"  tooltip-effect="dark"  @selection-change="handleSelectionChange" :show-header="false" max-height = '300' >
                    <el-table-column  type="selection" width="55" :selectable="selectable"></el-table-column>
                    <el-table-column property="teacherName" label="姓名" width="200"></el-table-column>
                    <el-table-column property="course" label="科目" align="right"></el-table-column>
                </el-table>
            </div>
            <div class="add-btn">
                <el-button class="height-btn">确认</el-button>
                <el-button class="light-btn">取消</el-button>
            </div>
        </el-dialog>
    </div>
    
</el-row>
</template>
<script>
import LineHeadForm from '../../common/LineHeadForm'
import {mapActions,mapState} from 'vuex'
import util from 'lib/util'
import io from 'lib/io'
export default {
    components: {
         LineHeadForm,
    },
    data () {
        return {
            id:this.$route.query.id,
            stepActive:4,
            teacherData:[
                {
                    name:"王小明",
                    id:1,
                },
                {
                    name:"王小明",
                    id:2,
                }
            ],
            tableData:[
                {
                    substituteTeacher:'刘德华',
                    course:'第1讲',
                    courseName:'内能的应用',
                    dateTime:"2018-05-14",
                },
                 {
                    substituteTeacher:'刘德华',
                    course:'第2讲',
                    courseName:'内能的应用',
                    dateTime:"2018-05-14",

                }
            ],
            TeacherData:[
                {
                    teacherName:"刘德华",
                    course:"物理",
                    id:1,
                },
                {
                    teacherName:"刘德华",
                    course:"物理",
                    id:2,
                },
                 {
                    teacherName:"刘德华",
                    course:"物理",
                    id:3,
                },
                 {
                    teacherName:"刘德华",
                    course:"物理",
                    id:4,
                },
                 {
                    teacherName:"刘德华",
                    course:"物理",
                    id:5,
                },
                 {
                    teacherName:"刘德华",
                    course:"物理",
                    id:6,
                },
                 {
                    teacherName:"刘德华",
                    course:"物理",
                    id:7,
                }
            ],
            dialogAddTeacher:false,
            addTeacher:[],
            query:{
                keyword:""
            }
        }
    },
    created(){
        this.id = this.$route.query.id
        this.classDetail({ id: this.form.id })
        this.getTeacger()
    },
    computed:{
        ...mapState(["classes"])
    },
    methods:{
        ...mapActions(["classDetail"]),
        //查询老师
        getTeacger(){
           let param = this.query
            io.post6(io.teacherList,param,(ret)=>{
                this.TeacherData = ret
                console.log(ret)
            })
        },
        handleSelectionChange(val){
            this.addTeacher = val
            console.log(val)
        },
        selectable(){
            console.log(arguments)
            if(this.addTeacher.length>=2){
                this.TeacherData.map((item)=>{
                    if(arguments[0].id == item.id){
                        return true
                    }else{
                        return false
                    }
                })
            }else{
                return true;
            }
        },
  }
}
</script>
<style lang="stylus" scoped>
.noborder.el-button
    background transparent
    border 0 none 
    color #009ada
    padding 0 
    border-bottom 1px solid #009ada
    border-radius 0 
.class-detail
    .head
        margin-top 10px
    .detail-cont
        width 85%
        margin 0 auto
        padding-top 30px
        .cont-head
            width 100%
            height 60px
            border-radius 30px
            background rgba(0, 177, 209, 0.2);
            line-height 60px
            padding 0 21px 0 28px
            box-sizing border-box
            .icon
                font-size 30px
                color #00b1d1
                vertical-align -0.3em
            span 
                padding-left 20px
                font-size 18px
                color #333
                font-weight 700
            em
                font-size 16px
                color #ff9600
                font-weight 700
                float right
        .cont-main
            width 100%
            padding 38px 64px 38px 25px
            box-sizing border-box
            .el-step
                .title
                    .el-button
                        height 30px
                        background #009ada
                        border 1px solid #009ada
                        color #ffffff
                        font-size 12px
                        float right
                .class-info
                    width 100%
                    // height 222px
                    background rgba(230, 236, 238, 0.4)
                    ul
                        display flex
                        height 100%
                        padding 47px 0
                        box-sizing border-box
                        li
                            flex 1
                            height 100%
                            padding-left 40px
                            .info-item
                                font-size 14px 
                                color #333
                                margin-bottom 22px
                                &:last-child
                                    margin-bottom 0px
                                .tow-four
                                    display inline-block
                                &>span 
                                    text-overflow ellipsis
                                    overflow hidden
                                    white-space nowrap
                .teacher-info
                    width 100%
                    ul
                        li
                            height 50px
                            background rgba(230, 236, 238, 0.4)
                            margin-bottom 2px 
                            padding-left 40px
                            font-size 14px
                            line-height 50px
                            color #333
                            .teacher-order
                                display inline-block
                                width 150px
                            .teacher-btn
                                float right
                                height 50px
                                padding 0 44px
                                line-height 50px
                                box-sizing border-box
                                .el-button
                                    background transparent
                                    height 18px
                                    color #009ada
                                    border 0 none
                                    font-size 14px
                                    margin-left 50px
                                    padding 0 
                                    border-bottom 1px solid #009ada
                                    border-radius 0 
        .add-teacher
            min-width 580px
            .el-form-item
                padding 20px 30px 0 20px
                .el-input
                    width 85%
                    height 38px
                .el-button
                    background #009ada
                    color #fff
                    height 36px
                    margin-left 10px
            .teacher-table
                padding 0 30px
                .el-table
                    border 0 none !important
            .add-btn
                text-align center
                margin-top 100px
                padding-bottom 20px
                .el-button
                    height 38px


</style>
<style lang="stylus">
.class-detail
    .detail-cont
        .cont-main
            .el-steps
                .el-step.is-vertical .el-step__line
                    left 16px
                    width 3px
                .el-step
                    .el-step__head
                        width 36px
                        .el-step__line
                            background #cceff6
                        .el-step__icon
                            background #00b1d1
                            width 36px
                            height 36px
                            .el-step__icon-inner
                                color #fff
                                font-size 20px
                                // font-style italic 
                        .el-step__icon.is-text
                            border 3px solid #fff
                    .el-step__head.is-finish
                        color #cceff6
                        border-color #cceff6
                    .el-step__main
                        padding-left 23px
                        padding-bottom 37px
                        box-sizing border-box
                        .el-step__title
                            height 36px
                            line-height 36px
                            color #333
                            font-size 14px
                            font-weight 700 
                        .el-step__description
                            padding-right 0       
        .add-teacher
            .el-input
                height 38px
                .el-input__inner
                    height 38px
                    line-height 38px


</style>


