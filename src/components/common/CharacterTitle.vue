<template>
  <div class="title">
    <svg class="icon" aria-hidden="true">
      <use :xlink:href="'#' + icon"></use>
    </svg>
    <span>{{name}}</span>
  </div>
</template>

<script>

  export default {
    name: 'character-title',
    components:{
    },
    props:['icon','name']
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    vertical-align: middle;
    background-color: #e9f8fb;
    margin-top: 10px;
    text-align: left;
    svg {
      fill: #00b1d1;
      margin: 0 3px 0 22px;
      font-size: 18px;
    }
    span {

    }
  }
</style>

