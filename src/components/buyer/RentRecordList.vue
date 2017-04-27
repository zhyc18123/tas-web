<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">租赁记录</div>
        </div>

        <div class="am-u-sm-12">
          <div class="am-u-sm-2">
            <a href="javascript:;" @click="$router.push('/main/buyer/buyCommodity/list')">我购买的商品</a>
          </div>
          <div class="am-u-sm-2">
            <a href="javascript:;" @click="$router.push('/main/buyer/buyService/list')">我购买的服务</a>
          </div>
          <div class="am-u-sm-2">
            <a href="javascript:;" @click="$router.push('/main/buyer/rentRecord/list')">我租赁的记录</a>
          </div>
          <div class="am-u-sm-2">
            <a href="javascript:;" @click="$router.push('/main/seller/soldProductOrder/list')">客户商品订单</a>
          </div>
          <div class="am-u-sm-2">
            <a href="javascript:;" @click="$router.push('/main/seller/soldServiceOrder/list')">客户服务订单</a>
          </div>
          <div class="am-u-sm-2">
            <a href="javascript:;" @click="$router.push('/main/seller/leaseRecord/list')">客户租赁订单</a>
          </div>
        </div>

        <div class="widget-body  am-fr">

          <div class="am-u-sm-12 am-form">
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2 v-model="query.time">
                  <option value="">请选择下单时间</option>
                  <option value="0">最近一个星期</option>
                  <option value="1">最近一个月</option>
                  <option value="2">最近三个月</option>
                  <option value="3">最近一年</option>
                </select2>
              </div>
            </div>


            <div class="aam-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2 v-model="query.status">
                  <option value="">所有</option>
                  <option value="0">待付款</option>
                  <option value="1">交易完成</option>
                  <option value="2">已取消订单</option>
                  <option value="3">退款中的订单</option>
                </select2>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-u-end">
              <div class="am-input-group am-input-group-lg tpl-form-border-form cl-p">
                <input type="text" class="am-input-lg am-from-feild" name="name" v-model="query.sn"
                       placeholder="请输入订单编号"/>
                <span class="am-input-group-btn">
                  <button class="am-btn am-btn-default am-btn-success tpl-table-list-field am-icon-search"
                          type="button" @click="search"></button>
                </span>
              </div>
            </div>

          </div>

        </div>

        <div class="am-u-sm-12 am-scrollable-horizontal">
          <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
            <thead>
            <tr>
              <th class="am-u-sm-4 am-text-center">租赁商品名称</th>
              <th class="am-u-sm-1 am-text-center">单价</th>
              <th class="am-u-sm-1 am-text-center">租赁时长</th>
              <th class="am-u-sm-3 am-text-center">时间段</th>
              <th class="am-u-sm-1 am-text-center">实付款</th>
              <th class="am-u-sm-1 am-text-center">订单交易状态</th>
              <th class="am-u-sm-1 am-text-center">操作</th>
            </tr>
            </thead>
          </table>

          <div class="am-panel am-panel-default" v-for="(items,index) in tableData" :key="items.serviceOrder.orderId"
               v-if="items.serviceOrder.type==2">
            <div class="am-panel-hd">
              <span>{{items.serviceOrder.createTime | formatDate}}</span>
              <span class="left-margin">订单编号：{{items.serviceOrder.sn}}</span>
            </div>

            <ul class="am-list am-list-static">
              <li class="am-u-sm-12" v-for="(item,num) in items.itemList" :key="item.orderItemId">
                  <span class="am-u-sm-2">
                    <img class="am-radius" :src="item.imageUrl" width="180" height="100"/>
                  </span>
                <div class="am-u-sm-2 am-text-center">{{item.productName}}</div>
                <div class="am-u-sm-1 am-text-center">￥{{item.unitPrice}}</div>
                <div class="am-u-sm-1 am-text-center">{{item.rentSpan}}</div>
                <div class="am-u-sm-3 am-text-center">{{item.startDate}} ~ {{item.endDate}}
                  {{item.startTime}}-{{item.endTime}}
                </div>
                <div class="am-u-sm-1 am-text-center">￥{{item.price}}</div>
                <div class="am-u-sm-1 am-text-center">
                  {{items.serviceOrder.status==0?'未支付':(items.serviceOrder.status==1?'已支付':(items.serviceOrder.status==2?'取消订单':'退费中的订单'))}}
                </div>

                <div class="am-u-sm-1 am-text-center">
                  <div class="tpl-table-black-operation">
                    <div>
                      <a href="javascript:;"
                         @click="$router.push('/main/buyer/rent/detail/'+items.serviceOrder.orderId)">
                        <i class="am-icon-edit"></i> 订单详情
                      </a>
                    </div>
                    <div>
                      <a href="javascript:;" @click="buyerConfirm(item.orderItemId)" v-if="item.status==2">
                        <i class="am-icon-edit"></i> 买家确认
                      </a>
                    </div>
                    <div>
                      <a href="javascript:;" @click="productRefund(item.orderItemId)" v-if="item.status>1">
                        <i class="am-icon-edit"></i> 退费申请
                      </a>
                    </div>
                    <div>
                      {{item.status==0?'下单中':(item.status==1?'已付款':(item.status==2?'使用资源':(item.status==3?'买家确认':(item.status==4?'退费中':'已评价'))))}}
                    </div>
                    <div>
                      <a href="javascript:;" @click="$router.push('/main/buyer/rent/comment/'+item.orderItemId)"
                         v-if="item.status==3">
                        <i class="am-icon-edit"></i> 追加评论
                      </a>
                    </div>
                    <div>
                      <a href="javascript:;"
                         @click="$router.push('/main/buyer/productOrderItem/comment/'+item.orderItemId)"
                         v-if="item.status==5">
                        <i class="am-icon-edit"></i> 追加评论
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div class="am-u-lg-12 am-cf">
            <div class="am-fr">
              <pagination v-bind:total="total" v-bind:pageNo="pageNo" v-bind:pageSize="pageSize"
                          @paging="loadTableData"/>
            </div>
          </div>
          <window ref="productRefund" title="退费申请">
            <order-item-refund :orderItemId="orderItemId"
                               @refundApply="$refs.productRefund.close()"></order-item-refund>
          </window>
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
  import OrderItemRefundForm from './OrderItemRefundForm'

  export default{
    data: function () {
      return {
        tableData: [],
        total: 0,
        pageSize: 3,
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
      'order-item-refund': OrderItemRefundForm
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.loadTableData(this.pageNo);
      var _this = this;
      this.$root.$on('orderList:new', function () {
        _this.loadTableData(this.pageNo)
      })
    },
    methods: {
      search: function () {
        this.loadTableData()
      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminProductOrderList, $.extend({
          pageNo: _this.pageNo,
          pageSize: _this.pageSize,
          type: 2
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
      buyerConfirm: function (orderItemId) {
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
      }
    }
  }
</script>
