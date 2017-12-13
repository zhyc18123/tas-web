<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">试卷列表</div>
        </div>
        <div class="widget-body  am-fr">

          <div class="am-u-sm-12 am-form ">
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2  v-model="query.areaTeamId" :options="areaTeams">
                </select2>
              </div>
            </div>
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2  v-model="query.gradeId" :options="grades">
                  <option value="">年级</option>
                </select2>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2  v-model="query.subjectId" :options="subjects">
                  <option value="">科目</option>
                </select2>
              </div>
            </div>
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <input type="text" name="title" v-model="query.title" placeholder="输入试卷标题"/>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-u-end">
              <div class="am-form-group">
                <button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="search" ><span class="am-icon-search"></span>查询
                </button>
                <button v-if="hasPermission('add') && !measurementId" type="button" class="am-btn am-btn-default am-btn-success"
                        @click="$router.push('/main/measurement/exam/add')"><span
                  class="am-icon-plus"></span>新建
                </button>
              </div>
            </div>

          </div>

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
                prop="gradeName"
                label="年级"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="subjectName"
                label="科目"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="title"
                label="试卷标题"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="questionAmount"
                label="题数"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="testTime"
                label="考试时间（min）"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="totalScore"
                label="总分"
                min-width="100">
              </el-table-column>
              <el-table-column
                v-if="!measurementId"
                label="最后编辑时间"
                min-width="150">
                <template scope="scope">
                  <div>
                    {{scope.row.updateTime | formatTime}}
                  </div>
                </template>
              </el-table-column>

              <el-table-column
                label="操作"
                fixed="right"
                width="240">
                <template scope="scope">
                  <el-button v-if="measurementId" size="small" @click.native="handleLooking">查看
                  </el-button>
                  <el-button v-if="hasPermission('add') && !measurementId" size="small" @click.native="$router.push('/main/measurement/exam/add?examPaperId='+
                  scope.row.examPaperId)">编辑
                  </el-button>
                  <el-button v-if="hasPermission('add') && !measurementId" @click="handleDelete(scope.row.examPaperId)" size="small">删除
                  </el-button>
                  <el-button v-if="hasPermission('add') && !measurementId" size="small" @click.native="$router.push('/main/measurement/exam/addTopic?examPaperId='+
                  scope.row.examPaperId)">录入题目
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="am-u-lg-12 am-cf">
            <div class="am-fr">
              <pagination v-bind:total="total" v-bind:pageNo="pageNo" v-bind:pageSize="pageSize"
                          @paging="loadTableData"/>
            </div>
          </div>
          <div class="am-u-lg-12 am-cf">
            <div class="am-fr">
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
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";

  export default{
    data: function () {
      return {
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
      ElButton,
      Pagination
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    computed: {
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSave() {
        var _this = this,
        examPaperIds = this.multipleSelection.map(val => {
          return val.examPaperId
        })
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
      handleLooking() {

      },
      search:function(){
        this.loadTableData(1)
      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.examPapers, {
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
  .content-tooltip {
    unicode-bidi: embed;
    white-space: pre;
    font-size: 14px;
    line-height: 1.5;
  }
</style>
