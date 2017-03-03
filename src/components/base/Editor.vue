<template>
  <textarea :id="id" ></textarea>
</template>
<style scoped>

</style>
<script>

import io from '../../lib/io'

    export default{
        name:'editor',
        props:['value','width','height'],
        mounted:function(){
          var _this = this
          _this.editor =  UE.getEditor(_this.id)
          _this.editor.addListener('ready',function(){
            _this.ok = true
            if(_this.value){
              _this.editor.setContent(_this.value)
            }
          })
          _this.editor.addListener('contentChange',function(){

            _this.$emit('input',_this.editor.getContent())
          })

        },
        watch:{
          value:function(val){
            if(this.editor){
              if(this.ok){
                this.editor.setContent(val)
              }else{
                var _this = this
                _this.editor.addListener('ready',function(){
                  _this.ok = true
                  _this.editor.setContent(val)
                })
              }

            }
          }
        },
        beforeDestroy:function(){
          if(this.editor){
            this.editor.destroy()
          }
        }
    }
</script>
