<template>
  <div class="main">
    <el-row class="main-container">
      <v-nav ref="nav" />

      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
      <v-footer/>
    </el-row>
  </div>
</template>

<script>
import VNav from './common/Nav.vue'
import VFooter from './common/Footer.vue'
import { mapState,mapActions } from 'vuex'

export default {
  name: 'v-main',
  components: {
    VNav,
    VFooter
  },
  created () {
    this.config()
  },
  beforeUpdate () {
    this.config()
  },
  computed: {
    // ...mapState({configObj:state=>state.global.config})
  },
  data() {
    return {
      msg: ''
    }
  },
  methods: {
    ...mapActions(['config'])
  }
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
<style lang="stylus">
@import '~assets/stylus/mixin.styl'
  
</style>

