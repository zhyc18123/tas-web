<template>
  <div class="m-title">
    <span class="theme">{{ this.theme }}</span>
    <p class="info">{{ this.info }}</p>
  </div>
</template>

<script>
  export default {
    name: 'title',
    props: ["theme", "info"]
  }
</script>

<style lang="less" scoped>
  .m-title {
    margin: 20px 0;
    text-align: center;
    .theme {
      border-bottom: 4px solid #00a7eb;
      padding-bottom: 12px;
      font-size: 20px;
      color: #666;
    }
    .info {
      margin-top: 15px;
      border-top: 1px solid #eeeeee;
      padding-top: 17px;
      color: #999;
      font-size: 16px;
    }
  }
</style>
