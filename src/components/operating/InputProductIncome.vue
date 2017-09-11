<template>
  <div class="m-input-main-income">
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title am-fl">产品线收入目标</div>
          <div class="widget-function am-fr">
            <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
          </div>
        </div>
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="营收" name="first">
            <div>
              <div class="am-u-sm-12 am-form ">
                <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
                  <div class="am-input-group-sm tpl-form-border-form cl-p">
                    <input type="text" name="name" v-model="name" placeholder="请输入产品名称"/>
                  </div>
                </div>

                <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-u-end">
                  <div class="am-form-group">
                    <button type="button" class="am-btn am-btn-default am-btn-success"
                            @click="search" ><span class="am-icon-search"></span>查询
                    </button>
                  </div>
                </div>
              </div>
              <div class="am-u-sm-24 am-u-md-24 am-u-lg-24">
                <div class="am-form-group datepicker">
                  <date-picker v-model="year" >
                    <span>-</span>
                    <input type="text" placeholder="请选择年份" data-am-datepicker="{format: 'yyyy ', viewMode: 'years', minViewMode: 'years'}"  required >
                    <span>-</span>
                  </date-picker>
                </div>
              </div>
              <div v-show="!empty" class="widget-body  am-fr">
                <div class="am-u-sm-12">
                  <el-table
                    :data="tableData"
                    border
                    stripe
                    style="min-width: 100%">
                    <el-table-column
                      prop="productName"
                      fixed
                      label="产品线/营收（万元）/月份"
                      min-width="190">
                    </el-table-column>
                    <el-table-column
                      class="month"
                      v-for="(item,index) in periods"
                      :label="item.periodName">
                      <template scope="scope">
                        <div size="small">
                          <el-input type="number" v-model="scope.row.productTargetList[index].targetPrice"></el-input>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      fixed="right"
                      width="100">
                      <template scope="scope">
                        <el-button size="small" @click.native="handleSave(scope.row)">保存</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="am-u-lg-12 am-cf">
                  <div class="am-fr">
                    <pagination v-bind:total="total" v-bind:pageNo="pageNo" v-bind:pageSize="pageSize" @paging="loadTableData" />
                  </div>
                </div>
              </div>
              <div v-show="empty">当前年份：{{year2}}，还没有设置期数。
                <router-link to="/main/sys/period/list" tag="a">前往设置</router-link>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="利润" name="second">
            <div>
              <div class="am-u-sm-12 am-form ">
                <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
                  <div class="am-input-group-sm tpl-form-border-form cl-p">
                    <input type="text" name="name" v-model="name2" placeholder="请输入产品名称"/>
                  </div>
                </div>

                <div class="am-u-sm-12 am-u-md-12 am-u-lg-1 am-u-end">
                  <div class="am-form-group">
                    <button type="button" class="am-btn am-btn-default am-btn-success"
                            @click="search" ><span class="am-icon-search"></span>查询
                    </button>
                  </div>
                </div>
              </div>
              <div class="am-u-sm-24 am-u-md-24 am-u-lg-24">
                <div class="am-form-group datepicker">
                  <date-picker v-model="year2" >
                    <span>-</span>
                    <input type="text" placeholder="请选择年份" data-am-datepicker="{format: 'yyyy ', viewMode: 'years', minViewMode: 'years'}"  required >
                    <span>-</span>
                  </date-picker>
                </div>
              </div>
              <div v-show="!empty2" class="widget-body  am-fr">
                <div class="am-u-sm-12">
                  <el-table
                    :data="tableData2"
                    border
                    stripe
                    style="min-width: 100%">
                    <el-table-column
                      prop="productName"
                      fixed
                      label="产品线/利润（万元）/月份"
                      min-width="190">
                    </el-table-column>
                    <el-table-column
                      class="month"
                      v-for="(item,index) in periods"
                      :label="item.periodName">
                      <template scope="scope">
                        <div size="small">
                          <el-input type="number" v-model="scope.row.productTargetList[index].targetPrice"></el-input>
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
                <div class="am-u-lg-12 am-cf">
                  <div class="am-fr">
                    <pagination v-bind:total="total2" v-bind:pageNo="pageNo2" v-bind:pageSize="pageSize2" @paging="loadTableData" />
                  </div>
                </div>
              </div>
              <div v-show="empty2">当前年份：{{year2}}，还没有设置期数。
                <router-link to="/main/sys/period/list" tag="a">前往设置</router-link>
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
  import Pagination from '../base/Pagination'
  import moment from 'moment'
  export default{
    data:function(){
      return {
        tableData:[],
        tableData2:[],
        periods: [],
        activeName: 'first',
        areaTeamId: '',
        areaTeamName: '',
        year: moment().year(),
        year2: moment().year(),
        targetType: 0,
        pageNo: 0,
        pageNo2: 0,
        pageSize: 10,
        pageSize2: 10,
        total: 0,
        total2: 0,
        name: '',
        name2: '',
        empty: false,
        empty2: false,
      }
    },
    components: {
      Pagination
    },
    mounted:function(){
      $(window).smoothScroll()
    },
    created:function(){
      this.areaTeamId = this.$route.query.areaTeamId
      this.areaTeamName = this.$route.query.areaTeamName
      this.loadPeriodByYear();
    },
    watch: {
      year(newVal) {
        if (newVal) {
          this.loadPeriodByYear()
        }
      },
      year2(newVal) {
        if (newVal) {
          this.loadPeriodByYear()
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
      search:function(){
        this.loadTableData(1)
      },
      handleSave(list) {
        var _this = this,
          data = {},
          productTargetVoJson = JSON.stringify(list.productTargetList);
        debugger
        data = Object.assign({}, list, {productTargetVoJson: productTargetVoJson})
        _this.$showLoading()
        io.post(io.saveOrUpdateProductTarget,data,function(ret){
          _this.$hiddenLoading()
          if(ret.success){
            _this.$alert('保存成功')
            _this.loadTableData()
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
      loadPeriodByYear: function () {
        var _this = this,
          year;
        if (_this.targetType === 0) {
          year = this.year
        } else {
          year = this.year2
        }
        io.post(io.periodByYearAndAreaTeamId,{
          areaTeamId: this.areaTeamId,
          year: year,
        },function(ret){
          if(ret.success){
            if (ret.data.length === 0) {
              if (_this.targetType === 0) {
                _this.empty = true
              } else {
                _this.empty2 = true
              }
            } else {
              _this.periods = ret.data
              if (_this.targetType === 0) {
                _this.empty = false
              } else {
                _this.empty2 = false
              }
              _this.loadTableData();
            }
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
      loadTableData:function(pageNo){
        var _this = this,
          year;
        _this.$showLoading()
        if (_this.targetType === 0) {
          year = this.year
          name = this.name
          pageNo = pageNo || this.pageNo || 1
        } else {
          year = this.year2
          name = this.name2
          pageNo = pageNo || this.pageNo2 || 1
        }
        var query = {
          areaTeamId: this.areaTeamId,
          year: year,
          targetType: this.targetType,
          name: name,
          pageNo: pageNo
        }
        io.post(io.productTargetList,$.extend({
          pageNo:1,
          pageSize:10
        },query),function(ret){
          _this.$hiddenLoading()
          if(ret.success){
            if (_this.targetType === 0) {
              _this.tableData = ret.data.list
              _this.total = ret.data.total
            } else {
              _this.tableData2 = ret.data.list
              _this.total2 = ret.data.total
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
