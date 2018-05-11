<template>
    <el-row class="progress">
        <el-row class="form-div">
        <el-col :span="9" class="opt-time">
                <span>操作时间：</span>
                <el-date-picker v-model="optionTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </el-col>
            <el-col :span="5" class="role">
                <el-select v-model="formInline.teacherId" placeholder="全部人员">
                    <el-option v-for="item in teachers" :label="item.userName" :value="item.userId"></el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" @click="onSubmit">搜索</el-button>
            </el-col>
        </el-row>
        <el-table class="work-table" :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="姓名">
            </el-table-column>
            <el-table-column prop="inputCompleted" label="录入完成" align='center'>
            </el-table-column>
            <el-table-column prop="reInput" label="重新录入" align='center'>
            </el-table-column>
            <el-table-column prop="analyseCompleted" label="解析完成" align='center'>
            </el-table-column>
            <el-table-column prop="reAnalyse" label="重新解析" align='center'>
            </el-table-column>
            <el-table-column prop="auditCompleted" label="审核完成" align='center'>
            </el-table-column>
            <el-table-column prop="reAudit" label="重新审核" align='center'>
            </el-table-column>
            <el-table-column prop="storage" label="入库完成" align='center'>
            </el-table-column>
            <el-table-column prop="notStorage" label="不入库" align='center'>
            </el-table-column>
            <el-table-column prop="total" align='center' label="总数">

            </el-table-column>
        </el-table>
        <p class="tip">进度表：查看选定时间内操作过的题目的总体进度分配情况，以判断相应的工作任务是否在某人处有堆积，以及是否会影响别人接下来的工作进度安排。</p>
    </el-row>
</template>

<script>
import io from 'lib/io'
import storage from 'lib/storage'
import util from 'lib/util'
export default {
    name: 'v-progress',
    components: {
    },
    data() {
        return {
            subjectId: storage.getSubjectId(),
            teacherId: storage.getCurrentUserInfo() && storage.getCurrentUserInfo().userId,

            optionTime: '',
            formInline: {
                teacherId: '',
                startTime: '',
                endTime: ''
            },
            teachers: [],
            tableData: []
        }
    },
    created() {
        this.$parent.activeName = '进度表';
        this.getQueryUserList();
        this.getQuestionProgressOfTeacher();
    },
    methods: {
        async getQueryUserList() {
            let { data } = await io.post6(io.queryUserList, { subjectId: this.subjectId });
            if (data.success) {
                this.teachers = data.data;
                this.formInline.teacherId = this.teacherId;
            }
        },
        async getQuestionProgressOfTeacher(opt) {
            let { data } = await io.post6(io.questionProgressOfTeacher, { subjectId: this.subjectId, teacherId: this.teacherId, ...opt });
            if (data.success) {
                this.tableData = data.data
            }
        },
        onSubmit() {
            console.log(this.formInline)
            if (this.optionTime) {
                this.formInline.startTime = util.formatTime(this.optionTime[0], 'YYYY-MM-DD') + ' 00:00:00';
                this.formInline.endTime = util.formatTime(this.optionTime[1], 'YYYY-MM-DD') + ' 23:59:59';
            }
            this.getQuestionProgressOfTeacher(this.formInline)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.form-div {
    margin: 20px 0;
}
.opt-time{
    max-width: 440px;
}
.role{
    max-width: 210px;
}
.progress {
    // min-height: 1000px;
}

.tip{
    font-size: 14px;
    margin-top: 22px;
    margin-bottom: 30px;
    color: #333;
    text-indent: 2em;
}
</style>
