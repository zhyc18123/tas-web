<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title am-fl">订单信息</div>
          <div class="widget-function am-fr">
            <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
          </div>
        </div>

        <div class="am-u-sm-12">
          <el-steps :space="100" :active="num">
            <el-step title="下单"></el-step>
            <el-step title="已支付"></el-step>
            <el-step title="取消订单"></el-step>
            <el-step title="退费中"></el-step>
          </el-steps>
        </div>

        <table width="100%" class="am-table am-table-bordered am-table-compact">
          <tbody>
          <tr>
            <th>收货信息：</th>
            <th></th>
          </tr>
          <tr>
            <td class="bgColor">收货人：</td>
            <td>{{tableData.consignee}}</td>
            <td class="bgColor">手机号：</td>
            <td>{{tableData.phoneNo}}</td>
          </tr>
          <tr>
            <td class="bgColor">地址：</td>
            <td>{{tableData.address}}</td>
            <td class="bgColor">订单编号：</td>
            <td>{{tableData.sn}}</td>
          </tr>
          <tr>
            <td class="bgColor"> 用户：</td>
            <td>{{tableData.userName}}</td>
            <td class="bgColor">订单状态：</td>
            <td>{{tableData.status==0?'未支付':(tableData.status==1?'已支付':(tableData.status==2?'取消订单':'退费中的订单'))}}</td>
          </tr>
          </tbody>
        </table>

        <div class="widget-body  am-fr">
          <div class="am-u-sm-12 am-scrollable-horizontal">

            <div class="am-panel am-panel-default">
              <div class="am-panel-hd">
                <span>{{tableData.createTime | formatDate}}</span>
                <span class="left-margin">订单编号：{{tableData.sn}}</span>
              </div>

              <ul class="am-list am-list-static">
                <li class="am-u-sm-12" v-for="item in itemList" :key="item.orderItemId">
                  <span class="am-u-sm-2">
                    <img class="am-radius" :src="item.imageUrl" width="180"
                         height="100"/>
                  </span>
                  <span class="am-u-sm-2">{{item.productName}}</span>
                  <span class="am-u-sm-2">单价：￥{{item.unitPrice}}</span>
                  <span class="am-u-sm-2">数量：{{item.quantity}}</span>
                  <span class="am-u-sm-2">合计：￥{{item.price}}</span>
                  <span class="am-u-sm-2">商家：{{item.busTeamName}}</span>
                  </span>
                </li>
              </ul>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .font-size {

    font-size: 26px;
    text-align: center;
    margin: auto 0;
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
        itemList: [],
        address: [],
        num:null
      }
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      var orderId = this.$params("orderId")
      this.loadTableData(orderId);
    },
    methods: {
      loadTableData: function (orderId) {
        var _this = this
        io.post(io.apiAdminProductOrderDetail, {orderId: orderId}, function (ret) {
          if (ret.success) {
            _this.tableData = ret.data.serviceOrder
            _this.num = parseInt(_this.tableData.status)+1
            _this.itemList = ret.data.itemList
            //_this.loadAddress(ret.data.serviceOrder.addressId)
          } else {
            _this.$alert(ret.desc)
          }
        })
      }/*,
       loadAddress: function (addressId) {
       var _this = this
       io.post(io.apiAdminShippingAddressDetail, {addressId: addressId}, function (ret) {
       if (ret.success) {
       _this.address = ret.data
       } else {
       _this.$alert(ret.desc)
       }
       })
       }*/
    }
  }
</script>
