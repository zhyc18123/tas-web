<template>
<div class="footer-div">
  <div class="footer">
    <p>誉优品学 | 咨询电话： 020-34401000</p>
    <p>&copy; Copyright 卓越教育版权所有 1997-2018 All Rights reserved 粤ICP备12020224</p>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'v-footer'
  }
</script>

<style lang="less" scoped>
.footer-div{
  height: 80px;
  background: transparent;
}
  .footer {
    text-align: center;
    height: 40px;
    // background-color: #f5f8f9;
    font-size: 12px;
    padding: 20px 0;
    clear: both;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 11;
    p {
      margin: 7px 0;
    }
  }
</style>
