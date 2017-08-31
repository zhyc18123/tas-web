<template>
  <div class="m-business-cost-list">
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title am-fl">成本列表</div>
          <div class="widget-function am-fr">
            <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
          </div>
        </div>
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="成本" name="first">
            <div>
              <div class="am-u-sm-5">
                <choose v-model="formData.feeCategoryId">
                  <select required data-placeholder="选择成本分类" style="min-width:200px;" class="chosen-select">
                    <option value=""></option>
                    <option v-for="item in feeCategories" :value="item.feeCategoryId">{{item.name}}</option>
                  </select>
                </choose>
              </div>
              <div class="am-u-sm-12">
                <el-table
                  :data="tableData"
                  border
                  stripe
                  style="min-width: 100%">
                  <el-table-column
                    prop="index"
                    label="序号"
                    min-width="190">
                  </el-table-column>
                  <el-table-column
                    prop="category"
                    label="分类"
                    min-width="190">
                  </el-table-column>
                  <el-table-column
                    prop="price"
                    label="金额（元）"
                    min-width="190">
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    width="100">
                    <template scope="scope">
                      <router-link :to="'/main/operating/businessStatistics/costDetail?id=' + scope.row.to" tag="a">详情</router-link>
                    </template>
                  </el-table-column>
                </el-table>
              </div>

            </div>
          </el-tab-pane>
          <el-tab-pane label="营收" name="second">
            <div>
              <div class="am-u-sm-5">
                <choose style="min-width:200px;" class="am-fl am-u-sm-4" v-model="formData.feeCategoryId">
                  <select required data-placeholder="选择营收分类" style="min-width:200px;" class="chosen-select">
                    <option value=""></option>
                    <option v-for="item in feeCategories" :value="item.feeCategoryId">{{item.name}}</option>
                  </select>
                </choose>
              </div>
              <div class="am-u-sm-12">
                <el-table
                  :data="tableData2"
                  border
                  stripe
                  style="min-width: 100%">
                  <el-table-column
                    prop="index"
                    label="序号"
                    min-width="190">
                  </el-table-column>
                  <el-table-column
                    prop="category"
                    label="分类"
                    min-width="190">
                  </el-table-column>
                  <el-table-column
                    prop="price"
                    label="金额（元）"
                    min-width="190">
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    width="100">
                    <template scope="scope">
                      <router-link :to="'/main/operating/businessStatistics/costDetail?id=' + scope.row.to" tag="a">详情</router-link>
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
</template>

<script>
  import io from '../../lib/io'
  import moment from 'moment'
  export default{
    data:function(){
      return {
        feeCategories: [],
        formData: {
          feeCategoryId: ''
        },
        tableData:[
          {
            index: 0,
            category: '校园成本',
            price: 100,
            to: '01',
          }
        ],
        tableData2:[
          {
            index: 0,
            category: '校园成本',
            price: 200,
            to: '01',
          }
        ],
        activeName: 'first',
      }
    },
    mounted:function(){
      $(window).smoothScroll()
    },
    created:function(){
//      this.loadTableData();
//      this.loadFeeCategoryData();
    },
    methods:{
      loadFeeCategoryData: function () {
        var _this = this
        io.post(io.apiAdminSettlementFeeCategoryTreeMap, {}, function (ret) {
          if (ret.success) {
            _this.feeCategories = ret.data
          } else {
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
  .m-business-cost-list{
    .el-tabs__header {
      margin-top: 20px;
    }
    .am-u-sm-5 {
      margin-bottom: 1.5rem;
    }
  }
</style>
