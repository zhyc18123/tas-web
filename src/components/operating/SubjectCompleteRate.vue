<template>
  <div class="subject-complete">
    <div class="content">
      <el-button-group>
        <el-button @click="active = 1" size="small" :class="{'el-button el-button--primary': active === 1}">年级科数完成率</el-button>
        <el-button @click="active = 0" size="small" :class="{'el-button el-button--primary': active === 0}">班主任科数完成率</el-button>
        <el-button @click="active = 2" size="small" :class="{'el-button el-button--primary': active === 2}">班级续读率</el-button>
      </el-button-group>
      <div class="head-opt" v-show="active !== 2">
        <div>
          <el-select size="small" v-model="areaTeamId" placeholder="请选择区域">
            <el-option
              v-for="item in areaTeams"
              :key="item.areaTeamId"
              :label="item.name"
              :value="item.areaTeamId">
            </el-option>
          </el-select>
          <el-select size="small" :disabled="busTeams.length === 0" v-model="busTeamId" placeholder="请选择业务组">
            <el-option
              v-for="item in busTeams"
              :key="item.busTeamId"
              :label="item.name"
              :value="item.busTeamId">
            </el-option>
          </el-select>
          <el-select :disabled="periods.length === 0" v-model="periodId" placeholder="请选择期数">
            <el-option
              v-for="item in periods"
              :key="item.periodId"
              :label="item.periodName"
              :value="item.periodId">
            </el-option>
          </el-select>
          <el-select v-show="active === 1" v-model="sectionId" placeholder="请选择年级">
            <el-option
              v-for="item in sections"
              :key="item.sectionId"
              :label="item.sectionName"
              :value="item.sectionId">
            </el-option>
          </el-select>

          <button type="button" class="am-btn am-btn-default am-btn-success"
                  @click="handleFind" ><span class="am-icon-search"></span>查询
          </button>
        </div>
      </div>
      <toolbar ref="toolbar" :isAreaTeam="true" :isBusTeam="true" class="toolbar" @search="handleFind" v-show="active === 2"></toolbar>
      <div class="am-u-sm-12 am-form-group">
        <el-button size="small" type="success" @click="handleExport">
          <span class="am-icon-download"></span>&nbsp;&nbsp;导出</el-button>
      </div>
      <div v-show="active === 1" class="am-u-sm-12">
        <el-table
          :data="gradeCompletionRate"
          border
          empty-text="暂无数据"
          stripe
          style="min-width: 100%">
          <el-table-column
             min-width="140"
            prop="busTeamName"
            label="业务组">
          </el-table-column>
          <el-table-column
             min-width="100"
            prop="gradeName"
            label="年级">
          </el-table-column>

          <el-table-column
             min-width="140"
            prop="realClassIncome"
            label="实际课程预收">
            <template scope="scope">
              <div>{{scope.row.realClassIncome | formatNumber(2)}}</div>
            </template>
          </el-table-column>
          <el-table-column
             min-width="140"
            prop="targetClassIncome"
            label="目标课程预收">
          </el-table-column>
          <el-table-column
             min-width="140"
            label="课程预收完成率">
            <template scope="scope">
              <div>{{scope.row.realClassIncome ==null || scope.row.targetClassIncome ==null || scope.row.targetClassIncome == '0' ? '0%' :
                (parseInt(scope.row.realClassIncome)/ parseInt(scope.row.targetClassIncome))*100 | formatNumber(2)}}%</div>
            </template>
          </el-table-column>
          <el-table-column
             min-width="140"
            prop="realNewStudentNum"
            label="实际新生科数">
          </el-table-column>
          <el-table-column
             min-width="140"
            prop="targetNewStudentNum"
            label="目标新生科数">
          </el-table-column>
          <el-table-column
             min-width="140"
            label="新生科数完成率">
            <template scope="scope">
              <div>{{scope.row.realNewStudentNum ==null || scope.row.targetNewStudentNum ==null || scope.row.targetNewStudentNum == '0' ? '0%' :
                (parseInt(scope.row.realNewStudentNum)/ parseInt(scope.row.targetNewStudentNum))*100 | formatNumber(2)}}%</div>
            </template>
          </el-table-column>
          <el-table-column
             min-width="140"
            prop="realOldStudentNum"
            label="实际老生科数">
          </el-table-column>
          <el-table-column
             min-width="140"
            prop="targetOldSudentNum"
            label="目标老生科数">
          </el-table-column>
          <el-table-column
             min-width="140"
            label="老生科数完成率">
            <template scope="scope">
              <div>{{scope.row.realOldStudentNum ==null || scope.row.targetOldSudentNum ==null || scope.row.targetOldSudentNum == '0' ? '0%' :
                (parseInt(scope.row.realOldStudentNum)/ parseInt(scope.row.targetOldSudentNum))*100 | formatNumber(2)}}%</div>
            </template>
          </el-table-column>
          <el-table-column
             min-width="140"
            prop="nowPeriodNum"
            label="本期科数">
          </el-table-column>
          <el-table-column
             min-width="140"
            prop="sequentialNum"
            label="顺期科数">
          </el-table-column>
          <el-table-column
             min-width="140"
            label="顺期续读率">
            <template scope="scope">
              <div>{{scope.row.nowPeriodNum ==null || scope.row.sequentialNum==null || scope.row.nowPeriodNum == '0' ? '0%' :
                (parseInt(scope.row.sequentialNum)/ parseInt(scope.row.nowPeriodNum))*100 | formatNumber(2)}}%</div>
            </template>
          </el-table-column>
          <el-table-column
             min-width="140"
            prop="targetSequentialNum"
            label="目标顺期续读率">
          </el-table-column>
          <el-table-column
             min-width="140"
            prop="stepNum"
            label="跨期科数">
          </el-table-column>
          <el-table-column
             min-width="140"
            label="跨期续读率">
            <template scope="scope">
              <div>{{scope.row.nowPeriodNum ==null || scope.row.stepNum==null || scope.row.nowPeriodNum == '0' ? '0%' :
                (parseInt(scope.row.stepNum)/ parseInt(scope.row.nowPeriodNum))*100 |formatNumber(2)}}%</div>
            </template>
          </el-table-column>
          <el-table-column
             min-width="140"
            prop="targetStepNum"
            label="目标跨期续读率">
          </el-table-column>
        </el-table>

      </div>
      <div v-show="active === 0" class="am-u-sm-12">
        <el-table
          :data="seniorComletionRate"
          border
          empty-text="暂无数据"
          stripe
          style="min-width: 100%">
          <el-table-column
            prop="busTeamName"
            min-width="160"
            label="业务组">
          </el-table-column>
          <el-table-column
            prop="seniorName"
            min-width="100"
            label="班主任">
          </el-table-column>
          <el-table-column
            prop="lessRealNewStudentNum"
            min-width="200"
            label="新生科数（小于6讲）">
          </el-table-column>
          <el-table-column
            prop="bigRealNewStudentNum"
            min-width="200"
            label="新生科数（大于等于6讲）">
          </el-table-column>
          <el-table-column
            prop="targetNewStudentNum"
            min-width="140"
            label="目标新生科数">
          </el-table-column>
          <el-table-column
            min-width="140"
            label="新生科数完成率">
            <template scope="scope">
              <div>{{scope.row.bigRealNewStudentNum ==null ||scope.row.targetNewStudentNum ==null || scope.row.targetNewStudentNum == '0' ? '0%' :
                (parseInt(scope.row.bigRealNewStudentNum)/ parseInt(scope.row.targetNewStudentNum))*100 |formatNumber(2)}}%</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="lessrealOldStudentNum"
            min-width="180"
            label="老生科数（小于6讲）">
          </el-table-column>
          <el-table-column
            prop="bigRealOldStudentNum"
            min-width="200"
            label="老生科数（大于等于6讲）">
          </el-table-column>
          <el-table-column
            prop="targetOldSudentNum"
            min-width="140"
            label="目标老生科数">
          </el-table-column>
          <el-table-column
            min-width="160"
            label="老生科数完成率">
            <template scope="scope">
              <div>{{scope.row.bigRealOldStudentNum ==null ||scope.row.targetOldSudentNum ==null || scope.row.targetOldSudentNum == '0' ? '0%' :
                (parseInt(scope.row.bigRealOldStudentNum)/ parseInt(scope.row.targetOldSudentNum))*100 |formatNumber(2)}}%</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="nowPeriodNum"
            min-width="100"
            label="本期科数">
          </el-table-column>
          <el-table-column
            prop="sequentialNum"
            min-width="100"
            label="顺期科数">
          </el-table-column>
          <el-table-column
            min-width="120"
            label="顺期续读率">
            <template scope="scope">
              <div>{{scope.row.nowPeriodNum ==null ||scope.row.sequentialNum ==null || scope.row.nowPeriodNum == '0' ? '0%' :
                (parseInt(scope.row.sequentialNum)/ parseInt(scope.row.nowPeriodNum))*100 |formatNumber(2)}}%</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="targetSequentialNum"
            min-width="140"
            label="目标顺期续读率">
          </el-table-column>
          <el-table-column
            prop="stepNum"
            min-width="120"
            label="跨期科数">
          </el-table-column>
          <el-table-column
            min-width="140"
            label="跨期续读率">
            <template scope="scope">
              <div>{{scope.row.nowPeriodNum ==null ||scope.row.stepNum ==null || scope.row.nowPeriodNum == '0' ? '0%' :
                (parseInt(scope.row.stepNum)/ parseInt(scope.row.nowPeriodNum))*100 |formatNumber(2)}}%</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="targetStepNum"
            min-width="160"
            label="目标跨期续读率">
          </el-table-column>
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="80">
            <template scope="scope">
              <el-button size="small" @click="handleExportSomeSeniorComletionRate(scope.row)">导出</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="am-u-lg-12 am-cf">

          <div class="am-fr">
            <pagination v-bind:total="seniorTotal" v-bind:pageNo="seniorPageNo" v-bind:pageSize="seniorPageSize"
                        @paging="getSeniorComletionRate"/>
          </div>
        </div>
      </div>
      <div v-show="active === 2" class="am-u-sm-12">
        <el-table
          :data="classComletionRate"
          border
          empty-text="暂无数据"
          stripe
          style="min-width: 100%">
          <el-table-column
            prop="periodName"
            label="期数">
          </el-table-column>
          <el-table-column
            prop="className"
            min-width="100"
            label="班级名称">
          </el-table-column>
          <el-table-column
            prop="campusName"
            label="校区">
          </el-table-column>
          <el-table-column
            prop="subjectName"
            label="学科">
          </el-table-column>
          <el-table-column
            prop="gradeName"
            label="年级">
          </el-table-column>
          <el-table-column
            prop="teacherNames"
            label="教师">
          </el-table-column>
          <el-table-column
            prop="regNum"
            min-width="100"
            label="报名人数">
          </el-table-column>
          <el-table-column
            min-width="140"
            prop="sequentialPersonNum"
            label="顺期人数">
          </el-table-column>
          <el-table-column
            min-width="140"
            label="顺期续读率">
            <template scope="scope">
              <div>{{scope.row.regNum ==null ||scope.row.sequentialPersonNum ==null || scope.row.regNum == '0' ? '0%' :
                (parseInt(scope.row.sequentialPersonNum)/ parseInt(scope.row.regNum))*100 |formatNumber(2)}}%</div>
            </template>
          </el-table-column>
          <el-table-column
            min-width="140"
            prop="sequentialTargetRate"
            label="目标顺期续读率">
          </el-table-column>
          <el-table-column
            min-width="140"
            prop="stepPersonNum"
            label="跨期人数">
          </el-table-column>
          <el-table-column
            min-width="140"
            label="跨期续读率">
            <template scope="scope">
              <div>{{scope.row.regNum ==null ||scope.row.stepPersonNum ==null || scope.row.regNum == '0' ? '0%' :
                (parseInt(scope.row.stepPersonNum)/ parseInt(scope.row.regNum))*100 |formatNumber(2)}}%</div>
            </template>
          </el-table-column>
          <el-table-column
            min-width="140"
            prop="stepTargetRate"
            label="目标跨期续读率">
          </el-table-column>
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="80">
            <template scope="scope">
              <el-button size="small" @click="handleExportClassComletionRate(scope.row)">导出</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="am-u-lg-12 am-cf">

          <div class="am-fr">
            <pagination v-bind:total="total" v-bind:pageNo="pageNo" v-bind:pageSize="pageSize"
                        @paging="getClassComletionRate"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import io from '../../lib/io'
  import Toolbar from '../base/Toolbar.vue'
  import Pagination from '../base/Pagination.vue'
  import moment from 'moment'

  export default{
    data:function(){
      return {
        areaTeamId: '',
        periodId: '',
        periods: [],
        pageNo: 1,
        busTeamId: '',
        total: 0,
        pageSize: 10,
        seniorPageNo: 1,
        seniorPageSize: 10,
        seniorTotal: 1,
        sectionId: 3,
        productId: '',
        courseTemplateId: '',
        classQuery: [],
        courses: [],
        products: [],
        year: moment(),
        active: 1,
        seniorComletionRate:[],
        gradeCompletionRate:[],
        classComletionRate:[],
        activeName: 'first',
        searchConfig:{},
        sections: [
          {
            sectionId: 1,
            sectionName: '小学',
          },
          {
            sectionId: 2,
            sectionName: '初中',
          },
          {
            sectionId: 3,
            sectionName: '高中',
          },{
            sectionId: 99,
            sectionName: '其他',
          },
        ]
      }
    },
    components: {
      Toolbar, Pagination},
    watch: {
      areaTeamId(newVal) {
        this.busTeamId = ''
        this.loadPeriodData()
      },

    },
    computed: {
      areaTeams: function () {
        return this.$root.config.areaTeams || []
      },
      busTeams: function () {
        return ( ( this.areaTeamId  ) ? ( this.$root.config.groupBusTeams[this.areaTeamId] || [] ) : [] )
      },
    },
    mounted:function(){
      $(window).smoothScroll()
    },
    created:function(){
      if (window.config.areaTeams) {
        this.areaTeamId = window.config.areaTeams[0].areaTeamId
      }
      this.loadPeriodData()
    },
    methods:{
      handleFind(query) {
        if(this.active === 0) {
          this.getSeniorComletionRate(1)
        } else if (this.active === 1){
          this.getGradeCompletionRate()
        } else {
        	this.classQuery = query
        	this.getClassComletionRate(1)
        }
      },
      loadPeriodByYear: function () {
        var _this = this;
        if(!this.areaTeamId || !this.year) {
          return
        }
        io.post(io.periodByYearAndAreaTeamId,{
          areaTeamId: this.areaTeamId,
          year: moment(this.year).format("YYYY"),
        },function(ret){
          if(ret.success){
            debugger
            _this.periods = ret.data
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
      loadPeriodData: function () {
        var _this = this
        io.post(io.apiAdminPeriodListForAreaTeam, {
          areaTeamId: this.areaTeamId
        }, function (ret) {
          if (ret.success) {
            _this.periods = ret.data.map(function (item) {
              return {periodId: item.periodId, periodName: item.periodName}
            })
            _this.periodId = ret.data.filter(item => item.isCurrent == 1 )[0] && ret.data.filter(item => item.isCurrent == 1 )[0].periodId
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      getSeniorComletionRate:function(pageNo){
        var _this = this;
        if(!this.areaTeamId){
          this.$alert('请选择区域')
          return
        }
        if(!this.periodId){
          this.$alert('请选择期数')
          return
        }
        _this.seniorPageNo = pageNo || _this.seniorPageNo || 1
        _this.$showLoading()
        io.post(io.seniorComletionRate,{
          areaTeamId:_this.areaTeamId,
          busTeamId:_this.busTeamId,
          pageNo:_this.seniorPageNo,
          pageSize:_this.seniorPageSize,
          periodId: _this.periodId
        },function(ret){
          if(ret.success){
            _this.$hiddenLoading()
            _this.seniorTotal = ret.data.total
            _this.seniorComletionRate = ret.data.list
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
      getClassComletionRate(pageNo) {
        var _this = this;
        if(!this.areaTeamId){
          this.$alert('请选择区域')
          return
        }
        if(!this.classQuery.busTeamId ){
          this.$alert('请选择业务组')
          return
        }
          _this.pageNo = pageNo || _this.pageNo || 1
        _this.$showLoading()
        io.post(io.classComletionRate,Object.assign({},_this.classQuery,{
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          areaTeamId:this.areaTeamId,}),function(ret){
          if(ret.success){
            _this.$hiddenLoading()
            _this.classComletionRate = ret.data.list
            _this.total = ret.data.total
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
      getGradeCompletionRate:function(){
        var _this = this;
        if(!this.areaTeamId){
          this.$alert('请选择区域')
          return
        }
        if(!this.periodId){
          this.$alert('请选择期数')
          return
        }
        _this.$showLoading()
        io.post(io.gradeCompletionRate,{
          sectionId:_this.sectionId,
          areaTeamId:_this.areaTeamId,
          busTeamId:_this.busTeamId ,
          periodId: _this.periodId
        },function(ret){
          if(ret.success){
            _this.$hiddenLoading()
            let summary = {
              gradeName : "总计",
              realClassIncome:0,
              targetClassIncome:0,
              realNewStudentNum: 0,
              targetNewStudentNum: 0,
              realOldStudentNum: 0,
              targetOldSudentNum: 0,
              nowPeriodNum: 0,
              sequentialNum: 0,
              targetSequentialNum: 0,
              stepNum: 0,
              targetStepNum: 0,
            }
            if (ret.data.length > 0) {
              ret.data.map((val) => {
                summary.realClassIncome += (val.realClassIncome ? Number(val.realClassIncome): 0)
                summary.targetClassIncome += (val.targetClassIncome ? Number(val.targetClassIncome): 0)
                summary.realNewStudentNum += (val.realNewStudentNum ? Number(val.realNewStudentNum): 0)
                summary.targetNewStudentNum += (val.targetNewStudentNum ? Number(val.targetNewStudentNum): 0)
                summary.realOldStudentNum += (val.realOldStudentNum ? Number(val.realOldStudentNum): 0)
                summary.targetOldSudentNum += (val.targetOldSudentNum ? Number(val.targetOldSudentNum): 0)
                summary.nowPeriodNum += (val.nowPeriodNum ? Number(val.nowPeriodNum): 0)
                summary.sequentialNum += (val.sequentialNum ? Number(val.sequentialNum): 0)
                summary.targetSequentialNum += (val.targetSequentialNum ? Number((val.targetSequentialNum).split('%')[0]): 0)
                summary.stepNum += (val.stepNum ? Number(val.stepNum): 0)
                summary.targetStepNum += (val.targetStepNum ? Number((val.targetStepNum).split('%')[0]): 0)
              })
              summary.targetSequentialNum = summary.targetSequentialNum + '%'
              summary.targetStepNum = summary.targetStepNum + '%'
              ret.data.push(summary)
            }
            _this.gradeCompletionRate = ret.data
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
      handleExport() {
        if (this.active === 2) {
          this.$router.push('/main/operating/dataAnalysis/list/exportSubjectCompleteRate?active=' + this.active +
            '&periodId='+ this.$refs.toolbar.periodId +  '&gradeId='+ this.$refs.toolbar.gradeId +  '&busTeamId='+ this.busTeamId + '&areaTeamId='+ this.areaTeamId)
        } else {
          this.$router.push('/main/operating/dataAnalysis/list/exportSubjectCompleteRate?active=' + this.active +
            '&periodId='+ this.periodId +  '&sectionId='+ this.sectionId +  '&busTeamId='+ this.busTeamId + '&areaTeamId='+ this.areaTeamId)
        }
      },
      handleExportSomeSeniorComletionRate(row) {
        let _this = this;
        io.downloadFile(io.exportSomeSeniorComletionRate,{
          areaTeamId: _this.areaTeamId,
          periodId: _this.periodId,
          busTeamId: _this.busTeamId,
          seniorIdStr: row.seniorId
        },function(ret){
          if(ret.success){

          }else{
            _this.$alert(ret.desc)
          }
        })
      },
      handleExportClassComletionRate(row) {
        debugger
        let _this = this;
        io.downloadFile(io.exportClassComletionRate,{
          classId: row.classId
        },function(ret){
          if(ret.success){

          }else{
            _this.$alert(ret.desc)
          }
        })
      },
    }
  }
</script>
<style lang="less" scoped>
  .subject-complete {
    .content {
      .title {
        text-align: center;
        color: #333;
        font-size: 18px;
        font-weight: bold;
        margin: 20px 0;
      }
      .el-button-group {
        margin: 0 auto;
        display: table;
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 1px dashed #ddd;
      }
      .head-opt {
        padding-left: 10px;
        margin: 0 auto 20px;
        &>div {
          display: inline-block;
        }
        input {
          height: 36px;
        }
      }
      .toolbar {
        margin-left: -10px;
      }
    }
  }
</style>
