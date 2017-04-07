<template>
  <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
    <div class="am-u-sm-12 am-scrollable-horizontal">
      <div class="am-u-sm-12 am-text-left am-margin-top-sm bold-font">退费信息</div>
      <table width="100%" class="am-table am-table-bordered am-table-compact ">
        <tbody>
        <tr>
          <td class="bgColor">用户姓名：</td>
          <td>{{}}</td>
          <td class="bgColor">商品名称：</td>
          <td>{{}}</td>
        </tr>
        <tr>
          <td class="bgColor">商品数量：</td>
          <td>{{}}</td>
          <td class="bgColor">退费金额：</td>
          <td>{{}}</td>
        </tr>
        <tr>
          <td class="bgColor">退费原因：</td>
          <td>{{}}</td>
        </tr>
        </tbody>
      </table>

    </div>

    <div class="am-u-sm-12 am-text-left am-margin-top-sm bold-font">
      退费方式:
      <span class="red">支付宝</span>
      <span class="red">微信</span>
      <span class="red" >现金</span>
      <span class="red">余额账户</span>
      <span class="red">银行卡转账</span>
    </div>

    <div class="am-u-sm-12 am-text-left am-margin-top-sm">
      <label class="am-radio-inline">
        转账银行<input type="text">
      </label>
      <label class="am-checkbox-inline">
        银行开户城市<input type="text" >
      </label>
      <label class="am-checkbox-inline">
        姓名<input type="text" >
      </label>
      <label class="am-checkbox-inline">
        转账账号<input type="text" >
      </label>
    </div>

    <div class="am-u-sm-12 am-text-left am-margin-top-sm bold-font">审批状态</div>
    <div class="am-u-sm-12 am-text-left am-margin-top-sm">
      <label class="am-radio-inline">
        处理中<input type="radio" value="0" name="status">
      </label>
      <label class="am-checkbox-inline">
        已处理<input type="radio" value="1" name="status">
      </label>
      <label class="am-checkbox-inline">
        已拒绝<input type="radio"  value="2" name="status">
      </label>
    </div>

    <div class="am-u-sm-12 am-text-left am-margin-top-sm bold-font">
      <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>审批详情
    </div>
    <textarea required ></textarea>

    <div class="am-u-sm-12 am-text-center am-margin-top-lg">
      <button type="button" class="am-btn am-btn-primary" @click="confirmToRefund">确定</button>
      <a href="javascript:void(0)" data-am-modal-close>
        <button class="am-btn am-btn-primary">取消</button>
      </a>
    </div>

  </form>

</template>
<style>
  .bold-font {
    font-weight: bold;
  }

  .bgColor {
    background-color: #eee;
    text-align: center;
  }
  .red{
    color: red;
  }
</style>

<script>
  import io from '../../lib/io'

  import Pagination from '../base/Pagination'

  export default{
    data: function () {
      return {

      }
    },
    components: {},
    props: [''],
    created: function () {

    },
    watch: {},
    mounted: function () {
      $(window).smoothScroll()
    },
    computed: {},
    methods: {
      loadTableData: function () {
        var _this = this

      },
      confirmToRefund: function () {
        var _this = this
        _this.$emit('changeProductRefund')
      }
    }
  }


</script>
