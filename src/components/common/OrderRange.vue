<template>
  <div class="order-range">
      <span class="span">
      <span class="long"></span>
      <span class="active"></span>
      <span class="circle cActive c1">1</span>
      <span class="out-circle out1"></span>
      <span class="circle cEnd c2">2</span>
      <span class="out-circle out2"></span>
      <span class="circle c3">3</span>
      <span class="out-circle out3"></span>
      <span class="circle c4">4</span>
      <span class="out-circle out4"></span>
      <span class="circle c5">5</span>
      <span class="out-circle out5"></span>
</span>
  </div>
</template>

<script>
  import io from '../../lib/io'

  export default {
    name: 'order-range',
    components:{
    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    created() {
    //   this.test();
    },
    methods: {
    //   test() {
    //     io.post(io.cartNum, {a:"d"}, (data) => {
    //       console.log(data)
    //     })
    //   }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.status{
    width: auto;
}
.order-range{
    position: relative;
    span{
        display: inline-block;
        &.span{
            width: 100%;
            height: 12px;
            position: relative;
            top: 25px;
        }
        &.long{
            width: 100%;
            height: 16px;
            position: absolute;
            top: -2px;
            z-index: 2;
            background: #e2e2e2;
            border-radius: 4px;
        }
        &.active{
            height: 8px;
            top: 2px;
            position: absolute;
            width: 30%;
            background: #addf3d;
            z-index: 3;
        }
        &.circle{
            position: absolute;
            height: 40px;
            width: 40px;
            border-radius: 40px;
            background: #c5c5c5;
            top: -14px;
            text-align: center;
            line-height: 40px;
            margin-left: -20px;
            z-index: 4;
            font-size: 26px;
            font-weight: bold;
            color: white;
            box-shadow:0 0 2px white;
        }
        &.cActive{
            background: #addf3d;
        }
        &.cEnd{
            background: #ffd24f;
        }
        &.out-circle{
            position: absolute;
            height: 50px;
            width: 50px;
            border-radius: 50px;
            top: -19px;
            box-sizing: border-box;
            margin-left: -25px;
            background: #e2e2e2;
            z-index: 1;
        }
        &.c1,&.out1{
            left: 10%;
        }
        &.c2,&.out2{
            left: 30%;
        }
        &.c3,&.out3{
            left: 50%;
        }
        &.c4,&.out4{
            left: 70%;
        }
        &.c5,&.out5{
            left: 90%;
        }
    }
}
</style>
