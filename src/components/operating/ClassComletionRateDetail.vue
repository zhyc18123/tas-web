<template>
  <window class="m-consultant-detail" ref="win" title="教师续读统计详情">
    <div>
      <el-table
        :data="tableData"
        border
        maxHeight="600"
        empty-text="暂无数据"
        stripe
        style="min-width: 100%">
        <el-table-column
          prop="periodName"
          min-width="100"
          label="期数">
        </el-table-column>
        <el-table-column
          prop="busTeamName"
          min-width="100"
          label="业务组">
        </el-table-column>
        <el-table-column
          prop="teacherName"
          min-width="100"
          label="教师">
        </el-table-column>
        <el-table-column
          prop="gradeName"
          min-width="100"
          label="年级">
        </el-table-column>
        <el-table-column
          prop="subjectName"
          min-width="100"
          label="科目">
        </el-table-column>
        <el-table-column
          prop="className"
          min-width="100"
          label="班级">
        </el-table-column>
        <el-table-column
          prop="studentName"
          min-width="100"
          label="学生姓名">
        </el-table-column>
        <el-table-column
          prop="sequentialDetail"
          min-width="160"
          label="顺期情况">
        </el-table-column>
        <el-table-column
          prop="stepDetail"
          min-width="160"
          label="跨期情况">
        </el-table-column>
      </el-table>
    </div>
  </window>
</template>

<script>
  import io from '../../lib/io'

  export default{
    data: function () {
      return {
        tableData: [],
      }
    },
    created () {

    },
    methods:{
      show:function(){
        this.$refs.win.show( { width : 1000 } )
      }
    }
  }

</script>
