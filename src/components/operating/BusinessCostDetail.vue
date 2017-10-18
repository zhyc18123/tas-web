<template>
  <div class="m-business-cost-detail">
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title am-fl">{{name}}详情</div>
          <div class="widget-function am-fr">
            <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
          </div>
        </div>
        <div class="widget-body">
          <toolbar @initList="initList" @handleSearch="handleSearch" ref="toolbar"></toolbar>
          <div v-if="detailType !== '0'" class="am-u-sm-12">
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
                label="成本名称"
                min-width="190">
              </el-table-column>
              <el-table-column
                prop="totalAmount"
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
                  <router-link v-if="detailType === '1'" :to="'/main/operating/businessStatistics/subDetail?detailType=' +
                       scope.row.detailType + '&name=' + name +  '-'+scope.row.name+ '&feeCategoryId=' + scope.row.categoryId+
                       '&areaTeamId=' + areaTeamId + '&busTeamId=' + busTeamId + '&startDate=' + startDate +
                       '&endDate=' + endDate" tag="a">明细</router-link>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-if="detailType === '0'" class="am-u-sm-12">
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
                prop="remark"
                label="备注"
                min-width="190">
              </el-table-column>
              <el-table-column
                prop="amount"
                label="金额（元）">
                <template scope="scope">
                  <div>
                    {{scope.row.amount | formatNumber(2)}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="发生日期/时间段"
                min-width="190">
                <template scope="scope">
                  <div>
                    {{scope.row.createTime | formatDate}}
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
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
        name: '',
        detailType: '0',
        feeCategoryId: '',
        tableData:[],
      }
    },
    mounted:function(){
      $(window).smoothScroll()
    },
    components: {Toolbar},
    created:function(){
      this.name = this.$route.query.name
      this.detailType = this.$route.query.detailType
      this.feeCategoryId = this.$route.query.feeCategoryId
    },
    computed: {
      areaTeamId: function () {
        return this.$refs.toolbar.areaTeamId
      },
      busTeamId: function () {
        return this.$refs.toolbar.busTeamId
      },
      startDate: function () {
        return this.$refs.toolbar.startDate
      },
      endDate: function () {
        return this.$refs.toolbar.endDate
      }
    },
    methods:{
      handleSearch(data) {
        this.loadTableData(data)
      },
      initList(data) {
        this.loadTableData(data);
      },
      loadTableData:function(data){
        var _this = this;
        _this.$showLoading()
        io.post(io.costDetail,Object.assign({},data,{
          detailType: this.detailType,
          feeCategoryId: this.feeCategoryId,
        }),function(ret){
          _this.$hiddenLoading()
          if(ret.success){
            if (_this.detailType == 0) {
              _this.tableData = ret.data.changeRecordList
            } else if (_this.detailType == 1 ||_this.detailType == 3) {
              _this.tableData = ret.data.categoryMainAccountVoList
            } else if(_this.detailType == 2) {
              _this.tableData = ret.data.teacherClassCostVoList
            }

          }else{
            _this.$alert(ret.desc)
            _this.$hiddenLoading()
          }
        })
      }
    }
  }
</script>

<style lang="less">
  .m-business-cost-detail{
    .el-tabs__header {
      margin-top: 20px;
    }
    .am-u-sm-5 {
      margin-bottom: 1.5rem;
    }
  }
</style>
