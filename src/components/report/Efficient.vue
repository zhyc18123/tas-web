<template>
  <el-row  class="quality">
        <el-row class="form-div">
        <el-col :span="9" class="opt-time">
                <span>操作时间：</span>
    <el-date-picker
      v-model="optionTime"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
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

  <el-table
    class="work-table"
    border
    :span-method="arraySpanMethod"
    :row-class-name="tableRowClassName"
    :data="tableData"
    style="width: 100%">
    <el-table-column
      align='center'
      prop="name"
      label="姓名"
      >
    </el-table-column>
    <el-table-column align='center'>
      <template scope="scope">
        <span v-if="scope.row.style==='1'">工作量</span>
        <span v-if="scope.row.style==='2'">质量数</span>
        <span v-if="scope.row.style==='3'">效率(%)</span>
      </template>
    </el-table-column>
      <el-table-column
        prop="inputCompleted"
        label="录入完成"
        align='center'
        >
      </el-table-column>
        <el-table-column
          prop="reInput"
          label="重新录入"
          align='center'
          >
        </el-table-column>
        <el-table-column
          prop="analyseCompleted"
          label="解析完成"
          align='center'
          >
        </el-table-column>
        <el-table-column
          prop="reAnalyse"
          label="重新解析"
          align='center'
          >
        </el-table-column>
        <el-table-column
          prop="auditCompleted"
          label="审核完成"
          align='center'
          >
        </el-table-column>
        <el-table-column
          prop="reAudit"
          label="重新审核"
          align='center'
          >
        </el-table-column>
        <el-table-column
          prop="storage"
          label="入库完成"
          align='center'
          >
        </el-table-column>
        <el-table-column
          prop="notStorage"
          label="不入库"
          align='center'
          >
        </el-table-column>
        <el-table-column
          prop="total"
          label="总数"
          align='center'>
        </el-table-column>
  </el-table>
<p class="tip">效率表：查看选定时间内各教研员的工作量以及每个环节的总体效率（返工情况)</p>
  </el-row>
</template>

<script>
import io from 'lib/io'
import storage from 'lib/storage'
import util from 'lib/util'
  export default {
    name: 'quality',
    components:{
    },
    data() {
      return {
          subjectId:storage.getSubjectId(),
          teacherId:storage.getCurrentUserInfo()&&storage.getCurrentUserInfo().userId,

          optionTime: '',
        formInline: {
          teacherId: '',
          startTime:'',
          endTime:''
        },
        teachers:[],
        tableData: []
      }
    },
    created() {
        this.$parent.activeName = '效率表';
        this.getQueryUserList();
        this.getQuestionEfficiencyOfTeacher();
    },
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex%3 === 0) {
          return 'one-row';
        } else if (rowIndex%3 === 1) {
          return 'two-row';
        }else if (rowIndex%3 === 2) {
          return 'three-row';
        }
        return '';
      },
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
         if (columnIndex === 0) {
          if (rowIndex % 3 === 0) {
            return {
              rowspan: 3,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
       async getQueryUserList(){
            let {data}=await io.post6(io.queryUserList,{subjectId:this.subjectId});
            if(data.success){
                this.teachers=data.data;
                this.formInline.teacherId=this.teacherId;
            }
        },
        async getQuestionEfficiencyOfTeacher(opt){
            let {data}=await io.post6(io.questionEfficiencyOfTeacher
,{subjectId:this.subjectId,teacherId:this.teacherId,...opt});
            if(data.success){
                this.tableData=data.data
            }
        },
      onSubmit() {
          console.log(this.formInline)
          if(this.optionTime){
              this.formInline.startTime=util.formatTime(this.optionTime[0], 'YYYY-MM-DD') + ' 00:00:00';
              this.formInline.endTime=util.formatTime(this.optionTime[1], 'YYYY-MM-DD') + ' 23:59:59';
          }
        this.getQuestionEfficiencyOfTeacher(this.formInline)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.quality{
  // min-height: 1000px;
}
.form-div {
    margin: 20px 0;
}
.opt-time{
    max-width: 440px;
}
.role{
    max-width: 210px;
}
  .work-form {
      margin: 20px 0;
  }

.tip{
    font-size: 14px;
    margin-top: 22px;
    margin-bottom: 30px;
    color: #333;
    text-indent: 2em;
}
</style>
<style lang="less">
.quality{
    .one-row{
      background: white;
    }
    .two-row{
      background: #e5f4ff;
    }
    .three-row{
      background: #ffedd5;
    }
    .el-table_1_column_1  {
      background:white;
    }
}
</style>

