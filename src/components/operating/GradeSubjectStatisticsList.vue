<template>
  <div class="m-gradeSubject-statistics">
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title am-fl">年级科目统计</div>
        </div>
        <div class="widget-body  am-fr">
          <toolbar @initList="initList" @handleSearch="handleSearch" ref="toolbar"></toolbar>
        </div>
        <div class="am-form-group">
          <div class="am-u-sm-12">
            <el-table
              :data="tableData"
              border
              :show-summary="true"
              :summary-method="getSummaries"
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
                     scope.row.gradeId + '&subjectId=' + scope.row.subjectId+ '&name=' + scope.row.gradeName+ scope.row.subjectName + '&areaTeamId=' + areaTeamId +
                      '&startDate=' + startDate+ '&endDate=' + endDate + '&activeName=income'" tag="a">详情</router-link>
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
  import Toolbar from './Toolbar.vue'
  import moment from 'moment'
  export default{
    data:function(){
      return {
        formData: {
          gradeId: '',
          subjectId: '',
          areaTeamId: '',
          startDate: '',
          endDate: '',
        },
        areaTeams: '',
        tableData: [],
      }
    },
    mounted:function(){
      $(window).smoothScroll()
    },
    created:function(){
    },
    computed: {
      gradeId: function () {
        return this.$refs.toolbar.gradeId
      },
      subjectId: function () {
        return this.$refs.toolbar.subjectId
      },
      areaTeamId: function () {
        return this.$refs.toolbar.areaTeamId
      },
      startDate: function () {
        return this.$refs.toolbar.startDate
      },
      endDate: function () {
        return this.$refs.toolbar.endDate
      }
    },
    components: {
    	Toolbar
    },
    methods:{
      handleSearch(data) {
        this.loadTableData(data)
      },
      initList(data) {
        this.loadTableData(data);
      },
      loadTableData:function(data){
        var _this = this;
        _this.$showLoading()
        io.post(io.areaTeamGradeAndSubjectStatistics,Object.assign({},_this.formData,data),function(ret){
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
