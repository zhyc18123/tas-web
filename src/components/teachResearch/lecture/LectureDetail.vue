<template>
    <el-row class="lecture-detail">
        <line-head-form class="head" :title="form.id==='new'?'新建讲次':'编辑讲次'" />
        <el-form class="o-form" ref="form" label-position="right" label-width="120px" :model="form" :rules="rules">
            <el-form-item label="讲次名称:" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item prop="dataSubject">
                <div slot="label" class="tow-four">
                    科
                    <span>目:</span>
                </div>

                <el-select v-model="form.dataSubject" placeholder="">
                    <el-option v-for="(subject,index) in condition.subjectList" :label="subject.name" :value="subject.id" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="baseSectionId">
                <div slot="label" class="tow-four">
                    年
                    <span>级:</span>
                </div>
                <el-select v-model="form.baseSectionId" placeholder="">
                    <el-option v-for="(grade,index) in condition.gradeObj.list" :label="grade.name" :value="grade.id" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="type" label="讲次类型:">
                <el-radio :label="0" v-model="form.type">课程讲次</el-radio>
                <el-radio :label="1" v-model="form.type">期中期末讲次</el-radio>
            </el-form-item>
            <el-form-item prop="baseLevelId">
                <div slot="label" class="tow-four">
                    班
                    <span>型:</span>
                </div>

                <el-select v-model="form.baseLevelId" placeholder="">
                    <el-option v-for="(level,index) in condition.levelObj.list" :label="level.name" :value="level.id" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="">
                <em class="must">*</em>
                <upload class="upload" btnText="上传课件（PPT）" :isOfs="true" fileType="ppt" @success="pptSuccess" :sFileSize="form.courseSize" :sOriginalName="form.courseName" sTypeName="PPT" :fileUrl="form.courseUrl">
                </upload>
            </el-form-item>
            <el-form-item label="">
                <em class="must">*</em>
                <upload class="upload" btnText="上传讲义（Word）" :isOfs="true" fileType="word" @success="wordSuccess" :sFileSize="form.lectureSize" :sOriginalName="form.lectureName" sTypeName="WORD" :fileUrl="form.lectureUrl">
                </upload>
            </el-form-item>
            <el-form-item class="opt-btn">
                <el-button :disabled="addDisabled" type="primary" class="height-btn" @click="sure">确定</el-button>
                <el-button class="light-btn" @click="$router.go(-1)">取消</el-button>
            </el-form-item>
        </el-form>
    </el-row>
</template>
<script>
import LineHeadForm from '../../common/LineHeadForm'
import Upload from '../../common/Upload'
import { mapState, mapActions } from 'vuex'
import io from 'lib/io'
export default {
    components: {
        LineHeadForm,
        Upload
    },
    data() {
        return {
            addDisabled:false,
            form: {
                id: this.$route.params.id,
                name: '',
                baseSectionId: '',
                dataSubject: '',
                baseLevelId: '',
                courseUrl: '',
                courseName: '',
                courseSize: '',
                lectureUrl: '',
                lectureName: '',
                lectureSize: '',
                type:0
            },
            checkList: [],
            rules: {
                name: [{ required: true, message: '课程名称不能为空！', trigger: 'change' },{max:40,message:'课程名称不能超过40字',trigger:'change'}],
                baseSectionId: [{ required: true, message: '请选择年级！', trigger: 'change' }],
                dataSubject: [{ required: true, message: '请选择科目！', trigger: 'change' }],
                baseLevelId: [{ required: true, message: '请选择班型！', trigger: 'change' }],
                courseUrl: [{ required: true, message: '请上传课件！', trigger: 'change' }],
                type: [{ required: true, message: '请选择课程类型！', trigger: 'change' }],
                lectureUrl: [{ required: true, message: '请上传讲义！', trigger: 'change' }],
            },
        }
    },
    computed: {
        ...mapState(['condition', 'chapter']),
    },
    watch: {
        'form.dataSubject'(val) {
            this.findBaseSectionPage({ pageIndex: 1, pageSize: 1000000, subjectId: this.form.dataSubject })
        },
        'chapter.chapterDetail'(val) {
            this.form = { ...val }
        }
    },
    created() {
        if (this.form.id !== 'new') {
            this.getBaseChapter({ id: this.form.id })
        }
        this.findBaseSectionPage({ pageIndex: 1, pageSize: 1000000 })
        this.findSubjectsData({ sectionId: this.form.baseSectionId })
        this.findBaseLevelPage({ pageIndex: 1, pageSize: 1000000 })
    },
    methods: {
        ...mapActions(['findBaseSectionPage', 'findSubjectsData', 'findBaseLevelPage', 'getBaseChapter']),

        pptSuccess(url, size, duration, originName) {
            this.form.courseUrl = url
            this.form.courseName = originName
            this.form.courseSize = size
        },
        wordSuccess(url, size, duration, originName) {
            this.form.lectureUrl = url
            this.form.lectureName = originName
            this.form.lectureSize = size
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
                    if (!this.form.courseUrl) {
                        this.$message('请上传课件！')
                        return
                    }
                    if (!this.form.lectureUrl) {
                        this.$message('请上传讲义！')
                        return
                    }
                    if (this.form.id === 'new') {
                        this.addBaseChapter()
                    } else {
                        this.updateBaseChapter()
                    }
                } else {
                    this.$message('您还有必填项未填！')
                    return
                }
            })
        },
        async addBaseChapter() {
            let { data } = await io.post6(io.addBaseChapter, this.form)
            if (data.success) {
                this.$message({message:'保存成功！',type:'success'})
                this.$router.go(-1)
            }
        },
        async updateBaseChapter() {
            let { data } = await io.post6(io.updateBaseChapter, this.form)
            if (data.success) {
                this.$message({message:'保存成功！',type:'success'})
                this.$router.go(-1)
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
@import '~assets/stylus/mixin.styl'
.lecture-detail
    .must
        color red
        position absolute
        left -10px
    .el-select
        width 100%
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
</style>
<style lang="stylus">
.data-detail .gray
    .el-form-item__label,.el-form-item__content
        line-height 30px
        font-size 14px
        font-weight normal 
        
</style>


