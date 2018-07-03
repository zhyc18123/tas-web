<template>
    <el-row class="course-detail">
        <course-step :active="1" v-if="form.id==='add'" />
        <div class="add-type">
            <el-button @click="addTypeFun" v-if="form.id==='add'">引用已有课程</el-button>
        </div>
        <el-form ref="form" v-show="!addType" class="o-form" label-position="right" label-width="120px" :model="form" :rules="rules">
            <el-form-item label="课程名称:" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item prop="dataSubject">
                <div slot="label" class="tow-four">
                    科
                    <span>目:</span>
                </div>

                <el-select v-model="form.dataSubject" placeholder="" :disabled="form.id!=='add'">
                    <el-option v-for="(subject,index) in condition.subjectList" :label="subject.name" :value="subject.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="baseSectionId">
                <div slot="label" class="tow-four">
                    年
                    <span>级:</span>
                </div>
                <el-select v-model="form.baseSectionId" placeholder="">
                    <el-option v-for="(grade,index) in condition.gradeObj.list" :label="grade.name" :value="grade.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="baseLevelId">
                <div slot="label" class="tow-four">
                    班
                    <span>型:</span>
                </div>

                <el-select v-model="form.baseLevelId" placeholder="">
                    <el-option v-for="(level,index) in condition.levelObj.list" :label="level.name" :value="level.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="chapterNum">
                <div slot="label" class="tow-four">
                    讲
                    <span>数:</span>
                </div>
                <el-input v-model="form.chapterNum" :disabled="form.id!=='add'"></el-input>
            </el-form-item>
            <el-form-item prop="baseTrimesterId">
                <div slot="label" class="tow-four">
                    学
                    <span>期:</span>
                </div>

                <el-select v-model="form.baseTrimesterId" placeholder="">
                    <el-option v-for="(term,index) in condition.termObj.list" :label="term.name" :value="term.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="教材版本:">

                <el-select v-model="form.baseTeachId" placeholder="">
                    <el-option v-for="(mater,index) in condition.materList" :label="mater.name" :value="mater.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <div slot="label" class="tow-four">
                    年
                    <span>份:</span>
                </div>
                <el-select v-model="form.dataYear" placeholder="">
                    <el-option v-for="(year,index) in condition.yearList" :label="year.name" :value="year.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="课程简介:">
                <el-input type="textarea" :rows="6" v-model="form.remark"></el-input>
            </el-form-item>
            <el-form-item label="">
                <upload btnText="上传介绍（视频）" fileType="video" @success="uploadSuccess" :sFileSize="form.videoSize" :fileUrl="form.videoUrl" :sOriginalName="form.videoName" sTypeName="视频">
                </upload>
            </el-form-item>
            <el-form-item class="opt-btn">
                <el-button  :disabled="addDisabled" type="primary" class="height-btn" @click="sure">确定</el-button>
                <el-button class="light-btn" @click="$router.go(-1)">取消</el-button>
            </el-form-item>
        </el-form>
        <!-- <div v-show="addType" class="has-course">
                        <el-form :inline="true" :model="sForm" class="t-form">
                          <el-form-item label="">
                            <el-select v-model="form.region" placeholder="年级">
                              <el-option label="区域一" value="shanghai"></el-option>
                              <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="">
                            <el-select v-model="form.region" placeholder="学期">
                              <el-option label="区域一" value="shanghai"></el-option>
                              <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="">
                            <el-select v-model="form.region" placeholder="科目">
                              <el-option label="区域一" value="shanghai"></el-option>
                              <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="">
                            <el-input v-model="form.user" placeholder="请输入课程名称"></el-input>
                          </el-form-item>
                          <el-form-item>
                            <el-button type="primary" @click="onSubmit">查询</el-button>
                          </el-form-item>
                        </el-form>
                        <el-table class="line-table" :data="tableData" header-align="center">
                          <el-table-column label="" align="center" width="60">
                              <template scope="scope">
                        <el-radio label="111" v-model="checkItem" class="table-radio"></el-radio>
                              </template>
                          </el-table-column>
                          <el-table-column prop="className" label="课程名称" align="center"></el-table-column>
                          <el-table-column prop="grade" label="课程层级" align="center"></el-table-column>
                          <el-table-column prop="term" label="科目" align="center"> </el-table-column>
                          <el-table-column prop="campus" label="讲数" align="center"> </el-table-column>
                          <el-table-column prop="curriculumTime" label="年级" align="center"> </el-table-column>
                          <el-table-column prop="curriculumTime" label="学期" align="center"> </el-table-column>
                        </el-table>
                        <v-pagination ref="pagin" class="pag" :total="result.total|toNumber" @getListResult="getListResult" :currentPage="sForm.pageNo"></v-pagination>
                      <div class="opt-btn has-course-btn">
                          <el-button class="height-btn">下一步</el-button>
                      </div>
                    </div> -->
        <div calss="add-has">
            <el-dialog title="引用已有课程" :visible.sync="dialogTableVisible" class="add-has">
                <div class="has-course">
                    <el-form :inline="true" :model="sForm" class="t-form">
                        <el-form-item label="">
                            <el-select v-model="sForm.baseSectionId" placeholder="年级">
                                <el-option label="全部" value=""></el-option>
                                <el-option v-for="(grade,index) in condition.gradeObj.list" :label="grade.name" :value="grade.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="">
                            <el-select v-model="sForm.dataSubject" placeholder="科目">
                                <el-option label="全部" value=""></el-option>
                                <el-option v-for="(subject,index) in condition.subjectList" :label="subject.name" :value="subject.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="">
                            <el-select v-model="sForm.baseTrimesterId" placeholder="学期">
                                <el-option label="全部" value=""></el-option>
                                <el-option v-for="(term,index) in condition.termObj.list" :label="term.name" :value="term.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="">
                            <el-input v-model="sForm.name" placeholder="请输入课程名称"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="search">查询</el-button>
                        </el-form-item>
                    </el-form>
                    <div class="search-table">
                        <el-table class="line-table" :data="result.list" header-align="center" empty-text="暂无课程">
                            <el-table-column label="" align="center" width="60">
                                <template scope="scope">
                                    <el-radio :label="scope.row.id" v-model="checkItem" class="table-radio"></el-radio>
                                </template>
                            </el-table-column>
                            <el-table-column prop="name" label="课程名称" align="center"></el-table-column>
                            <el-table-column prop="baseLevelName" label="课程层级" align="center"></el-table-column>
                            <el-table-column prop="dataSubjectName" label="科目" align="center"> </el-table-column>
                            <el-table-column prop="chapterNum" label="讲数" align="center"> </el-table-column>
                            <el-table-column prop="baseSectionName" label="年级" align="center"> </el-table-column>
                            <el-table-column prop="baseTrimesterName" label="学期" align="center"> </el-table-column>
                        </el-table>
                        <v-pagination ref="pagin" class="pag" :total="result.total|toNumber" @getListResult="getCourseList" :currentPage="sForm.pageIndex"></v-pagination>
                        <div class="opt-btn has-course-btn">
                            <el-button class="height-btn" @click="saveExisting">确定</el-button>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>

    </el-row>
