<template>
  <div class="am-modal am-modal-loading am-modal-no-btn" tabindex="-1" :id="id">
    <div class="am-modal-dialog">
      <div class="am-modal-hd">正在处理...</div>
      <div class="am-modal-bd">
        <span class="am-icon-spinner am-icon-spin"></span>
      </div>
    </div>
  </div>
</template>
<style scoped>

</style>
<script>

    export default {
      name: 'loading',
      mounted:function(){
      },
      methods: {
        show: function(){
          $('#'+this.id).modal({
            closeViaDimmer : false,
            closeOnConfirm : false
          })
        },
        close: function(){
           $('#'+this.id).modal('close')
        }
      }
    }

</script>
