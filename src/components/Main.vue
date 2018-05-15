<template>
  <div class="main">
    <el-row class="main-container">
    <v-nav ref="nav" />
      <router-view ></router-view>
    <v-footer/>
    </el-row>
  </div>
</template>

<script>
  import VNav from './common/Nav.vue'
  import VFooter from './common/Footer.vue'

  export default {
    name: 'v-main',
    components:{
      VNav,
      VFooter
    },
    data() {
      return {
        msg: ''
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .main {
    min-height: 100%;
    height: 100%;
    .main-container {
      width: 100%;
      background-color: #f5f8f9;
      min-height: 100%;
      // height: 100%;
      .container{
        width: 80%;
        box-sizing: border-box;
        min-width: 1200px;
        margin: auto;
      // min-height: 1000px;
      }
    }
  }
</style>
