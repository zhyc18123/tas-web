<template>
  <div class="m-gradeSubject-statistics">
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title am-fl">年级科目统计</div>
        </div>
        <div class="widget-body  am-fr">
          <div class="am-form-group" style="line-height: 38px;">
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
        </div>
        <div class="am-form-group">
          <div class="am-u-sm-12">
            <el-table
              :data="tableData"
              border
              stripe
              style="min-width: 100%">
              <el-table-column
                prop="gradeName"
                label="年级"
                min-width="190">
              </el-table-column>
              <el-table-column
                prop="subjectName"
                label="科目"
                min-width="190">
              </el-table-column>
              <el-table-column
                prop="cost"
                label="成本（元）"
                min-width="190">
                <template scope="scope">
                  <div>
                    {{scope.row.cost | formatNumber(2)}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="income"
                label="营收（元）"
                min-width="190">
                <template scope="scope">
                  <div>
                    {{scope.row.income | formatNumber(2)}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="profits"
                label="利润（元）"
                min-width="190">
                <template scope="scope">
                  <div>
                    {{scope.row.profits | formatNumber(2)}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="100">
                <template scope="scope">
                  <router-link :to="'/main/operating/gradeSubjectStatistics/costIncomeList?gradeId=' +
                     scope.row.gradeId + '&subjectId=' + scope.row.subjectId+ '&name=' + scope.row.gradeName+ scope.row.subjectName + '&areaTeamId=' + formData.areaTeamId +
                      '&startDate=' + formData.startDate+ '&endDate=' + formData.endDate + '&activeName=cost'" tag="a">详情</router-link>
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
        formData: {
          startDate: moment().month(moment().month() - 1).startOf('month').format('YYYY-MM-DD'),
          endDate: moment().month(moment().month() - 1).endOf('month').format('YYYY-MM-DD'),
          areaTeamId: '',
          gradeId: '31',
          subjectId: '',
        },
        areaTeams: '',
        tableData: [
          {
            name: '广州区域',
            cost: '',
            income: '',
            profits: '',
          }
        ],
      }
    },
//    components: {
//      Pagination
//    },
    mounted:function(){
      $(window).smoothScroll()
    },
    created:function(){
      this.getAreaTeamList();
      this.loadTableData();
    },
    computed: {
      grades () {
        return [{value: '', label: '全部'}].concat(
          this.$root.config.grades.map(function(item){
            return {value: item.gradeId, label: item.gradeName}
          })
        )
      },
      subjects () {
        return [{value: '', label: '全部'}].concat(
          this.$root.config.subjects.map(function(item){
            return {value: item.subjectId, label: item.subjectName}
          })
        )
      }
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
        io.post(io.areaTeamGradeAndSubjectStatistics,this.formData,function(ret){
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

<style lang="less" scoped>
  .m-gradeSubject-statistics {
    .el-select {
      width: 160px;
    }
    .el-select:first-child {
      margin-right: 10px;
    }
    .am-form-group {
      margin-top: 3px;
    }
    .btn-search {
      /*margin-bottom: 9px;*/
    }
  }
</style>
