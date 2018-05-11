<template>
  <div class="m-head header-container">
    <div class="header">
      <span class="cart"><router-link to="/main/goodsOrder">我的购物车 &nbsp;|&nbsp;</router-link></span>
      <span class="order"><router-link to="/main/user/buy">&nbsp;&nbsp;我的订单 &nbsp;|&nbsp;</router-link></span>
      <span class="info"><router-link to="/info">关于我们</router-link></span>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="less" scoped>
  .header-container {
    background-color: #f5f5f5 ;
    color: #999;
    font-size: 14px;

    .header {
      width: 1200px;
      position: relative;
      height: 30px;
      line-height: 30px;
      margin: 0 auto;
      text-align: right;

      .user {
        font-size: 14px;
        color: #999;
      }

      .cart {
        margin-left: 25px;
        font-size: 14px;
        color: #999;
      }
    }
  }
</style>
