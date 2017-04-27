<template>
  <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
    <div class="am-u-sm-12 am-scrollable-horizontal">
      <div class="am-u-sm-12 am-text-left am-margin-top-sm" v-if="tableData.type==0">商品信息</div>
      <div class="am-u-sm-12 am-text-left am-margin-top-sm" v-if="tableData.type==1">服务信息</div>
      <div class="am-u-sm-12 am-text-left am-margin-top-sm" v-if="tableData.type==2">租赁信息</div>

      <div class="am-u-sm-12 am-text-left">
        <el-steps :space="100" :active="num">
          <el-step title="退费申请"></el-step>
          <el-step title="申请确认"></el-step>
          <el-step title="退费审批完成"></el-step>
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
            <span v-model="formData.productName">
              {{tableData.productName}}
            </span>
          </div>

          <div class="am-u-sm-12 am-center">
            <span>商家名称：</span>
            <span v-model="formData.userName">
              {{tableData.sellerName}}
            </span>
          </div>

          <div class="am-u-sm-12" v-if="tableData.type!=2">
            <span>数量：</span>
            <span v-model="formData.quantity">
              {{tableData.quantity}}
            </span>
          </div>
          <div class="am-u-sm-12" v-else="tableData.type!=2">
            <span>租赁时长：</span>
            <span v-model="formData.rentSpan">
              {{tableData.rentSpan}}小时
            </span>
          </div>
          <div class="am-u-sm-12" v-if="tableData.type==2">
            <span>租赁时间：</span>
            <span>{{tableData.startDate}}~{{tableData.endDate}} {{tableData.startTime}}-{{tableData.endTime}}</span>
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
          <span>退费原因：{{tableData.reason}}</span>
        </div>
      </div>

      <div class="am-g">
        <div class="am-u-sm-12 am-text-left">
          <span>退费说明：{{tableData.description}}</span>
        </div>
      </div>

      <div class="am-g" v-if="tableData.status==0">
        <div class="am-u-sm-12 am-text-left">
          <span>审批状态：</span>
          <label class="am-checkbox-inline">
            <input type="radio" value="1" name="reason" v-model="formData.status"> 已处理
          </label>
          <label class="am-checkbox-inline">
            <input type="radio" value="2" name="reason" v-model="formData.status"> 已拒绝
          </label>
        </div>

      </div>

      <div class="am-g" v-if="tableData.status!=0">
        <div class="am-u-sm-12 am-text-left">
          <span>审批状态：{{tableData.status==1?'已处理':'已拒绝'}}</span>
        </div>
      </div>

      <div class="am-g" v-if="tableData.status==0">
        <div class="am-u-sm-2 am-text-left">
          <span>审批说明：</span>
        </div>
        <div class="am-u-sm-12  am-text-left">
          <textarea v-model="formData.returnResult"></textarea>
        </div>
      </div>

      <div class="am-g" v-if="tableData.status!=0">
        <div class="am-u-sm-12 am-text-left">
          <span>审批说明：{{tableData.returnResult}}</span>
        </div>
      </div>

      <div class="am-u-sm-12 am-text-center am-margin-top-lg">
        <button type="button" class="am-btn am-btn-primary" @click="confirm(formData)" v-if="tableData.status==0">提交审批
        </button>
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

  .left-margin {
    margin-left: 10%;
  }

  .font-style {
    text-align: center;
  }
</style>

<script>
  import io from '../../lib/io'

  import Pagination from '../base/Pagination'

  export default{
    data: function () {
      return {
        tableData: [],
        formData: [],
        num:null
      }
    },
    props: ['orderItemId'],
    created: function () {
      /*var orderItemId = this.$params('orderItemId')
       this.loadTableData(orderItemId);*/
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
          _this.orderItemId = orderItemId
          io.post(io.apiAdminGetOrderItemRefundDetail, {orderItemId: _this.orderItemId},
            function (ret) {
              if (ret.success) {
                _this.tableData = ret.data
                _this.formData.price = _this.tableData.price
                _this.formData.type = _this.tableData.type
                _this.formData.status = _this.tableData.status
                _this.num = parseInt(_this.tableData.status)+1
                _this.formData.returnResult = _this.tableData.returnResult
                _this.formData.serviceProductRefundId = _this.tableData.serviceProductRefundId
                _this.formData.createTime = ''
                _this.formData.updateTime = ''
              } else {
                _this.$alert(ret.desc)
              }
            })
        }
      },
      confirm: function (formData) {
        var _this = this
        io.post(io.apiAdminSaveOrUpdateProductRefund, $.extend({}, formData),
          function (ret) {
            if (ret.success) {
              _this.$alert('已接受退款申请')
              _this.$root.$emit('sellerOrderList:new')
            } else {
              _this.$alert('申请失败')
            }
          })
        _this.$emit('productApproval')
      }
    }
  }


</script>

