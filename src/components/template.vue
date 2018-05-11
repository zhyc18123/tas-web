<template>
  <el-row  class="question-bank">
      <el-col :span="20" :offset="2">
      
      </el-col>
  </el-row>
</template>

<script>

  export default {
    name: 'question-bank',
    components:{
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
  .question-bank {
    // height: 100%;
    height: 200px;
    background: white;
  }
</style>
