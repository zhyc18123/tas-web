<template>
  <div>
    <div class="month-analysis-box">
      <div class="head-opt">
        <el-button-group>
          <el-button @click="activeMonth = 1" :class="{'el-button el-button--primary': activeMonth === 1}">业务组</el-button>
          <el-button @click="activeMonth = 0" :class="{'el-button el-button--primary': activeMonth === 0}">产品线</el-button>
        </el-button-group>
        <date-picker class="date-pick-month" v-model="month" >
          <input type="text" placeholder="请选择日期"
                 data-am-datepicker="{format: 'yyyy-mm', viewMode: 'months', minViewMode: 'months'}"  required >
        </date-picker>
        <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-u-end">
          <div class="am-form-group">
            <button type="button" class="am-btn am-btn-default am-btn-success"
                    @click="search" ><span class="am-icon-search"></span>查询
            </button>
          </div>
        </div>
      </div>
      <div class="content" style="clear: both">
        <div class="am-u-sm-12 am-u-md-12 am-u-lg-6">
          <div class="title">{{month}}{{activeMonth ===0 ?  '产品线' : '业务组'}}营收情况</div>
          <div  style="height:400px;" id="data-analysis"></div>
        </div>
        <div class="am-u-sm-12 am-u-md-12 am-u-lg-6">
          <div class="title">{{month}}{{activeMonth ===0 ?  '产品线' : '业务组'}}利润情况</div>
          <div  style="height:400px;" id="data-analysis1"></div>
        </div>
      </div>
    </div>
    <div class="year-analysis-box">
      <div class="head-opt">
        <el-button-group>
          <el-button @click="activeYear = 1" :class="{'el-button el-button--primary': activeYear === 1}">业务组</el-button>
          <el-button @click="activeYear = 0" :class="{'el-button el-button--primary': activeYear === 0}">产品线</el-button>
        </el-button-group>
      </div>
      <div class="title">
        {{activeYear ===0 ?  '产品线' : '业务组'}}近一年经营情况
      </div>
      <div style="clear: both;height:400px;" class="" id="data-analysis-year"></div>
    </div>
  </div>
