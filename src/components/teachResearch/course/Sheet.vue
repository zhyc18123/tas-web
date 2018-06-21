<template>
    <el-row class="data-detail">
        <course-step :active="4" v-if="dataObj.ext&&dataObj.ext.status!==1"/>
        <div class="main">
            <div class="times-div">
                <div class="t-title">
                    <em>{{dataObj.ext&&dataObj.ext.name}}</em>
                </div>
                <span class="b-line"></span>
                <div class="c-add">
                    <span>支持PPT、Word、Excel、PDF、压缩包</span>
                    <el-button @click="$router.push('/main/teach-research/course/add-sheet/'+id)">添加辅助材料</el-button>
                </div>
            </div>
            <div class="t-cont">
                <el-table :data="dataObj.list" style="width: 100%" class="line-table">
                    <el-table-column label="类型" align="center">
                        <template scope="scope">
                            {{scope.row.attchType==='1'?'PPT':scope.row.attchType==='2'?'WORD':scope.row.attchType==='3'?'EXCEL':scope.row.attchType==='4'?'PDF':scope.row.attchType==='5'?'RAR':'未知'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="attchName" label="名称" align="center"> </el-table-column>
                    <el-table-column prop="attchSize" label="大小(M)" align="center"></el-table-column>
                    <el-table-column label="操作" align="center" width="180">
                        <template slot-scope="scope">
                            <svg class="icon" aria-hidden="true" @click="delLessonMaterial(scope.row.id)">
                                <use xlink:href="#icon-icon-cross-empty"></use>
                            </svg>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="next-btn">
                <el-button class="light-btn" @click="$router.go(-1)">上一步</el-button>
                <el-button class="height-btn" @click="$router.push('/main/teach-research/course')">确定</el-button>
            </div>
            <!-- <div>
                    <add-sheet></add-sheet>
                </div> -->
        </div>

    </el-row>
</template>
<script>
import CourseStep from '../../common/CourseStep'
import io from 'lib/io'
export default {
    props: [],
    components: {
        CourseStep,
    },
    data() {
        return {
            // sourceType:this.$route.params.sourceType,
            // courseId:this.$route.params.courseId,
            id: this.$route.params.id,
            dataObj: {},
            isAdd: false,
        }
    },
    created() {
        this.findLessonMaterial()
    },
    methods: {
        AddSheet() {
            this.$router.push('/main/teach-research/course/sheet/' + this.id)
        },
        async findLessonMaterial() {
            let { data } = await io.post6(io.findLessonMaterial, { pageIndex: 1, pageSize: 1000000, lessonId: this.id })
            if (data.success) {
                this.dataObj = data.data
            }
        },
        async delLessonMaterial(id) {
            this.$confirm('确认删除？', '提示').then(async() => {
                let { data } = await io.post6(io.delLessonMaterial, { id })
                if (data.success) {
                    this.$message('删除成功！')
                    this.findLessonMaterial()
                }
            })
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
        border-bottom 4px solid #bfebf3
        .t-title
            font-size 14px
            color #333
            display inline-block
            line-height 54px
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
            height 54px
            line-height 54px
            span
                font-size 12px
                color #999
                height 12px
                line-height 12px
                float left
                margin-top 31px
                display inline-block
                margin-right 5px
            .el-button
                background #1ebd99
                color #ffffff
                height 30px
                border-color #00b88f
                border-radius 15px
                
           
    .t-cont
        padding-top 28px
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
