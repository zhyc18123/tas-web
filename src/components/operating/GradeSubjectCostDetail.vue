<template>
  <div class="m-gradeSubject-statistics">
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title am-fl">{{name}}详情</div>
          <div class="widget-function am-fr">
            <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
          </div>
        </div>
        <div class="widget-body">
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
          <div v-if="formData.detailType !== '0'" class="am-u-sm-12">
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
                label="成本名称"
                min-width="190">
              </el-table-column>
              <el-table-column
                prop="totalAmount"
                label="金额（元）"
                min-width="190">
                <template scope="scope">
                  <div>
                    {{scope.row.totalAmount | formatNumber(2)}}
                  </div>
                </template>
              </el-table-column>
              <!--教师成本 todo-->
              <el-table-column
                label="操作"
                width="100">
                <template scope="scope">
                  <router-link v-if="formData.detailType === '1'" :to="'/main/operating/gradeSubjectStatistics/subDetail?detailType=' +
                       scope.row.detailType + '&name=' + name +'-'+ scope.row.name+ '&feeCategoryId=' + scope.row.categoryId+
                       '&gradeId=' + formData.gradeId +'&subjectId=' + formData.subjectId + '&startDate=' + formData.startDate +
                       '&endDate=' + formData.endDate + '&areaTeamId=' + formData.areaTeamId" tag="a">明细</router-link>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-if="formData.detailType === '0'" class="am-u-sm-12">
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
                prop="remark"
                label="备注"
                min-width="190">
              </el-table-column>
              <el-table-column
                prop="amount"
                label="金额（元）">
                <template scope="scope">
                  <div>
                    {{scope.row.amount | formatNumber(2)}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="发生日期/时间段"
                min-width="190">
                <template scope="scope">
                  <div>
                    {{scope.row.createTime | formatDate}}
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
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
        name: '',
        areaTeams: [],
        formData: {
          areaTeamId: '564701030634225664',
          gradeId: '',
          subjectId: '',
          startDate: '',
          endDate: '',
          feeCategoryId: '',
          detailType: '0',
        },
        tableData:[],
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
      this.formData.detailType = this.$route.query.detailType
      this.formData.gradeId = this.$route.query.gradeId
      this.formData.subjectId = this.$route.query.subjectId
      this.formData.startDate = this.$route.query.startDate
      this.formData.endDate = this.$route.query.endDate
      this.formData.feeCategoryId = this.$route.query.feeCategoryId
      this.getAreaTeamList();
      this.loadTableData();
    },
    methods:{
      handleSearch() {
        this.loadTableData()
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
      loadTableData:function(){
        var _this = this;
        _this.$showLoading()
        io.post(io.gradeAndSubjectDetail,_this.formData,function(ret){
          _this.$hiddenLoading()
          if(ret.success){
            if (_this.formData.detailType == 0) {
              _this.tableData = ret.data.changeRecordList
            } else if (_this.formData.detailType == 1 ||_this.formData.detailType == 3) {
              _this.tableData = ret.data.gradeAndSubjectCostByCategoryVoList
            } else if(_this.formData.detailType == 2) {
              _this.tableData = ret.data.teacherClassCostVoList
            }

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
    .el-tabs__header {
      margin-top: 20px;
    }
    .el-select {
      width: 160px;
    }
    .el-select:first-child {
      margin-right: 10px;
    }
    .am-u-sm-5 {
      margin-bottom: 1.5rem;
    }
  }
</style>
