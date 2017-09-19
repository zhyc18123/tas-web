<template>
  <div class="am-modal" tabindex="-1" :id="id">
    <div class="am-modal-dialog">
      <div class="am-modal-hd">{{title}}
        <a href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close>&times;</a>
      </div>
      <div class="am-modal-bd am-cf" style="border-bottom: 0px solid #dedede" >
        <slot></slot>
        <slot name="body"></slot>
      </div>
      <div class="am-modal-footer am-cf" v-if="$slots.footer">
        <slot name="footer">

        </slot>
      </div>
    </div>
  </div>
</template>
<style scoped>

  .am-modal-footer{
    height: 48px ;
    border-top: 1px solid #dedede;
    border-collapse: unset ;
    padding-top: 4px ;
  }

</style>
<script>

    export default {
      name: 'window',
      props:['title'],
      mounted:function(){
        var _this = this
        const $modal = $("#"+ this.id ) ;
        $modal.on('opened.modal.amui',function(){
          $modal.off('click.close.modal.amui').on('click.close.modal.amui','[data-am-modal-close]' ,function(e){
            e.preventDefault();
            $modal.modal('close')
          })
          if(!$modal.parent().is($('#_windowSlot'))){
            $('#_windowSlot').append($modal)
          }

          //$('.am-modal-bd',$modal).height( ($('.am-modal-dialog',$modal).height() - 68  ) )
        })

        $modal.on('closed.modal.amui',function(){
          _this.$emit('close')
        })


      },
      methods: {
        show: function(option){
          option = option || {}
          delete option.height
          option.closeViaDimmer = false
          option.closeOnConfirm = false
          //option.dimmer = false
          $('#'+this.id).modal(option)
        },
        close: function(){
           $('#'+this.id).modal('close')
        }
      }
    }

</script>
