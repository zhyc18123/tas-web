<template>
  <div class="m-input-main-income">
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title am-fl">主体收入目标</div>
          <div class="widget-function am-fr">
            <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
          </div>
        </div>
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="营收" name="first">
            <div>
              <div class="am-u-sm-24 am-u-md-24 am-u-lg-24">
                <div class="am-form-group datepicker">
                  <date-picker v-model="year" >
                    <input type="text" placeholder="请选择年份" data-am-datepicker="{format: 'yyyy ', viewMode: 'years', minViewMode: 'years'}"  required >
                  </date-picker>
                </div>
              </div>
              <div class="widget-body  am-fr">
                <div class="am-u-sm-12">
                  <el-table
                    :data="tableData"
                    border
                    stripe
                    style="min-width: 100%">
                    <el-table-column
                      prop="name"
                      label="主体/营收（万元）/月份"
                      min-width="190">
                    </el-table-column>
                    <el-table-column
                      class="month"
                      v-for="item in months"
                      :label="item + '月'">
                      <template scope="scope">
                        <div size="small" @click.native="handleSave">
                          <el-input :disabled="(item < currentMonth + 2 && year == currentYear)|| year < currentYear" v-model="scope.row['month' + item]"></el-input>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      width="100">
                      <template scope="scope">
                        <el-button size="small" @click.native="handleSave(scope.row)">保存</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="利润" name="second">
            <div>
              <div class="am-u-sm-24 am-u-md-24 am-u-lg-24">
                <div class="am-form-group datepicker">
                  <date-picker v-model="year2" >
                    <span><<</span>
                    <input type="text" placeholder="请选择年份" data-am-datepicker="{format: 'yyyy ', viewMode: 'years', minViewMode: 'years'}"  required >
                    <span>>></span>
                  </date-picker>
                </div>
              </div>
              <div class="widget-body  am-fr">
                <div class="am-u-sm-12">
                  <el-table
                    :data="tableData2"
                    border
                    stripe
                    style="min-width: 100%">
                    <el-table-column
                      prop="name"
                      label="主体/利润（万元）/月份"
                      min-width="190">
                    </el-table-column>
                    <el-table-column
                      class="month"
                      v-for="item in months"
                      :label="item + '月'">
                      <template scope="scope">
                        <div size="small" @click.native="handleSave">
                          <el-input :disabled="item < currentMonth + 2 || year2 < currentYear" v-model="scope.row['month' + item]"></el-input>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      width="100">
                      <template scope="scope">
                        <el-button size="small" @click.native="handleSave(scope.row)">保存</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
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
        tableData:[],
        tableData2:[],
        months: ['01','02','03','04','05','06','07','08','09','10','11','12'],
        activeName: 'first',
        areaTeamId: '',
        areaTeamName: '',
        currentMonth: moment().month(),
        currentYear: moment().year(),
        year: moment().year(),
        year2: moment().year(),
        targetType: 0,
      }
    },
    mounted:function(){
      $(window).smoothScroll()
    },
    created:function(){
      this.areaTeamId = this.$route.query.areaTeamId
      this.areaTeamName = this.$route.query.areaTeamName
      this.loadTableData();
    },
    watch: {
      year(newVal) {
          if (newVal) {
            this.loadTableData()
          }
      },
      year2(newVal) {
          if (newVal) {
            this.loadTableData()
          }
      },
      activeName(newVal) {
        newVal === 'first' ? this.targetType = 0 : this.targetType = 1
        if (newVal === 'second') {
            this.loadTableData()
        }
      }
    },
    methods:{
      handleSave(list) {
        var _this = this
        _this.$showLoading()
        io.post(io.saveOrUpdateMainAccountTarget,list,function(ret){
          _this.$hiddenLoading()
          if(ret.success){
            _this.$alert('保存成功')
            _this.loadTableData()
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
      loadTableData:function(){
        var _this = this,
          year;
        _this.$showLoading()
        if (_this.targetType === 0) {
          year = this.year
        } else {
          year = this.year2
        }
        io.post(io.mainAccountTargetList,{
          areaTeamId: this.areaTeamId,
          year: year,
          targetType: this.targetType,
        },function(ret){
          _this.$hiddenLoading()
          if(ret.success){
              if (_this.targetType === 0) {
                _this.tableData = ret.data
              } else {
                _this.tableData2 = ret.data
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
  .m-input-main-income {
    .el-tabs__header {
      margin-top: 20px;
    }
    .datepicker {
      margin: 0 auto;
      width: 300px;
      input {
        text-align: center;
      }
    }
    .el-table .cell, .el-table th>div{
      padding: 0;
    }
    .el-table th, .el-table td {
      &:first-child, &:last-child {
        .cell{
          padding-left: 18px;
          padding-right: 18px;
        }
      }

    }
  }
</style>
