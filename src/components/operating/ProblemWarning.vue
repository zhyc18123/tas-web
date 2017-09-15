<template>
  <div class="problem-warning">
    <div class="content">
      <div class="head-opt">
        <el-button-group>
          <el-button @click="active = 1" :class="{'el-button el-button--primary': active === 1}">业务组</el-button>
          <el-button @click="active = 0" :class="{'el-button el-button--primary': active === 0}">产品线</el-button>
        </el-button-group>
        <date-picker v-model="year" >
          <input type="text" placeholder="请选择年份" data-am-datepicker="{format: 'yyyy ', viewMode: 'years', minViewMode: 'years'}"  required >
        </date-picker>
        <div>
          <el-select @change="getWarningOfAreaTeam" :disabled="periods.length === 0" v-model="periodId" placeholder="请选择">
            <el-option
              v-for="item in periods"
              :key="item.periodId"
              :label="item.periodName"
              :value="item.periodId">
            </el-option>
          </el-select>
        </div>
      </div>
      <div v-show="active === 1" class="am-u-sm-12">
        <el-table
          :data="mainAccountCostAndIncomeList"
          border
          empty-text="请选择期数"
          stripe
          style="min-width: 100%">
          <el-table-column
            prop="name"
            label="财务主体">
          </el-table-column>
          <el-table-column
            prop="targetIncome"
            label="目标营收（元）">
            <template scope="scope">
              <div>
                {{Number(scope.row.targetIncome)| formatNumber(2)}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="实际营收（元）">
            <template scope="scope">
              <div>
                {{Number(scope.row.income)| formatNumber(2)}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="营收完成率">
            <template scope="scope">
              <div v-if="scope.row.targetIncome">
                {{Number(scope.row.income) ===0 ? 0 :Number(scope.row.income)/Number(scope.row.targetIncome)*100 | formatNumber(2)}}%
              </div>
              <div v-else>
                -
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="targetProfits"
            label="目标利润（元）">
            <template scope="scope">
              <div>
                {{Number(scope.row.targetProfits)| formatNumber(2)}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="profits"
            label="实际利润（元）">
            <template scope="scope">
              <div>
                {{Number(scope.row.profits)| formatNumber(2)}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="利润完成率">
            <template scope="scope">
              <div v-if="scope.row.targetProfits">
                {{Number(scope.row.profits) ===0 ? 0 :Number(scope.row.profits)/Number(scope.row.targetProfits)*100 | formatNumber(2)}}%
              </div>
              <div v-else>
                -
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="active === 0" class="am-u-sm-12">
        <el-table
          :data="productCostAndIncomeVoList"
          border
          empty-text="请选择期数"
          stripe
          style="min-width: 100%">
          <el-table-column
            prop="productName"
            label="产品线">
          </el-table-column>
          <el-table-column
            prop="targetIncome"
            label="目标营收（元）">
            <template scope="scope">
              <div>
                {{Number(scope.row.targetIncome)| formatNumber(2)}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="实际营收（元）">
            <template scope="scope">
              <div>
                {{Number(scope.row.income)| formatNumber(2)}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="营收完成率">
            <template scope="scope">
              <div v-if="scope.row.targetIncome">
                {{Number(scope.row.income) ===0 ? 0 :Number(scope.row.income)/Number(scope.row.targetIncome)*100 | formatNumber(2)}}%
              </div>
              <div v-else>
                -
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="targetProfits"
            label="目标利润（元）">
            <template scope="scope">
              <div>
                {{Number(scope.row.targetProfits)| formatNumber(2)}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="profits"
            label="实际利润（元）">
            <template scope="scope">
              <div>
                {{Number(scope.row.profits)| formatNumber(2)}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="利润完成率">
            <template scope="scope">
              <div v-if="scope.row.targetProfits">
                {{Number(scope.row.profits) ===0 ? 0 :Number(scope.row.profits)/Number(scope.row.targetProfits)*100 | formatNumber(2)}}%
              </div>
              <div v-else>
                -
              </div>
            </template>
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
        year: moment().years(),
        active: 1,
        productCostAndIncomeVoList:[],
        mainAccountCostAndIncomeList:[],
        areaTeams : [],
        activeName: 'first',
        searchConfig:{},
      }
    },
    props: ['areaTeamId'],
    watch: {
      areaTeamId(newVal) {
        this.loadPeriodByYear()
        this.getWarningOfAreaTeam()
      },
      year(newVal) {
        if (newVal) {
          this.loadPeriodByYear()
        }
      },
    },
    mounted:function(){
      $(window).smoothScroll()
    },
    created:function(){
      this.loadPeriodByYear()
      this.getWarningOfAreaTeam()
    },
    methods:{
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
      getWarningOfAreaTeam:function(){
        var _this = this;
        if(!this.areaTeamId || !this.periodId){
          return
        }
        _this.$showLoading()
        io.post(io.warningOfAreaTeam,{
          areaTeamId:_this.areaTeamId,
          periodId: _this.periodId
        },function(ret){
          if(ret.success){
            _this.$hiddenLoading()
            _this.productCostAndIncomeVoList = ret.data.productCostAndIncomeVoList
            _this.mainAccountCostAndIncomeList = ret.data.mainAccountCostAndIncomeList
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
    }
  }
</script>
<style lang="less" scoped>
  .problem-warning {
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
        width: 550px;
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
