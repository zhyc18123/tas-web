<template>
  <div class="am-modal am-modal-alert" tabindex="-1" :id="id">
    <div class="am-modal-dialog">
      <div class="am-modal-hd">{{title}}</div>
      <div class="am-modal-bd" v-html="content">

      </div>
      <div class="am-modal-footer">
        <span class="am-modal-btn">确定</span>
      </div>
    </div>
  </div>
</template>
<style scoped>

</style>
<script>

    export default {
      name: 'alert',
      data: function(){
        return {
          title:'提示',
          content : ''
        }
      },
      methods: {
        show: function(title,content){
          this.title = title
          this.content  = content
          $('#'+this.id).modal('open')
        }
      }
    }

</script>
