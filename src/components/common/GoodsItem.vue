<template>
  <div :class="containerClass" :type="type">
    <router-link class="row" :to="to" tag="div">
      <img :src='imageUrl'>
      <div class="detail">
        <h4>{{ productName }}</h4>
        <p>分类：{{ categoryName }}</p>
        <p>商家：{{ sellerName }}</p>
        <p v-if="city" class="volume">{{ city }} &nbsp; {{district}}</p>
        <p v-if="address" class="volume">地址：{{ address }}</p>
        <p class="volume">该款月成交 <span>{{ amount }}</span> 笔</p>
        <div class="prize">
          ¥{{ unitPrice }} <span>/ {{ unit }}</span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
  export default {
      props: ["to","containerClass","type","imageUrl", "productName","sellerName","categoryName","unitPrice","unit", "amount","address","city","district"]
  }
</script>

<style lang="less" scope>
  [type=small-row] {
    .row {
      width: 570px;
      height: 190px;
      padding: 15px;
      background-color: #f9fafc;
      font-size: 14px;
      color: #666;
      cursor: pointer;
      box-sizing: border-box;
    }
    img {
      width: 240px;
      height: 160px;
    }
    .detail {
      width: 270px;
      padding: 0 10px;
      height: 160px;
      float: right;
      position: relative;
      h4 {
        font-size: 18px;
        color: #333;
        margin-top: 0;
        min-height: 45px;
        overflow-wrap: break-word;
      }
      p {
        font-size: 14px;
        color: #666;
        margin-bottom: 5px;
        line-height: 18px;
      }
      .volume {
        margin-top: 31px;
        color: #999 !important;
        span{
          color: #e83421;
        }
      }
      .prize {
        position: absolute;
        right: -25px;
        bottom: 0;
        height: 16px;
        line-height: 16px;
        text-align: center;
        padding: 7px 8px;
        background-color: #f67811;
        color: #fff;
        font-size: 24px;
        font-weight: bold;
        span{
          font-size: 16px;
        }

        &::after{
          content: '';
          width: 0;
          height: 0;
          border-top: 15px solid transparent;
          border-right: 15px solid #f67811;
          border-bottom: 15px solid transparent;
          position: absolute;
          bottom: 0;
          left: -15px;
          top: 0;
        }
        &::before {
          content: '';
          width: 0;
          height: 0;
          border-top: 10px solid #de6d10;
          border-right: 10px solid transparent;
          position: absolute;
          bottom: -10px;
          right: 0;
        }
      }
    }
  }
  [type=large-row] {
    .row {
      height: 208px;
      font-size: 14px;
      color: #666;
      padding: 22px 15px;
      border-top: 1px dashed #ddd;
      box-sizing: border-box;
    }
    img {
      width: 240px;
      height: 160px;
    }
    .detail {
      width: 843px;
      padding: 0 10px;
      height: 160px;
      float: right;
      position: relative;
      h4 {
        font-size: 18px;
        color: #333;
      }
      p {
        font-size: 14px;
        color: #666;
        margin-bottom: 5px;
      }
      .volume {
        margin-top: 31px;
        color: #999 !important;
      }
      .prize {
        position: absolute;
        right: -27px;
        bottom: 0;
        width: 132px;
        height: 16px;
        text-align: center;
        padding: 12px 0;
        font-size: 16px;
        background-color: #f67811;
        color: #fff;

        &:after{
          width: 0;
          height: 0;
          border-top: 20px solid transparent;
          border-right: 20px solid #f67811;
          border-bottom: 20px solid transparent;
          position: absolute;
          bottom: 0;
          left: -20px;
          top: 0;
        }
        &:before {
          width: 0;
          height: 0;
          border-top: 12px solid #de6d10;
          border-right: 12px solid transparent;
          position: absolute;
          bottom: -12px;
          right: 0;
        }
      }
    }
  }
</style>
