<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">管理课室</div>
        </div>

        <div class="am-u-sm-3 service-manager-nav">
          <div class="am-u-sm-4">
            <a href="javascript:;" @click="$router.push('/main/serviceManager/goods/list')">供应</a>
          </div>
          <div class="am-u-sm-4 active">
            <a href="javascript:;" @click="$router.push('/main/serviceManager/lease/list')">课室</a>
          </div>
          <div class="am-u-sm-4">
            <a href="javascript:;" @click="$router.push('/main/serviceManager/demand/list')">需求</a>
          </div>
          <!--   <div class="am-u-sm-2">
               <a href="javascript:;" @click="$router.push('/main/seller/soldProductOrder/list')">客户供应订单</a>
             </div>
             <div class="am-u-sm-2">
               <a href="javascript:;" @click="$router.push('/main/seller/soldServiceOrder/list')">客户服务订单</a>
             </div>
             <div class="am-u-sm-2">
               <a href="javascript:;" @click="$router.push('/main/seller/leaseRecord/list')">客户课室订单</a>
             </div>-->
        </div>

        <div class="widget-body  am-fr">
          <div class="am-u-sm-12 am-form">

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <input type="text" name="className" v-model="query.sellerName" placeholder="用户名"/>
              </div>
            </div>
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <input type="text" name="className" v-model="query.sellerPhoneNo" placeholder="手机号"/>
              </div>
            </div>
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <date-picker v-model="query.beginTime">
                  <input type="text" placeholder="开始时间" data-am-datepicker readonly required>
                </date-picker>
              </div>
            </div>
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <date-picker v-model="query.endTime">
                  <input type="text" placeholder="结束时间" data-am-datepicker readonly required>
                </date-picker>
              </div>
            </div>


            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-u-end">
              <div class="am-form-group">
                <button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="search"><span class="am-icon-search"></span>查询
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="am-u-sm-12">
          <el-table :data="tableData" border stripe style="min-width: 100%">
            <el-table-column prop="roomName" label="名称" min-width="100"></el-table-column>

            <el-table-column label="日期" min-width="100">
              <template   scope="scope" >
              <pre>{{scope.row.allTimeStr}}</pre>
              </template>
            </el-table-column>
           <!-- <el-table-column label="按天" min-width="50">
              <template scope="scope">{{scope.row.weekNum==0?'日':scope.row.weekNum==1?'一':scope.row.weekNum==2?'二':scope.row.weekNum==3?'三':scope.row.weekNum==4?'四':scope.row.weekNum==5?'五':scope.row.weekNum==6?'六':'-'}}</template>
            </el-table-column>
            <el-table-column label="时间段" min-width="100">
              <template scope="scope">{{scope.row.startTime }} 至 {{scope.row.endTime }}</template>
            </el-table-column>
            <el-table-column label="天数" min-width="100">
              <template scope="scope">{{scope.row.dateNum}}</template>
            </el-table-column>
            <el-table-column label="小时数" min-width="100">
              <template scope="scope">{{scope.row.hourNum}}</template>
            </el-table-column>
            <el-table-column label="总价" min-width="100">
              <template scope="scope">{{scope.row.totalPrice}}</template>
            </el-table-column>-->
            <el-table-column label="用户名" min-width="100">
              <template scope="scope">{{scope.row.sellerName}}</template>
            </el-table-column>


            <el-table-column label="手机号" min-width="100">
              <template scope="scope">{{scope.row.sellerPhoneNo}}</template>
            </el-table-column>

            <el-table-column label="发布时间" min-width="100">
              <template scope="scope">{{scope.row.updateTime | formatTime}}</template>
            </el-table-column>



            <el-table-column label="操作" width="120">
              <template scope="scope">
                <el-dropdown>
                  <span class="el-dropdown-link">操作菜单<i class="el-icon-caret-bottom el-icon--right"></i></span>
                  <el-dropdown-menu slot="dropdown">
             <!--       <el-dropdown-item v-if="hasPermission('edit')"
                                      @click.native="$router.push('/main/tradingService/category/edit/'+scope.row.categoryId)">
                      编辑
                    </el-dropdown-item>-->
                    <el-dropdown-item v-if="hasPermission('off')"  @click.native="offLease(scope.row.productId)">下架</el-dropdown-item>
                    <el-dropdown-item v-if="hasPermission('del')"  @click.native="deleteLease(scope.row.leaseId)">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>

        </div>

        <div class="am-u-lg-12 am-cf">
          <div class="am-fr">
            <pagination v-bind:total="total" v-bind:pageNo="pageNo" v-bind:pageSize="pageSize"
                        @paging="loadTableData"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .left-margin {
    margin-left: 10%;
  }
</style>

<script>
  import io from '../../lib/io'

  import Pagination from '../base/Pagination'

  export default{
    data: function () {
      return {
        tableData: [],
        total: 0,
        pageSize: 10,
        pageNo: 1,
        query: {
          areaTeamId: '',
          name: '',
        },
        searchConfig: {},
        orderItemId: ''
      }
    },
    components: {
      Pagination,
      //'order-item-refund': OrderItemRefundForm
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.loadTableData(this.pageNo);
      var _this = this
      this.$root.$on('orderList:new', function () {
        _this.loadTableData(this.pageNo)
      })
    },
    methods: {
      check:function (test) {
        alert(test)
      },
      offLease: function (productId) {
        var _this = this;
        _this.$confirm("确认下架吗",
          function () {
            io.post(io.apiAdminOffLease, {productId: productId}, function (ret) {
              if (ret.success) {
                _this.$toast("下架成功")
                _this.loadTableData()
              } else {
                _this.$alert(ret.desc)
              }
            })
          });
      },
      deleteLease: function (productId) {
        var _this = this;
        _this.$confirm("确认删除吗",
          function () {
            io.post(io.apiAdminDeleteLease, {productId: productId}, function (ret) {
              if (ret.success) {
                _this.$toast("删除成功")
                _this.loadTableData()
              } else {
                _this.$alert(ret.desc)
              }
            })
          });
      },


      search: function () {
        this.loadTableData()
      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminLeaseList, $.extend({
          pageNo: _this.pageNo,
          pageSize: _this.pageSize,
          status:1,
        }, _this.query), function (ret) {
          if (ret.success) {
            _this.total = ret.data.total
            _this.tableData = ret.data.list
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      productRefund: function (orderItemId) {
        var _this = this
        _this.orderItemId = orderItemId
        _this.$refs.productRefund.show({
          width: 1000,
          height: 600
        })
      },
      /*     buyerConfirm: function (orderItemId) {
       var _this = this
       _this.orderItemId = orderItemId
       io.post(io.apiAdminchangeSellOrderItemStatus, {
       orderItemId: _this.orderItemId,
       itemStatus: 3
       }, function (ret) {
       if (ret.success) {
       _this.$toast("ok")
       _this.$root.$emit('orderList:new')
       } else {
       _this.$alert(ret.desc)
       }
       })
       }*/
    }
  }
</script>

<style scope lang="less">
  pre {
    background-color:transparent;
    border: none;
  }
</style>
<style lang="less">
  .service-manager-nav {
    margin: 10px 0 10px 12px;
    background: #eef1f6;
    font-size: 14px;
    padding: 0;
    border: 1px solid #dfe6ec;
    .am-u-sm-4 {
      text-align: center;
      padding: 5px;
    }
    .active {
      background-color: #ffffff;

      a {
        color: #4db3ff;
      }
    }
    a {
      color: #666666;
      display: block;
      &:hover {
        color: #333333;
      }
    }
  }
</style>
