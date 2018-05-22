<template>
  <div class="personal-container">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'personal-container',
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
</style>
