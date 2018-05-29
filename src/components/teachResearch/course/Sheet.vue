<template>
    <el-row class="data-detail">
        <course-step :active="4" />
        <div class="main">
            <div class="times-div">
                <div class="t-title">
                    <em>物理初二提高班（人教版）</em>
                </div>
                <span class="b-line"></span>
                <div class="c-add" >
                    <p>支持PPT、Word、Excel、PDF、压缩包</p>
                    <el-button @click="$router.push('/main/teach-research/course/add-sheet/'+id)">添加辅助材料</el-button>
                </div>
            </div>
            <div class="t-cont" >
                <el-table :data="tableData" style="width: 100%" class="line-table">
                    <el-table-column prop="type" label="类型"   align="center"></el-table-column>
                    <el-table-column prop="name"  label="名称"   align="center">  </el-table-column>
                    <el-table-column prop="size" label="大小" align="center"></el-table-column>  
                     <el-table-column  label="操作" align="center" width="180">
                        <template slot-scope="scope">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-icon-cross-empty"></use>
                            </svg>
                        </template>
                     </el-table-column>
                </el-table>
            </div>
            <div class="next-btn" >
                <el-button class="height-btn" @click="$router.push('/')">确定</el-button>
            </div>
            <!-- <div>
                <add-sheet></add-sheet>
            </div> -->
        </div>
       
    </el-row>
</template>
<script>
import CourseStep from '../../common/CourseStep'
export default {
    props: [],
    components: {
        CourseStep,
    },
    data () {
        return {
            sourceType:this.$route.params.sourceType,
            courseId:this.$route.params.courseId,
            id:this.$route.params.id,
            courseList:[
                    {
                        order:"第一讲",
                        courseName:"长度与时间的测量",
                        id:"1"
                    },
                    {
                        order:"第二讲",
                        courseName:"长度与时间的测量长度与时间的测量",
                        id:"2"
                    }
            ],
            tableData:[
                {
                    type:'PPT',
                    name:'名称',
                    size:'5M'

                }
            ],
            isAdd:false,
        }
    },
    created(){

    },
    methods:{
        AddSheet(){
            this.$router.push('/main/teach-research/course/sheet/'+this.id)
        }
    }
}
</script>
<style lang="stylus" scoped>
.main
    padding 25px 0px
    .times-div
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
        .c-add
            position absolute
            right 0
            bottom 0
            p
                font-size 12px
                margin-bottom -9px
                color #999
                display inline-block
            .el-button
                background #1ebd99
                color #ffffff
                height 30px
                border-color #00b88f
                border-radius 15px
                
           
    .t-cont
        .el-table
            .icon
                font-size 20px
                color #999999
                cursor pointer
             .icon:hover
                color #009170

        
    .next-btn
        text-align center
        padding-top 20px
            

</style>
