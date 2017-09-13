<template>
  <div class="m-business-cost-list">
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title am-fl">{{name}} - 成本营收列表</div>
          <div class="widget-function am-fr">
            <button type="button" class="am-btn am-btn-default" @click="$router.push('/main/operating/businessStatistics/list')">返回</button>
          </div>
        </div>
        <div class="am-form-group" style="line-height: 33px;margin-top: 13px;">
          <div class="am-u-sm-12">
            <div class="am-u-md-2">
              <div class="am-form-group">
                <date-picker v-model="startDate">
                  <input type="text" class="am-form-field" placeholder="开始日期" data-am-datepicker readonly>
                </date-picker>
              </div>
            </div>

            <div class="am-u-md-2" style="float: left">
              <div class="am-form-group">
                <date-picker v-model="endDate">
                  <input type="text" class="am-form-field" placeholder="结束日期" data-am-datepicker readonly>
                </date-picker>
              </div>
            </div>
            <button @click="handleSearch" type="button" class="btn-search am-btn am-btn-default am-btn-success">
              <span class="am-icon-search"></span>搜索
            </button>
          </div>
        </div>
        <div style="clear: both">
          <el-tabs v-model="activeName" @tab-click="handleTabClick"  type="card">
            <el-tab-pane label="成本" name="cost">
              <div>
                <div class="am-u-sm-12">
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
                      prop="name"
                      label="分类"
                      min-width="190">
                    </el-table-column>
                    <el-table-column
                      prop="totalAmount"
                      label="金额（元）"
                      min-width="190">
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      width="100">
                      <template scope="scope">
                        <router-link :to="'/main/operating/businessStatistics/costDetail?detailType=' +
                       scope.row.detailType + '&name=' + scope.row.name+ '&feeCategoryId=' + scope.row.categoryId+
                       '&mainAccountId=' + mainAccountId + '&startDate=' + startDate +
                       '&endDate=' + endDate" tag="a">详情</router-link>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>

              </div>
            </el-tab-pane>
            <el-tab-pane label="营收" name="income">
              <div>
                <div class="am-u-sm-12">
                  <el-table
                    :data="tableData2"
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
                      prop="name"
                      label="分类"
                      min-width="190">
                    </el-table-column>
                    <el-table-column
                      prop="totalAmount"
                      label="金额（元）"
                      min-width="190">
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      width="100">
                      <template scope="scope">
                        <router-link :to="'/main/operating/businessStatistics/incomeDetail?detailType=' +
                       scope.row.detailType + '&name=' + scope.row.name+ '&incomeCategoryId=' + scope.row.categoryId+
                       '&mainAccountId=' + mainAccountId + '&startDate=' + startDate +
                       '&endDate=' + endDate" tag="a">详情</router-link>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>

              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
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
        feeCategories: [],
        name: '',
        mainAccountId: '',
        startDate:　'2017-1-1',
        endDate: '2017-1-1',
        formData: {
          feeCategoryId: ''
        },
        tableData:[
          {
            name: '校园成本',
            totalAmount: 100,
            to: '01',
          }
        ],
        tableData2:[
          {
            name: '校园成本',
            totalAmount: 200,
            to: '01',
          }
        ],
        activeName: 'cost',
      }
    },
    mounted:function(){
      $(window).smoothScroll()
    },
    created:function(){
      this.loadTableData();
      this.loadTableData2();
      this.name = this.$route.query.name
      this.mainAccountId = this.$route.query.mainAcoountId
      this.startDate = this.$route.query.startDate
      this.endDate = this.$route.query.endDate
      this.activeName = this.$route.query.activeName || 'cost'
    },
    methods:{
      handleTabClick(val) {
      	if (val.name === 'income' && !this.$route.query.activeName) {
          this.$router.push(this.$route.fullPath +　'&activeName=income')
        }
      },
      handleSearch() {
        this.loadTableData()
        this.loadTableData2()
      },
      loadTableData2:function(){
        var _this = this;
        _this.$showLoading()
        io.post(io.findIncomeByAllCategory,{
          mainAccountId: this.$route.query.mainAcoountId,
          startDate: this.startDate,
          endDate: this.endDate,
        },function(ret){
          _this.$hiddenLoading()
          if(ret.success){
            _this.tableData2 = ret.data
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
      loadTableData:function(){
        var _this = this;
        _this.$showLoading()
        io.post(io.findCostByAllCategory,{
          mainAccountId: this.$route.query.mainAcoountId,
          startDate: this.startDate,
          endDate: this.endDate,
        },function(ret){
          _this.$hiddenLoading()
          if(ret.success){
            _this.tableData = ret.data
          }else{
            _this.$alert(ret.desc)
          }
        })
      }
    }
  }
</script>

<style lang="less">
  .m-business-cost-list{
    .el-tabs__header {
      margin-top: 20px;
    }
    .am-u-sm-5 {
      margin-bottom: 1.5rem;
    }
  }
</style>
