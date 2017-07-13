<template>
  <div class="am-modal am-modal-prompt" tabindex="-1" :id="id">
    <div class="am-modal-dialog">
      <div class="am-modal-hd">{{title}}</div>
      <div class="am-modal-bd">
        {{msg}}
        <input type="text" class="am-modal-prompt-input" v-model="defaultValue">
      </div>
      <div class="am-modal-footer">
        <span class="am-modal-btn" data-am-modal-cancel>取消</span>
        <span class="am-modal-btn" data-am-modal-confirm>提交</span>
      </div>
    </div>
  </div>
</template>
<style scoped>

</style>
<script>

    export default {
      name: 'prompt',
      data: function(){
        return {
          title:'提示',
          msg : '',
          defaultValue:''
        }
      },
      mounted:function(){

      },
      methods: {
        show: function(msg,defaultValue,confirm,cancel){
          this.msg  = msg
          this.defaultValue = defaultValue
          $('#'+this.id).modal({
            relatedTarget: this,
            onConfirm: function(options) {
              if(confirm){
                const input = options.data || ''
                confirm(input)
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
