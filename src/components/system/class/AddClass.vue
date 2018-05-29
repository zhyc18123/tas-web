<template>
<el-row class="addclass-detail">
    <line-head-form class="head" title="新增班级"/>
    <el-form class="c-form" label-position="right" label-width="120px" :model="form">
        <el-form-item label="请选择课程:">
            <el-radio-group v-model="form.courseType">
                <el-radio :label="0" >标准课程</el-radio>
                <el-radio :label="1" >机构定制课程</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="请选择学科:">
            <el-select v-model="form.subject" placeholder="请选择学科">
                <el-option
                v-for="item in subjects"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="请选择年级:">
            <el-select v-model="form.grade" placeholder="请选择年级">
                <el-option
                v-for="item in grades"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="班型:">
            <el-select v-model="form.classSizeValue" placeholder="请选择班型">
                <el-option
                v-for="item in classSize"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="学期:">
            <el-radio-group v-model="form.semester">
                <el-radio :label="1">备选项</el-radio>
                <el-radio :label="2">备选项</el-radio>
                <el-radio :label="3">备选项</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="主讲老师:">
            <el-select v-model="form.teacherId" multiple  placeholder="请选择老师（最多添加2位老师）">
                <el-option
                v-for="item in teacherList"
                :key="item.teacherId"
                :label="item.teacherName"
                :value="item.teacherId">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="班级名称:">
            <el-input v-model="form.classname" placeholder="请输入班级名称"></el-input>
        </el-form-item>
        <el-form-item label="校区:">
            <el-select v-model="form.compusId"  placeholder="请选择校区">
                <el-option
                v-for="item in compusList"
                :key="item.compusId"
                :label="item.compusName"
                :value="item.compusId">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="开课日期:">
            <el-date-picker
            v-model="form.curriculumTime"
            type="date"
            placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="上课时段:" class="week">
            <el-checkbox  label="每天" v-model="form.everyday" @change="handleCheckedWeekChange"></el-checkbox>
            <el-checkbox-group v-model="form.checkweek" @change="handleCheckedWeekChange">
                <el-checkbox v-for="item in weekTime" :label="item.week" :key="item.weekId" ></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="是否跳过停课日:">   
            <el-radio label="是" v-model="form.skipStatus">
            </el-radio>
            <el-radio label="否" v-model="form.skipStatus"></el-radio>
        </el-form-item>
        <div class="week-time">
            <div class="week-time-box">
                <div class="every-time">
                    <el-select v-model="form.compusId"  placeholder="请选择段次">
                        <el-option
                        v-for="item in compusList"
                        :key="item.compusId"
                        :label="item.compusName"
                        :value="item.compusId">
                        </el-option>
                    </el-select>
                    <el-time-picker
                        is-range
                        v-model="form.everytime"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        placeholder="选择时间范围">
                    </el-time-picker>
                </div>
                <ul class="weeks-list">
                    <li v-for="item in weekTime" :key="item.weekId">
                        <span>{{item.week}}</span>
                        <el-time-picker
                            is-range
                            v-model="item.everytime"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            placeholder="选择时间范围">
                        </el-time-picker>
                    </li>
                </ul>
            </div>
        </div> -->
        <el-form-item class="class-btn">
            <el-button class="height-btn">确定</el-button>
            <el-button class="light-btn">取消</el-button>
        </el-form-item>
    </el-form>
</el-row>
</template>
<script>
import LineHeadForm from '../../common/LineHeadForm'
import FileUpload from '../../common/FileUpload'
export default {
  components: {
      LineHeadForm,
      FileUpload
  },
    data () {
        return {
            classSize:[{
                name:'提高班',
                id:1
            },{
                name:'状元班',
                id:2
            }
            ],
            teacherList:[
              {
                teacherName:'数学老师',
                teacherId:1,
              },
              {
                teacherName:'语文老师',
                teacherId:2,
              },
            ],
            compusList:[
               {
                compusName:'岗顶校区',
                compusId:1,
              },
              {
                compusName:'岗顶校区2',
                compusId:2,
              },
            ],
            weekTime:[
              {
                  week:"周一",
                  weekId:1,
                  everytime:""
              },
              {
                  week:"周二",
                  weekId:2,
                  everytime:""
              },
              {
                  week:"周三",
                  weekId:3,
                  everytime:""
              },
              {
                  week:"周四",
                  weekId:4,
                  everytime:""
              },
              {
                  week:"周五",
                  weekId:5,
                  everytime:""
              },
              {
                  week:"周六",
                  weekId:6,
                  everytime:""
              },
              {
                  week:"周日",
                  weekId:7,
                  everytime:""
              },
            ],
            subjects:[
                {
                    name:"语文",
                    id:"0"
                },
                 {
                    name:"数学",
                    id:"1"
                },
                 {
                    name:"英语",
                    id:"2"
                }
            ],
            grades:[
                {
                    name:"高一",
                    id:'1'
                },
                {
                    name:"高二",
                    id:'2'
                },
                {
                    name:"高三",
                    id:'3'
                },
                
            ],
            form:{
                courseType:0,
                subject:"",
                classSizeValue:'',
                grade:"",
                semester:1,
                teacherId:[],
                classname:"",
                compusId:"",
                curriculumTime:"",
                checkweek:[],
                everyday:false,
                skipStatus:'是',
                everytime:''
            }
        }
    },
    created(){

    },
    methods:{
        handleCheckedWeekChange(val){
            if(val.constructor==Array){
                console.log("array",val.constructor==Array)
                this.form.everyday = false
            }else if(val.constructor==Boolean){
                this.form.checkweek = []
                console.log("boolean",val.constructor==Boolean)
            }
      }
  }
}
</script>
<style lang="stylus" scoped>
.addclass-detail
    .c-form
        padding 0 200px
        margin auto
        margin-top 50px
        .el-select
            width 100%
            height 34px
        .el-input
            height 34px
        .week
            .el-checkbox-group
                display inline-block
                padding-left 33px
            .el-checkbox+.el-checkbox
                margin-left 35px
        .week-time
            height auto 
            padding-left 120px
            .week-time-box
                width 80%
                min-width 620px
                .every-time
                    height 80px
                    width 100%
                    border 1px solid #bfebf3
                    padding 23px 22px
                    box-sizing border-box
                    .el-select
                        width 25%
                        margin-right 20px
                .weeks-list
                    width 100%
                    border 1px solid #bfebf3
                    border-top 0 none
                    box-sizing border-box
                    padding 0 22px
                    li
                        padding 20px 0
                        border-bottom 1px dashed #cae3ee
                        &:last-child
                            border-bottom 0 none 
                        span 
                            display inline-block
                            width 25%
                            height 34px
                            margin-right 20px
                            line-height 34px
                            text-align center

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
    .class-btn
        text-align center
        padding-top 42px
</style>
<style lang="stylus">
.addclass-detail
    .c-form
        .el-form-item
            // height 34px
            // line-height 34px
            margin-bottom 26px
            .el-form-item__label
                height 34px
                line-height 34px
            .el-form-item__content
                line-height 34px
                height 34px
            .el-select
                .el-input
                    height 34px
                    .el-input__inner
                        height 34px !important
            .el-date-editor
                .el-input__prefix
                    height 34px
                    line-height 34px
                    top 0 !important 
                    .el-input__icon 
                       line-height 34px
                .el-input__suffix
                    .el-input__icon 
                       line-height 34px
</style>


