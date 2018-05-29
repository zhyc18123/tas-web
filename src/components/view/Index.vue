<template>
  <div class="index">
    <v-nav />
    <div class="welcome">
      教学平台欢迎您！
    </div>
  </div>
</template>

<script>
import VNav from '../common/Nav.vue'
import {mapGetters} from 'vuex'

export default {
  name: 'index',
  components: {
    VNav,
  },
    computed: {...mapGetters(['loginSuccess'])},

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

.index {
  .welcome {
    margin-top: 100px;
    text-align: center;
    font-size: 18px;
  }
}
</style>
