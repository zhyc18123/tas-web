<template>
  <div class="date-time-picker"><slot></slot></div>
</template>
<style>

  body .bootstrap-datetimepicker-widget{
    z-index: 14000;
  }

</style>
<script>

  require('amazeui-datetimepicker-se/dist/amazeui.datetimepicker-se.css')
  require('amazeui-datetimepicker-se')

    export default{
        name:'date-time-picker',
        props:['value' , 'format'],
        watch:{
          value:function(val){
            $('[data-am-datetimepicker]',this.$el ).val(val)
          }
        },
        mounted:function(){
          var _this = this
          $('[data-am-datetimepicker]',this.$el ).datetimepicker({format: this.format}).on('dp.change',function(){
             _this.$emit('input',$(this).val())
          })
        }

    }
</script>