</template>
<script>
import CourseStep from '../../common/CourseStep'
import Upload from '../../common/Upload'
import VPagination from '../../common/Pagination'
import { mapState, mapActions } from 'vuex'
import io from 'lib/io'
export default {
    components: {
        CourseStep,
        Upload,
        VPagination
    },
    data() {
        return {
            addDisabled:false,
            form: {
                id: this.$route.params.id,
                name: '',
                baseSectionId: '',
                dataSubject: '',
                baseTrimesterId: '',
                baseLevelId: '',
                baseTeachId: '',
                dataYear: '',
                chapterNum: null,
                remark: '',
                videoUrl: '',
                videoName: '',
                videoSize: ''
            },
            rules: {
                name: [{ required: true, message: '课程名称不能为空！', trigger: 'change' },{max:40,message:'课程名称不能超过40字',trigger:'change'}],
                baseSectionId: [{ required: true, message: '请选择年级！', trigger: 'change' }],
                dataSubject: [{ required: true, message: '请选择科目！', trigger: 'change' }],
                baseLevelId: [{ required: true, message: '请选择班型！', trigger: 'change' }],
                chapterNum: [
                    { required: true, message: '讲数不能为空！', trigger: 'change' }
                ],
                // baseTrimesterId: [{ required: true, message: '请选择学期！', trigger: 'blur' }]
            },
            sForm: {
                name: '',
                baseTrimesterId: null,
                dataSubject: null,
                baseSectionId: null,
                status:1,
                pageIndex: 1,
                pageSize: 10
            },
            addType: false,
            dialogTableVisible: false,
            checkItem: {},
        }
    },
    computed: {
        ...mapState(['condition', 'course']),
        ...mapState({ result: state => state.course.courseObj })
    },
    watch: {
        'form.baseSectionId'(val) {
            this.findMaterialData({ sectionId: this.form.baseSectionId, subjectId: this.form.dataSubject })
        },
        'form.dataSubject'(val) {
            this.findBaseSectionPage({ pageIndex: 1, pageSize: 1000000, subjectId: this.form.dataSubject })
            this.findMaterialData({ sectionId: this.form.baseSectionId, subjectId: this.form.dataSubject })
        },
        'sForm.dataSubject'(val) {
            this.findBaseSectionPage({ pageIndex: 1, pageSize: 1000000, subjectId: this.sForm.dataSubject })
        },
        'course.courseDetail'(val) {
            if (this.form.id === 'add') {
                this.form = { ...val, id: 'add' }
            } else {
                this.form = { ...val }
            }
            this.$refs.form.clearValidate()
        }
    },
    created() {
        if (this.form.id !== 'add') {
            this.detailLesson({ id: this.form.id })
        }
        this.findBaseSectionPage({ pageIndex: 1, pageSize: 1000000, subjectId: this.form.dataSubject })
        this.findBaseTermPage({ pageIndex: 1, pageSize: 1000000 })
        this.findSubjectsData({ sectionId: this.form.baseSectionId })
        this.findBaseLevelPage({ pageIndex: 1, pageSize: 1000000 })
        this.findMaterialData({ sectionId: this.form.baseSectionId, subjectId: this.form.dataSubject })
        this.findYearsData()
    },
    methods: {
        ...mapActions(['findBaseSectionPage', 'findSubjectsData', 'findBaseTermPage', 'findBaseLevelPage', 'findYearsData', 'findMaterialData', 'findLessonPage', 'detailLesson']),
        uploadSuccess(url, size, duration, originName) {
            this.form.videoUrl = url
            this.form.videoName = originName
            this.form.videoSize = size
        },
        search() {
            this.$refs.pagin.changePage(1)
            this.getCourseList()
        },
        getCourseList(opt) {
            this.findLessonPage({ ...this.sForm, ...opt })
        },
        onSubmit() {

        },
        addTypeFun() {
            // this.addType = true
            this.getCourseList(this.sForm)
            setTimeout(() => {
                this.dialogTableVisible = true
            }, 300);
        },
        sure() {
            this.addDisabled=true
            setTimeout(()=>{
                this.addDisabled=false
            },2000)
            this.$refs.form.validate((vali) => {
                if (vali) {
                    if(!String.trim(this.form.name).length){
                        this.$message('名称不允许只输入空格')
                        return
                    }
                    let reg = /^[1-9]\d*$/;
                    console.log(this.form.chapterNum)
                    if ((!reg.test(this.form.chapterNum) || this.form.chapterNum > 50 || this.form.chapterNum < 1)) {
                        this.$message('讲数只能为1-50的整数')
                        return
                    }
                    console.log('success')
                    this.addOrUpLesson()
                } else {
                    this.$message('您还有必填项未填！')
                    return
                }
            })
        },
        saveExisting() {
            console.log(this.checkItem + "")
            this.detailLesson({ id: this.checkItem })
            // let sItem = JSON.parse(JSON.stringify(this.checkItem))
            // sItem.id === 'add'
            // this.form = sItem
            // console.log(this.checkItem)
            this.dialogTableVisible = false
        },

        async addOrUpLesson() {
            let { data } = await io.post6(io.addOrUpLesson, { ...this.form, id: this.form.id === 'add' ? '' : this.form.id,pId:this.checkItem })
            if (data.success) {
                this.$message({message:'保存成功',type: 'success'})
                if (this.form.id === 'add') {
                    this.$router.push({ path: '/main/teach-research/course/edit-lecture/' + data.data.id })
                } else {
                    this.$router.go(-1)
                }
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
@import '~assets/stylus/mixin.styl'
.course-detail
    .has-course-btn
        margin-top 30px
    .add-type
        height 45px
        line-height 45px
        // margin 15px 50px 0
        margin-top 30px
        text-align right 
        .el-button
            background #1ebd99
            color #ffffff
            font-size 14px
            border 1px solid #1ebd99
            border-radius 15px
            height 30px
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
        margin-top 40px
    .surport
        color #ff7800
        padding-left 40px
.has-course
    // padding 20px 50px 
    .t-form
      padding 22px 20px 0 20px
      background #f7f7f7
      .el-select
        width 120px
    .search-table
      padding 20px 20px 0 20px

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
.add-has
    .el-dialog
        width 60%
        min-width 740px


</style>


