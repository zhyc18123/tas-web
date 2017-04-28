<template>
  <textarea :id="id" ></textarea>
</template>
<style scoped>

</style>
<script>

import io from '../../lib/io'

require('../../../static/ueditor/ueditor.config.js')
require('../../../static/ueditor/ueditor.all.js')
require('../../../static/ueditor/lang/zh-cn/zh-cn.js')

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
                if(val && this.editor.getContent() != val ){
                  this.editor.setContent(val)
                }

              }else{
                var _this = this
                _this.editor.addListener('ready',function(){
                  _this.ok = true
                  if(val){
                    _this.editor.setContent(val)
                  }

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
