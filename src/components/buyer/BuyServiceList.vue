<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">我购买的服务</div>
        </div>
        <div class="widget-body  am-fr">

          <div class="am-u-sm-12 am-form">

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-u-lg-offset-6">
              <div class="am-form-group tpl-table-list-select">
                <div class="am-form-group">
                  <select2 v-model="query.status">
                    <option value="">所有</option>
                    <option value="0">未支付</option>
                    <option value="1">已支付</option>
                    <option value="2">取消的订单</option>
                    <option value="3">退款中的订单</option>
                  </select2>
                </div>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
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
              <tr class="styleTitle">
                <th class="am-u-sm-4 am-text-center">服务名称</th>
                <th class="am-u-sm-1 am-text-center">单价</th>
                <th class="am-u-sm-1 am-text-center">数量</th>
                <th class="am-u-sm-2 am-text-center">实付款</th>
                <th class="am-u-sm-2 am-text-center">订单交易状态</th>
                <th class="am-u-sm-2 am-text-center">操作</th>
              </tr>
              </thead>
            </table>

            <div class="am-panel am-panel-default" v-for="(items,index) in tableData" :key="items.serviceOrder.orderId"
                 v-if="items.serviceOrder.type==1">
              <div class="am-text-center orderTime">
                <span>{{items.serviceOrder.createTime | formatDate}}</span>
                <span class="left-margin">订单编号：{{items.serviceOrder.sn}}</span>
              </div>

              <ul class="am-list am-list-static">
                <li class="am-u-sm-12" v-for="(item,num) in items.itemList" :key="item.orderItemId">
                  <span class="am-u-sm-2">
                    <img class="am-radius" :src="item.imageUrl" width="180"
                         height="100"/>
                  </span>

                  <div class="am-u-sm-2 am-text-center">{{item.productName}}</div>
                  <div class="am-u-sm-1 am-text-center">￥{{item.unitPrice}}</div>
                  <div class="am-u-sm-1 am-text-center">{{item.quantity}}</div>
                  <div class="am-u-sm-2 am-text-center">￥{{item.price}}</div>
                  <div class="am-u-sm-2 am-text-center">
                    {{items.serviceOrder.status==0?'未支付':(items.serviceOrder.status==1?'已支付':(items.serviceOrder.status==2?'取消订单':'退费中的订单'))}}
                  </div>
                  <div class="am-u-sm-2">
                    <div class="tpl-table-black-operation am-text-center">
                      <a href="javascript:;"
                         @click="$router.push('/main/buyer/ServiceOrderItem/detail/'+items.serviceOrder.orderId)">
                        <i class="am-icon-edit"></i> 订单详情
                      </a>
                      <a href="javascript:;" @click="productRefund(item.orderItemId)" v-if="item.status!=4">
                        <i class="am-icon-edit"></i> 退费申请
                      </a>
                      <span v-if="item.status==4">
                           已经申请退费
                      </span>
                      <a href="javascript:;" @click="$router.push('/main/buyer/ServiceOrderItem/comment/'+item.productId)" v-if="item.status==3">
                        <i class="am-icon-edit"></i> 追加评论
                      </a>
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
            <window ref="productRefund" title="商品退费申请">
              <order-item-refund :orderItemId="orderItemId"
                                 @refundApply="$refs.productRefund.close()"></order-item-refund>
            </window>
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
  .styleTitle {
    color:#333333;
    background-color: #EEF1F6
  }
  .orderTime {
    background-color: #6d787c;
    color: #111111
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
          type: 1
        }, _this.query), function (ret) {
          if (ret.success) {
            _this.total = ret.data.total
            _this.tableData = ret.data.list
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      orderItemDetail: function () {
        var _this = this
      },
      productRefund: function (orderItemId) {
        var _this = this
        _this.orderItemId = orderItemId
        _this.$refs.productRefund.show({
          width: 1000,
          height: 600
        })
      }
    }
  }
</script>
