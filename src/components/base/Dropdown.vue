<template>
  <div>
    <slot></slot>
  </div>
</template>
<style scoped>

</style>
<script>
    export default{
        name:'dropdown',
        mounted:function(){
          var _this = this
          $('[data-am-dropdown]',this.$el ).dropdown()
        }

    }
</script>
