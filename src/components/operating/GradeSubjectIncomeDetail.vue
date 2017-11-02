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
          <toolbar @initList="initList" @handleSearch="handleSearch" ref="toolbar"></toolbar>
          <div v-if="detailType === '6'" class="am-u-sm-12">
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
          <div v-if="detailType === '7'" class="am-u-sm-12">
            <el-table
              :data="tableData"
              border
              stripe
              style="min-width: 100%">
              <el-table-column
                label="序号">
                <template scope="scope">
                  {{scope.$index}}
                </template>
              </el-table-column>
              <el-table-column
                prop="className"
                label="班级名称">
              </el-table-column>
              <el-table-column
                label="学费(元)">
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
                prop="areaTeamName"
                label="区域">
              </el-table-column>
              <el-table-column
                prop="busTeamName"
                label="业务组">
              </el-table-column>
              <!--<el-table-column
                label="总退费（元）">
                <template scope="scope">
                  <div>
                    {{scope.row.totalRefundAmount | formatNumber(2)}}
                  </div>
                </template>
              </el-table-column>-->
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
          <div v-if="detailType === '8'" class="am-u-sm-12">
            <el-table
              :data="tableData"
              border
              stripe
              style="min-width: 100%">
              <el-table-column
                label="序号">
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
                label="金额（元）">
                <template scope="scope">
                  <div>
                    {{scope.row.totalAmount | formatNumber(2)}}
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
  import Toolbar from './Toolbar.vue'
  import moment from 'moment'
  export default{
    data:function(){
      return {
        name: '',
        detailType: '',
        productStatistics: '',
        incomeCategoryId: '',
        tableData:[],
      }
    },
    mounted:function(){
      $(window).smoothScroll()
    },
    components: {
      Toolbar
    },
    computed: {
      gradeId: function () {
        return this.$refs.toolbar.grade
      },
      subjectId: function () {
        return this.$refs.toolbar.subject
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
    created:function(){
      this.name = this.$route.query.name
      this.detailType = this.$route.query.detailType
      this.productStatistics = this.$route.query.productStatistics
      this.incomeCategoryId = this.$route.query.incomeCategoryId
    },
    methods:{
      initList(data) {
        this.loadTableData(data);
      },
      handleSearch(data) {
        this.loadTableData(data)
      },
      loadTableData:function(data){
        var _this = this;
        if(!data.areaTeamId){
          return
        }
        if(!data.subjectId){
          this.$alert('科目为必选！')
          return
        }
        _this.$showLoading()
        io.post(io.incomeDetail,Object.assign({},data,{
          detailType: _this.detailType,
          productStatistics: _this.productStatistics,
          incomeCategoryId: _this.incomeCategoryId,
        }),function(ret){
          _this.$hiddenLoading()
          if(ret.success){
            if (_this.$root.config.subjects.filter(item => item.subjectId === data.subjectId) &&  _this.name.split('-')[1]) {
              _this.name = _this.$root.config.subjects.filter(item => item.subjectId === data.subjectId)[0].subjectName + '-' + _this.name.split('-')[1]
            }
            if (_this.detailType == 6) {
              _this.tableData = ret.data.changeRecordList
            } else if (_this.detailType == 7) {
              _this.tableData = ret.data.classIncomeVoList
            } else if (_this.detailType == 8) {
              _this.tableData = ret.data.categoryMainAccountVoList
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
      width: 180px;
    }
    .el-select:first-child {
      margin-right: 10px;
    }
    .am-u-sm-5 {
      margin-bottom: 1.5rem;
    }
  }
</style>
