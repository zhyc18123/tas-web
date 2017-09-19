<template>
  <div class="full-class-rate">
    <div class="content">
      <div class="head-opt">
        <date-picker v-model="year" >
          <input type="text" placeholder="请选择年份" data-am-datepicker="{format: 'yyyy ', viewMode: 'years', minViewMode: 'years'}"  required >
        </date-picker>
        <div>
          <el-select @change="handleSelectChange" :disabled="periods.length === 0" v-model="periodId" placeholder="请选择期数">
            <el-option
              v-for="item in periods"
              :key="item.periodId"
              :label="item.periodName"
              :value="item.periodId">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="chart-content">
        <div v-for="item in gradeFullClassRateList" :style="{width: currentWidth + '%'}">
          <div :id="item.id" style="height: 300px"></div>
          <div class="title">{{item.name}}</div>
        </div>
        <div class="empty" v-if="gradeFullClassRateList.length === 0">暂无数据</div>
      </div>
      <div class="am-u-sm-12 am-u-md-12 am-u-lg-6">
        <div class="title">各产品线满班率</div>
        <el-table
          :data="productFullClassRateList"
          :default-sort="{prop: 'index'}"
          empty-text="请选择期数"
          border
          stripe
          style="min-width: 100%">
          <el-table-column
            prop="index"
            width="120"
            label="排名">
            <template scope="scope">
              <div>
                {{scope.$index + 1}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="产品线">
          </el-table-column>
          <el-table-column
            label="满班率（总报名数/总学位数）">
            <template scope="scope">
              <div>
                {{Number(scope.row.rate)}}%
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template scope="scope">
              <el-button @click="handleClick(scope)" :disabled="disabledBtn === scope.$index" type="primary">
                查看详情>>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="am-u-sm-12 am-u-md-12 am-u-lg-6">
        <div class="title">{{productName}}对应各班级满班率</div>
        <el-table
          :data="classFullRateList"
          border
          height="700"
          stripe
          style="min-width: 100%">
          <el-table-column
            prop="index"
            width="120"
            label="排名">
            <template scope="scope">
              <div>
                {{scope.$index + 1}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="班级">
          </el-table-column>
          <el-table-column
            label="满班率（总报名数/总学位数）">
            <template scope="scope">
              <div>
                {{Number(scope.row.rate)}}%
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
  import echarts from 'echarts'

  export default{
    components: {},
    data:function(){
      return {
        periodId: '',
        productName: '',
        periods: [],
        disabledBtn: 0,
        year: moment().years(),
        productFullClassRateList:[],
        classFullRateList:[],
        gradeFullClassRateList:[],
        areaTeams : [],
        activeName: 'first',
        searchConfig:{},
        option : {
          tooltip : {
            formatter: "{a} <br/>{b} : {c}%"
          },
          toolbox: {
            feature: {
              restore: {},
              saveAsImage: {}
            }
          },
          series: [
            {
              name: '完成率',
              type: 'gauge',
              detail: {formatter:'{value}%'},
              data: [{value: 50, name: '完成率'}]
            }
          ]
        },
      }
    },
    props: ['areaTeamId'],
    computed: {
      currentWidth() {
      	if(this.gradeFullClassRateList.length === 1) {
          return 100
        } else if(this.gradeFullClassRateList.length === 2) {
          return 50
        } else if(this.gradeFullClassRateList.length === 3){
          return 33.33
        } else if (this.gradeFullClassRateList.length > 3){
          return 25
        }
      }
    },
    watch: {
      areaTeamId(newVal) {
        this.loadPeriodByYear()
        this.getFullClassRate()
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
    },
    methods:{
      handleClick(scope) {
      	this.productName = scope.row.name
      	this.classFullRateList = scope.row.classFullRateList
      	this.disabledBtn = scope.$index
      },
      handleSelectChange() {
      	this.getFullClassRate()
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
      getFullClassRate:function(){
        var _this = this;
        if(!this.areaTeamId || !this.periodId){
          return
        }
        _this.$showLoading()
        io.post(io.fullClassRate,{
          areaTeamId:_this.areaTeamId,
          periodId: _this.periodId
        },function(ret){
          if(ret.success){
            _this.$hiddenLoading()
            _this.productFullClassRateList = ret.data.productFullClassRateList
            _this.classFullRateList = ret.data.productFullClassRateList[0] ? ret.data.productFullClassRateList[0].classFullRateList : []
            _this.productFullClassRateList = _this.productFullClassRateList.sort(_this.objectSort('rate',true))
            _this.classFullRateList = _this.classFullRateList.sort(_this.objectSort('rate',true))
            _this.productName = ret.data.productFullClassRateList[0] && ret.data.productFullClassRateList[0].name
            _this.gradeFullClassRateList = ret.data.gradeFullClassRateList
            _this.initEChart()
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
      initEChart() {
      	setTimeout(()=>{
          this.gradeFullClassRateList.length > 0 && this.gradeFullClassRateList.map((val) => {
            echarts.init(document.getElementById(val.id)).setOption(Object.assign({},this.option, {series: [{
              name: '完成率',
              type: 'gauge',
              detail: {formatter:'{value}%'},
              data: [{value: Number(val.rate).toFixed(0), name: '完成率'}]
            }]}))
          })
        },100)
      },
      objectSort(property, desc) {
      	if (desc) {
      		return function (a, b) {
      			return (Number(a[property]) > Number(b[property])) ? -1 : (Number(a[property]) < Number(b[property])) ? 1 : 0;
      		}
      	}
      	return function (a, b) {
      		return (Number(a[property]) < Number(b[property])) ? -1 : (Number(a[property]) > Number(b[property])) ? 1 : 0;
      	}
      }
    }
  }
</script>
<style lang="less" scoped>
  .full-class-rate {
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
      .chart-content {
        text-align: center;

        &>div {
          display: inline-block;
        }
        .title {
          margin-top: -50px;
        }
        .empty {
          margin: 20px 0;
        }
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
