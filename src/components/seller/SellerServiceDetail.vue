<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title am-fl">服务订单信息</div>
          <div class="widget-function am-fr">
            <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
          </div>
        </div>

        <div class="am-u-sm-12">
          <el-steps :space="100" :active="num">
            <el-step title="下单"></el-step>
            <el-step title="已支付"></el-step>
            <el-step title="商家开始工作"></el-step>
            <el-step title="服务确认"></el-step>
            <el-step title="退费"></el-step>
            <el-step title="评价"></el-step>
          </el-steps>
        </div>

        <table width="100%" class="am-table am-table-bordered am-table-compact am-table-hover" v-if="tableData!=null">
          <tbody>
          <tr>
            <td>购买类型：服务</td>
            <td>订单编号：{{tableData.sn}}</td>
          </tr>
          <tr>
            <td>买家姓名：{{tableData.userName}}</td>
            <td>订单状态：{{tableData.status==0?'未支付':(tableData.status==1?'已支付':(tableData.status==2?'取消订单':'退费中的订单'))}}</td>
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

              <div class="am-u-sm-12" v-for="item in itemList" :key="item.orderItemId">
                <div class="am-g">
                  <div class="am-u-sm-3">
                    <div class="am-u-sm-4">
                      <img class="am-radius" :src="item.imageUrl" width="180"
                           height="100"/>
                    </div>
                  </div>

                  <div class="am-u-sm-4 am-text-left">
                    <div class="am-u-sm-12">
                      <span>商品名称：</span>
                      <span>
                      {{item.productName}}
                    </span>
                    </div>

                    <div class="am-u-sm-12">
                      <span>商家名称：</span>
                      <span>
                      {{item.busTeamName}}
                    </span>
                    </div>

                    <div class="am-u-sm-12">
                      <span>单价：</span>
                      <span>
                      {{item.unitPrice}}
                    </span>
                    </div>

                    <div class="am-u-sm-12">
                      <span>数量：</span>
                      <span>
                      {{item.quantity}}
                    </span>
                    </div>

                    <div class="am-u-sm-12">
                      <span>合计：￥</span>
                      <span>{{item.price}}</span>
                    </div>
                  </div>

                  <div class="am-u-sm-5">
                    <span>具体要求：</span>
                    <article v-html="item.content"></article>
                  </div>
                </div>

                <div class="am-u-sm-12">
                  <span>联系方式：</span>
                  <span>{{item.phoneNo}}</span>
                </div>

                <!--<div class="am-u-sm-12">
                  <span>附件：</span>
                  <span></span>
                </div>-->
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
                      <span>服务态度：</span>
                      <label>
                        <el-rate v-model="item.serviceAttitude" disabled></el-rate>
                      </label>
                      <span>工作效率：</span>
                      <label>
                        <el-rate v-model="item.workEfficiency" disabled></el-rate>
                      </label>
                      <span>完成质量：</span>
                      <label>
                        <el-rate v-model="item.completeQuality" disabled></el-rate>
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
                              @paging="loadCommentData"/>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .left-margin {
    margin-left: 2%;
  }
</style>

<script>
  import io from '../../lib/io'

  import Pagination from '../base/Pagination'

  export default{
    data: function () {
      return {
        tableData: [],
        itemList: [],
        address: [],
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
      var orderId = this.$params("orderId")
      this.loadTableData(orderId);
    },
    methods: {
      loadTableData: function (orderId) {
        var _this = this
        io.post(io.apiAdminProductOrderDetail, {orderId: orderId}, function (ret) {
          if (ret.success) {
            _this.tableData = ret.data.serviceOrder
            _this.itemList = ret.data.itemList
            _this.num = parseInt(_this.itemList[0].status)+2
            _this.loadCommentData(_this.pageNo)
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      loadCommentData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        _this.productId = _this.itemList[0].productId
        io.post(io.apiAdminCommentList, {
          productId: _this.productId,
          pageNo: _this.pageNo,
          pageSize: _this.pageSize
        }, function (ret) {
          if (ret.success) {
            _this.commentData = ret.data.list
            _this.total = ret.data.total
          }
        })
      }
    }
  }
</script>
