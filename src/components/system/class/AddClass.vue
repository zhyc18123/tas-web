<template>
    <el-row class="addclass-detail">
        <line-head-form class="head" :title="form.id!=='add'?'修改班级':'新增班级'" />
        <el-form class="c-form" label-position="right" label-width="120px" ref="form" :rules="rules" :model="form">
            <el-form-item label="请选择课程:" prop="type">
                <el-radio-group v-model="form.type" @change="typeChange">
                    <el-radio :label="0">标准课程</el-radio>
                    <el-radio :label="1">机构定制课程</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="请选择学科:" prop="dataSubject">
                <el-select v-model="form.dataSubject" placeholder="请选择学科" @change="subjectChange">
                    <el-option v-for="item in condition.subjectList" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="请选择年级:" prop="baseSectionId">
                <el-select v-model="form.baseSectionId" placeholder="请选择年级" @change="gradeChange">
                    <el-option v-for="item in condition.gradeObj.list" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="课程:" prop="lessonId">
                <el-select v-model="form.lessonId" placeholder="请选择课程">
                    <el-option v-for="item in course.courseObj.list" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
                        <el-form-item label="学期:" prop="baseTrimesterId">
                            <el-select v-model="form.baseTrimesterId" placeholder="请选择学期">
                                <el-option v-for="(term,index) in condition.termObj.list" :label="term.name" :value="term.id"></el-option>
                            </el-select>
                        </el-form-item>
            <el-form-item label="主讲老师:" prop="teacherIds">
                <el-select v-model="form.teacherIds" multiple placeholder="请选择老师（最多添加2位老师）" @change="teacherChange">
                    <el-option v-for="(item,index) in condition.teacherList" :key="index" :label="item.username" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="班级名称:" prop="className">
                <el-input v-model="form.className" placeholder="请输入班级名称"></el-input>
            </el-form-item>
            <el-form-item label="校区:" prop="baseSchoolId">
                <el-select v-model="form.baseSchoolId" placeholder="请选择校区">
                    <el-option v-for="item in school.schoolObj.list" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开课日期:" prop="openTime">
                <el-date-picker v-model="form.openTime" type="date" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="结课日期:" prop="closeTime">
                <el-date-picker v-model="form.closeTime" type="date" placeholder="选择日期" @change="onEndChange">
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
                <el-button type="primary" class="height-btn" @click="sure">确定</el-button>
                <el-button class="light-btn" @click="$router.go(-1)">取消</el-button>
            </el-form-item>
        </el-form>
    </el-row>
