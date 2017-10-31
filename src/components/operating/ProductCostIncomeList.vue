<template>
  <div class="m-business-cost-list">
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title am-fl">{{name}} - 成本营收列表</div>
          <div class="widget-function am-fr">
            <button type="button" class="am-btn am-btn-default" @click="$router.push('/main/operating/productStatistics/list')">返回</button>
          </div>
        </div>
        <toolbar @initList="initList" @handleSearch="handleSearch" ref="toolbar"></toolbar>
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
                      label="金额（元）"
                      min-width="190">
                      <template scope="scope">
                        <div>
                          {{scope.row.totalAmount | formatNumber(2)}}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      width="100">
                      <template scope="scope">
                        <router-link v-if="scope.row.detailType === '1' || scope.row.detailType === '2'" :to="'/main/operating/productStatistics/costDetail?detailType=' +
                       scope.row.detailType + '&name=' + scope.row.name+ '&feeCategoryId=' + scope.row.categoryId+
                       '&productId=' + productId + '&startDate=' + startDate +
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
                      prop="className"
                      label="班级名称">
                    </el-table-column>
                    <el-table-column
                      label="学费（元）">
                      <template scope="scope">
                        <div>
                          {{scope.row.studyingFee | formatNumber(2)}}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="lectureAmount"
                      label="总讲次">
                    </el-table-column>
                    <el-table-column
                      prop="happenLectureAmount"
                      label="发生讲次">
                    </el-table-column>
                    <el-table-column
                      prop="regAmount"
                      label="报名人数">
                    </el-table-column>
                    <el-table-column
                      prop="gradeName"
                      label="年级">
                    </el-table-column>
                    <el-table-column
                      prop="subjectName"
                      label="科目">
                    </el-table-column>
                <!--    <el-table-column
                      label="总退费（元）">
                      <template scope="scope">
                        <div>
                          {{scope.row.totalRefundAmount | formatNumber(2)}}
                        </div>
                      </template>
                    </el-table-column>-->
                    <el-table-column
                      label="营收(元)">
                      <template scope="scope">
                        <div>
                          {{scope.row.totalIncomeAmount | formatNumber(2)}}
                        </div>
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
  import Toolbar from './Toolbar.vue'
  import moment from 'moment'
  export default{
    data:function(){
      return {
        feeCategories: [],
        name: '',
        formData: {
          feeCategoryId: ''
        },
        tableData:[],
        tableData2:[],
        activeName: 'cost',
      }
    },
    mounted:function(){
      $(window).smoothScroll()
    },
    components: {
      Toolbar
    },
    created:function(){
      this.name = this.$route.query.name
      this.activeName = this.$route.query.activeName || 'cost'
    },
    computed: {
      productId: function () {
        return this.$refs.toolbar.productId
      },
      areaTeamId: function () {
        return this.$refs.toolbar.areaTeamId
      },
      startDate: function () {
        return this.$refs.toolbar.startDate
      },
      endDate: function () {
        return this.$refs.toolbar.endDate
      }
    },
    methods:{
      handleTabClick(val) {
        if (val.name === 'income') {
          this.$router.push(this.$route.fullPath.replace('&activeName=cost','&activeName=income'))
        } else if (val.name === 'cost') {
          this.$router.push(this.$route.fullPath.replace('&activeName=income','&activeName=cost'))
        }
      },
      handleSearch(data) {
        this.loadTableData(data)
        this.loadTableData2(data)
      },
      initList(data) {
        this.loadTableData(data);
        this.loadTableData2(data)
      },
      loadTableData2:function(data){
        var _this = this;
        _this.$showLoading()
        io.post(io.productIncomeList,data,function(ret){
          _this.$hiddenLoading()
          if(ret.success){
            _this.tableData2 = ret.data
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
      loadTableData:function(data){
        var _this = this;
        _this.$showLoading()
        io.post(io.productStatisticsByCategory,data,function(ret){
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
    .main-account-select {
      float: left;
    }
    .el-tabs__header {
      margin-top: 20px;
    }
    .am-u-sm-5 {
      margin-bottom: 1.5rem;
    }
  }
</style>
