<template>
<el-row class="class-detail">
    <line-head-form class="head" title="班级详情"/>
    <div class="detail-cont">
        <div class="cont-head">
             <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-banciguanli"></use>
            </svg>
            <span>{{classes.classDetail.className}}</span>
            <em>{{classes.classDetail.status===0?'未开课':classes.classDetail.status===1?'已开课':'已结课'}}</em>
        </div>
        <div class="cont-main t-cloum">
            <el-steps :active="stepActive" direction="vertical" name="">
                <el-step title="班级基础信息" >
                    <div slot="title"  class="title">
                        <span>班级基础信息</span>
                        <el-button @click="$router.push('/main/system/class/'+id)">修改基本信息</el-button>
                    </div>
                    <div slot="description" class="class-info">
                        <ul class="">
                            <li>
                                <!-- <div class="info-item">
                                    <div slot="label" class="tow-four">
                                       班级编号：
                                    </div>
                                    <span>{{classes.classDetail.num}}</span>
                                </div> -->
                                <div class="info-item">
                                    <div slot="label" class="tow-four">
                                        学<span>科：</span>
                                    </div>
                                    <span>{{classes.classDetail.subject}}</span>
                                </div>
                                <div class="info-item">
                                    <div slot="label" class="tow-four">
                                       所在校区：
                                    </div>
                                    <span>{{classes.classDetail.school}}</span>
                                </div>
                                <div class="info-item">
                                    <div slot="label" class="tow-four">
                                      班<span>型：</span>
                                    </div>
                                    <span>{{classes.classDetail.lessonName}}</span>
                                </div>
                                <!-- <div class="info-item">
                                    <div slot="label" class="tow-four">
                                        上课时段：
                                    </div>
                                    <span>周一  09:10-11:20，周二  09:10-11:20</span>
                                </div> -->
                            </li>
                            <li>
                                <!-- <div class="info-item">
                                    <div slot="label" class="tow-four">
                                       学员总数：
                                    </div>
                                    <span>-</span>
                                </div> -->
                                <div class="info-item">
                                    <div slot="label" class="tow-four">
                                        年<span>级：</span>
                                    </div>
                                    <span>{{classes.classDetail.section}}</span>
                                </div>
                                <div class="info-item">
                                    <div slot="label" class="tow-four">
                                       创建日期：
                                    </div>
                                    <span>{{classes.classDetail.createTime | formatDate}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="info-item">
                                    <div slot="label" class="tow-four">
                                       每讲总数：
                                    </div>
                                    <span v-text="classes.classDetail.lessonClassPlanChapterList && classes.classDetail.lessonClassPlanChapterList.length">{{}}</span>
                                </div>
                                <div class="info-item">
                                    <div slot="label" class="tow-four">
                                        开课日期：
                                    </div>
                                    <span>{{classes.classDetail.openTime | formatDate}}</span>
                                </div>
                                
                            </li>
                        </ul>
                    </div>
                </el-step>
                <el-step title="主讲老师基础信息" >
                    <div slot="title" class="title">
                        <span>主讲老师基础信息</span>
                        <el-button @click="addTeacher(classes.classDetail)">添加主讲老师</el-button>
                    </div>
                    <div slot="description" class="teacher-info">
                        <ul>
                            <li v-for="(item,index) in classes.classDetail.teacherList" :key="item.id">
                                <span class="teacher-order">主讲老师{{index+1}}</span>
                                <span>{{item.username}}</span>
                                <div class="teacher-btn">
                                    <el-button  @click="changeTeacher(item)">更换</el-button>
                                    <el-button v-if="classes.classDetail.teacherList.length>1" @click="delTeacher(item)">删除</el-button>
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
                            :data="classes.classDetail.lessonClassPlanChapterList"
                            class="line-table"
                            header-align="center" 
                            style="width:100%"
                            >
                            <el-table-column
                                prop="course"
                                label="讲次"
                                align = "center"
                                width = "180"
                                >
                                <template slot-scope="scope">
                                    <span>{{'第'+scope.row.sort+'讲'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="chapterName"
                                label="讲次名称"
                                width = "200"
                                align = "center"
                                >
                            </el-table-column>
                            <!-- <el-table-column
                                prop="dateTime"
                                align = "center"
                                width = "200"
                                label="日期">
                                <template slot-scope="scope">
                                    <span>{{scope.row.planDate | formatDate}}</span>
                                </template>
                            </el-table-column> -->
                            <el-table-column
                                prop="substituteTeacher"
                                align = "center"
                                width = "200"
                                label="代课老师">
                                <template slot-scope="scope">
                                    <span>{{scope.row.teacherId?scope.row.teacherName:'无'}}</span>
                                </template>
                            </el-table-column> 
                             <el-table-column
                                align = "center"
                                width = "200"
                                label="操作">
                                <template slot-scope="scope">
                                    <div>
                                        <el-button v-if="!scope.row.teacherId" class="noborder"  @click="addSupplyTeacher(scope.row)">添加代课老师</el-button>
                                        <div  v-else>
                                            <el-button class="noborder"  @click="changeSupplyTeacher(scope.row)">更换</el-button>
                                            <el-button class="noborder"  @click="delSupplyTeacher(scope.row)">删除</el-button>
                                        </div>
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
        <el-dialog title="选择老师" :visible.sync="dialogAddTeacher" class="add-teacher" width="40%" @close="dialogClose">
            <el-form>
                <el-form-item >
                    <el-input v-model="query.keyword" auto-complete="off" placeholder="请输入关键字进行筛选"></el-input>
                    <el-button @click="getTeacher">搜索</el-button>
                </el-form-item>
            </el-form>
            <div class="teacher-table">
                <el-table v-if="!isChange" :data="TeacherData" ref="table" key="table"  tooltip-effect="dark"  @selection-change="handleSelectionChange" :show-header="false" max-height = '300' >
                    <el-table-column type="selection" width="55" :reserve-selection="false"> </el-table-column>
                    <el-table-column property="username" label="姓名" width="200"></el-table-column>
                    <el-table-column property="course" label="科目" align="right" class="course">
                        <template slot-scope="scope">
                            <span v-for="(item,index) in scope.row.subjectSectionList" :key="item.id">{{item.subjectName}} <i v-if="index<(scope.row.subjectSectionList.length-1)">、</i></span>
                        </template>
                    </el-table-column>
                </el-table>
                <el-table v-else  :data="TeacherData" ref="table" key="table1"  tooltip-effect="dark"  :show-header="false" max-height = '300' >
                    <el-table-column label="" align="center" width="60">
                        <template scope="scope">
                            <el-radio :label="scope.row.id" v-model="checkTeacherId" class="table-radio" ></el-radio>
                        </template>
                    </el-table-column>
                    <el-table-column property="username" label="姓名" width="200"></el-table-column>
                    <el-table-column property="course" label="科目" align="right" class="course">
                        <template slot-scope="scope">
                            <span v-for="(item,index) in scope.row.subjectSectionList" :key="index">{{item.subjectName}} <i v-if="index<(scope.row.subjectSectionList.length-1)">、</i> </span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="add-btn">
                <el-button class="height-btn" @click="saveTeacher">确认</el-button>
                <el-button class="light-btn" @click="dialogAddTeacher = false">取消</el-button>
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
            lessonClassId:null,
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
            TeacherData:[],
            dialogAddTeacher:false,
            addTeacherList:[],
            addTeacherListNum:0,
            teacherListNum:0,
            teacherList:[],
            originTeacherId:'',//被更换的老师
            checkTeacherId:'',//更换老师的id
            query:{
                keyword:"",
                dataSubject:"",
            },
            isChange:false,//是否是更新(判断多选/单选框)
            // isLecturer:true,//是否是主讲老师
            type:0,//类型 0:主讲老师，1：代课老师
            SupplyChange:false,//代课老师是否是更新
            lessonChapterId:'',
        }
    },
    created(){
        this.id = this.$route.query.id
        this.classDetail({ id: this.id })
        
    },
    mounted(){
        // if(this.query.dataSubject!==""){
           
        // }
        
    },
    watch:{
       'classes.classDetail'(val) {
            console.log('vla', val)
            let ids=[]
            val.teacherList.map((item,i)=>{
                ids.push(item.id)
            })
            // val.teacherIds=ids
            this.teacherListNum = ids.length
            this.teacherList = [...val.teacherList]
            this.query.dataSubject = val.dataSubject
            this.getTeacher()
            // this.form = {...val}
        }
    },
    computed:{
        ...mapState(["classes"])
    },
    methods:{
        ...mapActions(["classDetail"]),
        dialogClose(){
            this.TeacherData=[]
        },
        //查询老师
        getTeacher(){
           let param = this.query
            io.post(io.teacherList,param,(ret)=>{
                this.TeacherData = ret
                console.log("list",ret)
            })
        },
        //判断老师数量
        handleSelectionChange(val){
            this.addTeacherList = val
            this.addTeacherListNum = val.length
            console.log(val)
            if(this.addTeacherListNum+this.teacherListNum>2){
                this.$message('该班级已有'+ this.teacherListNum +'位主讲老师,'+'你现在最多还能添加'+ (2-this.teacherListNum)+ '位主讲老师')
                this.$refs.table.toggleRowSelection(val[val.length - 1], false)
                return
            }
            this.teacherList.map((item)=>{
                val.map((ite)=>{
                    if(item.id == ite.id){
                        this.$message('老师'+item.username+'已在该班级中，请重新选择')
                        this.$refs.table.toggleRowSelection(val[val.length - 1], false)
                    }
                })
                
            })
        },
        //添加时的基本信息（主讲老师）
        addTeacher(classDetail){
            console.log(classDetail)
            // this.isChange = false
            console.log(this.isChange)
            this.type = 0
            this.query.keyword=''
             this.isChange = false
             this.getTeacher()
            this.dialogAddTeacher = true
            
        },
        // 添加的请求（主讲老师）
        addTeacherFun(){
            let teacherId = []
            this.addTeacherList.map(item=>{
                teacherId.push(item.id)
            })
            let param = {
                lessonClassId:this.id,
                teacherId:teacherId.join(','),
                type:this.type ,//类型 0:主讲老师，1：代课老师
            }
            if(param.teacherId===""){
                this.$message("请选择老师")
                return false
            }
            io.post(io.addTeacher,param,(ret)=>{
                if(ret.success){
                    this.$message({type:"success",message:"添加成功"})
                    this.classDetail({ id: this.id })
                }else{
                    console.log(6666)
                    this.$message(ret.message)
                    return 
                }
                this.dialogAddTeacher = false
            })
        },
        //更新时的基本信息（主讲老师）
        changeTeacher(row){
            this.type = 0
            this.isChange = true 
            this.query.keyword=''
            this.getTeacher()
            this.originTeacherId = row.id
            this.dialogAddTeacher = true
            
        },
        //更新的请求（主讲老师）
        changeTeacherFun(){
            let param = {
                lessonClassId:this.id,
                originTeacherId:this.originTeacherId,
                destTeacherId:this.checkTeacherId,
                type:this.type,//类型 0:主讲老师，1：代课老师
            }
            io.post(io.changeTeacher,param,(ret)=>{
                if(ret.success){
                    this.classDetail({ id: this.id })
                    this.$message({type:"success",message:"更换成功"})
                }else{
                    this.$message(ret.message)
                    return 
                }
                this.dialogAddTeacher = false
            })
        },
        //主讲老师删除
        delTeacher(row){
            console.log(row)
            let param =  {
                lessonClassId:this.id,
                teacherId:row.id,
                type:0,
            }
            this.$confirm('确定删除主讲老师 ' + row.username + ' 是否继续?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    io.post(io.deleteTeacher,param,(ret)=>{
                        if(ret.success){
                            this.classDetail({ id: this.id })
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }else{
                            this.$message(ret.message)
                            return 
                        }
                        
                    })
               
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        // 添加代课老师
        addSupplyTeacher(row){
            console.log(row)
            this.lessonChapterId = row.chapterId
            this.type = 1
            this.isChange = true//
            this.SupplyChange = false
            this.query.keyword=''
            this.getTeacher()
            this.dialogAddTeacher = true
        },
        addSupplyTeacherFun(){
            let param = {
                lessonClassId:this.id,
                teacherId:this.checkTeacherId,
                type:this.type ,//类型 0:主讲老师，1：代课老师
                lessonChapterId:this.lessonChapterId
            }
            io.post(io.addTeacher,param,(ret)=>{
                if(ret.success){
                    this.$message({type:"success",message:"添加成功"})
                    this.classDetail({ id: this.id })
                    this.dialogAddTeacher = false
                }else{
                    this.$message(ret.message)
                    return 
                }
            })
        },
        //更新代课老师
        changeSupplyTeacher(row){
            console.log(row)
            this.lessonChapterId = row.chapterId
            this.type = 1
            this.isChange = true//单选
            this.SupplyChange = true//更新
            this.originTeacherId = row.teacherId
            this.query.keyword=''
            this.getTeacher()
            this.dialogAddTeacher = true
        },
        changeSupplyTeacherFun(){
            let param = {
                lessonClassId:this.id,
                destTeacherId:this.checkTeacherId,
                originTeacherId:this.originTeacherId,
                type:this.type ,//类型 0:主讲老师，1：代课老师
                lessonChapterId:this.lessonChapterId
            }
            io.post(io.changeTeacher,param,(ret)=>{
                if(ret.success){
                    this.$message({type:"success",message:"更新成功"})
                    this.classDetail({ id: this.id })
                    this.dialogAddTeacher = false
                }else{
                    this.$message(ret.message)
                    return 
                }   
            })
        },
        // 删除代课老师
        delSupplyTeacher(row){
            let param =  {
                lessonClassId:this.id,
                teacherId:row.teacherId,
                lessonChapterId:row.chapterId,
                type:1,
            }
            this.$confirm('确定删除代课老师 ' + row.teacherName + ' 是否继续?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    io.post(io.deleteTeacher,param,(ret)=>{
                        if(ret.success){
                            this.classDetail({ id: this.id })
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }else{
                            this.$message(ret.message)
                            return 
                        }
                        
                    })
               
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
            console.log(row)
        },
        saveTeacher(){
            // 添加主讲老师
            if(this.type===0 && !this.isChange){
                this.addTeacherFun()
            }
            // 更新主讲老师
            if(this.type===0 && this.isChange){
                this.changeTeacherFun()
            }
            // 添加代课老师
            if(this.type===1 && this.isChange && !this.SupplyChange){
                this.addSupplyTeacherFun()
            }
            //更新代课老师
            if(this.type===1 && this.isChange && this.SupplyChange){
                this.changeSupplyTeacherFun()
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
                        display: box;               /* OLD - Android 4.4- */
                        display: -webkit-box;       /* OLD - iOS 6-, Safari 3.1-6 */
                        display: -moz-box;          /* OLD - Firefox 19- (buggy but mostly works) */
                        display: -ms-flexbox;       /* TWEENER - IE 10 */
                        display: -webkit-flex;      /* NEW - Chrome */
                        display: flex;
                        height 100%
                        padding 47px 0
                        box-sizing border-box
                        li  
                            -webkit-box-flex: 1;              /* OLD - iOS 6-, Safari 3.1-6 */
                            -moz-box-flex: 1;                 /* OLD - Firefox 19- */
                            -webkit-flex: 1;                     /* Chrome */
                            -ms-flex: 1; 
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
                    .course
                        padding-right 20px
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
                    -ms-flex-negative: 1;
                    flex-shrink: 1;
                    flex:1;
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
            .teacher-table
                .is-right
                    padding-right 20px !important
                .table-radio
                    .el-radio__label
                        display none




</style>


