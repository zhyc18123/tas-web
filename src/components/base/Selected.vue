<template>
  <div><slot></slot></div>
</template>
<style scoped >

</style>
<script>
    export default{
        name:'selected',
        props:['value'],
        mounted:function(){
          this.initSelected()
        },
        watch:{
          value:function(val){
            this.setSelect(val)
          }
        },
        methods:{
          setSelect:function(val){
            $('[data-am-selected]' , this.$el).find('option[value='+val+']').attr('selected', true).trigger('changed.selected.amui');
          },
          initSelected:function(){
            var _this = this
            if(this.value){
              this.setSelect(this.value)
            }
            $('[data-am-selected]' , this.$el ).selected()
            .on('change',function(){
              _this.$emit('input',$(this).val())
            })
          }
        }
    }
</script>
