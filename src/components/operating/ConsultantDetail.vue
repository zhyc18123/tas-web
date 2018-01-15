<template>
  <window class="m-consultant-detail" ref="win" title="咨询师科数详情">
    <div>
      <el-table
        :data="tableData"
        border
        empty-text="暂无数据"
        stripe
        style="min-width: 100%">
        <el-table-column
          prop="periodName"
          align="center"
          min-width="160"
          label="期数">
        </el-table-column>
        <el-table-column
          prop="campusName"
          align="center"
          min-width="160"
          label="报读校区">
        </el-table-column>
        <el-table-column
          prop="teacherName"
          align="center"
          min-width="160"
          label="咨询师">
        </el-table-column>
        <el-table-column
          prop="studentName"
          align="center"
          min-width="160"
          label="学生姓名">
        </el-table-column>
        <el-table-column
          prop="studentPhoneNo"
          align="center"
          min-width="160"
          label="学生电话">
        </el-table-column>
        <el-table-column
          label="生源类型"
          min-width="100">
          <template scope="scope">
            {{{'0': '新生', '1': '老生'}[scope.row.relativeType]}}
          </template>
        </el-table-column>
        <el-table-column
          prop="bigLectureNum"
          align="center"
          min-width="160"
          label="6讲（含）以上科数">
        </el-table-column>
        <el-table-column
          align="center"
          prop="lessLectureNum"
          min-width="160"
          label="6讲以下科数">
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
