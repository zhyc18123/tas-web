<template>
  <div class="m-seller-register-list">
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">所有交易</div>
        </div>

 <!--       <div class="am-u-sm-3">
          <div class="am-u-sm-4">
            <a href="javascript:;" @click="$router.push('/main/serviceManager/goods/list')">供应</a>
          </div>
          <div class="am-u-sm-4">
            <a href="javascript:;" @click="$router.push('/main/serviceManager/lease/list')">课室</a>
          </div>
          <div class="am-u-sm-4">
            <a href="javascript:;" @click="$router.push('/main/serviceManager/demand/list')">需求</a>
          </div>
          &lt;!&ndash;   <div class="am-u-sm-2">
               <a href="javascript:;" @click="$router.push('/main/seller/soldProductOrder/list')">客户供应订单</a>
             </div>
             <div class="am-u-sm-2">
               <a href="javascript:;" @click="$router.push('/main/seller/soldServiceOrder/list')">客户服务订单</a>
             </div>
             <div class="am-u-sm-2">
               <a href="javascript:;" @click="$router.push('/main/seller/leaseRecord/list')">客户课室订单</a>
             </div>&ndash;&gt;
        </div>--><!--       <div class="am-u-sm-3">
          <div class="am-u-sm-4">
            <a href="javascript:;" @click="$router.push('/main/serviceManager/goods/list')">供应</a>
          </div>
          <div class="am-u-sm-4">
            <a href="javascript:;" @click="$router.push('/main/serviceManager/lease/list')">课室</a>
          </div>
          <div class="am-u-sm-4">
            <a href="javascript:;" @click="$router.push('/main/serviceManager/demand/list')">需求</a>
          </div>
          &lt;!&ndash;   <div class="am-u-sm-2">
               <a href="javascript:;" @click="$router.push('/main/seller/soldProductOrder/list')">客户供应订单</a>
             </div>
             <div class="am-u-sm-2">
               <a href="javascript:;" @click="$router.push('/main/seller/soldServiceOrder/list')">客户服务订单</a>
             </div>
             <div class="am-u-sm-2">
               <a href="javascript:;" @click="$router.push('/main/seller/leaseRecord/list')">客户课室订单</a>
             </div>&ndash;&gt;
        </div>-->

        <div class="widget-body  am-fr">
          <div class="am-u-sm-12 am-form search-div">


            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <el-input type="text" name="productName" v-model="query.productName" placeholder="名称"></el-input>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2 placeholder="订单类别" v-model="query.type">
                  <option value="">请选择</option>
                  <option value="0">供应</option>
                  <option value="2">课室</option>
                </select2>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <date-picker v-model="query.beginPayTime">
                  <input type="text" placeholder="支付时间-开始" data-am-datepicker readonly required>
                </date-picker>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <date-picker v-model="query.endPayTime">
                  <input type="text" placeholder="支付时间-结束" data-am-datepicker readonly required>
                </date-picker>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3" style="clear: both">
              <div class="am-form-group">
                <date-picker v-model="query.beginRefundTime">
                  <input type="text" placeholder="申请退款时间-开始" data-am-datepicker readonly required>
                </date-picker>
              </div>
            </div>
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <date-picker v-model="query.endRefundTime">
                  <input type="text" placeholder="申请退款时间-结束" data-am-datepicker readonly required>
                </date-picker>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2 placeholder="付款状态" v-model="query.chargingStatus">
                  <option value="">请选择付款状态</option>
                  <option value="0">未付款</option>
                  <option value="2">已付款</option>
                  <option value="5">已退款</option>
                  <option value="6">申请退款中</option>
                </select2>
              </div>
            </div>


            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2 placeholder="订单状态" v-model="query.orderStatus">
                  <option value="">请选择订单状态</option>
                  <option value="0">未付款</option>
                  <option value="2">已付款</option>
                  <option value="5">已退款</option>
                  <option value="6">退款中</option>
                  <option value="7">已发货</option>
                  <option value="8">已收货</option>
                </select2>
              </div>
            </div>



                <button type="button" style="padding-left: 10px" class="am-btn am-btn-default am-btn-success"
                        @click="search"><span class="am-icon-search"></span>查询
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="am-u-sm-12">
          <el-table :data="tableData" border stripe style="min-width: 100%">
            <el-table-column prop="productName" label="名称" min-width="100"></el-table-column>
            <el-table-column label="订单类别" min-width="100">
              <template scope="scope">{{scope.row.type==0?"供应":scope.row.type==2?"课室":"需求"}}</template>
            </el-table-column>
            <el-table-column label="订单编号" min-width="100">
              <template scope="scope">{{scope.row.orderItemId}}</template>
            </el-table-column>
            <el-table-column label="分类" min-width="100">
              <template scope="scope">{{scope.row.categoryName}}</template>
            </el-table-column>

            <el-table-column label="单价" min-width="100">
              <template scope="scope">{{scope.row.unitPrice}}</template>
            </el-table-column>

            <el-table-column label="数量" min-width="100">
              <template scope="scope">{{scope.row.quantity}}</template>
            </el-table-column>

            <el-table-column label="实付款" min-width="100">
              <template scope="scope">{{scope.row.paidAmount }}</template>
            </el-table-column>

            <el-table-column label="支付时间" min-width="100">
              <template scope="scope">{{scope.row.payTime | formatTime}}</template>
            </el-table-column>

            <el-table-column label="申请退款时间" min-width="100">
              <template scope="scope">{{scope.row.refundTime | formatTime}}</template>
            </el-table-column>

            <el-table-column label="付款状态" min-width="100">
              <template scope="scope">{{scope.row.chargingStatus==2? "已付款":scope.row.chargingStatus==5?"已退款":scope.row.chargingStatus==6?"退款中":"未付款"}}</template>
            </el-table-column>

            <el-table-column label="订单状态" min-width="100">
            <template scope="scope">{{scope.row.orderStatus ==0 ?"未付款":scope.row.orderStatus ==2?"已付款":scope.row.orderStatus ==5?"已退款":scope.row.orderStatus ==6?"退款中":scope.row.orderStatus ==7?"已发货":"已收货"  }}</template>
          </el-table-column>

            <el-table-column label="快递单号" min-width="100">
              <template scope="scope">{{scope.row.logisticsNo}}</template>
            </el-table-column>

            <el-table-column label="买家用户名" min-width="100">
              <template scope="scope">{{scope.row.buyerName}}</template>
            </el-table-column>
            <el-table-column label="买家手机号" min-width="100">
              <template scope="scope">{{scope.row.buyerPhoneNo}}</template>
            </el-table-column>
            <el-table-column label="卖家用户名" min-width="100">
              <template scope="scope">{{scope.row.sellerName}}</template>
            </el-table-column>
            <el-table-column label="卖家手机号" min-width="100">
              <template scope="scope">{{scope.row.sellerPhoneNo}}</template>
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

<style scope>
  .left-margin {
    margin-left: 10%;
  }
  .search-div .am-form-group {
    overflow: hidden;
  }
  .btn-check {
    float: right;
    margin-right: 46px;
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
     /* offGood: function (productId) {
        var _this = this;
        _this.$confirm("确认下架吗",
          function () {
            io.post(io.apiAdminOffDemand, {productId: productId}, function (ret) {
              if (ret.success) {
                _this.$toast("下架成功")
                _this.loadTableData()
              } else {
                _this.$alert(ret.desc)
              }
            })
          });
      },*/

      search: function () {
        this.loadTableData()
      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminOrderItemList, $.extend({
          pageNo: _this.pageNo,
          pageSize: _this.pageSize,
        }, _this.query), function (ret) {
          if (ret.success) {
            _this.total = ret.data.total
            _this.tableData = ret.data.list
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
     /* productRefund: function (orderItemId) {
        var _this = this
        _this.orderItemId = orderItemId
        _this.$refs.productRefund.show({
          width: 1000,
          height: 600
        })
      },*/
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
