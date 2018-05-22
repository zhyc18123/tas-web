<template> 
    <div class="organization ">
        <el-form :inline="true" :model="form" class="t-form gray t-class-list">
            <el-form-item label="">
                <el-select v-model="form.grade" placeholder="年级">
                    <el-option v-for="item in grade" :label="item.name" :value="item.id" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="">
                <el-select v-model="form.semester" placeholder="学期">
                    <el-option v-for="item in grade" :label="item.name" :value="item.id" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="form.classSize" placeholder="班型">
                    <el-option v-for="item in classSizes" :label="item.name" :value="item.id" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item>
                <el-select v-model="form.compus" placeholder="校区">
                    <el-option v-for="item in grade" :label="item.name" :value="item.id" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="form.gradeStatus" placeholder="班级状态">
                    <el-option v-for="item in grade" :label="item.name" :value="item.id" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
               <el-input v-model="form.gradeNameValue" placeholder="请输入班级名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch" class="search-btn">查询</el-button>
            </el-form-item>
            <el-form-item class="new-item">
                <el-button type="primary" class="new-btn" @click="addClass">新增班级</el-button>
            </el-form-item>
        </el-form>
        <el-table class="line-table" :data="tableData"  style="width: 100%" header-align="center" >
            <el-table-column prop="className" label="班级名称" align="center" ></el-table-column>
            <el-table-column prop="grade" label="班级"  align="center"></el-table-column>
            <el-table-column prop="term"  label="开课状态" align="center"> </el-table-column>
            <el-table-column prop="campus"  label="年级" align="center"> </el-table-column>
            <el-table-column prop="curriculumTime"  label="授课时段" align="center"> </el-table-column>
            <el-table-column prop="tier"  label="任课教师" align="center"> </el-table-column>
             <el-table-column prop="campus"  label="所属校区" align="center"> </el-table-column>
            <el-table-column  label="操作" align="center"> 
                <template slot-scope="scope" >
                    <router-link to="/">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-2yulan"></use>
                        </svg>
                    </router-link>
                    <router-link to="/">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-xiugaiziliao"></use>
                        </svg>
                    </router-link>
                    <router-link to="/">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-delete"></use>
                        </svg>
                    </router-link>
                </template>
            </el-table-column>
        </el-table>
        <v-pagination :total="total" :pageSize="pageSize" @getListResult="getListResult"></v-pagination>
    </div>
</template>
<script>
import VPagination from "../../common/Pagination"
export default {
    name:'class-list',
    components:{
        VPagination,
    },
    data(){
        return{
            total:80,
            pageSize:10,    
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
            status:[{

            }],
            classSizes:[{}],
            form:{
                grade:"",
                semester:"",
                classSize:"",
                semester:"",
                compus:"",
                gradeStatus:"",
                gradeNameValue:'',

            },
            tableData:[
                {
                    className:"2018春季物理提高班",
                    grade:"初二",
                    term:"春季",
                    campus:"岗顶校区",
                    curriculumTime:"2017-02-12",
                    tier:"提高班",
                    schoolTime:"8:45 - 9:45",
                    week:'周一'
                },
                {
                    className:"2018春季物理提高班",
                    grade:"初二",
                    term:"春季",
                    campus:"岗顶校区",
                    curriculumTime:"2017-02-12",
                    tier:"提高班",
                    schoolTime:"8:45 - 9:45",
                    week:'周一'
                }
            ],
        }
    },
    created(){

    },
    methods:{
        handleSearch(){

        },
        addClass(){

        },
        getListResult(val){
            console.log(val)
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


</style>
<style lang="stylus">
.t-class-list
    .el-form-item
        height 32px
        .el-form-item__content
            line-height 32px
            .el-select
                height 32px
        .el-input__inner
            height 32px
            line-height 32px
</style>


