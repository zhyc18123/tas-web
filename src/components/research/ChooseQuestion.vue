<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title am-fl">试卷列表</div>
          <div class="widget-function am-fr">
            <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
          </div>
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

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-u-end">
              <div class="am-form-group">
                <button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="search" ><span class="am-icon-search"></span>查询
                </button>
              </div>
            </div>

          </div>

          <div class="am-u-sm-12 am-form-group">
            <el-table
            highlight-current-row
            @current-change="handleSelectionChange"
              :data="tableData"
              border
              ref="multipleTable"
              stripe
              max-height="600"
              style="min-width: 100%">
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
                label="操作"
                fixed="right"
                :width="optionWidth">
                <template scope="scope">
                  <el-button v-if="settingId" size="small" @click.native="handleLooking(scope.row.questionnaireId)">查看
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <paper-detail ref="paperDetail"></paper-detail>
          <div class="am-u-lg-12">
            <div class="am-text-center">
              <el-button type="primary" @click="handleSave">保存</el-button>
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
        multipleSelection: [],
        // examPaperIds: [],
        questionnaireId:'',
        settingId: this.$route.query.settingId,
        tableData: [],
        total: 0,
        pageSize: 10,
        pageNo: 1,
        query: {
          areaTeamId : window.config.areaTeams[0] && window.config.areaTeams[0].areaTeamId || '' ,
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
        return this.settingId ? 80: 240
      },
      areaTeams: function () {
        var options = ( this.$root.config.areaTeams || [] )
          .map(function (item) {
            return {value: item.areaTeamId, text: item.name}
          })
        return options
      },
    },
    created: function () {
      this.query.areaTeamId = this.$route.query.areaTeamId
      this.loadTableData(1)
    },
    mounted() {
    },
    methods: {
      handleDelete(examPaperId) {
        var _this = this
        _this.$confirm('你确定要删除？',
          function () {
            io.post(io.delExamPaper, {
              examPaperId: examPaperId,
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
        this.questionnaireId = val.questionnaireId;
      },
      handleSave() {
        if (!this.questionnaireId) {
          this.$alert('当前没有选择任何试卷？');
          return;
        } else {
         this.settingSelectQuestionnaire()
        }
      },
      settingSelectQuestionnaire() {
        io.post(io.settingSelectQuestionnaire, {
          settingId: this.settingId,
          questionnaireId: this.questionnaireId,
        },  (ret)=> {
          if (ret.success) {
            this.$toast('组卷成功！')
            this.$router.go(-1)
          } else {
            this.$alert(ret.desc)
          }
        })
      },
      handleLooking(questionnaireId) {
        this.$refs.paperDetail.currentQuestionNo = 0
        this.$refs.paperDetail.questionnaireId = questionnaireId
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
          pageNo: _this.pageNo,
          pageSize: _this.pageSize,
        }, function (ret) {
          if (ret.success) {
            _this.total = ret.data.total
            _this.checkList = []
            ret.data.list.map(val => {
              _this.query.examPaperNos && _this.query.examPaperNos.map(examPaperNo => {
                if (examPaperNo === val.examPaperNo) {
                  _this.checkList.push(val)
                }
              })
            })
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
</style>
