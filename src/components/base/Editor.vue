<template>
  <textarea :id="id" ></textarea>
</template>
<style scoped>

</style>
<script>

import io from '../../lib/io'

    export default{
        name:'editor',
        data(){
            return{
                id:'editor-'+(new Date().getTime())
            }
        },
        props:['width','height'],
        mounted:function(){
          var _this = this
          io.getScripts(['static/ueditor/ueditor.config.js','static/ueditor/ueditor.all.js'],function(){
            io.getScripts(['static/ueditor/lang/zh-cn/zh-cn.js'],function(){
              _this.editor =  UE.getEditor(_this.id)
              _this.editor.addListener('ready',function(){
                if(_this.value){
                  _this.editor.setContent(_this.value)
                }
              })
              _this.editor.addListener('contentChange',function(){
                _this.$emit('input',_this.editor.getContent())
              })
            })
          })

        },
        watch:{
          value:function(val){
            if(this.editor){
              this.editor.setContent(val)
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
