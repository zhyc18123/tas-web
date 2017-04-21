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

        <table width="100%" class="am-table am-table-bordered am-table-compact">
          <tbody>
            <tr>
              <th>收货信息：</th>
              <th></th>
            </tr>
            <tr>
              <td class="bgColor">收货人：</td>
              <td>{{order.consignee}}</td>
              <td class="bgColor">手机号：</td>
              <td>{{order.phoneNo}}</td>
            </tr>
            <tr>
              <td class="bgColor">地址：</td>
              <td>{{order.address}}</td>
              <td class="bgColor">订单编号：</td>
              <td>{{order.sn}}</td>
            </tr>
            <tr>
              <td class="bgColor"> 用户：</td>
              <td>{{order.userName}}</td>
              <td class="bgColor">订单状态：</td>
              <td>
                {{order.status==0?'未支付':(order.status==1?'已支付':(order.status==2?'取消订单':'退费中的订单'))}}
              </td>
            </tr>
          </tbody>
        </table>

        <div class="widget-body  am-fr">
          <div class="am-u-sm-12 am-scrollable-horizontal">

            <div class="am-panel am-panel-default">
              <div class="am-panel-hd">
                <span>{{order.createTime | formatDate}}</span>
                <span class="left-margin">订单编号：{{order.sn}}</span>
              </div>

              <ul class="am-list am-list-static">
                <li class="am-u-sm-12">
                  <span class="am-u-sm-2">
                    <img class="am-radius" :src="tableData.imageUrl" width="180"
                         height="100"/>
                  </span>
                  <span class="am-u-sm-2">{{tableData.productName}}</span>
                  <span class="am-u-sm-1">{{tableData.price/tableData.quantity | formatNumber(2)}}</span>
                  <span class="am-u-sm-1">{{tableData.quantity}}</span>
                  <span class="am-u-sm-2">{{tableData.price}}</span>
                  <span class="am-u-sm-2">{{tableData.busTeamName}}</span>
                  </span>
                </li>
              </ul>

            </div>
          </div>
        </div>

        <div class="am-u-sm-12">
          <div class="am-panel am-panel-default">
            <div class="am-panel-hd"><label>评论</label></div>
            <div class="am-panel-bd">
              <ul class="am-comments-list am-comments-list-flip">
                <li class="am-comment">
                  <div class="am-panel am-panel-default">
                    <div class="am-panel-hd">2017年4月19&nbsp;&nbsp;&nbsp;买家：沙瑞金</div>
                    <div class="am-panel-bd">
                      <article>达康书记别低头，GDP会掉！！！</article>
                    </div>
                  </div>
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

  export default{
    data: function () {
      return {
        tableData: [],
        orderItemId: '',
        order:[]
      }
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      var orderItemId = this.$params("orderItemId")
      this.loadTableData(orderItemId);
    },
    methods: {
      loadTableData: function (orderItemId) {
        var _this = this
        _this.orderItemId = orderItemId
        io.post(io.apiAdminOrderItemDetail, {orderItemId: _this.orderItemId}, function (ret) {
          if (ret.success) {
            _this.tableData = ret.data
            _this.order = ret.data.order
          } else {
            _this.$alert(ret.desc)
          }
        })
      }
    }
  }
</script>
