<template>
  <window class="m-consultant-detail" ref="win" title="班主任续读详情">
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
          prop="teacherName"
          min-width="100"
          label="班主任">
        </el-table-column>
        <el-table-column
          prop="studentName"
          min-width="100"
          label="学生姓名">
        </el-table-column>
        <el-table-column
          prop="studentPhoneNo"
          align="center"
          min-width="160"
          label="学生电话">
        </el-table-column>
        <el-table-column
          prop="studentGradeName"
          min-width="100"
          label="学生年级">
        </el-table-column>
        <el-table-column
          prop="lessSeqNum"
          min-width="200"
          label="顺期科数（小于6讲）">
        </el-table-column>
        <el-table-column
          prop="bigSeqNum"
          min-width="200"
          label="顺期科数（大于等于6讲）">
        </el-table-column>
        <el-table-column
          prop="lessStepNum"
          min-width="180"
          label="跨期科数（小于6讲）">
        </el-table-column>
        <el-table-column
          prop="bigStepNum"
          min-width="200"
          label="跨期科数（大于等于6讲）">
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
