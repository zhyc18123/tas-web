<template>
    <el-row class="add-sheet">
        <course-step :active="4" />
        <div class="times-div">
            <div class="t-title">
                <em>物理初二提高班（人教版）</em>
            </div>
            <span class="b-line"></span>
        </div>
        <el-form :inline="true" :model="form" class="t-form gray t-class-list">
            <el-form-item label="">
                <el-select v-model="form.grade" placeholder="年级">
                    <el-option v-for="item in grade" :label="item.name" :value="item.id" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="">
                <el-select v-model="form.semester" placeholder="科目">
                    <el-option v-for="item in grade" :label="item.name" :value="item.id" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="form.classSize" placeholder="层级">
                    <el-option v-for="item in grade" :label="item.name" :value="item.id" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item>
                <el-select v-model="form.compus" placeholder="学期">
                    <el-option v-for="item in grade" :label="item.name" :value="item.id" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
               <el-input v-model="form.gradeNameValue" placeholder="讲次名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch" class="search-btn">查询</el-button>
            </el-form-item>
        </el-form> 
        <div>
            <el-table class="line-table" :data="tableData"  style="width: 100%" ref="multipleTable"  @selection-change="handleSelectionChange" tooltip-effect="dark">
                <el-table-column  align="center"  type="selection"></el-table-column>
                <el-table-column prop="sheetName" label="素材名称"  align="center"></el-table-column>
                <el-table-column prop="sheetClass"  label="素材年级" align="center"> </el-table-column>
                <el-table-column prop="semester"  label="学期" align="center"> </el-table-column>
                <el-table-column prop="tier"  label="层级" align="center"> </el-table-column>
                <el-table-column prop="remake"  label="备注" align="center"> </el-table-column>
            </el-table>
            <v-pagination :total="total" :pageSize="pageSize" @getListResult="getListResult"></v-pagination>
        </div>  
        <div class="add-sheet-btn">
            <el-button class="height-btn">确定</el-button>
            <el-button class="light-btn" @click="$router.go(-1)">取消</el-button>
        </div>                                                     
    </el-row>
</template>
<script>
import VPagination from "../../common/Pagination"
import CourseStep from '../../common/CourseStep'
export default {
    props: [],
    components: {
        VPagination,
        CourseStep
    },
    data () {
        return {
            total:80,
            pageSize:10,

            form:{
                grade:"",
                semester:"",
                classSize:"",
                semester:"",
                compus:"",
                gradeStatus:"",
                gradeNameValue:'',

            },
            grade:[
                {
                    name:"高一",
                    id:1,
                },
                {
                    name:"高二",
                    id:2,
                }
            ],
            tableData:[
                {
                    ischeck:false,
                    sheetName:"素材",
                    sheetClass:"高一",
                    semester:'春季',
                    tier:"提高班",
                    remake:'适用以提高班'
                }
            ]
        }
    },
    beforeRouteUpdate(to, from, next) {
        console.log('to', to)
        this.sourceType = to.params.sourceType
        this.optType = to.params.optType
        next()
    },
    created(){

    },
    methods:{
        AddSheet(){
        },
        handleSearch(){

        },
        handleSelectionChange(val){

        },
        getListResult(val){
            console.log(val)
        },
        cancel(){
            console.log(this)
            this.$parent.isAdd = false
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
