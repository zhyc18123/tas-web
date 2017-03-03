<template>
  <div class="am-modal am-modal-confirm" tabindex="-1" :id="id">
    <div class="am-modal-dialog">
      <div class="am-modal-hd">{{title}}</div>
      <div class="am-modal-bd">
        {{msg}}
      </div>
      <div class="am-modal-footer">
        <span class="am-modal-btn" data-am-modal-cancel>取消</span>
        <span class="am-modal-btn" data-am-modal-confirm>确定</span>
      </div>
    </div>
  </div>
</template>
<style scoped>

</style>
<script>

    export default {
      name: 'confirm',
      data: function(){
        return {
          title:'提示',
          msg : ''
        }
      },
      mounted:function(){

      },
      methods: {
        show: function(msg,confirm,cancel){
          this.msg  = msg
          $('#'+this.id).modal({
            relatedTarget: this,
            onConfirm: function(options) {
              if(confirm){
                confirm()
              }
            },
            onCancel: function() {
              if(cancel){
                cancel()
              }
            }
          });
        }
      }
    }

</script>