</template>
<script>
  import io from '../../lib/io'
  import echarts from 'echarts'
  import moment from 'moment'
  import FullClassRate from './FullClassRate.vue'
  import ProblemWarning from './ProblemWarning.vue'
  import BasicData from './BasicData.vue'


  export default{
    data:function(){
      return {
        month: '2017-03',
        activeMonth: 1,
        activeYear: 1,
        yearData:{},
        monthData:{},
        tableData:[],
        total:0,
        pageSize:10,
        pageNo:1,
        areaTeams : [],
        activeName: 'first',
        searchConfig:{},
        option: {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          toolbox: {
            feature: {
              dataView: {show: true, readOnly: false},
              saveAsImage: {show: true}
            }
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data:[]
          },
          series: [
            {
              name:'营收 （元）',
              type:'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
              ]
            }
          ]
        },
        option1: {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          toolbox: {
            feature: {
              dataView: {show: true, readOnly: false},
              saveAsImage: {show: true}
            }
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data:[]
          },
          series: [
            {
              name:'利润 （元）',
              type:'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
              ]
            }
          ]
        },
        option2: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          toolbox: {
            feature: {
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          legend: {
            data:['成本','营收','利润']
          },
          xAxis: [
            {
              type: 'category',
              data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: {
            axisLabel: {
                type: 'value',
                formatter: '{value} 元'
              }
          },
          series: [
            {
              name:'成本',
              type:'bar',
              data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
            },
            {
              name:'营收',
              type:'bar',
              data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            },
            {
              name:'利润',
              type:'line',
              data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, -23.0, -16.5, 12.0, 6.2]
            }
          ]
        },
      }
    },
    props: ['areaTeamId'],
    watch: {
      areaTeamId(newVal) {
        this.getBusinessCaseOfAreaTeam()
        this.getIncomeProfitsOfAreaTeam()
      },
      activeYear() {
        this.formatYearData(this.yearData)
      },
      activeMonth() {
        this.formatMonthData(this.monthData)
      }
    },
    mounted:function(){
      $(window).smoothScroll()
    },
    created:function(){
      this.getBusinessCaseOfAreaTeam()
      this.getIncomeProfitsOfAreaTeam()
    },
    methods:{
      search:function(){
        this.getIncomeProfitsOfAreaTeam()
      },

      getIncomeProfitsOfAreaTeam:function(){
        var _this = this;
        if(!this.areaTeamId){
          return
        }
        _this.$showLoading()
        io.post(io.incomeProfitsOfAreaTeam,{
          areaTeamId:_this.areaTeamId,
          date: _this.month
        },function(ret){
          if(ret.success){
            _this.$hiddenLoading()
            _this.monthData = ret.data
            _this.formatMonthData(ret.data)
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
      getBusinessCaseOfAreaTeam:function(){
        var _this = this;
        if(!this.areaTeamId){
          return
        }
        _this.$showLoading()
        io.post(io.businessCaseOfAreaTeam,{
          areaTeamId:_this.areaTeamId,
          monthNum:12
        },function(ret){
          if(ret.success){
            _this.$hiddenLoading()
            _this.yearData = ret.data
            _this.formatYearData(ret.data)
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
      formatYearData(data) {
      	let dateList = []
      	console.log(this.option2)
        if(this.activeYear === 1) {
          data.busCase.dateList.map((val) =>{
            dateList.push(moment(parseInt(val)).format('YYYY-MM'))
          })
          this.$set(this.option2.xAxis[0],'data',dateList)
          this.$set(this.option2.series[0],'data',data.busCase.costList)
          this.$set(this.option2.series[1],'data',data.busCase.incomeList)
          this.$set(this.option2.series[2],'data',data.busCase.profitList)
        } else if (this.activeYear === 0) {
          data.prodcutCase.dateList.map((val) =>{
            dateList.push(moment(parseInt(val)).format('YYYY-MM'))
          })
          this.$set(this.option2.xAxis[0],'data',dateList)
          this.$set(this.option2.series[0],'data',data.prodcutCase.costList)
          this.$set(this.option2.series[1],'data',data.prodcutCase.incomeList)
          this.$set(this.option2.series[2],'data',data.prodcutCase.profitList)
        }
        var myChart2 = echarts.init(document.getElementById('data-analysis-year'));
        myChart2.setOption(this.option2)
      },
      formatMonthData(data) {
      	let legendData = []
        if(this.activeMonth === 1) {
          data.busTeamMap.busTeamIncomeList && data.busTeamMap.busTeamIncomeList.map((val) => {
            legendData.push(val.name)
          })
          this.$set(this.option.legend,'data',legendData)
          this.$set(this.option.series[0],'data',data.busTeamMap.busTeamIncomeList)
          this.$set(this.option1.legend,'data',legendData)
          this.$set(this.option1.series[0],'data',data.busTeamMap.busTeamProfitList)
        } else if (this.activeMonth === 0) {
          data.productTeamMap.productIncomeList && data.productTeamMap.productIncomeList.map((val) => {
            legendData.push(val.name)
          })
          this.$set(this.option.legend,'data',legendData)
          this.$set(this.option.series[0],'data',data.productTeamMap.productIncomeList)
          this.$set(this.option1.legend,'data',legendData)
          this.$set(this.option1.series[0],'data',data.productTeamMap.productProfitList)
        }
        var myChart = echarts.init(document.getElementById('data-analysis'));
        var myChart1 = echarts.init(document.getElementById('data-analysis1'));
        myChart.setOption(this.option)
        myChart1.setOption(this.option1)
      }
    }
  }
</script>
<style lang="less" scoped>
  .data-analysis {
    .month-analysis-box {
      overflow: hidden;
      padding: 20px;
      border: 1px solid #d1dbe5;
      margin-bottom: 30px;
      .head-opt {
        text-align: center;
        /*height: 36px;*/
        /*line-height: 36px;*/
        /*width: 500px;*/
        margin: 0 auto;
        margin-bottom: 30px;
        .el-button-group {
          float: left;
          margin-right: 20px;
        }
        .date-pick-month {
          float: left;
          input {
            height: 34px;
          }
        }
      }
      .content {
        .title {
          text-align: center;
          color: #333;
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
    .year-analysis-box {
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
        /*height: 36px;*/
        /*line-height: 36px;*/
        /*width: 500px;*/
        margin: 0 auto;

      }
    }
  }
</style>
