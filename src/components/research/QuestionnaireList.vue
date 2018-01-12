<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title am-fl">问卷列表</div>
        </div>
        <div class="widget-body  am-fr">

          <div class="am-u-sm-12 am-form ">
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2  v-model="query.areaTeamId" :options="areaTeams">
                  <option value="">请选择区域</option>
                </select2>
              </div>
            </div>
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <input type="text" name="title" v-model="query.title" placeholder="输入问卷标题"/>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-u-end">
              <div class="am-form-group">
                <button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="search" ><span class="am-icon-search"></span>查询
                </button>
                <button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="$router.push('/main/research/createEditQuestion')"><span
                  class="am-icon-plus"></span>新建
                </button>
              </div>
            </div>

          </div>

          <div v-if="measurementId" class="am-u-sm-12 red am-form-group">备注：每一次组卷，旧的试卷组合将被覆盖。</div>
          <div class="am-u-sm-12">
            <el-table
              :data="tableData"
              border
              stripe
              @selection-change="handleSelectionChange"
              style="min-width: 100%">
              <el-table-column
                v-if="measurementId"
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                prop="areaTeamName"
                label="区域"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="questionnaireName"
                label="标题"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="questionNum"
                label="题数"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="totalScore"
                label="总分"
                min-width="100">
              </el-table-column>
              <el-table-column
                label="最后编辑时间"
                min-width="180">
                <template scope="scope">
                  <div>
                    {{scope.row.updateTime | formatTime}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="operatorName"
                label="最后编辑人"
                min-width="100">
              </el-table-column>

              <el-table-column
                label="操作"
                fixed="right"
                :width="optionWidth">
                <template scope="scope">
                  <el-button size="small" @click.native="$router.push('/main/research/createEditQuestion?questionnaireId='+
                  scope.row.questionnaireId)">编辑
                  </el-button>
                  <el-button @click="handleDelete(scope.row.questionnaireId)" size="small">删除
                  </el-button>
                  <el-button size="small" @click.native="$router.push('/main/research/newQuestion?questionnaireId='+
                  scope.row.questionnaireId)">录入题目
                  </el-button>
                  <el-button @click="exportQuestion(scope.row.questionnaireId)" size="small">导出
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <paper-detail ref="paperDetail"></paper-detail>
          <div class="am-u-lg-12 am-cf">
            <div class="am-fr">
              <pagination v-bind:total="total" v-bind:pageNo="pageNo" v-bind:pageSize="pageSize"
                          @paging="loadTableData"/>
            </div>
          </div>
          <div id="export" style="display:none">
            <h4 style="textAlign:center">卓越教育——教学效果调查表</h4>
            <p>
              亲爱的同学们：
              <p style="textIndent:2em">
                大家好！为了进一步提升老师的教学质量，让大家有一个更高效的课堂，从而提升教学效果，提升更优质的服务。请你根据实际情况，对以下项目作出真实客观的评价。谢谢！
              </p>
            </p>
            <div style="marginTop:10px">
              <span>年级：</span><span>&nbsp;&nbsp;&nbsp;</span>
              <span>科目：</span><span>&nbsp;&nbsp;&nbsp;</span>
              <span>班级：</span><span>&nbsp;&nbsp;&nbsp;</span>
            </div>
            <table cellpadding=0 border=1 cellspacing=0 width=100%>
              <tr style="background:#eee;height:40px">
                <th>
                  序号
                </th>
                <th>
                  评价内容
                </th>
                <th>
                  优
                </th>
                <th>
                  良
                </th>
                <th>
                  中
                </th>
                <th>
                  差
                </th>
              </tr>
              <tr v-for="(item,i) in questions" :key="i">
                <td style="textAlign:center;width:100px">
                  <span>&nbsp;&nbsp;{{i+1}}&nbsp;&nbsp;</span>
                </td>
                <td>
                  <span v-html="item.content"></span>
                </td>
                <td>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </td>
                <td>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </td>
                <td>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </td>
                <td>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </td>
              </tr>
            </table>
            <div style="marginTop:10px">
              我还想对老师说：
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

  import Pagination from '../base/Pagination'
  import io from '../../lib/io/index'
  import PaperDetail from './PaperDetail.vue'

  export default{
    data: function () {
      return {
        questions:[],
        multipleSelection: [],
        examPaperIds: [],
        measurementId: '',
        tableData: [],
        total: 0,
        pageSize: 10,
        pageNo: 1,
        query: {
          areaTeamId : window.config.areaTeams[0] && window.config.areaTeams[0].areaTeamId || '' ,
          gradeId:'',
          subjectId:'',
          title:'',
        },
        periods: [],
        searchConfig: {}
      }
    },
    components: {
      PaperDetail,
      Pagination
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    computed: {
      optionWidth() {
        return this.measurementId ? 80: 300
      },
      areaTeams: function () {
        var options = ( this.$root.config.areaTeams || [] )
          .map(function (item) {
            return {value: item.areaTeamId, text: item.name}
          })
        return options
      },
      grades: function () {
        return this.$root.config.grades.map(function(item){
          return {value: item.gradeId, text: item.gradeName}
        })
      },
      subjects: function () {
        return this.$root.config.subjects.map(function(item){
          return {value: item.subjectId, text: item.subjectName}
        })
      },
    },
    created: function () {
      this.measurementId = this.$route.query.measurementId
      this.loadTableData(1)
    },
    methods: {
      exportWord(){
        let contentHtml = "<!DOCTYPE html><html><body>" + $('#export').html() + "</body></html>";
        let converted = htmlDocx.asBlob(contentHtml);
        let fileName='';
        saveAs(converted, fileName);

      },
      exportQuestion(questionnaireId){
        if (questionnaireId) {
          io.post(io.questionList, {
            questionnaireId : questionnaireId
          },  (ret)=> {
            if (ret.success) {
this.questions=ret.data;
this.$nextTick(()=>{
  this.exportWord();
})
            } else {
              this.$alert(ret.desc)
            }
          })
        }

      },
      handleDelete(questionnaireId) {
        var _this = this
        _this.$confirm('你确定要删除？',
          function () {
            io.post(io.deleteQuestionnaire, {
              questionnaireId: questionnaireId,
            }, function (ret) {
              if (ret.success) {
                _this.$toast('删除成功！')
                _this.loadTableData()
              } else {
                _this.$alert(ret.desc)
              }
            })
          });
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSave() {
        var _this = this,
        examPaperIds = this.multipleSelection.map(val => {
          return val.examPaperId
        })
        if (this.multipleSelection.length === 0) {
          this.$alert('请选择试卷！')
          return false
        }
        io.post(io.bindExams, {
          measurementId: _this.measurementId,
          examPaperIds: examPaperIds,
        }, function (ret) {
          if (ret.success) {
            _this.$toast('组卷成功！')
            _this.$router.go(-1)
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      handleLooking(examPaperId) {
        this.$refs.paperDetail.examPaperId = examPaperId
        this.$refs.paperDetail.show()
      },
      search:function(){
        this.loadTableData(1)
      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.questionnaireList, {
          areaTeamId: _this.query.areaTeamId,
          gradeId: _this.query.gradeId,
          subjectId: _this.query.subjectId,
          title: _this.query.title,
          pageNo: _this.pageNo,
          pageSize: _this.pageSize,
        }, function (ret) {
          if (ret.success) {
            _this.total = ret.data.total
            _this.tableData = ret.data.list
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      setupCurrent:function(periodId){
        var _this = this
        io.post(io.apiAdminUpdateCurrentPeriod,{
          periodId
        }, function (ret) {
          if (ret.success) {
            _this.$toast('OK')
            _this.loadTableData()
          } else {
            _this.$alert(ret.desc)
          }
        })
      }
    }
  }
</script>
<style scoped lang="less">
  .red {
    color: red;
  }
  .content-tooltip {
    unicode-bidi: embed;
    white-space: pre;
    font-size: 14px;
    line-height: 1.5;
  }
  #export{
    p{
      margin: 0;
    }
  }
</style>
