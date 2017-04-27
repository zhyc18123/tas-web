<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title am-fl">租赁订单信息</div>
          <div class="widget-function am-fr">
            <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
          </div>
        </div>

        <div class="am-u-sm-12">
          <el-steps :space="100" :active="num">
            <el-step title="下单"></el-step>
            <el-step title="已支付"></el-step>
            <el-step title="使用资源"></el-step>
            <el-step title="买家确认"></el-step>
            <el-step title="退费"></el-step>
            <el-step title="评价"></el-step>
          </el-steps>
        </div>

        <table width="100%" class="am-table am-table-bordered am-table-compact am-table-hover">
          <tbody>
          <tr>
            <td>购买类型：租赁</td>
            <td>订单编号：{{order.sn}}</td>
          </tr>
          <tr>
            <td>买家姓名：{{order.userName}}</td>
            <td>订单状态：{{order.status==0?'未支付':(order.status==1?'已支付':(order.status==2?'取消订单':'退费中的订单'))}}</td>
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
                  <span class="am-u-sm-1">￥{{tableData.unitPrice}}</span>
                  <span class="am-u-sm-1">{{tableData.rentSpan}}</span>
                  <span class="am-u-sm-3">{{tableData.startDate}}~{{tableData.endDate}} {{tableData.startTime}}-{{tableData.endTime}}</span>
                  <span class="am-u-sm-1">￥{{tableData.price}}</span>
                  <span class="am-u-sm-2">商家：{{tableData.busTeamName}}</span>
                  </span>
                </li>
              </ul>

            </div>
          </div>
        </div>

        <div class="am-u-sm-12">
          <div class="am-panel am-panel-default">
            <div class="am-panel-hd"><label>评论</label></div>
          </div>
          <ul class="am-comments-list am-comments-list-flip">
            <li class="am-comment" v-for="item in commentData" v-if="commentData!=''" :key="item.commentId">
              <div class="am-panel am-panel-default">
                <div class="am-panel-hd">
                  <label>
                    <el-rate v-model="item.evaluation" disabled></el-rate>
                  </label>
                  <span class="left-margin">{{item.createTime | formatTime}}</span>
                  <span class="left-margin">买家：{{item.userName}}</span>
                </div>
                <div class="am-panel-bd">
                  <article>{{item.comment}}</article>
                </div>
              </div>
            </li>
          </ul>

          <div class="am-u-lg-12 am-cf">
            <div class="am-fr">
              <pagination v-bind:total="total" v-bind:pageNo="pageNo" v-bind:pageSize="pageSize"
                          @paging="loadTableData"/>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<style>
  .left-margin {
    margin-left: 5%;
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
        order: [],
        pageNo: 1,
        pageSize: 5,
        total: 0,
        commentData: [],
        num:null
      }
    },
    components: {
      Pagination
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      var orderItemId = this.$params("orderItemId")
      this.loadOrderItemData(orderItemId);
    },
    methods: {
      loadOrderItemData: function (orderItemId) {
        var _this = this
        _this.orderItemId = orderItemId
        io.post(io.apiAdminOrderItemDetail, {orderItemId: _this.orderItemId}, function (ret) {
          if (ret.success) {
            _this.tableData = ret.data
            _this.num = parseInt(_this.tableData.status)+1
            _this.order = ret.data.order
            _this.loadTableData(_this.pageNo)
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        _this.productId = _this.tableData.productId
        io.post(io.apiAdminCommentList, {
          productId: _this.productId,
          pageNo: _this.pageNo,
          pageSize: _this.pageSize
        }, function (ret) {
          if (ret.success) {
            _this.commentData = ret.data.list
            _this.total = ret.data.total
          } else {
            _this.$alert(ret.desc)
          }
        })
      }
    }
  }
</script>
