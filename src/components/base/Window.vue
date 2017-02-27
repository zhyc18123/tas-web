<template>
  <div class="am-modal" tabindex="-1" :id="id">
    <div class="am-modal-dialog">
      <div class="am-modal-hd">{{title}}
        <a href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close>&times;</a>
      </div>
      <div class="am-modal-bd" >
        <slot></slot>
        <slot name="body"></slot>
      </div>
      <div class="am-modal-footer" v-if="$slots.footer" >
        <slot name="footer">

        </slot>
      </div>
    </div>
  </div>
</template>
<style scoped>

</style>
<script>

    export default {
      name: 'window',
      props:['title'],
      data: function(){
        return {
          id: 'window-' + (new Date().getTime())
        }
      },
      mounted:function(){
        const $modal = $("#"+ this.id ) ;
        $modal.on('opened.modal.amui',function(){
          $modal.off('click.close.modal.amui').on('click.close.modal.amui','[data-am-modal-close]' ,function(e){
            e.preventDefault();
            $modal.modal('close')
          })
        })
      },
      methods: {
        show: function(option){
          option = option || {}
          option.closeViaDimmer = false
          option.closeOnConfirm = false
          $('#'+this.id).modal(option);
        },
        close: function(){
           $('#'+this.id).modal('close')
        }
      }
    }

</script>
