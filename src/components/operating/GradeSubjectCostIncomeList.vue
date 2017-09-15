<template>
  <div class="m-gradeSubject-statistics">
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title am-fl">{{name}} - 成本营收列表</div>
          <div class="widget-function am-fr">
            <button type="button" class="am-btn am-btn-default" @click="$router.push('/main/operating/gradeSubjectStatistics/list')">返回</button>
          </div>
        </div>
        <div class="am-form-group" style="line-height: 33px;margin-top: 13px;">
          <div class="am-u-sm-12">
            <div style="float: left">
              <el-select v-model="formData.areaTeamId" placeholder="请选择区域">
                <el-option
                  v-for="item in areaTeams"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div style="float: left">
              <el-select v-model="formData.gradeId" placeholder="请选择年级">
                <el-option
                  v-for="item in grades"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div style="float: left">
              <el-select v-model="formData.subjectId" placeholder="请选择科目">
                <el-option
                  v-for="item in subjects"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="am-u-md-2">
              <div class="am-form-group">
                <date-picker v-model="formData.startDate">
                  <input type="text" class="am-form-field" placeholder="开始日期" data-am-datepicker readonly>
                </date-picker>
              </div>
            </div>

            <div class="am-u-md-2" style="float: left">
              <div class="am-form-group">
                <date-picker v-model="formData.endDate">
                  <input type="text" class="am-form-field" placeholder="结束日期" data-am-datepicker readonly>
                </date-picker>
              </div>
            </div>
            <button @click="handleSearch" type="button" class="btn-search am-btn am-btn-default am-btn-success">
              <span class="am-icon-search"></span>搜索
            </button>
          </div>
        </div>
        <div style="clear: both">
          <el-tabs v-model="activeName" @tab-click="handleTabClick"  type="card">
            <el-tab-pane label="成本" name="cost">
              <div>
                <div class="am-u-sm-12">
                  <el-table
                    :data="tableData"
                    border
                    stripe
                    style="min-width: 100%">
                    <el-table-column
                      label="序号"
                      min-width="190">
                      <template scope="scope">
                        {{scope.$index}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="分类"
                      min-width="190">
                    </el-table-column>
                    <el-table-column
                      label="金额（元）"
                      min-width="190">
                      <template scope="scope">
                        <div>
                          {{scope.row.totalAmount | formatNumber(2)}}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      width="100">
                      <template scope="scope">
                        <router-link v-if="scope.row.detailType === '1' || scope.row.detailType === '2'" :to="'/main/operating/gradeSubjectStatistics/costDetail?detailType=' +
                       scope.row.detailType + '&name=' + name +'-'+ scope.row.name+ '&feeCategoryId=' + scope.row.categoryId+
                       '&gradeId=' + formData.gradeId +'&subjectId=' + formData.subjectId + '&startDate=' + formData.startDate +
                       '&endDate=' + formData.endDate" tag="a">详情</router-link>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>

              </div>
            </el-tab-pane>
            <el-tab-pane label="营收" name="income">
              <div>
                <div class="am-u-sm-12">
                  <el-table
                    :data="tableData2"
                    border
                    stripe
                    style="min-width: 100%">
                    <el-table-column
                      prop="className"
                      label="班级名称">
                    </el-table-column>
                    <el-table-column
                      label="学费（元）">
                      <template scope="scope">
                        <div>
                          {{scope.row.studyingFee | formatNumber(2)}}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="lectureAmount"
                      label="总讲次">
                    </el-table-column>
                    <el-table-column
                      prop="happernLectureAmount"
                      label="发生讲次">
                    </el-table-column>
                    <el-table-column
                      prop="regAmount"
                      label="报名人数">
                    </el-table-column>
                    <el-table-column
                      prop="gradeName"
                      label="年级">
                    </el-table-column>
                    <el-table-column
                      prop="subjectName"
                      label="科目">
                    </el-table-column>
                    <el-table-column
                      label="总退费（元）">
                      <template scope="scope">
                        <div>
                          {{scope.row.totalRefundAmount | formatNumber(2)}}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="营收(元)">
                      <template scope="scope">
                        <div>
                          {{scope.row.totalIncomeAmount | formatNumber(2)}}
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>

              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import io from '../../lib/io'
  import moment from 'moment'
  export default{
    data:function(){
      return {
        feeCategories: [],
        name: '',
        productId: '',
        areaTeams: '',
        formData: {
          areaTeamId: '',
          gradeId: '',
          subjectId: '',
          startDate: '',
          endDate: '',
        },
        tableData:[],
        tableData2:[],
        activeName: 'cost',
      }
    },
    mounted:function(){
      $(window).smoothScroll()
    },
    computed: {
      grades () {
        return this.$root.config.grades.map(function(item){
          return {value: item.gradeId, label: item.gradeName}
        })
      },
      subjects () {
        return this.$root.config.subjects.map(function(item){
          return {value: item.subjectId, label: item.subjectName}
        })
      }
    },
    created:function(){
      this.name = this.$route.query.name
      this.formData.gradeId = this.$route.query.gradeId
      this.formData.subjectId = this.$route.query.subjectId
      this.formData.startDate = this.$route.query.startDate
      this.formData.endDate = this.$route.query.endDate
      this.formData.areaTeamId = this.$route.query.areaTeamId
      this.activeName = this.$route.query.activeName || 'cost'
      this.getAreaTeamList();
      this.loadTableData();
      this.loadTableData2();
    },
    methods:{
      handleTabClick(val) {
        if (val.name === 'income') {
          this.$router.push(this.$route.fullPath.replace('&activeName=cost','&activeName=income'))
        } else if (val.name === 'cost') {
          this.$router.push(this.$route.fullPath.replace('&activeName=income','&activeName=cost'))
        }
      },
      handleSearch() {
        this.loadTableData()
        this.loadTableData2()
      },
      getAreaTeamList: function () {
        var _this = this;
        io.post(io.apiAdminAreaTeamList,{
        },function(ret){
          if(ret.success){
            _this.areaTeams = []
            ret.data.list.map(function (item) {
              _this.areaTeams.push({value: item.areaTeamId, label: item.name})
            })
            _this.areaTeamId = _this.areaTeams[0].value
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
      loadTableData2:function(){
        var _this = this;
        if(!this.formData.areaTeamId){
        	return
        }
        _this.$showLoading()
        io.post(io.gradeAndSubjectIncome,_this.formData,function(ret){
          _this.$hiddenLoading()
          if(ret.success){
            _this.tableData2 = ret.data
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
      loadTableData:function(){
        var _this = this;
        if(!this.formData.areaTeamId){
        	return
        }
        _this.$showLoading()
        io.post(io.gradeAndSubjectAllCategoryDetail,_this.formData,function(ret){
          _this.$hiddenLoading()
          if(ret.success){
            _this.tableData = ret.data
          }else{
            _this.$alert(ret.desc)
          }
        })
      }
    }
  }
</script>

<style lang="less">
  .m-gradeSubject-statistics{
    .main-account-select {
      float: left;
    }
    .el-select {
      width: 160px;
    }
    .el-select:first-child {
      margin-right: 10px;
    }
    .el-tabs__header {
      margin-top: 20px;
    }
    .am-u-sm-5 {
      margin-bottom: 1.5rem;
    }
  }
</style>
