<template>
  <div class="subject-complete">
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
            label="年级">
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
      <div v-show="active === 0" class="am-u-sm-12">
        <el-table
          :data="productCostAndIncomeVoList"
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
//      this.loadPeriodByYear()
//      this.getWarningOfAreaTeam()
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
        width: 650px;
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
