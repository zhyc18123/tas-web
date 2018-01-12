<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">问卷结果录入</div>
        </div>
        <div class="widget-body am-fr">

          <!--searching condition-->
          <div class="am-u-sm-12 am-form ">
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2 v-model="query.areaTeamId" :options="areaTeams">
                  <option value="">区域</option>
                </select2>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2 v-model="query.periodId" :options="periods">
                  <option value="">期数</option>
                </select2>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2 v-model="query.busTeamId" :options="busTeams">
                  <option value="">业务组</option>
                </select2>
              </div>
            </div>

            <!--<div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2  v-model="query.productId" :options="products">
                  <option value="">请选择产品</option>
                </select2>
              </div>
            </div>-->

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2 v-model="query.gradeId" :options="grades">
                  <option value="">年级</option>
                </select2>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2 v-model="query.subjectId" :options="subjects">
                  <option value="">学科</option>
                </select2>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <input type="text" name="className" v-model="query.className" placeholder="请输入班级名称" />
              </div>
            </div>
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <input type="text" name="teacherName" v-model="query.teacherName" placeholder="请输入教师名称" />
              </div>
            </div>
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <input type="text" name="operatorName" v-model="query.operatorName" placeholder="请输入录入人" />
              </div>
            </div>
          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group">
              <el-date-picker
                v-model="importTime"
                type="daterange"
                placeholder="录入时间">
              </el-date-picker>
            </div>
          </div>
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-u-end">
              <div class="am-form-group">
                <button type="button" class="am-btn am-btn-default am-btn-success " @click="search">
                  <span class="am-icon-search"></span>&nbsp;查询
                </button>
                <button type="button" class="am-btn am-btn-default am-btn-success " @click="exportList">
                  <span class="am-icon-search"></span>&nbsp;导出
                </button>
              </div>
            </div>
          </div>

          <div class="am-u-sm-12">
            <el-table :data="tableData" border stripe style="min-width: 100%">
              <el-table-column fixed prop="periodName" label="期数" min-width="200">
              </el-table-column>
              <el-table-column label="班级名称" prop="className" min-width="100">
              </el-table-column>
              <el-table-column prop="campusName" label="校区" min-width="100">
              </el-table-column>
              <el-table-column prop="subjectName" label="学科" min-width="100">
              </el-table-column>
              <el-table-column prop="gradeName" label="年级" min-width="100">
              </el-table-column>
              <el-table-column prop="regNum" label="报名人数" min-width="100">
              </el-table-column>
              <el-table-column prop="teacherName" label="教师" min-width="100">
              </el-table-column>
              <el-table-column prop="totalNum" label="调查问卷份数" min-width="100">
              </el-table-column>
              <el-table-column prop="totalScore" label="总分" min-width="100">
              </el-table-column>
              <el-table-column prop="headCoefficient" label="人头系数" min-width="100">
              </el-table-column>
              <el-table-column prop="headCoefficientScore" label="最终得分" min-width="100">
              </el-table-column>
              <el-table-column prop="preferentialRate" label="选“优”率" min-width="100">
              </el-table-column>
              <el-table-column prop="operatorName" label="录入人" min-width="100">
              </el-table-column>
              <el-table-column
                label="录入时间"
                min-width="180">
                <template scope="scope">
                  <div>
                    {{scope.row.updateTime | formatTime}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="状态" min-width="100">
                <template scope="scope">
                  <div>
                    {{scope.row.status==='0'?'作废':'有效'}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="center" fixed="right" label="操作" width="300">
                <template scope="scope">
                  <el-button v-if="scope.row.status==='1'" size="small" @click.native="exportDetail(scope.row);">导出明细</el-button>
                  <el-button size="small" @click.native="checkResult(scope.row);">查看</el-button>
                  <el-button size="small" @click.native="cancle(scope.row);">作废</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="am-u-lg-12 am-cf">

            <div class="am-fr">
              <pagination v-bind:total="total" v-bind:pageNo="pageNo" v-bind:pageSize="pageSize" @paging="loadTableData" />
            </div>
          </div>

        </div>
      </div>
    </div>
    <window ref='checkDetail' class='check-result'>
      <question-detail :isWindow='true' :questionDetail='questionDetail'/>
    </window>
  </div>
</template>

<script>
import io from '../../lib/io'

import Pagination from '../base/Pagination'
import Window from '../base/Window'
  import QuestionDetail from './QuestionDetail'

export default {
  data: function() {
    return {
        showCheckDialog:false,
      tableData: [],
      total: 0,
      pageSize: 10,
      pageNo: 1,
      periods: '',
      questionDetail:{
        questionnaireQuestionList:[]
      },
        importTime:'',
      query: {
        areaTeamId: window.config.areaTeams[0] && window.config.areaTeams[0].areaTeamId || '',
        busTeamId: '',
        productId: '',
        gradeId: '',
        className: '',
        teacherName:'',
        operatorName:'',
        subjectId: '',
        startDate:'',
        endDate:''
      },
      // products:[],
    }
  },
  components: {
    Pagination,
    Window,
    QuestionDetail
  },
  watch: {
      importTime(newVal) {
        this.query.startDate = newVal[0] ? this.$options.filters.formatDate(newVal[0]) : ''
        this.query.endDate = newVal[1] ? this.$options.filters.formatDate(newVal[1]): ''
      },
    'query.areaTeamId': function() {
      this.query.busTeamId = ''
      this.query.productId = ''
      // this.loadProductData()
    }
  },
  mounted: function() {
    $(window).smoothScroll()
  },
  created: function() {
    this.loadTableData(this.pageNo)
    // this.loadProductData();
    this.loadPeriodData();
  },
  computed: {
    areaTeams: function() {
      var options = (this.$root.config.areaTeams || [])
        .map(function(item) {
          return { value: item.areaTeamId, text: item.name }
        })
      return options
    },
    //响应式，（this.query.areaTeamId ）相关依赖改变重新求值，
    busTeams: function() {
      var options = ((this.query.areaTeamId) ? (this.$root.config.groupBusTeams[this.query.areaTeamId] || []) : [])
        .map(function(item) {
          return { value: item.busTeamId, text: item.name }
        })
      this.query.busTeamId = ''
      return options
    },
    //计算缓存，性能开销比较大的的计算属性
    grades: function() {
      return this.$root.config.grades.map(function(item) {
        return { value: item.gradeId, text: item.gradeName }
      })
    },
    subjects: function() {
      return this.$root.config.subjects.map(function(item) {
        return { value: item.subjectId, text: item.subjectName }
      })
    }
  },
  methods: {
    exportList(){
            io.downloadFile(io.exportQuestionnaireRecord,this.query,  (ret)=> {
              if (ret.success) {
                this.$toast('导出成功！')
              } else {
                this.$alert(ret.desc)
              }
            })
    },
    exportDetail(row){
            io.downloadFile(io.exportQuestionnaireRecordDetail, {
              classQuestionnaireRecordId: row.classQuestionnaireRecordId,
            },  (ret)=> {
              if (ret.success) {
                this.$toast('导出成功！')
              } else {
                this.$alert(ret.desc)
              }
            })
    },
    cancle(row){
        this.$confirm('你确定要作废？',
           ()=> {
            io.post(io.invalidQuestionnaireRecordDetail, {
              classQuestionnaireRecordId: row.classQuestionnaireRecordId,
            },  (ret)=> {
              if (ret.success) {
                this.$toast('作废成功！')
                this.loadTableData()
              } else {
                this.$alert(ret.desc)
              }
            })
          });
    },
      checkResult(row){
            io.post(io.questionnaireRecordDetail, {
              classQuestionnaireRecordId : row.classQuestionnaireRecordId
            },  (ret)=> {
              if (ret.success) {
                this.questionDetail=ret.data;
                this.questionDetail.courseClass=this.questionDetail.classQuestionnaireRecord;
                this.questionDetail.questionnaireQuestionList=this.questionDetail.classQuestionScoreList;
                this.$refs.checkDetail.show();

              } else {
                this.$alert(ret.desc)
              }
            })
        
      },
    search: function() {
      this.loadTableData(1)
    },
    loadTableData: function(pageNo) {
      var _this = this
      _this.pageNo = pageNo || _this.pageNo || 1
      io.post(io.questionnaireRecordList, $.extend({
        pageNo: _this.pageNo,
        pageSize: _this.pageSize
      }, _this.query), function(ret) {
        if (ret.success) {
          _this.total = ret.data.total
          _this.tableData = ret.data.list
        } else {
          _this.$alert(ret.desc)
        }
      })
    },
    loadPeriodData: function() {
      var _this = this
      io.post(io.apiAdminPeriodListForAreaTeam, {
        areaTeamId: this.query.areaTeamId
      }, function(ret) {
        if (ret.success) {
          _this.periods = ret.data.map(function(item) {
            return { value: item.periodId, text: item.periodName }
          })
        } else {
          console.log(ret.desc)
          _this.periods = []
        }
      })
    },
    // loadProductData: function () {
    //   var _this = this
    //   io.post(io.apiAdminBaseProductListForAreaTeam, {
    //     areaTeamId : this.query.areaTeamId
    //   }, function (ret) {
    //     if (ret.success) {
    //       _this.products = ret.data.map(function (item) {
    //         return {value: item.productId, text: item.name}
    //       })
    //     } else {
    //       _this.$alert(ret.desc)
    //     }
    //   })
    // },
    prepareUpload: function() {
      $('#uploadFile').click()
    },
    uploadExcel: function() {
      var _this = this;
      var formData = new FormData();
      formData.append("file", document.getElementById('uploadFile').files[0]);
      _this.$showLoading()
      io.postMitiFile(io.importCourseExcel, formData, function(ret) {
        $('#uploadFile').val(null)
        _this.$hiddenLoading()
        if (ret.ok && ret.data.success) {
          _this.loadTableData(1)
        } else {
          alert(ret.data.desc || "上传失败");
        }

      })
    },
    del: function(courseTemplateId) {
      var _this = this
      _this.$confirm("确认删除吗",
        function() {
          io.post(io.apiAdminDeleteCourseTemplate, {
            courseTemplateId: courseTemplateId
          }, function(ret) {
            if (ret.success) {
              _this.loadTableData()
              _this.$alert('删除成功')
            } else {
              _this.$alert(ret.desc)
            }
          })
        });
    }
  }
}
</script>
<style lang="less">
.check-result{
    .am-modal-dialog{
        width: 80%;
    }
    .am-modal-bd{
        text-align: left;
    }
}
</style>


