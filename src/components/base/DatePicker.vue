<template>
  <div><slot></slot></div>
</template>
<style scoped>

</style>
<script>
    export default{
        name:'date-picker',
        props:['value'],
        watch:{
          value:function(val){
            $('[data-am-datepicker]',this.$el ).val(val)
          }
        },
        mounted:function(){
          var _this = this
          $('[data-am-datepicker]',this.$el ).datepicker().on('change',function(){
             $(this).val($(this).attr('value'))
             _this.$emit('input',$(this).val())
          })

          if(this.value){
            $('[data-am-datepicker]',this.$el ).val(this.value)
          }
        }

    }
</script>