</template>
<script>
import LineHeadForm from '../../common/LineHeadForm'
import FileUpload from '../../common/FileUpload'
import { mapState, mapActions } from 'vuex'
import util from 'lib/util'
import io from 'lib/io'
export default {
    components: {
        LineHeadForm,
        FileUpload
    },
    data() {
        return {
            form: {
                id: this.$route.params.id,
                type: 0,
                dataSubject: "",
                baseSectionId: "",
                lessonId: "",
                baseTrimesterId:'',
                teacherIds: "",
                className: "",
                baseSchoolId: "",
                openTime: "",
                closeTime: ""
            },
            rules: {
                type: [
                    { required: true, message: '请选择类型', trigger: 'blur' }
                ],
                dataSubject: [
                    { required: true, message: '请选择学科', trigger: 'blur' }
                ],
                baseSectionId: [
                    { required: true, message: '请选择年级', trigger: 'blur' }
                ],
                lessonId: [
                    { required: true, message: '请选择课程', trigger: 'blur' }
                ],
                baseTrimesterId: [
                    { required: true, message: '请选择学期', trigger: 'blur' }
                ],
                teacherIds: [
                    { required: true, message: '请选择主讲老师', trigger: 'blur' }
                ],
                className: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    { min: 1, max: 40, message: '班级名称过长，请输入少于40字', trigger: 'blur' },
                ],
                baseSchoolId: [
                    { required: true, message: '请选择校区', trigger: 'blur' }
                ],
                openTime: [
                    { required: true, message: '请选择开课日期', trigger: 'blur' }
                ],
                closeTime: [
                    { required: true, message: '请选择结课日期', trigger: 'blur' }
                ],
            }
        }
    },
    computed: {
        ...mapState(['condition', 'course', 'school', 'classes'])
    },
    watch: {
        'form.type'(val) {
            // this.form.baseSectionId = ''
            // this.form.lessonId = ''
            this.findBaseSectionPage({ pageIndex: 1, pageSize: 10000000, subjectId: this.form.dataSubject,type:this.form.type })
            this.getCourse() 

        },
        'form.dataSubject'(val) {
            this.findBaseSectionPage({ pageIndex: 1, pageSize: 10000000, subjectId: this.form.dataSubject,type:this.form.type })
            this.teacherList({dataSubject:this.form.dataSubject})
            this.getCourse()
        },
        'form.baseSectionId'(val) {
            // this.form.lessonId = ''
            this.getCourse()
        },
        'classes.classDetail'(val) {
            console.log('vla', val)
            let ids=[]
            val.teacherList.map((item,i)=>{
                ids.push(item.id)
            })
            val.teacherIds=ids
            this.form = {...val}
        }
    },
    created() {
        if (this.form.id !== 'add') {
            this.classDetail({ id: this.form.id })
        }
        this.findSubjectsData({ pageIndex: 1, pageSize: 10000000 })
        this.findBaseSectionPage({ pageIndex: 1, pageSize: 10000000, subjectId: this.form.dataSubject,type:this.form.type })
        this.getCourse()
        this.teacherList({dataSubject:this.form.dataSubject})
        this.findBaseSchoolPage({ pageIndex: 1, pageSize: 10000000 })
        this.findBaseTermPage({ pageIndex: 1, pageSize: 1000000 })
    },
    methods: {
        ...mapActions(['findBaseSectionPage', 'findSubjectsData', 'findLessonPage', 'findBaseTermPage', 'teacherList', 'findBaseSchoolPage', 'classDetail','findBaseTermPage']),
        getCourse() {
            this.findLessonPage({ pageIndex: 1, pageSize: 10000000, type: this.form.type, dataSubject: this.form.dataSubject, baseSectionId: this.form.baseSectionId,status:1 })
        },
        // handleCheckedWeekChange(val) {
        //     if (val.constructor == Array) {
        //         console.log("array", val.constructor == Array)
        //         this.form.everyday = false
        //     } else if (val.constructor == Boolean) {
        //         this.form.checkweek = []
        //         console.log("boolean", val.constructor == Boolean)
        //     }
        // },
        onEndChange() {
            console.log(this.form.openTime, this.form.closeTime)
            if (new Date(this.form.openTime) > new Date(this.form.closeTime)) {
                this.$message('结课日期不能小于开课日期')
                this.form.closeTime = ''
                return
            }
        },
        teacherChange(val) {
            console.log(val)
            if (val.length > 2) {
                this.$message('主讲老师最多两个！')
                this.form.teacherIds = val.slice(0, 2)
                return
            }
        },
        typeChange(){
            // this.form.baseSectionId = ''
            // this.form.lessonId = ''
        },
        subjectChange(){
            this.form.lessonId = ''
        },
        gradeChange(){
            this.form.lessonId = ''
        },
        sure() {
            this.$refs.form.validate(async (vali) => {
                if (vali) {
                    let opt = { ...this.form, teacherIds: this.form.teacherIds.join(','), openTime: util.formatDate(this.form.openTime) + ' 00:00:00', closeTime: util.formatDate(this.form.closeTime) + ' 23:59:59' }
                    if (this.form.id === 'add') {
                        opt = { ...opt, id: '' }
                    }
                    let { data } = await io.post6(io.addOrUpdateClass, opt)
                    console.log(this.form)
                    if (data.success) {
                        this.$message({type:"success",message:'保存成功！'})
                        this.$router.go(-1)
                    }
                } else {
                    this.$message('还有必填项未填，请先填写')
                    return
                }
            })
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


