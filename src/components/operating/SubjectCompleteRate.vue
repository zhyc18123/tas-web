<template>
  <div class="subject-complete">
    <el-select style="position: absolute;top: -50px;left: 176px;" size="small" class="am-u-md-2 am-u-end"
               :disabled="busTeams.length === 0" v-model="busTeamId" placeholder="请选择业务组">
      <el-option
        v-for="item in busTeams"
        :key="item.busTeamId"
        :label="item.name"
        :value="item.busTeamId">
      </el-option>
    </el-select>
    <div class="content">
      <div class="head-opt">
        <el-button-group>
          <el-button @click="active = 1" :class="{'el-button el-button--primary': active === 1}">年级科数完成率</el-button>
          <el-button @click="active = 0" :class="{'el-button el-button--primary': active === 0}">班主任科数完成率</el-button>
        </el-button-group>
        <date-picker v-model="year" >
          <input type="text" placeholder="请选择年份" data-am-datepicker="{format: 'yyyy ', viewMode: 'years', minViewMode: 'years'}"  required >
        </date-picker>
        <div>
          <el-select @change="getSeniorComletionRate();getGradeCompletionRate();" :disabled="periods.length === 0" v-model="periodId" placeholder="请选择期数">
            <el-option
              v-for="item in periods"
              :key="item.periodId"
              :label="item.periodName"
              :value="item.periodId">
            </el-option>
          </el-select>
          <el-select @change="getGradeCompletionRate();" v-show="active === 1" v-model="sectionId" placeholder="请选择年级">
            <el-option
              v-for="item in sections"
              :key="item.sectionId"
              :label="item.sectionName"
              :value="item.sectionId">
            </el-option>
          </el-select>
          <el-button type="success" @click="handleFind">查询</el-button>
        </div>
      </div>
      <div v-show="active === 1" class="am-u-sm-12">
        <el-table
          :data="gradeCompletionRate"
          border
          empty-text="请选择期数"
          stripe
          style="min-width: 100%">
          <el-table-column
            prop="gradeName"
            label="年级">
          </el-table-column>
          <el-table-column
            prop="realNewStudentNum"
            label="实际新生科数">
          </el-table-column>
          <el-table-column
            prop="targetNewStudentNum"
            label="目标新生科数">
          </el-table-column>
          <el-table-column
            label="新生科数完成率">
            <template scope="scope">
              <div>{{scope.row.realNewStudentNum === '0' ? '0%' : parseInt(scope.row.realNewStudentNum)/ parseInt(scope.row.targetNewStudentNum)}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="realOldStudentNum"
            label="实际老生科数">
          </el-table-column>
          <el-table-column
            prop="targetOldSudentNum"
            label="目标老生科数">
          </el-table-column>
          <el-table-column
            label="老生科数完成率">
            <template scope="scope">
              <div>{{scope.row.realOldStudentNum === '0' ? '0%' : parseInt(scope.row.realOldStudentNum)/ parseInt(scope.row.targetOldSudentNum)}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="nowPeriodNum"
            label="本期科数">
          </el-table-column>
          <el-table-column
            prop="sequentialNum"
            label="顺期科数">
          </el-table-column>
          <el-table-column
            prop="name"
            label="顺期续读率">
          </el-table-column>
          <el-table-column
            prop="name"
            label="目标顺期续读率">
          </el-table-column>
          <el-table-column
            prop="stepNum"
            label="跨期科数">
          </el-table-column>
          <el-table-column
            prop="name"
            label="跨期续读率">
          </el-table-column>
          <el-table-column
            prop="targetStepNum"
            label="目标跨期续读率">
          </el-table-column>
        </el-table>

      </div>
      <div v-show="active === 0" class="am-u-sm-12">
        <el-table
          :data="seniorComletionRate"
          border
          empty-text="请选择期数"
          stripe
          style="min-width: 100%">
          <el-table-column
            prop="name"
            label="班主任">
          </el-table-column>
          <el-table-column
            prop="name"
            label="实际新生科数">
          </el-table-column>
          <el-table-column
            prop="name"
            label="目标新生科数">
          </el-table-column>
          <el-table-column
            prop="name"
            label="新生科数完成率">
          </el-table-column>
          <el-table-column
            prop="name"
            label="实际老生科数">
          </el-table-column>
          <el-table-column
            prop="name"
            label="目标老生科数">
          </el-table-column>
          <el-table-column
            prop="name"
            label="老生科数完成率">
          </el-table-column>
          <el-table-column
            prop="name"
            label="本期科数">
          </el-table-column>
          <el-table-column
            prop="name"
            label="顺期科数">
          </el-table-column>
          <el-table-column
            prop="name"
            label="顺期续读率">
          </el-table-column>
          <el-table-column
            prop="name"
            label="目标顺期续读率">
          </el-table-column>
          <el-table-column
            prop="name"
            label="跨期科数">
          </el-table-column>
          <el-table-column
            prop="name"
            label="跨期续读率">
          </el-table-column>
          <el-table-column
            prop="name"
            label="目标跨期续读率">
          </el-table-column>
        </el-table>
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
        periodId: '',
        periods: [],
        pageNo: 1,
        busTeamId: '',
        pageSize: 10,
        sectionId: 3,
        year: moment().years(),
        active: 1,
        seniorComletionRate:[],
        gradeCompletionRate:[],
        areaTeams : [],
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
    props: ['areaTeamId'],
    watch: {
      areaTeamId(newVal) {
      	this.busTeamId = ''
        this.loadPeriodByYear()
      },
      year(newVal) {
        if (newVal) {
          this.loadPeriodByYear()
        }
      },
    },
    computed: {
      busTeams: function () {
        return ( ( this.areaTeamId  ) ? ( this.$root.config.groupBusTeams[this.areaTeamId] || [] ) : [] )
      },
    },
    mounted:function(){
      $(window).smoothScroll()
    },
    created:function(){
      this.loadPeriodByYear()
//      this.getSeniorComletionRate()
    },
    methods:{
      handleFind() {
      	if(this.active === 0) {
          this.getSeniorComletionRate()
        } else {
          this.getGradeCompletionRate()
        }
      },
      loadPeriodByYear: function () {
        var _this = this;
        if(!this.areaTeamId || !this.year) {
          return
        }
        io.post(io.periodByYearAndAreaTeamId,{
          areaTeamId: this.areaTeamId,
          year: this.year,
        },function(ret){
          if(ret.success){
            _this.periods = ret.data
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
      getSeniorComletionRate:function(){
        var _this = this;
        if(!this.areaTeamId || !this.periodId){
          this.$alert('请选择期数')

          return
        }
        _this.$showLoading()
        io.post(io.seniorComletionRate,{
          areaTeamId:_this.areaTeamId,
          busTeamId:_this.busTeamId || _this.areaTeamId,
          pageNo:_this.pageNo,
          pageSize:_this.pageSize,
          periodId: _this.periodId
        },function(ret){
          if(ret.success){
            _this.$hiddenLoading()
            _this.seniorComletionRate = ret.data.list
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
      getGradeCompletionRate:function(){
        var _this = this;
        if(!this.areaTeamId || !this.periodId){
          this.$alert('请选择期数')

          return
        }
        _this.$showLoading()
        io.post(io.gradeCompletionRate,{
          sectionId:_this.sectionId,
          areaTeamId:_this.areaTeamId,
          busTeamId:_this.busTeamId || _this.areaTeamId,
          periodId: _this.periodId
        },function(ret){
          if(ret.success){
            _this.$hiddenLoading()
            _this.gradeCompletionRate = ret.data
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
      overflow: hidden;
      padding: 20px;
      border: 1px solid #d1dbe5;
      margin-bottom: 30px;
      .title {
        text-align: center;
        color: #333;
        font-size: 18px;
        font-weight: bold;
        margin: 20px 0;
      }
      .head-opt {
        text-align: center;
        height: 36px;
        line-height: 36px;
        /*width: 650px;*/
        margin: 0 auto 20px;
        &>div {
          display: inline-block;
        }
        input {
          height: 36px;
        }
      }
    }
  }
</style>
