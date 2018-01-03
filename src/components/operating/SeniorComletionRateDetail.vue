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
          prop="studentName"
          align="center"
          min-width="160"
          label="学生姓名">
        </el-table-column>
        <el-table-column
          prop="nowPeriodDetail"
          align="center"
          min-width="160"
          label="本期在读班级">
        </el-table-column>
        <el-table-column
          prop="sequentialDetail"
          align="center"
          min-width="160"
          label="顺期续读情况">
        </el-table-column>
        <el-table-column
          prop="stepDetail"
          align="center"
          min-width="160"
          label="跨期续读情况">
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
