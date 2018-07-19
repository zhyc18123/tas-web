<template>
    <el-row class="add-sheet">
        <course-step :active="4" />
        <div class="times-div">
            <div class="t-title">
                <em>{{titleName}}</em>
            </div>
            <span class="b-line"></span>
        </div>
        <el-form :inline="true" :model="form" class="t-form gray t-class-list">
            <!--<el-form-item label="">
                <el-select v-model="form.dataSubject" placeholder="科目">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="(subject,index) in condition.subjectList" :label="subject.name" :value="subject.id"></el-option>
                </el-select>
            </el-form-item>-->
            <el-form-item label="">
                <el-select v-model="form.baseSectionId" placeholder="年级">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="(grade,index) in condition.gradeObj.list" :label="grade.name" :value="grade.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="">
                <el-select v-model="form.baseLevelId" placeholder="班型">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="(level,index) in condition.levelObj.list" :label="level.name" :value="level.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="">
                <el-input v-model="form.name" placeholder="请输入素材名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search" class="search-btn">查询</el-button>
            </el-form-item>
        </el-form>
        <div>
            <el-table class="line-table" :data="data.dataObj.list" style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange" tooltip-effect="dark">
                <el-table-column align="center" type="selection"></el-table-column>
                <el-table-column prop="name" label="素材名称" align="center"></el-table-column>
                <el-table-column prop="subjectName" label="科目" align="center"></el-table-column>
                <el-table-column prop="sectionNames" label="年级" align="center"> </el-table-column>
                <el-table-column prop="leverName" label="班型" align="center"> </el-table-column>
                <el-table-column prop="remark" label="备注" align="center"> </el-table-column>
            </el-table>
    <v-pagination ref="pagin" class="pag" :total="data.dataObj.total|toNumber" @getListResult="getDataList" :currentPage="form.pageIndex"></v-pagination>
        </div>
        <div class="add-sheet-btn">
            <el-button class="height-btn" @click="addLessonMaterial">确定</el-button>
            <el-button class="light-btn" @click="$router.go(-1)">取消</el-button>
        </div>
    </el-row>
</template>
<script>
import VPagination from "../../common/Pagination"
import CourseStep from '../../common/CourseStep'
import { mapActions, mapState } from 'vuex'
import io from 'lib/io'
export default {
    props: [],
    components: {
        VPagination,
        CourseStep
    },
    data() {
        return {
            id:this.$route.params.id,
            titleName:this.$route.query.title,
            form: {
                name: '',
                subjectId: this.$route.query.subject,
                baseSectionId: null,
                baseLevelId: null,
                pageIndex: 1,
                pageSize: 10
            },
            tableSelect:[]
        }
    },
    computed: {
        ...mapState(['data', 'condition']),
    },
    watch: {
        'data.dataObj'(val){
            console.log("xxxx",val)
            this.form.dataSubject=val.ext.dataSubject
        }
    },
    created() {
        this.getDataList()
        this.findBaseSectionPage({ pageIndex: 1, pageSize: 1000000, dataSubject: this.form.dataSubject })
        this.findSubjectsData({ baseSectionId: this.form.baseSectionId })
        this.findBaseLevelPage({ pageIndex: 1, pageSize: 1000000 })
    },
    methods: {
        handleSelectionChange(val) {
            this.tableSelect=val
        },
        cancel() {
            console.log(this)
            this.$router.go(-1)
        },
        ...mapActions(['findBaseMaterial', 'findBaseSectionPage', 'findSubjectsData', 'findBaseLevelPage']),
        addData() {
            this.$router.push({ path: '/main/teach-research/data/new' })
        },
        search() {
            this.$refs.pagin.changePage(1)
            this.getDataList()
        },
        getDataList(opt) {
            this.findBaseMaterial({ ...this.form, ...opt })
        },
        async addLessonMaterial(){
            if (!this.tableSelect.length) {
                this.$message('还未勾选任何内容，请先选择')
                return
            }
            let ids=[]
            this.tableSelect.map((item,i)=>{
                ids.push(item.id)
            })
            let {data}=await io.post6(io.addLessonMaterial,{lessonId:this.id,baseMaterialIds:ids.join(',')})
            if(data.success){
                this.$message({message:'保存成功！',type:'success'})
                this.$router.go(-1)
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
@import '~assets/stylus/mixin.styl'
.t-form
    table-form()
    margin-top 20px
    margin-bottom 30px
    .el-form-item
        .search-btn
            background-color #009ada
.line-table
    .icon
        cursor pointer
        font-size 22px
        color #999
        margin-right 11px
        margin-left 11px
        &:hover
            color #01d1bb
.add-sheet
    .add-sheet-btn
        text-align center
        padding-top 90px
        padding-bottom 30px
    .times-div
        margin-top 20px
        position relative
        font-size 16px
        height 54px
        line-height 54px
        border-bottom 4px solid #bfebf3
        .t-title
            font-size 14px
            color #333
            font-weight bold
            em
                font-style normal
        .b-line
            height 1px
            display block 
            width 100%
            border-bottom 1px solid #bfebf3
            position absolute 
            left 0 
            bottom 1px

</style>
