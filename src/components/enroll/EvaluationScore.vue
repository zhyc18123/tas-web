<template>
  <div>
    <div class="am-u-sm-12 am-pagination-right am-form-group">
      <el-button type="success" @click="handleNewScore">新建成绩</el-button>
    </div>
    <div class="am-u-sm-12">
      <el-table
        :data="tableData"
        border
        stripe
        style="min-width: 100%">
        <el-table-column
          prop="areaTeamName"
          label="区域"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="periodName"
          label="期数"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="campusName"
          label="测评校区"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="gradeName"
          label="测评年级"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="subjectName"
          label="测评科目"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="level"
          label="测评班型"
          min-width="100">
          <template scope="scope">
            <div>{{{'1': '不区分','2': '尖端','3': '状元','4': '尖子','5': '提高','6': '竞赛','7': '集训队'}[scope.row.level]}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="studentScore"
          label="分数"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="creator"
          label="录入者"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="way"
          label="状态"
          min-width="100">
          <template scope="scope">
            <div>{{{'0': '作废','1': '有效'}[scope.row.validity]}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="operator"
          label="最后操作人"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="最后操作时间"
          min-width="130">
          <template scope="scope">
            <div>{{scope.row.updateTime | formatDate}}</div>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template scope="scope">
            <el-button size="small" @click.native="handleFix(scope.row.studentMeasureScoreId)">修改</el-button>
            <el-button :disabled="scope.row.validity === '0'" size="small" @click.native="handleDelete(scope.row)">作废</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <score-form @completed="loadTableData" :studentId="$params('studentId')" ref="scoreForm"></score-form>
  </div>
</template>

<script>
  import io from '../../lib/io'
  import conf from '../../lib/conf'
  import ScoreForm from './ScoreForm.vue'
  export default{
    data : function () {
      return{
        tableData:[],
        studentId:'',
      }
    },
    mounted:function(){
      $(window).smoothScroll()
    },
    components: {ScoreForm},
    created:function () {
      this.studentId = this.$params('studentId')
      this.loadTableData()
    },
    methods:{
      handleFix(studentMeasureScoreId) {
        this.$refs.scoreForm.query.studentMeasureScoreId = studentMeasureScoreId
        this.$refs.scoreForm.show()
      },
      handleDelete(row) {
        var _this = this
        this.$showLoading()
        io.post(io.saveOrUpdateStudentScore,Object.assign({},row, {
          validity: 0
        }),function(ret){
          _this.$hiddenLoading();
          if(ret.success){
            _this.$toast('作废成功！')
            _this.loadTableData()
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
      handleNewScore() {
        this.$refs.scoreForm.query.studentMeasureScoreId = ''
        this.$refs.scoreForm.show()
      },
      loadTableData:function(){
        var studentId = this.$params('studentId')
        var _this = this
        io.post(io.studentScoreList,$.extend({
          studentId:studentId
        },_this.query),function(ret){
          if(ret.success){
            _this.tableData = ret.data
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
    }
  }

</script>
