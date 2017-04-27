<template>
  <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
    <div class="am-u-sm-12 am-scrollable-horizontal">
      <div class="am-u-sm-12 am-text-left am-margin-top-sm" v-if="tableData.type==0">商品信息</div>
      <div class="am-u-sm-12 am-text-left am-margin-top-sm" v-if="tableData.type==1">服务信息</div>
      <div class="am-u-sm-12 am-text-left am-margin-top-sm" v-if="tableData.type==2">租赁信息</div>

      <div class="am-u-sm-12 am-text-left">
        <el-steps :space="100" :active="1">
          <el-step title="退费申请"></el-step>
          <el-step title="申请确认"></el-step>
          <el-step title="退费成功"></el-step>
        </el-steps>
      </div>

      <div class="am-g">
        <div class="am-u-sm-3">
          <div class="am-u-sm-4">
            <img class="am-radius" :src="tableData.imageUrl" width="180"
                 height="100"/>
          </div>
        </div>

        <div class="am-u-sm-9 am-text-left">
          <div class="am-u-sm-12">
            <span>
              {{tableData.productName}}
            </span>
          </div>

          <div class="am-u-sm-12 am-center">
            <span>商家名称：</span>
            <span>
              {{tableData.sellerName}}
            </span>
          </div>

          <div class="am-u-sm-12" v-if="tableData.type==2">
            <span>租赁时长：</span>
            <span>
              {{tableData.rentSpan}}
            </span>
          </div>

          <div class="am-u-sm-12" v-if="tableData.type==2">
            <span>租赁时间：</span>
            <span>{{tableData.startDate}}~{{tableData.endDate}} {{tableData.startTime}}-{{tableData.endTime}}</span>
          </div>

          <div class="am-u-sm-12" v-if="tableData.type!=2">
            <span>数量：</span>
            <span>
              {{tableData.quantity}}
            </span>
          </div>

          <div class="am-u-sm-12">
            <span>合计：￥</span>
            <span>{{tableData.price}}</span>
          </div>
        </div>

      </div>

      <div class="am-u-sm-12 am-text-left">
        <span class="red">退费金额：￥
          <span>{{tableData.price}}</span>
        </span>
      </div>

      <div class="am-g">
        <div class="am-u-sm-12 am-text-left">
          <span>退费原因：</span>
          <label class="am-radio-inline">
            <input type="radio" value="商品质量问题" name="reason" v-model="formData.reason"> 商品质量问题
          </label>
          <label class="am-checkbox-inline">
            <input type="radio" value="个人原因" name="reason" v-model="formData.reason"> 个人原因
          </label>
          <label class="am-checkbox-inline">
            <input type="radio" value="无条件退款" name="reason" v-model="formData.reason"> 无条件退款
          </label>
        </div>
      </div>

      <div class="am-g">
        <div class="am-u-sm-2 am-text-left">
          <span>退费说明：</span>
        </div>
        <div class="am-u-sm-12  am-text-left">
          <textarea v-model="formData.description"></textarea>
        </div>
      </div>

      <div class="am-u-sm-12 am-text-center am-margin-top-lg">
        <button type="button" class="am-btn am-btn-primary" @click="confirmRefund(formData)">提交退费申请</button>
        <a href="javascript:void(0)" data-am-modal-close>
          <button class="am-btn am-btn-primary">取消</button>
        </a>
      </div>

    </div>
  </form>

</template>

<style>
  .red {
    color: red;
  }
</style>

<script>
  import io from '../../lib/io'

  import Pagination from '../base/Pagination'

  export default{
    data: function () {
      return {
        tableData: [],
        formData: {
          returnResult: '',
        }
      }
    },
    props: ['orderItemId'],
    created: function () {
      this.loadTableData(this.orderItemId)
    },
    watch: {
      orderItemId: function (val) {
        this.loadTableData(val)
      }
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    methods: {
      loadTableData: function (orderItemId) {
        var _this = this
        if (orderItemId) {
          io.post(io.apiAdminOrderItemDetail, {orderItemId: orderItemId},
            function (ret) {
              if (ret.success) {
                _this.tableData = ret.data
                _this.formData.price = _this.tableData.price
                _this.formData.orderItemId = orderItemId
                _this.formData.orderId = _this.tableData.orderId
                _this.formData.productId = _this.tableData.productId
                _this.formData.productName = _this.tableData.productName
                _this.formData.sellerId = _this.tableData.busTeamId
                _this.formData.sellerrName = _this.tableData.busTeamName
                _this.formData.type = _this.tableData.type
                _this.formData.quantity = _this.tableData.quantity
                _this.formData.startDate = _this.tableData.startDate
                _this.formData.endDate = _this.tableData.endDate
                _this.formData.startTime = _this.tableData.startTime
                _this.formData.endTime = _this.tableData.endTime
                _this.formData.rentSapn = _this.tableData.rentSapn
                _this.formData.imageUrl = _this.tableData.imageUrl
                _this.formData.reason = '无条件退款'
                _this.formData.description = ''
              } else {
                _this.$alert(ret.desc)
              }
            })
        }
      },
      confirmRefund: function (formData) {
        var _this = this
        io.post(io.apiAdminSaveOrUpdateProductRefund, $.extend({}, formData),
          function (ret) {
            if (ret.success) {
              _this.$alert('已接受退款申请')
              _this.$root.$emit('orderList:new')
            } else {
              _this.$alert('申请失败')
            }
          })
        _this.$emit('refundApply')
      }
    }
  }


</script>
