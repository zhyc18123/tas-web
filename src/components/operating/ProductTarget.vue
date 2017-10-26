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
        <div class="am-u-sm-24 am-u-md-24 am-u-lg-24 am-form-group toolbar">
          <el-select @change="handleAreaTeamIdChange" v-model="areaTeamId" placeholder="请选择">
            <el-option
              v-for="item in areaTeams"
              :key="item.areaTeamId"
              :label="item.name"
              :value="item.areaTeamId">
            </el-option>
          </el-select>
          <div class="datepicker">
            <el-date-picker
              v-model="year"
              type="year"
              placeholder="选择年">
            </el-date-picker>
          </div>
          <el-input placeholder="产品名称" v-model="productName"></el-input>
          <el-button size="small" @click="search" type="success">搜索</el-button>
        </div>
        <el-tabs style="clear: both" v-model="activeName" type="card">
          <el-tab-pane label="营收" name="first">
            <div>
              <div v-show="!empty" class="widget-body  am-fr">
                <div class="am-u-sm-12">
                  <el-table
                    :data="tableData"
                    border
                    stripe
                    style="min-width: 100%">
                    <el-table-column
                      prop="productName"
                      align="center"
                      label="产品线/营收（万元）/月份"
                      min-width="190">
                    </el-table-column>
                    <el-table-column
                      class="month"
                      align="center"
                      v-for="(item,index) in periods"
                      :label="item.periodName">
                      <template scope="scope">
                        <div v-if="scope.row.productTargetList[index]" size="small">
                          <el-input type="number" v-model="scope.row.productTargetList[index].targetPrice"></el-input>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      align="center"
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
              <div v-show="empty">当前年份：{{year | formatDate('YYYY')}}，还没有设置期数。
                <router-link to="/main/sys/period/list" tag="a">前往设置</router-link>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="利润" name="second">
            <div>
              <div v-show="!empty" class="widget-body  am-fr">
                <div class="am-u-sm-12">
                  <el-table
                    :data="tableData2"
                    border
                    stripe
                    style="min-width: 100%">
                    <el-table-column
                      prop="productName"
                      align="center"
                      label="产品线/利润（万元）/月份"
                      min-width="190">
                    </el-table-column>
                    <el-table-column
                      class="month"
                      align="center"
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
              <div v-show="empty">当前年份：{{year | formatDate('YYYY')}}，还没有设置期数。
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
        areaTeamId: '',
        productName: '',
        tableData:[],
        tableData2:[],
        periods: [],
        activeName: 'first',
        areaTeamName: '',
        year: moment().format('YYYY'),
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
      }
    },
    components: {
      Pagination
    },
    mounted:function(){
      $(window).smoothScroll()
    },
    created:function(){
      if (window.config.areaTeams) {
        this.areaTeamId = window.config.areaTeams[0].areaTeamId
        if (window.config.groupBusTeams) {
          this.busTeamId = window.config.groupBusTeams[this.areaTeamId][0].busTeamId
        }
      }
      this.loadPeriodByYear();
    },
    computed: {
      areaTeams: function () {
        return this.$root.config.areaTeams || []
      }
    },
    watch: {
      year(newVal) {
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
      handleAreaTeamIdChange() {
        this.busTeamId = ''
      },
      search:function(){
        this.loadPeriodByYear()
      },
      handleSave(list) {
        var _this = this,
          data = {},
          productTargetVoJson = JSON.stringify(list.productTargetList);
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
        var _this = this

        io.post(io.periodByYearAndAreaTeamId,{
          areaTeamId: this.areaTeamId,
          year: this.year ? moment(this.year).format('YYYY'): '',
        },function(ret){
          if(ret.success){
            if (ret.data.length === 0) {
                _this.empty = true
            } else {
              _this.periods = ret.data
              _this.empty = false
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
          pageNo = pageNo || this.pageNo || 1
        } else {
          pageNo = pageNo || this.pageNo2 || 1
        }
        var query = {
          areaTeamId: this.areaTeamId,
          year: this.year ? moment(this.year).format('YYYY'): '',
          targetType: this.targetType,
          name: this.productName,
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
            if (ret.desc === '查不到期数请设置') {
              _this.empty = true
            }
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
    .toolbar {
      margin-top: 15px;
      padding-left: 0;
      .el-input {
        width: 160px;
      }
    }
    .datepicker {
      /*margin: 0 auto;*/
      display: inline-block;
      input {
        text-align: center;
        height: 36px;
        border: 1px solid #bfcbd9;
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
