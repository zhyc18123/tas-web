<template>
  <window ref="win" :title="'每日运营概况-'+ titleType + '-详情'">
    <div style="max-height: 600px;overflow-y: scroll;">
      <el-table
        :data="tableData"
        border
        empty-text="暂无数据"
        stripe
        style="min-width: 100%">
        <el-table-column
          prop="dateStr"
          align="center"
          min-width="160"
          label="日期">
        </el-table-column>
        <el-table-column
          prop="newStudentNum"
          align="center"
          min-width="160"
          label="新生">
        </el-table-column>
        <el-table-column
          prop="oldStudentNum"
          align="center"
          min-width="160"
          label="老生">
        </el-table-column>
        <el-table-column
          prop="seqStepStudentNum"
          align="center"
          min-width="160"
          label="续读生">
        </el-table-column>
        <el-table-column
          prop="totalNum"
          align="center"
          min-width="160"
          label="总计">
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
    props: {
      titleType: {
        default: '金融',
        type: String
      }
    },
    created () {

    },
    methods:{
      show:function(){
        this.$refs.win.show( { width : 1000, height: 800 } )
      }
    }
  }

</script>
