<template>
  <div>
    <h2 class="title">支付成功</h2>
    <button type="button" class="am-btn am-btn-primary am-btn-block confirm" @click="more">查看更多课程</button>

  </div>
</template>
<style>
  .title {
    height: 46px;
    line-height: 46px;
    text-align: center;
    background: #e4e4e4;
    margin: 0;
  }

</style>
<script>


  export default{
    data(){
      return {}
    },
    methods:{
      more:function () {
        location.href = 'http://y.yuyou100.com/c/h5/index.html'
      }
    }
  }
</script>
