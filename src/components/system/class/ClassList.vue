<template> 
    <div class="organization ">
        <el-form :inline="true" :model="form" class="t-form gray t-class-list">
            <div>
                <el-form-item label="">
                    <el-select v-model="form.baseSectionId" placeholder="年级">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="item in condition.gradeObj.list" :label="item.name" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-select v-model="form.baseTrimesterId" placeholder="学期">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="item in condition.termObj.list" :label="item.name" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="form.baseLevelId" placeholder="班型">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="item in condition.levelObj.list" :label="item.name" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="form.schoolId" placeholder="校区">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="item in school.schoolObj.list" :label="item.name" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </div>
            <el-form-item>
                <el-select v-model="form.status" placeholder="班级状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="未开课" :value="0"></el-option>
                    <el-option label="开课中" :value="1"></el-option>
                    <el-option label="已结课" :value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
               <el-input v-model="form.name" placeholder="请输入班级名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search" class="search-btn">查询</el-button>
            </el-form-item>
            <el-form-item class="new-item">
                <el-button v-if="config.class_add" type="primary" class="new-btn" @click="$router.push('/main/system/class/add')">新增班级</el-button>
            </el-form-item>
        </el-form>
        <el-table class="line-table" :data="classes.classObj.list"  style="width: 100%" header-align="center" empty-text="暂无班级，请先添加班级">
            <el-table-column prop="className" label="班级名称" align="center" width="160"></el-table-column>
            <el-table-column prop="baseLevelName" label="班型"  align="center"></el-table-column>
            <el-table-column prop="trimester" label="学期"  align="center"></el-table-column>
            <el-table-column  label="开课状态" align="center">
                <template scope="scope">
                    {{scope.row.status===0?'未开课':scope.row.status===1?'开课中':'已结课'}}
                </template>
                 </el-table-column>
            <el-table-column prop="section"  label="年级" align="center"> </el-table-column>
            <el-table-column  label="任课教师" align="center">
                <template scope="scope">
                    <span v-for="(item,index) in scope.row.teacherList" :key="index">
                         {{item.username}} <span v-if="index != (scope.row.teacherList.length-1)">、</span>
                    </span>
                </template>
                 </el-table-column>
             <el-table-column prop="school"  label="所属校区" align="center" width="160"> </el-table-column>
            <el-table-column  label="操作" align="center" min-width="160"> 
                <template slot-scope="scope" >
                    <div v-if="scope.row.isSycn===1">
                        <router-link :to="'/main/system/class/details?id='+scope.row.id" >
                            <!-- <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-2yulan"></use>
                            </svg> -->
                            <span class="btn-edit">班级详情</span>    
                           
                        </router-link>
                        <router-link v-if="config.class_edit" :to="'/main/system/class/'+scope.row.id" >
                            <!-- <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-xiugaiziliao"></use>
                            </svg> -->
                            <span class="btn-edit">编辑</span>
                            
                        </router-link>
                        <span class="btn-edit" v-if="config.class_del"  @click="deleteLessonClass(scope.row.id)">
                            <!-- <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-icon-cross-empty"></use>
                            </svg> -->
                            删除
                        </span>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    <v-pagination ref="pagin" class="pag" :total="classes.classObj.total|toNumber" @getListResult="getClass" :currentPage="form.pageIndex"></v-pagination>
    </div>
</template>
<script>
import VPagination from "../../common/Pagination"
import { mapState, mapActions ,mapGetters} from 'vuex'
import io from 'lib/io'
export default {
    name:'class-list',
    components:{
        VPagination,
    },
    data(){
        return{
            form:{
                baseSectionId:this.$route.query.baseSectionId|| null,
                baseTrimesterId:this.$route.query.baseTrimesterId||null,
                lessonId:this.$route.query.lessonId||null,
                baseLevelId:this.$route.query.baseLevelId||null,
                schoolId:null,
                status:this.$route.query.status||null,
                name:'',
                pageIndex:1,
                pageSize:10
            },
        }
    },
    computed: {
        ...mapState(['classes','condition','school']),
        ...mapGetters(['config'])
    },
    created(){
        this.findBaseSectionPage({pageIndex:1,pageSize:10000000})
        this.findBaseTermPage({pageIndex:1,pageSize:10000000})
        this.findBaseLevelPage({pageIndex:1,pageSize:10000000})
        this.findBaseSchoolPage({pageIndex:1,pageSize:10000000})
        this.getClass()
    },
    methods:{
        ...mapActions(['findClassPage','findBaseSectionPage','findBaseTermPage','findBaseLevelPage','findBaseSchoolPage']),
        getClass(opt){
            console.log('form',this.form)
            this.findClassPage({...this.form,...opt})
        },
        search(){
            this.$refs.pagin.changePage(1)
            this.getClass()
        },
        //删除班级
        deleteLessonClass(id){
            let param = {
                id:id
            }
            this.$confirm('确定删除该班级?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    io.post(io.deleteLessonClass,param,(data)=>{
                         this.$message({
                            type: 'success',
                            message: '删除成功！'
                        });   
                        this.getClass()
                    })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            })
        }
    }

}
</script>
<style lang="stylus" scoped>
@import '~assets/stylus/mixin.styl'
.organization
    padding-bottom 50px
.t-form
    table-form()
    margin-top 20px
    margin-bottom 30px
    .el-form-item
        margin-bottom 10px
.line-table
    .icon
        cursor pointer
        font-size 20px
        color #999
        margin-right 11px
        margin-left 11px
        &:hover
            color #01d1bb
    .btn-edit{
        cursor: pointer;
        color: #0084bb;
        padding: 0 5px;
        display: inline-block;
    }
.t-class-list
    padding-bottom 10px
    .el-form-item
        margin-right 30px
    .el-form-item.new-item
         bottom 18px
         margin-right 10px

</style>
<style lang="stylus">
// .t-class-list
//     .el-form-item
//         height 32px
//         .el-form-item__content
//             line-height 32px
//             .el-select
//                 height 32px
        // .el-input__inner
        //     height 32px
        //     line-height 32px
</style>


