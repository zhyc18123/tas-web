<template>
  <div class="m-character-list-container">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'character-list',
  components: {
  },
  data() {
    return {
      msg: ''
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.m-character-list-container {}
</style>
