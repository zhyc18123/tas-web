<template>
    <div class="course-table ">
        <el-form :inline="true" :model="form" class="t-form gray t-class-list">

            <el-form-item>
                <el-select v-model="form.dataSubject" placeholder="科目">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in condition.subjectList" :label="item.name" :value="item.id" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
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
                <el-input v-model="form.lessonName" placeholder="请输入课程名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search" class="search-btn">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table class="line-table" :data="dataObj.list" style="width: 100%" header-align="center" :span-method="objectSpanMethod" empty-text="暂无班级，请先添加班级">
            <el-table-column prop="lessonName" label="课程名称" align="center"></el-table-column>
            <el-table-column prop="originLevelName" label="初始名称" align="center"></el-table-column>
            <el-table-column prop="levelName" label="班型名称" align="center"> </el-table-column>
            <el-table-column prop="subjectName" label="科目" align="center"> </el-table-column>
            <el-table-column prop="section" label="年级" align="center"> </el-table-column>
            <el-table-column prop="trimester" label="学期" align="center"> </el-table-column>
            <el-table-column prop="currentClass" label="当前班级" align="center"> </el-table-column>
            <el-table-column prop="historicClass" label="历史班级" align="center"> </el-table-column>
        </el-table>
        <v-pagination ref="pagin" class="pag" :total="dataObj.total|toNumber" @getListResult="getClass" :currentPage="form.pageIndex"></v-pagination>
    </div>
</template>
<script>
import VPagination from "../../common/Pagination"
import { mapState, mapActions, mapGetters } from 'vuex'
import io from 'lib/io'
export default {
    name: 'course-table',
    components: {
        VPagination,
    },
    data() {
        return {
            form: {
                baseSectionId: null,
                baseTrimesterId: null,
                lessonId: null,
                dataSubject: null,
                lessonName: '',
                pageIndex: 1,
                pageSize: 10
            },
            dataObj: {},
            spanArr: [],
            pos: 0
        }
    },
    computed: {
        ...mapState(['classes', 'condition', 'school']),
        ...mapGetters(['config'])
    },
    watch: {
        'form.dataSubject'(val) {
            this.findBaseSectionPage({ pageIndex: 1, pageSize: 10000000, subjectId: this.form.dataSubject })
        }
    },
    created() {
        this.findSubjectsData({ pageIndex: 1, pageSize: 10000000 })
        this.findBaseSectionPage({ pageIndex: 1, pageSize: 10000000 })
        this.findBaseTermPage({ pageIndex: 1, pageSize: 10000000 })
        this.getClass()
    },
    methods: {
        ...mapActions(['findBaseSectionPage', 'findBaseTermPage', 'findSubjectsData']),
        async getClass(opt) {
            console.log('form', this.form)
            let { data } = await io.post6(io.lessonStatistic, { ...this.form, ...opt })
            if (data.success) {
                this.dataObj = data.data
                this.getSpanArr(data.data.list)
            }
        },
        search() {
            this.$refs.pagin.changePage(1)
            this.getClass()
        },
        getSpanArr(data) {
            this.spanArr=[]
            this.pos=0
            for (var i = 0; i < data.length; i++) {
                if (i === 0) {
                    this.spanArr.push(1);
                    this.pos = 0
                } else {
                    // 判断当前元素与上一个元素是否相同
                    if (data[i].lessonId === data[i - 1].lessonId) {
                        this.spanArr[this.pos] += 1;
                        this.spanArr.push(0);
                    } else {
                        this.spanArr.push(1);
                        this.pos = i;
                    }
                }
            }
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
             if (columnIndex === 0) {
                 const _row = this.spanArr[rowIndex];
                 const _col = _row > 0 ? 1 : 0;
                 return {
                     rowspan: _row,
                     colspan: _col
                 }
             }
             if (columnIndex === 1) {
                 const _row = this.spanArr[rowIndex];
                 const _col = _row > 0 ? 1 : 0;
                 return {
                     rowspan: _row,
                     colspan: _col
                 }
             }
             if (columnIndex === 2) {
                 const _row = this.spanArr[rowIndex];
                 const _col = _row > 0 ? 1 : 0;
                 return {
                     rowspan: _row,
                     colspan: _col
                 }
             }
             if (columnIndex === 3) {
                 const _row = this.spanArr[rowIndex];
                 const _col = _row > 0 ? 1 : 0;
                 return {
                     rowspan: _row,
                     colspan: _col
                 }
             }
             if (columnIndex === 4) {
                 const _row = this.spanArr[rowIndex];
                 const _col = _row > 0 ? 1 : 0;
                 return {
                     rowspan: _row,
                     colspan: _col
                 }
             }
        }
    }

}
</script>
<style lang="stylus" scoped>
@import '~assets/stylus/mixin.styl'
.course-table
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


