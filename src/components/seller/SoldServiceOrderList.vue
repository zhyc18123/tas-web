<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">商家服务订单</div>
        </div>
        <div class="widget-body am-fr">

          <div class="am-u-sm-12 am-form">

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-u-lg-offset-6">
              <div class="am-form-group tpl-table-list-select">
                <div class="am-form-group">
                  <select2 v-model="query.status">
                    <option value="">所有</option>
                    <option value="0">下单中</option>
                    <option value="1">已支付</option>
                    <option value="2">已发货</option>
                    <option value="3">交易成功</option>
                    <option value="4">退费</option>
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
              <tr>
                <th class="am-u-sm-4 am-text-center">服务名称</th>
                <th class="am-u-sm-1">单价</th>
                <th class="am-u-sm-1">数量</th>
                <th class="am-u-sm-2">实付款</th>
                <th class="am-u-sm-2">服务交易状态</th>
                <th class="am-u-sm-2">操作</th>
              </tr>
              </thead>
            </table>
            <div class="am-u-sm-12 font-style" v-if="tableData==''">暂无数据</div>
            <div class="am-panel am-panel-default" v-for="(items,index) in tableData" :key="items.orderItemId"  v-if="items.order.type==1">
              <div class="am-panel-hd">
                <span>{{items.order.createTime | formatDate}}</span>
                <span class="left-margin">订单编号：{{items.order.sn}}</span>
              </div>

              <ul class="am-list am-list-static">
                <li class="am-u-sm-12">
                  <span class="am-u-sm-2">
                    <img class="am-radius" :src="items.imageUrl"  width="180"
                         height="100"/>
                  </span>
                  <div class="am-u-sm-2">{{items.productName}}</div>
                  <div class="am-u-sm-1">{{items.unitPrice}}</div>
                  <div class="am-u-sm-1">{{items.quantity}}</div>
                  <div class="am-u-sm-2">{{items.price}}</div>
                  <div class="am-u-sm-2">{{items.order.status==0?'未支付':(items.order.status==1?'已支付':(items.order.status==2?'取消订单':'退费中的订单'))}}</div>
                  <div class="am-u-sm-2">
                    <div class="tpl-table-black-operation">
                      <a href="javascript:;" @click="$router.push('/main/seller/sellerService/detail/'+items.order.orderId)">
                        <i class="am-icon-edit"></i> 服务详情
                      </a>
                      <a href="javascript:;" @click="serviceToRefund(items.orderItemId)" v-if="items.status==4">
                        <i class="am-icon-edit"></i> 确认退费
                      </a>
                      <a href="javascript:;" @click="changeServiceStatus(items.orderItemId)" v-if="items.status!=3">
                        <i class="am-icon-edit"></i> 修改状态
                      </a>
                      {{items.status==0?'下单中':(items.status==1?'已付款':(items.status==2?'发货中':(items.status==3?'交易成功':'退费')))}}
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

            <window ref="serviceRefundApproval" title="服务退费申请审批">
              <service-refund :orderItemId="orderItemId" @productApproval="$refs.serviceRefundApproval.close()"></service-refund>
            </window>

            <window ref="changeServiceItemStatus" title="设置服务交易状态">
              <service-item-status :orderItemId="orderItemId" @changeStatus="$refs.changeServiceItemStatus.close()"></service-item-status>
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
  .font-style{
    text-align: center;
  }
</style>

<script>
  import io from '../../lib/io'

  import Pagination from '../base/Pagination'
  import RefundApprovalForm from './RefundApprovalForm'
  import ChangeOrderItemStatus from './ChangeOrderItemStatus'

  export default{
    data: function () {
      return {
        tableData: [],
        total: 0,
        pageSize: 3,
        pageNo: 1,
        query: {
        },
        searchConfig: {},
        orderItemId:''
      }
    },
    components: {
      Pagination,
      'service-refund': RefundApprovalForm,
      'service-item-status': ChangeOrderItemStatus
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.loadTableData(this.pageNo);
      var _this = this
      this.$root.$on('sellerOrderList:new', function () {
        _this.pageNo = 1
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
        io.post(io.apiAdminSellProductOrderList, $.extend({
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
      serviceToRefund: function (orderItemId) {
        var _this = this
        _this.orderItemId = orderItemId
        _this.$refs.serviceRefundApproval.show({
          width: 1000,
          height: 600
        })
      },
      changeServiceStatus: function (orderItemId) {
        var _this = this
        _this.orderItemId = orderItemId
        _this.$refs.changeServiceItemStatus.show({
          width: 500,
          height: 200
        })

      }
    }
  }
</script>

