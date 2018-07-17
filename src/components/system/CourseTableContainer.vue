<template>
  <div class="m-user-list-container">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'class-list',
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
.m-user-list-container {}
</style>
