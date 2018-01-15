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
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-u-end">
              <div class="am-form-group">
                <button type="button" class="am-btn am-btn-default am-btn-success " @click="search">
                  <span class="am-icon-search"></span>&nbsp;查询
                </button>
              </div>
            </div>
          </div>

          <div class="am-u-sm-12">
            <el-table :data="tableData" border stripe style="min-width: 100%">
              <el-table-column fixed prop="periodName" label="期数" min-width="100">
              </el-table-column>
              <el-table-column label="班级名称" prop="className" min-width="100">
              </el-table-column>
              <el-table-column prop="busTeamName" label="业务组" min-width="100">
              </el-table-column>
              <el-table-column prop="subjectName" label="学科" min-width="100">
              </el-table-column>
              <el-table-column prop="gradeName" label="年级" min-width="100">
              </el-table-column>
              <el-table-column prop="teacherName" label="教师" min-width="100">
              </el-table-column>
              <el-table-column align="center" fixed="right" label="操作" width="150">
                <template scope="scope">
                  <el-button size="small" @click.native="$router.push('/main/research/import?classId='+scope.row.classId)">录入</el-button>
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

  </div>
</template>

<script>
import io from '../../lib/io'

import Pagination from '../base/Pagination'

export default {
  data: function() {
    return {
      tableData: [],
      total: 0,
      pageSize: 10,
      pageNo: 1,
      periods: '',
      query: {
        areaTeamId: window.config.areaTeams[0] && window.config.areaTeams[0].areaTeamId || '',
        busTeamId: '',
        productId: '',
        gradeId: '',
        gradeName: '',
        className:'',
        teacherName:'',
        subjectId: '',
      },
      // products:[],
    }
  },
  components: {
    Pagination
  },
  watch: {
    // 'query.areaTeamId': function() {
    //   this.query.busTeamId = ''
    //   this.query.productId = ''
    //   // this.loadProductData()
    // }
  },
  mounted: function() {
    $(window).smoothScroll()
  },
  created: function() {
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
      // this.query.busTeamId = ''
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
    search: function() {
      this.loadTableData(1)
    },
    loadTableData: function(pageNo) {
      console.log(this.query)
      var _this = this
      _this.pageNo = pageNo || _this.pageNo || 1
      io.post(io.apiAdminCourseClassList, $.extend({
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
          _this.loadTableData(_this.pageNo)
        } else {
          console.log(ret.desc)
          _this.periods = []
        }
      })
    },
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
