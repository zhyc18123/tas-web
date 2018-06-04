<template>
    <el-row class="data-detail">
        <line-head-form class="head" :title="form.id==='new'?'新增素材':'编辑素材'" />
        <el-form class="o-form" label-position="right" label-width="120px" :model="form" :rules="rules" ref="form">
            <el-form-item label="素材名称:" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item prop="dataSubject">
                <div slot="label" class="tow-four">
                    科
                    <span>目:</span>
                </div>

                <el-select v-model="form.dataSubject" placeholder="">
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
            <el-form-item label="资料说明:">
                <el-input type="textarea" :rows="6" v-model="form.remark"></el-input>
            </el-form-item>
            <el-form-item label="">
                <!--<upload btnText="上传素材">
                                <p class="surport">(支持PPT、Word、Excel、PDF、压缩包)</p>
                            </upload>-->
                <em class="must">*</em>
                <upload class="upload" btnText="上传素材" fileType="data" @success="dataSuccess" :sFileSize="form.attchSize" :sOriginalName="form.attchName" :sTypeName="form.attchType" :fileUrl="form.attchUrl">
                    <p class="surport">(支持PPT、Word、Excel、PDF、压缩包)</p>
                </upload>
            </el-form-item>
            <el-form-item label="权限设置:">
                <el-checkbox label="全选" v-model="isViewDown"></el-checkbox>
                <el-checkbox label="可预览" v-model="form.isView"></el-checkbox>
                <el-checkbox label="可下载" v-model="form.isDowm"></el-checkbox>
            </el-form-item>
            <el-form-item class="opt-btn">
                <el-button class="height-btn" @click="sure">确定</el-button>
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
            form: {
                id: this.$route.params.id,
                name: '',
                baseSectionId: '',
                dataSubject: '',
                baseLevelId: '',
                remark: '',
                attchName: '',
                attchType: '',
                attchUrl: '',
                attchSize: '',
                isView: false,
                isDowm: false
            },
            isViewDown: false,
            // checkList: [],
            rules: {
                name: [{ required: true, message: '课程名称不能为空！', trigger: 'blur' }],
                baseSectionId: [{ required: true, message: '请选择年级！', trigger: 'blur' }],
                dataSubject: [{ required: true, message: '请选择科目！', trigger: 'blur' }],
                baseLevelId: [{ required: true, message: '请选择班型！', trigger: 'blur' }],
                attchUrl: [{ required: true, message: '请上传素材！', trigger: 'blur' }],
            },
        }
    },
    watch: {
        'form.dataSubject'(val) {
            this.findBaseSectionPage({ pageIndex: 1, pageSize: 1000000, subjectId: this.form.dataSubject })
        },
        isViewDown(val) {
            this.form.isView = val
            this.form.isDowm = val
        },
        // 'form.isView'(val){
        //     console.log(val)
        //     if(!val){
        //         this.isViewDown=0
        //     }
        // },
        // 'form.isDowm'(val){
        //     if(!val){
        //         this.isViewDown=0
        //     }
        // }
    },
    computed: {
        ...mapState(['condition', 'data']),
    },
    created() {
        this.findBaseSectionPage({ pageIndex: 1, pageSize: 1000000 })
        this.findSubjectsData({ sectionId: this.form.baseSectionId })
        this.findBaseLevelPage({ pageIndex: 1, pageSize: 1000000 })
        if (this.form.id !== 'new') {
            this.getBaseMaterial()
        }
    },

    methods: {
        ...mapActions(['findBaseSectionPage', 'findSubjectsData', 'findBaseLevelPage',]),
        dataSuccess(url, size, duration, originName) {
            this.form.attchUrl = url
            this.form.attchName = originName
            this.form.attchSize = size
            this.form.attchType = originName.indexOf('.ppt') > -1 ? 'PPT' : originName.indexOf('.doc') > -1 ? 'WORD' : originName.indexOf('.xls') > -1 ? 'EXCEL' : originName.indexOf('.pdf') > -1 ? 'PDF' : '压缩包'
        },
        sure() {
            this.$refs.form.validate((vali) => {
                if (vali) {
                    if (!this.form.attchUrl) {
                        this.$message('请上传素材！')
                        return
                    }
                    if(this.form.id==='new'){
                    this.addBaseMaterial()
                    }else{
                        this.updateBaseMaterial()
                    }
                } else {
                    this.$message('您还有必填项未填！')
                    return
                }
            })
        },
        async addBaseMaterial() {
            let aType = this.form.attchType === 'PPT' ? 1 : this.form.attchType === 'WORD' ? 2 : this.form.attchType === 'EXCEL' ? '3' : this.form.attchType === 'PDF' ? 4 : this.form.attchType === '压缩包' ? 5 : 0
            let { data } = await io.post6(io.addBaseMaterial, { ...this.form, isDowm: this.form.isDowm ? 1 : 0, isView: this.form.isView ? 1 : 0, attchType: aType })
            if (data.success) {
                this.$message('保存成功！')
                this.$router.go(-1)
            }
        },
        async updateBaseMaterial() {
            let aType = this.form.attchType === 'PPT' ? 1 : this.form.attchType === 'WORD' ? 2 : this.form.attchType === 'EXCEL' ? '3' : this.form.attchType === 'PDF' ? 4 : this.form.attchType === '压缩包' ? 5 : 0
            let { data } = await io.post6(io.updateBaseMaterial, { ...this.form, isDowm: this.form.isDowm ? 1 : 0, isView: this.form.isView ? 1 : 0, attchType: aType })
            if (data.success) {
                this.$message('保存成功！')
                this.$router.go(-1)
            }
        },
        async getBaseMaterial() {
            let { data } = await io.post6(io.getBaseMaterial, { id: this.form.id })
            if (data.success) {
                this.form = data.data
                this.form.isDowm = !!data.data.isDowm
                this.form.isView = !!data.data.isView
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
@import '~assets/stylus/mixin.styl'
.data-detail
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


