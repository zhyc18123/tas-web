<template>
  <div class="widget am-cf">
    <div class="widget-body">
      <div class="tpl-page-state">
        <div class="tpl-page-state-title am-text-center tpl-error-title">404</div>
        <div class="tpl-error-title-info">Page Not Found</div>
        <div class="tpl-page-state-content tpl-error-content">

          <p>对不起,没有找到您所需要的页面,可能是URL不确定,或者页面已被移除。</p>
          <button type="button" class="am-btn am-btn-secondary am-radius tpl-error-btn" @click="toBack">Back Home</button></div>

      </div>
    </div>
  </div>
</template>
<style scoped>

</style>
<script>

    export default{
        name:'not-found',
        methods:{
            toBack:function () {
                this.$router.push({path:'/main/index'})
            }
        }
    }
</script>
