<template>
  <div><slot></slot></div>
</template>
<style scoped >

</style>
<script>

  import 'amazeui-chosen'
  import 'amazeui-chosen/amazeui.chosen.css'

    export default{
        name:'choose',
        props:['value' ,'config'],
        mounted:function(){
          this.initChoose()
        },
        watch:{
          value:function(val){
            this.setSelect(val)
          }
        },
        updated:function(){
          $('select',this.$el ).trigger('chosen:updated')
          if(this.value){
            this.setSelect(this.value)
          }
        },
        methods:{
          setSelect:function(val){
            try{

              var $s  = $('select' , this.$el);
              if(val instanceof Array ){
                for(var i = 0 ; i < val.length ;i++ ){
                  $s.find('option[value="'+val[i]+'"]').attr('selected', true)
                }
              }else{
                $s.find('option[value='+val+']').attr('selected', true)
              }
              $s.trigger('chosen:updated')
            }catch (e){

            }


          },
          initChoose:function(){
            var _this = this
            if(this.value){
              this.setSelect(this.value)
            }
            $('select',this.$el ).chosen( this.config || {}).on('change', function(e, params) {
              _this.$emit('input',$(this).val())
            })
          }
        }
    }
</script>
